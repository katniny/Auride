import { faIcon } from "../../utils/faIcon.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { setDisplayName } from "../../methods/setDisplayName.js";
import { setUsername } from "../../methods/setUsername.js";
import { checkFile } from "../../methods/checkFileType.js";
import { checkAndUploadPfp } from "../../ui/modals/uploadPfp.js";

export default async function aboutPage() {
    document.title = "Set Profile Picture | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "images").outerHTML} Profile Picture</h1>
                <p class="description">Choose your appearance on Auride.</p>
            </div>
            <div class="form">
                <div class="pfpUpload">
                    <h1>${faIcon("solid", "plus").outerHTML}</h1>
                </div>
                <input type="file" accept="image/png, image/jpeg" id="pfpUploader" style="display: none;" />

                <p class="errorTxt caution"></p>
            </div>
        </div>
    `;

    // is user logged in? if so, make sure their account isnt missing data.
    // if it is, navigate correctly
    const currentUsersData = await currentUserData();
    if (!currentUsersData)
        navigate("/auth/register");
    if (currentUsersData && currentUsersData?.pfp && currentUsersData?.display === "Deleted user" || currentUsersData?.username === "ghost") {
        navigate("/auth/names");
        return;
    }
    // else, go home
    if (currentUsersData && currentUsersData.pfp && currentUsersData.display && currentUsersData.username) {
        navigate("/home");
        return;
    }

    // remove the sidebar
    if (document.getElementById("sidebar"))
        document.getElementById("sidebar").remove();

    // prevent nav from header
    const aurideHeaderLogo = document.getElementById("aurideHeaderLogo");
    const aurideHeaderLink = aurideHeaderLogo.closest("a");
    aurideHeaderLink.href = "#";

    // when the pfp upload div is clicked, prompt user to upload image
    const pfpUpload = el.querySelector(".pfpUpload");
    const fileInput = el.querySelector("#pfpUploader");
    const errorTxt = el.querySelector(".errorTxt");
    pfpUpload.onclick = () => {
        fileInput.click();
    };
    
    // listen for file upload
    fileInput.addEventListener("change", async () => {
        if (fileInput.files.length > 0) {
            errorTxt.style.display = "none";
            // check image
            try {
                // make sure file is valid
                const result = await checkAndUploadPfp(fileInput.files[0]);
                console.log(result);
                if (result) {
                    // set timeout or storage freaks out for some reason
                    setTimeout(() => {
                        navigate("/auth/done");
                    }, 500);
                }
            } catch (error) {
                errorTxt.textContent = error.message;
                errorTxt.style.display = "block";
            }
        }
    });

    return el;
}