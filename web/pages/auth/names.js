import { faIcon } from "../../utils/faIcon.js";
import { currentUserData } from "../../users/current.js";
import { navigate } from "../../router.js";
import { registerUser } from "../../methods/auth/register.js";
import { setDisplayName } from "../../methods/setDisplayName.js";
import { setUsername } from "../../methods/setUsername.js";

export default async function aboutPage() {
    document.title = "Choose your names | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="authForm">
            <div class="info">
                <h1>${faIcon("solid", "signature").outerHTML} Names</h1>
                <p class="description">Choose how you'll be referred to on Auride.</p>
            </div>
            <div class="form">
                <input type="text" id="displayName" placeholder="Enter your display name" />
                <p class="description" id="displayNameCharLimit">0/25</p>

                <input type="text" id="newUsername" placeholder="Enter a username" />
                <p class="description" id="usernameCharLimit">0/20</p>

                <p class="errorTxt caution"></p>
                <button class="authBtn">${faIcon("solid", "signature").outerHTML} Choose Names</button>
            </div>
        </div>
    `;

    // is user logged in? if so, make sure their account isnt missing data.
    // if it is, navigate correctly
    const currentUsersData = await currentUserData();
    if (!currentUsersData)
        navigate("/auth/register");
    if (currentUsersData && !currentUsersData?.pfp && currentUsersData?.display !== "Deleted user" && currentUsersData?.username !== "ghost") {
        navigate("/auth/pfp");
        return;
    }
    // else, go home
    if (currentUsersData && currentUsersData.pfp && currentUsersData.display && currentUsersData.username) {
        navigate("/home");
        return;
    }

    // remove the sidebar
    if (document.getElementById("sidebar"))
        document.getElementById("sidebar").remove();

    // prevent nav from header
    const aurideHeaderLogo = document.getElementById("aurideHeaderLogo");
    const aurideHeaderLink = aurideHeaderLogo.closest("a");
    aurideHeaderLink.href = "#";

    // when enter is pressed, depending on the field,
    // either move down to the password field or attempt to use names
    // & keep track of character limit
    const displayNameInput = el.querySelector("#displayName");
    const usernameInput = el.querySelector("#newUsername");
    const maxDisplayNameCount = 25;
    const maxUsernameCount = 20;
    displayNameInput.addEventListener("input", (e) => {
        // make sure characters dont go over limit
        if (displayNameInput.value.length > maxDisplayNameCount)
            displayNameInput.value = displayNameInput.value.slice(0, maxDisplayNameCount);

        // show display name character limit
        const displayNameCharLimit = el.querySelector("#displayNameCharLimit");
        displayNameCharLimit.textContent = `${displayNameInput.value.length}/${maxDisplayNameCount}`;

        // if enter is pressed, go to other input
        if (e.key === "Enter")
            usernameInput.focus();
    });
    usernameInput.addEventListener("input", (e) => {
        // make sure characters dont go over limit
        if (usernameInput.value.length > maxUsernameCount)
            usernameInput.value = usernameInput.value.slice(0, maxUsernameCount);

        // show display name character limit
        const usernameCharLimit = el.querySelector("#usernameCharLimit");
        usernameCharLimit.textContent = `${usernameInput.value.length}/${maxUsernameCount}`;

        // prevent certain characters
        usernameInput.value = usernameInput.value.replace(/[^a-z 0-9 . _]/g, '');
        // Prevent spaces
        usernameInput.value = usernameInput.value.replace(/[ ]/g, '');

        // if enter is pressed, attempt to use names
        if (e.key === "Enter")
            attemptUsernameAndDisplay(displayNameInput.value, usernameInput.value);
    });

    // update login btn functionality
    const authBtn = el.querySelector(".authBtn");
    authBtn.onclick = () => attemptUsernameAndDisplay(displayNameInput.value, usernameInput.value);
    function updateBtnStatus(status) {
        switch (status) {
            case "working":
                authBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Checking...`;
                break;
            case "notWorking":
                authBtn.innerHTML = `${faIcon("solid", "right-to-bracket").outerHTML} Choose Names`;
                break;
            default:
                break;
        }
    }

    // register function
    let attemptingToGetUsername = false;
    let displayNameCheckGood = false;
    let usernameCheckGood = false;
    const errorTxt = el.querySelector(".errorTxt");
    async function attemptUsernameAndDisplay() {
        // dont re-run
        if (attemptingToGetUsername)
            return;
        errorTxt.style.display = "none";
        attemptingToGetUsername = true;
        updateBtnStatus("working");

        // try to login
        try {
            displayNameCheckGood = await setDisplayName(displayNameInput.value);
            usernameCheckGood = await setUsername(usernameInput.value);
        } catch (error) {
            errorTxt.style.display = "block";
            errorTxt.textContent = error.message;
        } finally {
            attemptingToGetUsername = false;
            updateBtnStatus("notWorking");
            console.log(displayNameCheckGood);
            console.log(usernameCheckGood);

            // if all is good, navigate to /auth/pfp
            if (displayNameCheckGood && usernameCheckGood)
                navigate("/auth/pfp");
        }
    }

    return el;
}