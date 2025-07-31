const currentURL = window.location.href;
const pageURL = new URL(currentURL);
export const pathname = pageURL.pathname;
let isOnDesktopApp = null;