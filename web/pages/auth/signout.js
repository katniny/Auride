import { faIcon } from "../../utils/faIcon.js";
import { loginToAcc } from "../../methods/auth/login.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { showResetPasswordPopup } from "../../ui/modals/resetPassword.js";
import { isSignedIn } from "../../methods/auth/isSignedIn.js";
import { auth } from "../../firebase/config.js";

export default async function aboutPage() {
    document.title = "Signing Out... | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>Signing you out...</h2>
        <p class="description">We're working on signing you out, this may take a moment.</p>
    `;

    // is user not logged in? if so, redirect home
    const loggedIn = await isSignedIn();
    if (!loggedIn) {
        navigate("/home");
        return;
    }

    try {
        await auth.signOut();
        window.location.replace("/home");
    } catch (error) {
        console.error(error.message);
    }

    return el;
}