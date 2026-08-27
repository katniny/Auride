import { firebase, auth } from "../../firebase/config.js";
import { faIcon } from "../../utils/faIcon.js";

export function reauthPopup() {
    return new Promise((resolve, reject) => {
        // create modal
        const modal = document.createElement("dialog");
        modal.innerHTML = `
            <h2>
                ${faIcon("solid", "unlock").outerHTML} Reauthenticate 
            </h2>
            <p class="description">
                You're performing a sensitive action, please confirm your identity.
            </p>

            <br />

            <input type="email" id="emailReauth" placeholder="Enter your email address" />
            <input type="password" id="passwordReauth" placeholder="Enter your password">
            <p class="errorText caution"></p>
            <button class="showHidePassword">${faIcon("solid", "eye").outerHTML} Show Password</button>

            <br />

            <button class="reauthUser">Reauthenticate</button>
            <button class="closePopup">Nevermind</button>
        `;

        // add attributes
        modal.className = "reauthPopup";
        document.getElementById("app").appendChild(modal);

        // show/hide password
        let passwordStatus = "hidden";
        const showHidePasswordBtn = modal.querySelector(".showHidePassword");
        const passwordReauthInput = modal.querySelector("#passwordReauth");
        showHidePasswordBtn.onclick = () => {
            if (passwordStatus === "hidden") {
                passwordReauthInput.type = "text";
                passwordStatus = "shown";
                showHidePasswordBtn.innerHTML = `${faIcon("solid", "eye-slash").outerHTML} Hide Password`;
            } else {
                passwordReauthInput.type = "password";
                passwordStatus = "hidden";
                showHidePasswordBtn.innerHTML = `${faIcon("solid", "eye").outerHTML} Show Password`;
            }
        };

        // update button status
        function updateButtonStatus(status) {
            console.log(reauth);
            if (status === "working") {
                reauth.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
                console.log(reauth);
            } else {
                reauth.innerHTML = "Reauthenticate";
            }
        }

        // reauthenticate user
        let isWorking = false;
        const reauth = modal.querySelector(".reauthUser");
        reauth.onclick = async () => {
            // dont work more than once
            if (isWorking)
                return;
            isWorking = true;
            updateButtonStatus("working");
            showError("", "caution");

            try {
                const currentUser = auth.currentUser;

                // get email & password and try to reauth
                const emailInput = modal.querySelector("#emailReauth");
                const passwordInput = modal.querySelector("#passwordReauth");
                const credential = firebase.auth.EmailAuthProvider.credential(emailInput.value, passwordInput.value);
                await currentUser.reauthenticateWithCredential(credential);
                closeReauthPopup();
                resolve(true);
            } catch (error) {
                isWorking = false;
                updateButtonStatus("notWorking");
                showError(error.message, "caution");
            }
        };

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
            if (isWorking)
                return;

            closeReauthPopup();
            resolve(false);
        };

        function closeReauthPopup() {
            const app = document.getElementById("app");

            // if the app has the modal, get it
            const modal = app.querySelector(".reauthPopup");
            if (modal) {
                // close, then delete after 250ms
                modal.close();
            }
        }
        
        // show modal
        modal.showModal();
    }
)};