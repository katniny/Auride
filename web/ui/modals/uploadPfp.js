import { auth } from "../../firebase/config.js";
import { checkFile } from "../../methods/checkFileType.js";
import { uploadMedia } from "../../methods/uploadMedia.js";
import { userData } from "../../users/current.js";
import { faIcon } from "../../utils/faIcon.js";

export async function checkAndUploadPfp(pfp) {
    if (!pfp)
        throw new Error("No profile picture given.");
    
    // check image
    const isImageValid = await checkFile(pfp);
    if (!isImageValid || isImageValid !== "img")
        throw new Error("Auride only accepts images as profile pictures!");

    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <!-- TODO: add image cropping -->
        <h2>
            ${faIcon("solid", "images").outerHTML} Upload Profile Picture 
        </h2>
        <p class="description">
            Does this look okay to you? If so, we'll upload it and make it your profile picture
            across Auride.
        </p>
        <p class="description">Note: You can't crop images yet, but it is a planned feature for the very near future.</p>

        <br />

        <img src="${URL.createObjectURL(pfp)}" class="accurateAuridePfp" draggable="false" />
        <p class="errorText caution"></p>

        <br />

        <button class="setAsPfp">Set as Profile Picture</button>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "changePfpPopup";
    document.getElementById("app").appendChild(modal);

    // update button status
    function updateButtonStatus(status) {
        console.log(setAsPfp);
        if (status === "working") {
            setAsPfp.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            console.log(setAsPfp);
        } else {
            setAsPfp.innerHTML = "Set as Profile Picture";
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
    const setAsPfp = modal.querySelector(".setAsPfp");
    return new Promise((resolve, reject) => {
        setAsPfp.onclick = async () => {
            // dont work more than once
            if (isWorking)
                return;
            isWorking = true;
            updateButtonStatus("working");
            showError("", "caution");

            // check one more time
            try {
                const isFileOkay = await checkFile(pfp);
                if (!isFileOkay || isFileOkay !== "img")
                    throw new Error("Auride only accepts images as profile pictures!");

                // else, upload as pfp
                uploadMedia(pfp, "pfp", "uid");

                closeResetPasswordPopup();
                userData.pfp = pfp.name;
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
    const modal = app.querySelector(".changePfpPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}