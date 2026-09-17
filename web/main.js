import { handleRoute, navigate } from "./router.js";
import { app, auth, db, storage } from "./firebase/config.js"; // init firebase
import { currentUserData } from "./users/current.js"; // get user data
import { addHeaderElement } from "./components/header.js";
import { addSidebarElement } from "./components/sidebar.js";
import { getFaReady } from "./utils/faIcon.js";
import { pageLoader } from "./ui/pageLoader.js";
import { isTauri } from "@tauri-apps/api/core";

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

// make global navigate available
window.$nav = navigate;