import { handleRoute, navigate } from "./router.js";
import { app, auth, db, storage } from "./firebase/config.js"; // init firebase
import { currentUserData } from "./users/current.js"; // get user data
import { addHeaderElement } from "./components/header.js";
import { addSidebarElement } from "./components/sidebar.js";
import { getFaReady } from "./utils/faIcon.js";

// handle the current route
handleRoute();

// get fontawesome ready
getFaReady();

// add elements
addHeaderElement();
addSidebarElement();

// make global navigate available
window.$nav = navigate;