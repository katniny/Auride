import { auth } from "../../firebase/config.js";
import { faIcon } from "../../utils/faIcon.js";

export function showResetPasswordPopup() {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <h2>
            ${faIcon("solid", "unlock").outerHTML} Reset Password 
        </h2>
        <p class="description">
            Forgot your password? Enter your email, and we'll send you a password reset email.
        </p>

        <br />

        <input type="email" id="emailPasswordReset" placeholder="Enter your email address" />
        <p class="errorText caution"></p>

        <br />

        <button class="sendPwdReset">Send Password Reset Email</button>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "resetPasswordPopup";
    document.getElementById("app").appendChild(modal);

    // update button status
    function updateButtonStatus(status) {
        console.log(sendPwdReset);
        if (status === "working") {
            sendPwdReset.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
            console.log(sendPwdReset);
        } else {
            sendPwdReset.innerHTML = "Send Password Reset Email";
        }
    }

    // send password reset
    let isWorking = false;
    const sendPwdReset = modal.querySelector(".sendPwdReset");
    sendPwdReset.onclick = () => {
        // dont work more than once
        if (isWorking)
            return;
        isWorking = true;
        updateButtonStatus("working");
        showError("", "caution");

        // get the email to send the reset to
        const emailInput = modal.querySelector("#emailPasswordReset");
        if (emailInput.value.trim() === "") {
            showError("We need an email address to send the password reset to.", "caution");
            updateButtonStatus();
            isWorking = false;
            return;
        }
        auth.sendPasswordResetEmail(emailInput.value)
            .then(() => {
                showError("Password reset email sent! Check your inbox.", "success");
            }).catch((err) => {
                showError(err.message, "caution");
            }).finally(() => {
                isWorking = false;
                updateButtonStatus();
            });
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

        closeResetPasswordPopup();
    };
    
    // show modal
    modal.showModal();
}

// close popup
function closeResetPasswordPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".resetPasswordPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}