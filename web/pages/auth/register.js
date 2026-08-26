import { faIcon } from "../../utils/faIcon.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { registerUser } from "../../methods/auth/register.js";

export default async function aboutPage() {
    document.title = "Register | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "right-to-bracket").outerHTML} Register</h1>
                <p class="description">Welcome to Auride! <a href="/auth/login">Already have an account?</a></p>
            </div>
            <div class="form">
                <input type="email" id="email" placeholder="Enter your email address" />
                <input type="password" id="password" placeholder="Enter your password" />
                <p class="errorTxt caution"></p>
                <button class="authBtn">${faIcon("solid", "right-to-bracket").outerHTML} Register</button>
            </div>
            <div class="additionalOptions">
                <a href="javascript:void(0);" class="showPasswordBtn">${faIcon("solid", "eye").outerHTML} Show Password</a>
            </div>
        </div>
    `;

    // is user logged in? if so, make sure their account isnt missing data.
    // if it is, navigate correctly
    const currentUsersData = await currentUserData();
    if (currentUsersData && currentUsersData?.display !== "Deleted user" || currentUsersData && currentUsersData?.username !== "ghost") {
        navigate("/auth/names");
        return;
    }
    if (currentUsersData && !currentUsersData?.pfp) {
        navigate("/auth/pfp");
        return;
    }
    // else, go home
    if (currentUsersData && currentUsersData.pfp && currentUsersData.display && currentUsersData.username) {
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
    // either move down to the password field or attempt to register
    const emailInput = el.querySelector("#email");
    emailInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            passwordInput.focus();
    });
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            attemptToRegister(emailInput.value, passwordInput.value);
    });

    // update login btn functionality
    const authBtn = el.querySelector(".authBtn");
    authBtn.onclick = () => attemptToRegister(emailInput.value, passwordInput.value);
    function updateBtnStatus(status) {
        switch (status) {
            case "working":
                authBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Registering...`;
                break;
            case "notWorking":
                authBtn.innerHTML = `${faIcon("solid", "right-to-bracket").outerHTML} Register`;
                break;
            default:
                break;
        }
    }

    // register function
    let attemptingToRegister = false;
    const errorTxt = el.querySelector(".errorTxt");
    async function attemptToRegister(email, password) {
        // dont re-run
        if (attemptingToRegister)
            return;
        attemptingToRegister = true;
        updateBtnStatus("working");

        // try to login
        try {
            await registerUser(email, password);
        } catch (err) {
            errorTxt.textContent = err.message;
            attemptingToRegister = false;
            updateBtnStatus("notWorking");
        }
    }

    return el;
}