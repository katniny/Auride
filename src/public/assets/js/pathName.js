const currentURL = window.location.href;
const pageURL = new URL(currentURL);
export const pathName = pageURL.pathname;
let isOnDesktopApp = null;