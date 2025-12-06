import { handleRoute, navigate } from "./router.js";
import { app, auth, db, storage } from "./firebase/config.js"; // init firebase
import { currentUserData } from "./users/current.js"; // get user data
import { addHeaderElement } from "./components/header.js";

// handle the current route
handleRoute();

// add elements
addHeaderElement();

// make global navigate available
window.$nav = navigate;