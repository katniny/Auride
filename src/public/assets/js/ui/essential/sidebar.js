// sidebar html
const sidebarHTML = `
    <!-- nav buttons -->
    <a href="/home"><button id="homeButtonSidebar" style="margin-top: 15px;"><i class="fa-solid fa-house"></i> Home</button></a>
    <a href="/notifications" id="notificationsSidebar"><button id="notificationsButtonSidebar"><i class="fa-solid fa-bell"></i> Notifications</button></a> <a href="/notifications"><p id="notificationsCount">0</p></a>
    <a href="/search"><button id="searchButtonSidebar"><i class="fa-solid fa-magnifying-glass"></i> Explore</button></a>
    <a href="/messages" id="messagesSidebar"><button id="messagesButtonSidebar"><i class="fa-solid fa-envelope"></i> Messages (0)</button></a>
    <a href="/settings?tab=subscription" id="enchantedSidebar"><button><i class="fa-solid fa-heart"></i> Donate</button></a>
    <a href="/updates"><button id="updatesButtonSidebar"><i class="fa-solid fa-wrench"></i> Updates</button></a>
    <a href="/u" id="linkToAcc"><button id="uButtonSidebar"><i class="fa-solid fa-user"></i> Your Profile</button></a>
    <a href="javascript:void(0);"><button id="showMoreContent"><i class="fa-solid fa-ellipsis"></i> More</button></a>
    <button onclick="createNotePopup()" class="createNote-sidebar" id="createNote-sidebar"><i class="fa-solid fa-pen-to-square"></i> Create</button>
    <div id="moreContent" class="moreContent" style="display: none;">
        <a href="/settings" id="settingsSidebar"><button id="settingsButtonSidebar" class="settings"><i class="fa-solid fa-gear"></i> Settings</button></a>
        <a href="/contributors"><button id="contributorsButtonSidebar"><i class="fa-solid fa-face-smile-beam"></i> Contributors</button></a>
        <a href="/achievements" id="achievementsSidebar"><button id="achievementsButtonSidebar"><i class="fa-solid fa-award"></i> Achievements</button></a>
        <a href="/favorites" id="favoritesSidebar"><button id="favoritesButtonSidebar"><i class="fa-solid fa-bookmark"></i> Favorites</button></a>
    </div>

    <br />
    <br />
    <br />
    <br />

    <div class="sidebarPolicies">
        <a href="/policies/terms">Terms of Service</a>, <a href="/policies/privacy">Privacy Policy</a>, <a href="/policies/child-safety">Child Safety</a>, <a href="/policies/cookies">Cookies</a>, <a href="/policies/copyright">Copyright</a>, <a href="/policies/guidelines">Community Guidelines</a>
    </div>

    <!-- Social Icons & Links -->
    <div class="bottom">
        <!-- Socials -->
        <a href="https://discord.gg/SmhATjRxvc" target="_blank"><i class="fa-brands fa-discord fa-lg"></i></a>
        <a href="https://bsky.app/profile/auride.xyz" target="_blank"><i class="fa-brands fa-bluesky fa-lg"></i></a>
        <a href="https://tiktok.com/@auride.xyz" target="_blank"><i class="fa-brands fa-tiktok fa-lg"></i></a>
        <a href="https://github.com/katniny/Auride" target="_blank"><i class="fa-brands fa-github fa-lg"></i></a>

        <!-- Profile -->
        <div class="profileContainer" >
            <div class="profile" id="sidebarProfileContainer" style="display: none;"></div>

            <strong><p id="notSignedIn">Create an account to explore!</p></strong>
            <img class="userPfp-sidebar" id="userPfp-sidebar" src="" draggable="false" /><p id="displayName-sidebar">Display Name</p>
            <p id="username-pronouns-sidebar">@username</p>
        </div>
    </div>
`;

// is this allowed to run on this page?
// TODO we shouldnt have to do this, maybe a minimal requiredScripts.js?
let isSidebarIllegal = null;
if (pathName.startsWith("/auth/"))
    isSidebarIllegal = true;
else
    isSidebarIllegal = false;

