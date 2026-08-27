import { firebase, auth } from "../../firebase/config.js";
import { faIcon } from "../../utils/faIcon.js";

export function changeThemePopup() {
    return new Promise((resolve, reject) => {
        // create modal
        const modal = document.createElement("dialog");
        modal.innerHTML = `
            <h2>
                ${faIcon("solid", "palette").outerHTML} Change Theme 
            </h2>
            <button class="closePopup" style="margin-top: 5px;">Nevermind</button>

            <br />

            <div class="theme" data-theme-associated="Dark">
                <img src="/assets/imgs/ThemeDark.png" draggable="false" />
                <div class="info">
                    <h2>Dark</h2>
                    <p class="description">The default theme.</p>
                </div>
            </div>
            <div class="theme" data-theme-associated="Light">
                <img src="/assets/imgs/ThemeLight.png" draggable="false" />
                <div class="info">
                    <h2>Light</h2>
                    <p class="description">The default theme in light mode.</p>
                </div>
            </div>

            <br />
        `;

        // add attributes
        modal.className = "changeThemePopup";
        document.getElementById("app").appendChild(modal);

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

        // set close popup button
        const closeBtn = modal.querySelector(".closePopup");
        closeBtn.onclick = () => {
            // dont close when working
            closeReauthPopup();
            resolve(false);
        };

        function closeReauthPopup() {
            const app = document.getElementById("app");

            // if the app has the modal, get it
            const modal = app.querySelector(".changeThemePopup");
            if (modal) {
                // close, then delete after 250ms
                modal.close();
            }
        }
        
        // show modal
        modal.showModal();
    }
)};