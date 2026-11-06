import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";
import { themes } from "../public/defaultThemes.js";

export async function addHeaderElement() {
    // wait for current user data
    const userData = await currentUserData();

    // then, create header
    const headerElement = document.createElement("header");
    headerElement.innerHTML = `
        <div class="left">
            <button class="hamburgerMenu" onclick="openHamburgerMenu()">${faIcon("solid", "bars", "", "xl").outerHTML}</button>
            <a href="/home">
                <div class="logoContainer">
                    <img id="aurideHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false" />
                </div>
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

    // change header logo if applicable
    function changeLogoType(type) {
        if (type === "svg") {
            fetch("/assets/imgs/ThemeCustom.svg")
                .then(response => {
                    if (!response.ok)
                        throw new Error("Failed to load SVG");

                    return response.text();
                })
                .then(svg => {
                    headerElement.querySelector(".logoContainer").innerHTML = svg;
                    headerElement.querySelector(".logoContainer").classList.add("svgAdded");
                }).catch(error => {
                    console.error("Failed to load custom logo:", error);
                });
        }
    }
    const theme = localStorage.getItem("currentTheme");
    const themeColors = themes[theme];
    const headerLogo = headerElement.querySelector("#aurideHeaderLogo");
    if (themeColors?.["logo-to-use"]) {
        const logoToUse = themeColors["logo-to-use"]
        if (logoToUse === "Use SVG")
            changeLogoType("svg");
        else
            headerLogo.src = `/assets/imgs/${themeColors["logo-to-use"]}`;
    }
    document.addEventListener("changedTheme", () => {
        const theme = localStorage.getItem("currentTheme");
        if (theme === "Custom")
            changeLogoType("svg");
    });

    // TODO: implement "account area" for the header
}