import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";

export async function addSidebarElement() {
    // wait for current user data
    const userData = await currentUserData();

    // then, create sidebar
    const sidebarElement = document.createElement("div");
    sidebarElement.id = "sidebar";
    sidebarElement.className = "sidebar";
    sidebarElement.innerHTML = `
        <!-- navigation buttons -->
        <a href="/home">
            <button id="homeButton" class="active">${faIcon("solid", "house").outerHTML} Home</button>
        </a>
        <a href="/about">
            <button id="aboutButton" class="active">${faIcon("solid", "info").outerHTML} About (PLACEHOLDER)</button>
        </a>
    `;
    document.body.appendChild(sidebarElement);

    // change the active button
    changeActiveButton();

    // TODO: implement account area, the rest of buttons, and other social links
}

// change active sidebar button
function changeActiveButton() {
    // get the current page
    const pathname = window.location.pathname;
    const sidebar = document.getElementById("sidebar");
    
    // sidebar hasnt loaded yet
    if (!sidebar)
        return;

    // mark all buttons as inactive
    const sidebarButtons = sidebar.querySelectorAll("button");
    for (const button of sidebarButtons)
        button.classList.remove("active");

    // change active button per page
    switch (pathname) {
        case "/home":
            sidebar.querySelector("#homeButton").classList.add("active");
            break;
        case "/about":
            sidebar.querySelector("#aboutButton").classList.add("active");
            break;
        default:
            // unknown button
            break;
    }
}
document.addEventListener("navigatedToNewPage", () => {
    changeActiveButton();
});