import { illegalUiPages } from "../../envVars.js";
import { pathName } from "../../pathName.js";
import { storageLink, faIcon } from "../../utils.js";
import { format } from "../../ts_fas_acih.js";

const aurideAccountsHTML = `
    <div class="aurideAccounts">
        <h3 class="alignRight">Auride Accounts</h3>
        <p class="alignRight">Follow official Auride accounts!</p>

        <div class="accountsHolder">
            <!-- @katniny -->
            <div class="account">
                <div class="wholeContainer">
                    <div class="profilePictureHolder">
                        <img src="/assets/imgs/defaultPfp.png" class="recommendAcc-pfp" id="katninyPfp" draggable="false" />
                    </div>
                    <div class="infoHolder">
                        <div>
                            <p id="katninyDisplay">Getting details...</p>
                            <p class="username" id="katninyUser-pronouns">Getting details...</p>
                        </div>
                        <a href="/u" id="followBtn-1"><button class="followBtn">Follow</button></a>
                    </div>
                </div>
            </div>

            <!-- @auride -->
            <div class="account">
                <div class="wholeContainer">
                    <div class="profilePictureHolder">
                        <img src="/assets/imgs/defaultPfp.png" class="recommendAcc-pfp" id="auridePfp" draggable="false" />
                    </div>
                    <div class="infoHolder">
                        <div>
                            <p id="aurideDisplay">Getting details...</p>
                            <p class="username" id="aurideUser-pronouns">Getting details...</p>
                        </div>
                        <a href="/u" id="followBtn-2"><button class="followBtn">Follow</button></a>
                    </div>
                </div>
            </div>

            <!-- @katninystudios -->
            <div class="account">
                <div class="wholeContainer">
                    <div class="profilePictureHolder">
                        <img src="/assets/imgs/defaultPfp.png" class="recommendAcc-pfp" id="katninystudiosPfp" draggable="false" />
                    </div>
                    <div class="infoHolder">
                        <div>
                            <p id="katninystudiosDisplay">Getting details...</p>
                            <p class="username" id="katninystudiosUser-pronouns">Getting details...</p>
                        </div>
                        <a href="/u" id="followBtn-3"><button class="followBtn">Follow</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="policies">
        <a href="/policies/terms">Terms of Service</a>, 
        <a href="/policies/privacy">Privacy Policy</a>, 
        <a href="/policies/child-safety">Child Safety</a>, 
        <a href="/policies/cookies">Cookies</a>, 
        <a href="/policies/copyright">Copyright</a>, 
        <a href="/policies/guidelines">Community Guidelines</a>
    </div>
`;

// is the auride accounts area illegal?
let isAurideAccountsIllegal = null;
if (illegalUiPages.includes(pathName))
    isAurideAccountsIllegal = true;
else
    isAurideAccountsIllegal = false;

// if its allowed, render these areas
if (!isAurideAccountsIllegal) {
    const aurideAccountsHolder = document.createElement("div");
    aurideAccountsHolder.innerHTML = aurideAccountsHTML;

    // append
    document.body.appendChild(aurideAccountsHolder);

    // vars
    const users = [
        {
            uid: "G6GaJr8vPpeVdvenAntjOFYlbwr2",
            pfp: "katninyPfp",
            display: "katninyDisplay",
            username: "katninyUser-pronouns",
            followBtn: "followBtn-1"
        },
        {
            uid: "80vDnNb0rJbSjCvbiTF9EtvqtXw1",
            pfp: "auridePfp",
            display: "aurideDisplay",
            username: "aurideUser-pronouns",
            followBtn: "followBtn-2"
        },
        {
            uid: "4luqDI8627asR5EV8hOqb0YrRQF3",
            pfp: "katninystudiosPfp",
            display: "katninystudiosDisplay",
            username: "katninystudiosUser-pronouns",
            followBtn: "followBtn-3"
        }
    ];

    let currentUserUid = null;
    
    // logged in?
    firebase.auth().onAuthStateChanged((user) => {
        if (user)
            currentUserUid = user.uid;

        users.forEach(setupUserCard);
    });

    // get the first account details (@katniny on auride)
    function setupUserCard({ uid, pfp, display, username, followBtn }) {
        const pfpEl = document.getElementById(pfp);
        const displayEl = document.getElementById(display);
        const usernameEl = document.getElementById(username);
        const followBtnEl = document.getElementById(followBtn);

        firebase.database().ref(`users/${uid}`).once("value", (snapshot) => {
            const data = snapshot.val();
            if (!data) return; // shouldnt happen, but just in case :P

            // set pfp
            if (pfpEl) pfpEl.src = storageLink(`images/pfp/${uid}/${data.pfp}`);

            // set display
            if (displayEl) displayEl.textContent = format(data.display, ["html", "emoji"]);
            if (displayEl) displayEl.innerHTML += faIcon("circle-check").outerHTML;

            // set username/pronouns
            if (usernameEl && data.pronouns)
                usernameEl.textContent = `@${data.username} • ${data.pronouns}`;
            else if (usernameEl && !data.pronouns)
                usernameEl.textContent = `@${data.username}`;

            // set follow button
            if (!followBtnEl) return;

            if (currentUserUid && data?.whoFollows?.[currentUserUid] && uid !== currentUserUid) {
                followBtnEl.href = `/u/${data.username}`;
                followBtnEl.innerHTML = `<button class="followBtn">Following</button>`;
            } else if (currentUserUid && uid === currentUserUid) {
                followBtnEl.href = "/settings";
                followBtnEl.innerHTML = `<button class="followBtn">Edit Profile</button>`;
            } else {
                followBtnEl.href = `/u/${data.username}`;
                followBtnEl.innerHTML = `<button class="followBtn">Follow</button>`;
            }
        });
    }
}