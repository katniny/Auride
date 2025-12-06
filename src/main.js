import { handleRoute, navigate } from "./router.js";
import { app, auth, db, storage } from "./firebase/config.js"; // init firebase
import { currentUserData } from "./users/current.js"; // get user data

// handle the current route
handleRoute();

// make global navigate available
window.$nav = navigate;