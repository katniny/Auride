import { saveTheme } from "../../methods/saveTheme.js";
import { faIcon } from "../../utils/faIcon.js";

let working = false;
let isAwareOfOverwriting = false;
export function saveThemePopup(colors, loadedTheme) {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <div class="mainContent">
            <h2>
                ${faIcon("solid", "upload").outerHTML} Save Your Theme
            </h2>
            <p class="description">
                Save your theme to edit later.
            </p>

            <br />

            <input type="text" id="themeTitle" placeholder="Give your theme a name" value="${loadedTheme}" />
            <p class="charLimit description">${loadedTheme.length}/30</p>
            <p class="errorTxt caution"></p>

            <br />
        </div>
        <div class="verifyOverwrite" style="display: none;">
            <h2>${faIcon("solid", "triangle-exclamation").outerHTML} Overwriting Theme!</h2>
            <p class="caution">There's already a theme with this name. Are you sure you want to overwrite it?</p>
        </div>

        <br />

        <button class="saveThemeConfirm">Save Theme</button>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "saveThemePopup";
    document.getElementById("app").appendChild(modal);

    // set save theme popup
    const saveThemeConfirm = modal.querySelector(".saveThemeConfirm");
    const closeBtn = modal.querySelector(".closePopup");
    const themeNameInput = modal.querySelector("#themeTitle");
    const errorTxt = modal.querySelector(".errorTxt");
    const mainModalContent = modal.querySelector(".mainContent");
    const verifyOverwriteContent = modal.querySelector(".verifyOverwrite");
    saveThemeConfirm.onclick = async () => {
        if (working)
            return;

        try {
            errorTxt.textContent = "";
            await saveTheme(themeNameInput.value, colors, isAwareOfOverwriting);
            
            saveThemeConfirm.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            saveThemeConfirm.style.opacity = "0.5";
            closeBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            closeBtn.style.opacity = "0.5";

            closeSaveThemePopup();
        } catch (error) {
            working = false;
            saveThemeConfirm.textContent = "Save Theme";
            saveThemeConfirm.style.opacity = "1";
            closeBtn.textContent = `Nevermind`;
            closeBtn.style.opacity = "1";

            if (error.message !== "VERIFY_OVERWRITE_THEME")
                errorTxt.textContent = error.message;
            else {
                mainModalContent.style.display = "none";
                verifyOverwriteContent.style.display = "block";
                isAwareOfOverwriting = true;
            } 
        }
    };

    themeNameInput.selectionStart = themeNameInput.selectionEnd = themeNameInput.value.length;

    // show character limit
    const maxCharCount = 30;
    themeNameInput.addEventListener("input", () => {
        // trim input if too long
        if (themeNameInput.value.length > maxCharCount)
            themeNameInput.value = themeNameInput.value.slice(0, maxCharCount);
        
        // update counter
        const characterLimitText = modal.querySelector(".charLimit");
        const charCount = themeNameInput.value.length;
        characterLimitText.textContent = `${charCount}/30`;
    });

    // set close popup button
    closeBtn.onclick = () => closeSaveThemePopup();
    
    // show modal
    modal.showModal();
}

// close popup
function closeSaveThemePopup() {
    const app = document.getElementById("app");

    if (working)
        return;

    // if the app has the modal, get it
    const modal = app.querySelector(".saveThemePopup");
    if (modal) {
        // close, then delete after 250ms
        isAwareOfOverwriting = false;
        modal.close();
    }
}

window.saveThemePopup = saveThemePopup;