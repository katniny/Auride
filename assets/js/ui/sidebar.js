import { userInfo } from "../users/userInfo";

// create the html for the sidebar
const sidebarHtml = `
    <!-- nav buttons -->
    <a href="/home"><button style="margin-top: 15px;"><i class="fa-solid fa-house"></i> Home</button></a>
    <a href="/notifications" id="notificationsSidebar"><button><i class="fa-solid fa-bell"></i> Notifications</button></a> <a href="/notifications"><p id="notificationsCount">0</p></a>
    <a href="/search"><button><i class="fa-solid fa-magnifying-glass"></i> Explore</button></a>
    <a href="/messages" id="messagesSidebar"><button><i class="fa-solid fa-envelope"></i> Messages (0)</button></a>
    <a href="/settings?tab=subscription" id="enchantedSidebar"><button><i class="fa-solid fa-heart"></i> Donate</button></a>
    <a href="/updates"><button id="updatesBtn"><i class="fa-solid fa-wrench"></i> Updates</button></a>
    <a href="/u" id="linkToAcc"><button><i class="fa-solid fa-user"></i> Your Profile</button></a>
    <a href="javascript:void(0);"><button id="showMoreContent"><i class="fa-solid fa-ellipsis"></i> More</button></a>
    <button onclick="createNotePopup()" class="createNote-sidebar" id="createNote-sidebar"><i class="fa-solid fa-pen-to-square"></i> Create</button>
    <div id="moreContent" class="moreContent" style="display: none;">
        <a href="/settings" id="settingsSidebar"><button class="settings"><i class="fa-solid fa-gear"></i> Settings</button></a>
        <a href="/contributors"><button><i class="fa-solid fa-face-smile-beam"></i> Contributors</button></a>
        <a href="/achievements" id="achievementsSidebar"><button><i class="fa-solid fa-award"></i> Achievements</button></a>
        <a href="/favorites" id="favoritesSidebar"><button><i class="fa-solid fa-bookmark"></i> Favorites</button></a>
    </div>

    <br />
    <br />
    <br />
    <br />

    <div class="sidebarPolicies">
        <a href="/policies/terms">Terms of Service</a>, <a href="/policies/privacy">Privacy Policy</a>, <a href="/policies/child-safety">Child Safety</a>, <a href="/policies/cookies">Cookies</a>, <a href="/policies/copyright">Copyright</a>, <a href="/policies/guidelines">Community Guidelines</a>
    </div>

    <!-- social icons & links -->
    <div class="bottom">
        <!-- Socials -->
        <a href="https://discord.gg/SmhATjRxvc" target="_blank"><i class="fa-brands fa-discord fa-lg"></i></a>
        <a href="https://bsky.app/profile/auride.xyz" target="_blank"><i class="fa-brands fa-bluesky fa-lg"></i></a>
        <a href="https://tiktok.com/@transs_ocial" target="_blank"><i class="fa-brands fa-tiktok fa-lg"></i></a>
        <a href="https://github.com/katniny/Auride" target="_blank"><i class="fa-brands fa-github fa-lg"></i></a>
            
        <!-- Profile -->
        <div class="profileContainer" >
            <div class="profile" id="profile" style="display: none;">
                <a href="/settings"><button><i class="fa-solid fa-gear"></i> Settings</button></a>
                <button onclick="signOut()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
            </div>

            <strong><p id="notSignedIn">Create an account to explore!</p></strong>
            <img class="userPfp-sidebar" id="userPfp-sidebar" src="" draggable="false" /><p id="displayName-sidebar">Display Name</p>
            <p id="username-pronouns-sidebar">@username</p>
        </div>
    </div>
`;

// create the sidebar
const sidebar = document.createElement("div");
sidebar.className = "sidebar";
sidebar.id = "sidebar";
sidebar.innerHTML = sidebarHtml;

// finally, append it!
document.body.appendChild(sidebar);

// hide/show elements as logged in state demands
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // remove the sign in prompt
        document.getElementById("notSignedIn").remove();

        // then, set the user information
        // do this client-side, fetching non-sensitive info
        document.addEventListener("userInfoReady", () => {
            document.getElementById("userPfp-sidebar").src = userInfo.pfpUrl;
            document.getElementById("displayName-sidebar").textContent = userInfo.display;
            document.getElementById("username-pronouns-sidebar").textContent = `@${userInfo.username}`;

            document.getElementById("linkToAcc").setAttribute("href", `/u/${userInfo.username}`);
        });
    } else {
        // remove the elements that need auth
        document.getElementById("notificationsSidebar").remove();
        document.getElementById("messagesSidebar").remove();
        document.getElementById("enchantedSidebar").remove();
        document.getElementById("linkToAcc").remove();
        document.getElementById("createNote-sidebar").remove();
    }
});

// show more content when "More" is clicked
let showMoreContentOpen = false;
document.getElementById("showMoreContent").addEventListener("click", () => {
    // if open, just delete
    if (showMoreContentOpen && !document.getElementById("moreContent")) {
        showMoreContentOpen = false;
        return;
    } else if (!showMoreContentOpen) {
        // if not open, then create it
        const moreContent = document.createElement("div");
        moreContent.innerHTML = `
            <a href="/contributors"><button><i class="fa-solid fa-face-smile-beam" aria-hidden="true"></i> Contributors</button></a>
            <a href="/achievements" id="achievementsSidebar"><button><i class="fa-solid fa-award" aria-hidden="true"></i> Achievements</button></a>
            <a href="/favorites" id="favoritesSidebar"><button><i class="fa-solid fa-bookmark" aria-hidden="true"></i> Favorites</button></a>
        `;
        if (userInfo.signedIn)
            moreContent.innerHTML += `<a href="/settings" id="settingsSidebar"><button class="settings"><i class="fa-solid fa-gear" aria-hidden="true"></i> Settings</button></a>`;
        moreContent.id = "moreContent";
        moreContent.className = "moreContent";
        // append the element
        sidebar.appendChild(moreContent);
        showMoreContentOpen = true;
    } else if (document.getElementById("moreContent")) {
        document.getElementById("moreContent").remove();
        document.getElementById("showMoreContent").click();
        showMoreContentOpen = false;
    }
});

// show the profile area (if the user is signed in)
document.querySelector(`div[class="profileContainer"]`).addEventListener("click", () => {
    const profile = document.getElementById("profile");
    if (userInfo.signedIn === true) {
        if (profile.style.display === "" || profile.style.display === "block")
            profile.style.display = "none";
        else
            profile.style.display = "block";
    }
});