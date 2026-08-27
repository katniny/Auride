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
                <a href="/home"><button class="fullWidth">${faIcon("solid", "house").outerHTML} Go to Home</button></a>
                <a href="/settings"><button class="fullWidth">${faIcon("solid", "gear").outerHTML} Change My Settings</button></a>
                <a href="/userstudio"><button class="fullWidth">${faIcon("solid", "palette").outerHTML} Discover User Themes</button></a>
            </div>
        </div>
    `;

    return el;
}