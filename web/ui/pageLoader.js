import { currentAurideVersion, updateTime } from "./versioning.js";
import { currentUserData } from "../users/current.js";
import { setDefaultTheme } from "./setTheme.js";
import { useODFont } from "./useODFont.js";

export async function pageLoader() {
    const pageLoader = document.createElement("div");
    pageLoader.innerHTML = `
        <div class="topLeft">
            <p class="description">© Katniny Studios 2026</p>
            <p class="description">Powered by Katniny Online Services</p>
            <p class="description">Auride ${updateTime}-${currentAurideVersion}</p>
        </div>
        <div class="center">
            <img src="/assets/imgs/favicon.png" class="pageLoaderLogo" draggable="false" />
            <p id="quote">[quote]</p>
            <p id="whatLoading">Starting...</p>
        </div>
    `;
    pageLoader.className = "pageLoader";
    document.body.appendChild(pageLoader);

    const whatLoading = pageLoader.querySelector("#whatLoading");
    whatLoading.textContent = "Getting a random quote...";

    // set quote
    const quotes = [
        "don't question the penguin.",
        "asking chatgpt for a quote, be right back!",
        "please wait, im thinking very hard",
        "shaking the internet until it works",
        "doing something very important",
        "please remain calm..i know im small",
        "counting to 37...wait, why 37?",
        "adding ketchup and mustard to auride",
        "asking the servers nicely",
        "untangling the spaghetti...",
        "making it look like i know what im doing",
        "one moment, i dropped the internet",
        "loading at maximum silliness",
        "deploying the brain cells",
        "the frogs are working on it",
        "waiting for the moon to align with the server",
        "probably not a bug!",
        "the computer has requested a snack",
        "dividing by zero very carefully...",
        "teaching the servers about friendship",
        "pretending this is intentional",
        "reassuring the database",
        "putting all the ducks in a row",
        "negotiating with the loading screen to let you through, please hold",
        "pressing the big red button",
        "making the thing do the thing",
        "asking the internet where it went",
        "removing the forbidden cheese",
        "updating the frogs",
        "calculating the exact number of bananas required",
        "feeding the server its veggies",
        "making several questionable decisions",
        "checking if anyone noticed",
        "checking if anyone ASKED! hah! im sorry...",
        "loading with no adult supervision"
    ];
    const quote = pageLoader.querySelector("#quote");
    const key = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[key];

    // check cached themes
    whatLoading.textContent = "Checking for cached themes...";
    const currentTheme = localStorage.getItem("currentTheme");
    const useOdFont = localStorage.getItem("useODFont");
    const usePrideFlag = localStorage.getItem("showPrideFlag");

    if (currentTheme) {
        whatLoading.textContent = "Applying cached theme...";
        setDefaultTheme(currentTheme);
    }
    if (useOdFont) {
        whatLoading.textContent = "Applying cached dyslexia font preference...";
        useODFont(useOdFont);
    }
    if (usePrideFlag)
        whatLoading.textContent = "Applying pride flag preference...";

    // check for user
    whatLoading.textContent = "Checking for user...";
    const currentUser = await currentUserData();
    if (currentUser) {
        // get theme
        whatLoading.textContent = "User found! Checking theme...";
        if (currentUser.theme) {
            whatLoading.textContent = "Applying theme...";
            setDefaultTheme(currentUser.theme);
        }
        // get dyslexia font pref
        whatLoading.textContent = "Checking dyslexia font preference...";
        if (currentUser.useODFont) {
            whatLoading.textContent = "Applying dyslexia font...";
            useODFont(currentUser.useODFont);
        } else
            localStorage.setItem("useODFont", false);

        // done!
        whatLoading.textContent = "Done!";
        pageLoader.classList.add("fadeAway");
        setTimeout(() => {
            pageLoader.classList.remove("fadeAway");
            pageLoader.classList.add("done");
        }, 450);
    } else {
        whatLoading.textContent = "No user found. Done!";
        pageLoader.classList.add("fadeAway");
        setTimeout(() => {
            pageLoader.classList.remove("fadeAway");
            pageLoader.classList.add("done");
        }, 450);
    }
}