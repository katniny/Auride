import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";
import { showCreateNotePopup } from "../ui/modals/createNote.js";
import { isSignedIn } from "../methods/auth/isSignedIn.js";
import { db } from "../firebase/config.js";
import { format } from "../text/format.js";

export async function addSidebarElement() {
    // wait for current user data
    const userData = await currentUserData();
    
    // create username string
    let usernameString;
    if (userData?.pronouns)
        usernameString = `@${userData?.username} • ${userData?.pronouns}`;
    else
        usernameString = `@${userData?.username}`;

    // then, create sidebar
    const sidebarElement = document.createElement("div");
    sidebarElement.id = "sidebar";
    sidebarElement.className = "sidebar";
    sidebarElement.innerHTML = `
        <!-- navigation buttons -->
        <a href="/home">
            <button id="homeButton" class="active">${faIcon("solid", "house").outerHTML} Home</button>
        </a>
        <a href="/notifications" class="removeOnNoAuth">
            <div class="notificationCount">0</div>
            <button id="notificationsButton">${faIcon("solid", "bell").outerHTML} Notifications</button>
        </a>
        <a href="/settings" class="removeOnNoAuth">
            <button id="settingsButton" class="active">${faIcon("solid", "gear").outerHTML} Settings</button>
        </a>
        <a href="/updates">
            <button id="updatesButton" class="active">${faIcon("solid", "wrench").outerHTML} Updates</button>
        </a>
        <a href="/u/${userData?.username}" class="removeOnNoAuth">
            <button id="userButton" class="active">${faIcon("solid", "user").outerHTML} Your Profile</button>
        </a>
        <button class="createNoteSidebar removeOnNoAuth">${faIcon("solid", "pencil").outerHTML} Create</button>

        <!-- TODO: put these in the "more" menu -->
        <a href="/achievements" class="removeOnNoAuth">
            <button id="achievementButton" class="active">${faIcon("solid", "award").outerHTML} Achievements</button>
        </a>

        <!-- account area -->
        <div class="accountArea removeOnNoAuth">
            <div class="interactions" style="display: none;">
                <div class="signedInAccounts">
                    <!-- TODO: implement account switching -->
                    <div class="account">
                        <div class="pfpContainer">
                            <img class="pfp" src="${await storageLink(`images/pfp/${userData?.uid}/${userData?.pfp}`)}" draggable="false" />
                        </div>
                        <div class="userInfo">
                            <p class="display">${format(userData?.display)}</p>
                            <p class="username">${usernameString}</p>
                        </div>
                        <div class="isLoggedInToThisAccount">${faIcon("solid", "check-circle").outerHTML}</div>
                    </div>
                </div>
                <div class="divider"></div>
                <!--<a href="/auth/login"><button>${faIcon("solid", "user-plus").outerHTML} Add Existing Account</button></a>-->
                <a href="/auth/signout"><button>${faIcon("solid", "arrow-right-from-bracket").outerHTML} Sign Out</button></a>
            </div>
            <div class="accountInfo">
                <div class="pfpContainer">
                    <img class="pfp" src="${await storageLink(`images/pfp/${userData?.uid}/${userData?.pfp}`)}" draggable="false" />
                </div>
                <div class="userInfo">
                    <p class="display">${format(userData?.display)}</p>
                    <p class="username">${usernameString}</p>
                </div>
            </div>
        </div>
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

    // TODO: implement the rest of buttons
    // get the notification count
    console.log(userData);
    db.ref(`/users/${userData?.uid}/notifications/unread`).on("value", snapshot => {
        const notifCount = sidebarElement.querySelector(".notificationCount");
        const value = snapshot.val();
        if (value > 0) {
            notifCount.style.display = "block";
            if (value > 99)
                notifCount.textContent = "99+";
            else
                notifCount.textContent = value;
        } else
            notifCount.style.display = "none";
    });

    // when clicking on/off the account area, do the appropriate action
    let accountAreaOpen = false;
    const accountArea = sidebarElement.querySelector(".accountArea");
    const accountAreaInteractions = sidebarElement.querySelector(".accountArea .interactions");
    document.addEventListener("click", (event) => {
        const clickedInsideInteractions = accountAreaInteractions.contains(event.target);
        const clickedInsideAccountArea = accountArea.contains(event.target);

        if (!clickedInsideAccountArea && accountAreaOpen) {
            accountAreaOpen = false;
            accountAreaInteractions.style.display = "none";
        } else if (clickedInsideAccountArea && !clickedInsideInteractions) {
            accountAreaOpen = !accountAreaOpen;
            accountAreaInteractions.style.display = accountAreaOpen ? "block" : "none";
        }
    });
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
        case "/notifications":
            sidebar.querySelector("#notificationsButton").classList.add("active");
            break;
        case "/updates":
            sidebar.querySelector("#updatesButton").classList.add("active");
            break;
        case "/achievements":
            sidebar.querySelector("#achievementButton").classList.add("active");
            break;
        case "/settings":
            sidebar.querySelector("#settingsButton").classList.add("active");
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