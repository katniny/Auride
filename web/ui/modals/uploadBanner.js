import { auth } from "../../firebase/config.js";
import { checkFile } from "../../methods/checkFileType.js";
import { uploadMedia } from "../../methods/uploadMedia.js";
import { userData } from "../../users/current.js";
import { faIcon } from "../../utils/faIcon.js";

export async function checkAndUploadBanner(banner) {
    if (!banner)
        throw new Error("No banner given.");
    
    // check image
    const isImageValid = await checkFile(banner);
    if (!isImageValid || isImageValid !== "img")
        throw new Error("Auride only accepts images as banners!");

    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <!-- TODO: add image cropping -->
        <h2>
            ${faIcon("solid", "images").outerHTML} Upload Banner 
        </h2>
        <p class="description">
            Does this look okay to you? If so, we'll upload it and make it your banner.
        </p>
        <p class="description">Note: You can't crop images yet, but it is a planned feature for the very near future.</p>

        <br />

        <img src="${URL.createObjectURL(banner)}" class="accurateAurideBanner" draggable="false" />
        <p class="errorText caution"></p>

        <br />

        <button class="setAsBanner">Set as Banner</button>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "changeBannerPopup";
    document.getElementById("app").appendChild(modal);

    // update button status
    function updateButtonStatus(status) {
        console.log(setAsBanner);
        if (status === "working") {
            setAsBanner.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            console.log(setAsBanner);
        } else {
            setAsBanner.innerHTML = "Set as Banner";
        }
    }

    // show error
    let currentType = "caution";
    function showError(text, type) {
        // set text
        const errorTxt = modal.querySelector(".errorText");
        errorTxt.textContent = text;
        // remove old class and add new class
        errorTxt.classList.remove(currentType);
        errorTxt.classList.add(type);
        currentType = type;
    }
    
    // show modal
    modal.showModal();

    // send password reset
    let isWorking = false;
    const setAsBanner = modal.querySelector(".setAsBanner");
    return new Promise((resolve, reject) => {
        setAsBanner.onclick = async () => {
            // dont work more than once
            if (isWorking)
                return;
            isWorking = true;
            updateButtonStatus("working");
            showError("", "caution");

            // check one more time
            try {
                const isFileOkay = await checkFile(banner);
                if (!isFileOkay || isFileOkay !== "img")
                    throw new Error("Auride only accepts images as banners!");

                // else, upload as banner
                uploadMedia(banner, "banner", "uid");

                closeResetPasswordPopup();
                userData.banner = banner.name;
                resolve(true);
            } catch (error) {
                showError(error.message, "caution");
                isWorking = false;
                updateButtonStatus("notWorking");
            }
        };

        // set close popup button
        const closeBtn = modal.querySelector(".closePopup");
        closeBtn.onclick = () => {
            // dont close when working
            if (isWorking)
                return;

            closeResetPasswordPopup();
            resolve(false);
        };
    });
}

// close popup
function closeResetPasswordPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".changeBannerPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}