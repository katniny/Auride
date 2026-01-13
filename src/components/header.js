import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";

export async function addHeaderElement() {
    // wait for current user data
    const userData = await currentUserData();

    // then, create header
    const headerElement = document.createElement("header");
    headerElement.innerHTML = `
        <div class="left">
            <!-- TODO: implement hamburger menu -->
            <button onclick="openHamburgerMenu()"></button>
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

    // TODO: implement "account area" for the header
}