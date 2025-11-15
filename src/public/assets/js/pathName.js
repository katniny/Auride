const currentURL = window.location.href;
const pageURL = new URL(currentURL);
const pathName = pageURL.pathname;
let isOnDesktopApp = null;