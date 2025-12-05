import { handleRoute, navigate } from "./router.js";

handleRoute();

// make global navigate available
window.$nav = navigate;