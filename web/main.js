import { handleRoute, navigate } from "./router.js";
import { app, auth, db, storage } from "./firebase/config.js"; // init firebase
import { currentUserData } from "./users/current.js"; // get user data
import { addHeaderElement } from "./components/header.js";
import { addSidebarElement } from "./components/sidebar.js";
import { getFaReady } from "./utils/faIcon.js";
import { pageLoader } from "./ui/pageLoader.js";
import { isTauri } from "@tauri-apps/api/core";
import { isNearBottom } from "./ui/nearBottom.js";
import { isScrollable } from "./ui/isScrollable.js";

// show page loader
pageLoader();

// handle the current route
handleRoute();

// get fontawesome ready
getFaReady();

// add elements
addHeaderElement();
addSidebarElement();

// expose whether client is app or not
// & in this scenario, we should tauri's native http client, rather than
// the webviews
export const isAurideApp = isTauri();
export let apiFetch;
console.log(`Is Auride App: ${isAurideApp}`);
if (isAurideApp) {
    const { fetch } = await import("@tauri-apps/plugin-http");
    apiFetch = fetch;
} else {
    apiFetch = window.fetch.bind(window);
}

// login prompt
const loginPrompt = document.querySelector(".loginPrompt");
// if logged in, remove the login prompt
const userData = await currentUserData();
if (userData)
    loginPrompt.remove();
// if near the bottom of a page, hide the login prompt to not hide interactions/text
window.addEventListener("scroll", () => {
    if (isNearBottom() || !isScrollable())
        loginPrompt.style.display = "none";
    else
        loginPrompt.style.display = "block";
});
// on navigation, check if page is scrollable
document.addEventListener("navigatedToNewPage", () => {
    const generatedPages = [
        "/home",
        "/issues",
        "/messages",
        "/notifications",
        "/search",
        "/updates"
    ];

    // if its a page that generates, force the login prompt on.
    const pathname = window.location.pathname;
    if (generatedPages.includes(pathname)) {
        loginPrompt.style.display = "block";
    } else {
        if (pathname.startsWith("/u/") || pathname.startsWith("/note/") || pathname.startsWith("/userstudio/")) {
            loginPrompt.style.display = "block";
        } else {
            if (!isScrollable() || isNearBottom())
                loginPrompt.style.display = "none";
            else
                loginPrompt.style.display = "block";
        }
    }
});

// make global navigate available
window.$nav = navigate;