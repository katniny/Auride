import { getUserData } from "../methods/getUserData.js";
import { currentUserData } from "../users/current.js";
import { loadNotes } from "../notes/getNotes.js";
import { storageLink } from "../utils/storageLink.js";
import { format } from "../text/format.js";
import { faIcon } from "../utils/faIcon.js";
import { navigate } from "../router.js";
import { showDeceasedUserPopup } from "../ui/modals/deceasedUser.js";
import { followUser } from "../methods/followUser.js";

export default async function userPage(params) {
    // get users data
    const userData = await getUserData(params.id, "username");

    // get users data
    const currentUsersData = await currentUserData();

    console.log(userData);

    if (!userData) {
        // TODO: make proper error message
        console.error(":(");
        return;
    }

    // format joined at
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"
    ];
    const joinedDate = new Date(userData.joinedAt);
    const joinedMonth = monthNames[joinedDate.getMonth()];
    const joinedYear = joinedDate.getFullYear();

    // load notes
    loadNotes();

    // construct link if user has banner or not
    let bannerUrl;
    if (userData.banner)
        bannerUrl = await storageLink(`images/banner/${userData.uid}/${userData.banner}`);
    else
        bannerUrl = "/assets/imgs/Transparency.png";

    // construct username
    let usernameString;
    if (userData.pronouns)
        usernameString = `@${userData.username} • ${userData.pronouns}`;
    else
        usernameString = `@${userData.username}`;

    const el = document.createElement("div");
    const pfpLink = await storageLink(`images/pfp/${userData.uid}/${userData.pfp}`);
    el.innerHTML = `
        <div class="profileContainer">
            <img src="${bannerUrl}" class="userBanner" draggable="false" />
            <img src="${pfpLink}" class="userPfp" draggable="false" />
            <div class="detailsRow">
                <div class="nonImageDetails">
                    <h2 class="displayName">${format(userData.display, ["html", "emoji"])}</h2>
                    <p class="username description">${usernameString}</p>
                    <p class="bio">${format(userData.bio)}</p>
                    <!-- TODO: make these clickable so you can see the users following/followers -->
                    <div class="followCounts">
                        <span class="followers description"><b>${userData.followers}</b> Followers</span>
                        •
                        <span class="following description"><b>${userData.following}</b> Following</span>
                    </div>
                    <p class="joinedDate description">${faIcon("solid", "calendar").outerHTML} Joined ${joinedMonth} ${joinedYear}</p>
                </div>
                <div class="additionalInteractions">
                    <button class="moreInteractions">${faIcon("solid", "ellipsis").outerHTML}</button>
                    <button class="followBtn">Follow</button>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div id="notes"></div>
    `;

    // set title
    document.title = `${userData.display} (@${userData.username}) on Auride`;

    // get badges
    const displayName = el.querySelector(".displayName");
    if (userData.isVerified)
        displayName.innerHTML += `<span class="badge">${faIcon("solid", "circle-check").outerHTML}</span>`;
    if (userData.activeContributor)
        displayName.innerHTML += `<span class="badge">${faIcon("solid", "handshake-angle").outerHTML}</span>`;
    if (userData.isSubscribed)
        displayName.innerHTML += `<span class="badge">${faIcon("solid", "heart").outerHTML}</span>`;

    // is the user following? is the user themselves?
    // is the user blocked?
    // TODO: implement blocking & reporting
    const followBtn = el.querySelector(".followBtn");
    let isFollowing = null;
    function updateFollowButton() {
        console.log("SIJFUOIASJFAS");
        // user is themselves
        if (isFollowing === "self")
            return;
        
        // is following
        if (isFollowing)
            followBtn.innerHTML = `${faIcon("solid", "user-check").outerHTML} Following`;
        else
            followBtn.innerHTML = `${faIcon("solid", "user-plus").outerHTML} Follow`;
    }
    if (currentUsersData && currentUsersData.uid === userData.uid) {
        followBtn.innerHTML = `${faIcon("solid", "user-pen").outerHTML} Edit Profile`;
        followBtn.onclick = () => navigate("/settings");
        isFollowing = "self";
    } else if (currentUsersData && currentUsersData.followingWho && currentUsersData.followingWho[userData.uid]) {
        if (userData.memorialAccount.isDeceased) {
            followBtn.innerHTML = `${faIcon("solid", "user-check").outerHTML} Cannot Unfollow`;
            followBtn.onclick = () => null;
        } else {
            followBtn.innerHTML = `${faIcon("solid", "user-check").outerHTML} Following`;
            followBtn.onclick = () => {
                // TODO: show error
                isFollowing = false;
                followUser(userData.uid, "uid").catch((error) => {
                    isFollowing = true;
                    updateFollowButton();
                });
                updateFollowButton();
            };
        }
        followBtn.classList.add("following");
    } else {
        if (userData.memorialAccount.isDeceased) {
            followBtn.innerHTML = `${faIcon("solid", "user-plus").outerHTML} Cannot Follow`;
            followBtn.onclick = () => null;
        } else {
            followBtn.innerHTML = `${faIcon("solid", "user-plus").outerHTML} Follow`;
            followBtn.onclick = () => {
                isFollowing = true;
                followUser(userData.uid, "uid").catch((error) => {
                    isFollowing = false;
                    updateFollowButton();
                });
                updateFollowButton();
            };
        }
    }

    // is user deceased?
    const nonImageDetails = el.querySelector(".nonImageDetails");
    if (userData.memorialAccount.isDeceased) {
        // add html
        nonImageDetails.innerHTML += `
            <p class="deceased description">
                ${faIcon("solid", "dove").outerHTML} May ${format(userData.display, ["html", "emoji"])} rest in peace.
            </p>
        `;
        // if they have an obituary, add that as well
        if (userData.memorialAccount.obituary) {
            const deceasedInfo = el.querySelector(".deceased");
            deceasedInfo.innerHTML += `
                <span class="description">
                    They have an obituary which you <a href="${userData.memorialAccount.obituary}" target="_blank">can view</a>.
                </span>
            `;
        }

        // then, add notice to let user know further info
        showDeceasedUserPopup(userData.display);
    }

    return el;
}