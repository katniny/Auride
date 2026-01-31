import { faIcon } from "../../utils/faIcon.js";
import { loginToAcc } from "../../methods/auth/login.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { showResetPasswordPopup } from "../../ui/modals/resetPassword.js";
import { isSignedIn } from "../../methods/auth/isSignedIn.js";

export default async function aboutPage() {
    document.title = "Login | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "right-to-bracket").outerHTML} Login to Auride</h1>
                <p class="description">Welcome back to Auride! <a href="/auth/register">Don't have an account?</a></p>
            </div>
            <div class="form">
                <input type="email" id="email" placeholder="Enter your email address" />
                <input type="password" id="password" placeholder="Enter your password" />
                <p class="errorTxt caution"></p>
                <button class="authBtn">${faIcon("solid", "right-to-bracket").outerHTML} Login</button>
            </div>
            <div class="additionalOptions">
                <a href="javascript:void(0);" class="showPasswordBtn">${faIcon("solid", "eye").outerHTML} Show Password</a>
                <a href="javascript:void(0);" class="resetPasswordBtn">${faIcon("solid", "unlock").outerHTML} Reset Password</a>
            </div>
        </div>
    `;

    // is user logged in? if so, redirect home
    const loggedIn = isSignedIn();
    if (loggedIn) {
        navigate("/home");
        return;
    }

    // when "Show Password" is clicked, swap between showing/hiding
    let isShowingPassword = false;
    const passwordInput = el.querySelector("#password");
    const showPasswordBtn = el.querySelector(".showPasswordBtn");
    showPasswordBtn.onclick = () => {
        if (isShowingPassword) {
            isShowingPassword = false;
            passwordInput.type = "password";
            showPasswordBtn.innerHTML = `${faIcon("solid", "eye").outerHTML} Show Password`;
        } else {
            isShowingPassword = true;
            passwordInput.type = "text";
            showPasswordBtn.innerHTML = `${faIcon("solid", "eye-slash").outerHTML} Hide Password`;
        }
    }

    // when enter is pressed, depending on the field,
    // either move down to the password field or attempt to login
    const emailInput = el.querySelector("#email");
    emailInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            passwordInput.focus();
    });
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            attemptToLogin(emailInput.value, passwordInput.value);
    });

    // update login btn functionality
    const authBtn = el.querySelector(".authBtn");
    authBtn.onclick = () => attemptToLogin(emailInput.value, passwordInput.value);
    function updateBtnStatus(status) {
        switch (status) {
            case "working":
                authBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Logging in...`;
                break;
            case "notWorking":
                authBtn.innerHTML = `${faIcon("solid", "right-to-bracket").outerHTML} Login`;
                break;
            default:
                break;
        }
    }

    // login function
    let attemptingToSignIn = false;
    const errorTxt = el.querySelector(".errorTxt");
    async function attemptToLogin(email, password) {
        // dont re-run
        if (attemptingToSignIn)
            return;
        attemptingToSignIn = true;
        updateBtnStatus("working");

        // try to login
        try {
            await loginToAcc(email, password);
        } catch (err) {
            errorTxt.textContent = err.message;
            attemptingToSignIn = false;
            updateBtnStatus("notWorking");
        }
    }

    // reset password popup
    const resetPasswordBtn = el.querySelector(".resetPasswordBtn");
    resetPasswordBtn.onclick = () => {
        showResetPasswordPopup();
    };

    return el;
}