import { faIcon } from "../../utils/faIcon.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";

export default async function aboutPage() {
    const userData = await currentUserData();
    if (!userData) {
        navigate("/auth/register");
        return;
    }

    document.title = "Thanks for signing up! | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "handshake").outerHTML} Welcome to Auride!</h1>
                <p class="description">Change your settings, discover themes, or you can go straight to the home page to say hi!</p>
            </div>
            <div class="form">
                <button class="homeBtn fullWidth">${faIcon("solid", "house").outerHTML} Go to Home</button>
                <button class="settingsBtn fullWidth">${faIcon("solid", "gear").outerHTML} Change My Settings</button>
                <button class="userStudioBtn fullWidth">${faIcon("solid", "palette").outerHTML} Discover User Themes</button>
            </div>
        </div>
    `;

    // hard refresh after registration
    const homeBtn = el.querySelector(".homeBtn");
    homeBtn.onclick = () => { window.location.replace("/home") }; 
    const settingsBtn = el.querySelector(".settingsBtn");
    settingsBtn.onclick = () => { window.location.replace("/settings") }; 
    const userStudioBtn = el.querySelector(".userStudioBtn");
    userStudioBtn.onclick = () => { window.location.replace("/userstudio") }; 

    return el;
}