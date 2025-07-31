import { userInfo } from "../users/userInfo";

// create the html for the header
const headerHtml = `
    <div class="left">
        <button id="hamburgerMenu"><i class="fa-solid fa-bars" aria-hidden="true"></i></button> <a href="/home"><img class="headerLogo" id="aurideHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false"></a>
    </div>

    <div class="center">
        <input id="searchBar" placeholder="Search Auride">
    </div>

    <div class="right">
        <a href="/notifications"><i class="fa-solid fa-bell fa-lg" aria-hidden="true"></i></a> <a href="/achievements"><i class="fa-solid fa-trophy fa-lg" style="margin-right: 0px;" aria-hidden="true"></i></a> <img src="/assets/imgs/defaultPfp.png" alt="Your profile picture" draggable="false" id="userPfp-header" onclick="accountManager()">
    </div>
    <div class="accountManager" id="accountManager" style="display: none;">
        <h3 id="greetingManager">Hello, {user}</h3>
        <a href="/settings"><button><i class="fa-solid fa-gear" aria-hidden="true"></i> Settings</button></a>
        <a href="/achievements"><button><i class="fa-solid fa-award" aria-hidden="true"></i> Achievements</button></a>
    </div>
`;

// create element
const header = document.createElement("header");
header.innerHTML = headerHtml;
header.id = "header";
header.className = "header";

// then, append!
// it runs twice, for some reason, so ensure theres not an existing header
if (!document.getElementById("header"))
    document.body.appendChild(header);

// change default pfp to users
document.addEventListener("userInfoReady", () => {
    if (userInfo.signedIn)
        document.getElementById("userPfp-header").src = userInfo.pfpUrl;
});

// account manager
export function accountManager() {
    // dont allow signed out users to use it
    if (!userInfo.signedIn) return;

    // if open, close!
    const accountManager = document.getElementById("accountManager");
    if (accountManager.style.display === "none" || accountManager.style.display === "") {
        accountManager.style.display = "block";
        document.getElementById("greetingManager").textContent = `Hello, ${userInfo.display}!`;
    } else {
        accountManager.style.display = "none";
    }
}
window.accountManager = accountManager;