import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";

export async function addHeaderElement() {
    // wait for current user data
    const userData = await currentUserData();

    // then, create header
    const headerElement = document.createElement("header");
    headerElement.innerHTML = `
        <div class="left">
            <button class="hamburgerMenu" onclick="openHamburgerMenu()">${faIcon("solid", "bars", "", "xl").outerHTML}</button>
            <a href="/home">
                <img id="aurideHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false" />
            </a>
        </div>
        <div class="center">
            <input id="searchBar" placeholder="Search Auride..." />
        </div>
        <div class="right">
            <img alt="Your profile picture" draggable="false" id="headerUserPfp" />
        </div>
    `;
    document.body.appendChild(headerElement);

    // if pfp, change user pfp appropriately
    // else, set it to default
    const userPfp = document.getElementById("headerUserPfp");
    if (userData && userData?.pfp)
        userPfp.src = await storageLink(`images/pfp/${userData.uid}/${userData.pfp}`);
    else
        userPfp.src = "/assets/imgs/defaultPfp.png";

    // when hamburger menu clicked, show sidebar
    let sidebarOpen = false;
    const hamburgerMenu = headerElement.querySelector(".hamburgerMenu");
    hamburgerMenu.onclick = () => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebarOpen && sidebar) {
            sidebar.classList.add("open");
            sidebarOpen = true;
        } else if (sidebarOpen && sidebar) {
            sidebar.classList.remove("open");
            sidebarOpen = false;
        }
    };

    // TODO: implement "account area" for the header
}