if (!isSidebarIllegal) {
    // create element
    const sidebarElement = document.createElement("div");
    sidebarElement.innerHTML = sidebarHTML;
    // classes/id
    sidebarElement.className = "sidebar";
    sidebarElement.id = "sidebar";

    // then, append
    document.body.prepend(sidebarElement);

    // get the current page and see if theres a button
    // if there is, mark it as active
    const pathNameWithoutSlash = pathName.split("/")[1];
    const currentPageButton = document.getElementById(`${pathNameWithoutSlash}ButtonSidebar`);
    if (currentPageButton)
        currentPageButton.classList.add("active");

    // set sidebar content appropriately
    firebase.auth().onAuthStateChanged((user) => {
        // sidebar elements that'll be replaced (if signed in)
        const displayNameSidebar = document.getElementById("displayName-sidebar");
        const usernameSidebar = document.getElementById("username-pronouns-sidebar");
        const pfpSidebar = document.getElementById("userPfp-sidebar");
        const notSignedIn = document.getElementById("notSignedIn");
        const accountButton = document.getElementById("linkToAcc");
        const profileContainerSidebar = document.getElementById("sidebarProfileContainer");

        // sidebar elements that'll just be removed if not signed in
        const notificationsSidebar = document.getElementById("notificationsSidebar");
        const messagesSidebar = document.getElementById("messagesSidebar");
        const enchantedSidebar = document.getElementById("enchantedSidebar");
        const settingsSidebar = document.getElementById("settingsSidebar");
        const notSignedInBanner = document.getElementById("notSignedIn-banner");
        const createNoteSidebar = document.getElementById("createNote-sidebar");

        if (user) {
            // remove the notSignedIn element, user exists!
            notSignedIn.remove();

            // hide the notSignedBanner
            notSignedInBanner.remove();

            // set user data
            firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
                // get the essentials
                const fullData = snapshot.val();
                const displayName = fullData.display;
                const username = fullData.username;
                const pfpName = fullData.pfp;
                const dmsEnabled = fullData.directMessagesExperiment;

                // then, set the appropriate elements
                displayNameSidebar.innerHTML = format(displayName, ["html", "emoji"]);
                usernameSidebar.textContent = `@${username}`;
                pfpSidebar.src = storageLink(`images/pfp/${user.uid}/${pfpName}`);
                accountButton.href = `/u/${username}`;

                // if the user has the dms experiment enabled, show the button
                if (dmsEnabled)
                    messagesSidebar.style.display = "block";
                else
                    messagesSidebar.remove();

                // set profile container html for settings/sign out
                profileContainerSidebar.innerHTML = `
                    <a href="/settings"><button><i class="fa-solid fa-gear"></i> Settings</button></a>
                    <button onclick="signOut()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
                `;
            });
        } else {
            // hide all the unnecessary elements
            displayNameSidebar.remove();
            usernameSidebar.remove();
            pfpSidebar.remove();
            accountButton.remove();
            notificationsSidebar.remove();
            messagesSidebar.remove();
            enchantedSidebar.remove();
            settingsSidebar.remove();
            createNoteSidebar.remove();

            // set profile container html to prompt user to sign up
            profileContainerSidebar.innerHTML = `
                <a href="/auth/register"><button>${faIcon("hand-holding-heart").outerHTML} Register</button></a>
                <a href="/auth/login"><button>${faIcon("handshake-simple").outerHTML} Login</button></a>
            `;
        }
    });
}

document.body.addEventListener("click", function (event) {
    const showMoreContent = document.getElementById("showMoreContent");
    const moreContent = document.getElementById("moreContent");

    // make sure these elements even exist
    if (!showMoreContent) return;
    if (!moreContent) return;

    // can this run on this page?
    if (isSidebarIllegal) return;

    // if they do, show them!
    if (showMoreContent.contains(event.target) || showMoreContent.contains(event.target)) {
        moreContent.style.display = "block";
    } else {
        moreContent.style.display = "none";
    }
});

// Account Area
document.body.addEventListener('click', function (event) {
    const profileContainerSidebar = document.getElementById("sidebarProfileContainer");
    const profileContainerQuery = document.querySelector(".profileContainer");

    if (profileContainerSidebar.contains(event.target) || profileContainerQuery.contains(event.target)) {
        profileContainerSidebar.style.display = "block";
    } else {
        profileContainerSidebar.style.display = "none";
    }
});