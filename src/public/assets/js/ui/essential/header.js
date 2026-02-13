// header html
const headerHTML = `
    <div class="left">
        <button id="hamburgerMenu"><i class="fa-solid fa-bars"></i></button> <a href="/home"><img class="headerLogo" id="aurideHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false" /></a>
    </div>

    <div class="center">
        <input id="searchBar" placeholder="Search Auride" />
    </div>

    <div class="right">
        <a href="/notifications" id="notificationsButtonHeader"><i class="fa-solid fa-bell fa-lg"></i></a> 
        <a href="/achievements" id="achievementsButtonHeader"><i class="fa-solid fa-trophy fa-lg" style="margin-right: 0px;"></i></a> 
        <img src="" alt="Your profile picture" draggable="false" id="userPfp-header" />
    </div>
    <div class="accountManager" id="accountManager" style="display: none;">
        <h3 id="greetingManager">Hello, {user}</h3>
        <div id="headerInteractionButtons"></div>
    </div>
`;

// is this allowed to run on this page?
// TODO we shouldnt have to do this, maybe a minimal requiredScripts.js?
let isHeaderIllegal = null;
if (illegalUiPages.includes(pathName))
    isHeaderIllegal = true;
else
    isHeaderIllegal = false;

if (!isHeaderIllegal) {
    // create element
    const headerElement = document.createElement("div");
    headerElement.innerHTML = headerHTML;
    // classes/id
    headerElement.className = "header";
    headerElement.id = "header";

    // then, append
    document.body.prepend(headerElement);

    // set data in the header
    // also add/modify whatever as needed per auth state
    const userPfpHeader = document.getElementById("userPfp-header");
    const greetingManager = document.getElementById("greetingManager");
    const accountManagerInteractions = document.getElementById("headerInteractionButtons");

    // remove when signed out
    const notificationsButtonHeader = document.getElementById("notificationsButtonHeader");
    const achievementsButtonHeader = document.getElementById("achievementsButtonHeader");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                const fullData = snapshot.val();

                // set pfp
                userPfpHeader.src = storageLink(`images/pfp/${user.uid}/${fullData.pfp}`);

                // set the greeting to users display name
                greetingManager.textContent = `Hello, ${fullData.display}!`;

                // set innerhtml for interactions in the account manager
                accountManagerInteractions.innerHTML = `
                    <a href="/settings"><button><i class="fa-solid fa-gear"></i> Settings</button></a>
                    <a href="/achievements"><button><i class="fa-solid fa-award"></i> Achievements</button></a>
                `;
            });
        } else {
            // default data
            userPfpHeader.src = "/assets/imgs/defaultPfp.png";
            greetingManager.textContent = "Hello, signed out user! Joining us?";
            accountManagerInteractions.innerHTML = `
                <a href="/auth/register"><button>${faIcon("hand-holding-heart").outerHTML} Register</button></a>
                <a href="/auth/login"><button>${faIcon("handshake-simple").outerHTML} Login</button></a>
            `;

            // remove elements
            notificationsButtonHeader.remove();
            achievementsButtonHeader.remove();
        }
    });

    // add an event listener for the search bar
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            window.location.replace(`/search?q=${searchBar.value}`);
        }
    });
}

// account manager (header) 
document.body.addEventListener("click", function (event) {
    const accountManagerHeader = document.getElementById("accountManager")
    const userPfpheader = document.getElementById("userPfp-header");

    // do the elements exist?
    if (!accountManagerHeader) return;
    if (!userPfpheader) return;

    // is header illegal?
    if (isHeaderIllegal) return;

    // else, continue and show the "account manager"
    if (accountManagerHeader.contains(event.target) || userPfpheader.contains(event.target))
        accountManagerHeader.style.display = "block";
    else
        accountManagerHeader.style.display = "none";
});