import { publishTheme } from "../../methods/publishTheme.js";
import { saveTheme } from "../../methods/saveTheme.js";
import { faIcon } from "../../utils/faIcon.js";

let working = false;
export function publishThemePopup(colors, loadedTheme) {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <div class="mainContent">
            <h2>
                ${faIcon("solid", "upload").outerHTML} Publish Your Theme
            </h2>
            <p class="description">
                Make your theme public to everyone on Auride!
            </p>

            <br />

            <input type="text" id="themeTitle" placeholder="Give your theme a name" value="${loadedTheme}" />
            <p class="charLimit description">${loadedTheme.length}/30</p>

            <input type="text" id="themeDesc" placeholder="Give your theme a description" />
            <p class="charLimitDesc description">${loadedTheme.length}/100</p>

            <p class="errorTxt caution"></p>

            <br />
        </div>

        <br />

        <button class="publishThemeConfirm">Publish Theme</button>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "publishThemePopup";
    document.getElementById("app").appendChild(modal);

    // set save theme popup
    const publishThemeConfirm = modal.querySelector(".publishThemeConfirm");
    const closeBtn = modal.querySelector(".closePopup");
    const themeNameInput = modal.querySelector("#themeTitle");
    const themeDescInput = modal.querySelector("#themeDesc");
    const errorTxt = modal.querySelector(".errorTxt");
    const mainModalContent = modal.querySelector(".mainContent");
    const verifyOverwriteContent = modal.querySelector(".verifyOverwrite");
    publishThemeConfirm.onclick = async () => {
        if (working)
            return;

        try {
            errorTxt.textContent = "";
            await publishTheme(themeNameInput.value, colors, loadedTheme);
            //
            
            publishThemeConfirm.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            publishThemeConfirm.style.opacity = "0.5";
            closeBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            closeBtn.style.opacity = "0.5";

            closeSaveThemePopup();
        } catch (error) {
            working = false;
            publishThemeConfirm.textContent = "Publish Theme";
            publishThemeConfirm.style.opacity = "1";
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
    const maxDescCharCount = 100;
    themeNameInput.addEventListener("input", () => {
        // trim input if too long
        if (themeNameInput.value.length > maxCharCount)
            themeNameInput.value = themeNameInput.value.slice(0, maxCharCount);
        
        // update counter
        const characterLimitText = modal.querySelector(".charLimit");
        const charCount = themeNameInput.value.length;
        characterLimitText.textContent = `${charCount}/30`;
    });
    themeDescInput.addEventListener("input", () => {
        if (themeDescInput.value.length > maxDescCharCount)
            themeDescInput.value = themeDescInput.value.slice(0, maxDescCharCount);
        const characterLimitText = modal.querySelector(".charLimitDesc");
        const charCount = themeDescInput.value.length;
        characterLimitText.textContent = `${charCount}/100`;
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

window.publishThemePopup = publishThemePopup;