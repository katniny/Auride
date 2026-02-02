import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";
import { showCreateNotePopup } from "../ui/modals/createNote.js";
import { isSignedIn } from "../methods/auth/isSignedIn.js";

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
        <a href="/settings" class="removeOnNoAuth">
            <button id="settingsButton" class="active">${faIcon("solid", "gear").outerHTML} Settings</button>
        </a>
        <a href="/u/${userData?.username}" class="removeOnNoAuth">
            <button id="userButton" class="active">${faIcon("solid", "user").outerHTML} Your Profile</button>
        </a>
        <button class="createNoteSidebar removeOnNoAuth">${faIcon("solid", "pencil").outerHTML} Create</button>
    `;
    document.body.appendChild(sidebarElement);

    // change the active button
    changeActiveButton();

    // when "createNoteSidebar" is clicked, show popup
    const createNote = sidebarElement.querySelector(".createNoteSidebar");
    createNote.onclick = () => showCreateNotePopup();

    // change buttons that show based on auth state
    const loggedIn = await isSignedIn();
    if (!loggedIn) {
        // get the buttons and remove them
        const toRemoveOnNoAuth = document.querySelectorAll(".removeOnNoAuth");
        for (const item of toRemoveOnNoAuth)
            item.remove();
    }

    // TODO: implement account area, the rest of buttons, and other social links
}

// change active sidebar button
async function changeActiveButton() {
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
        default:
            // unknown button
            break;
    }

    // before finishing, is the users own page?
    const userData = await currentUserData();
    if (userData && pathname === `/u/${userData?.username}`)
        sidebar.querySelector("#userButton").classList.add("active");
}
document.addEventListener("navigatedToNewPage", () => {
    changeActiveButton();
});