async function renderUPage(userIdentifer, reqType) {
    // get token, if exists
    let user = firebase.auth().currentUser;
    let token = null;
    
    // wait a bit if firebase is still initializing
    if (!user) {
        await new Promise(res => setTimeout(res, 100));
        user = firebase.auth().currentUser;
    }

    // if no user, no token. likely not signed in
    if (!user) console.error("No token found.");

    // attempt to get a token
    try {
        token = await user.getIdToken();
    } catch (err) {
        console.error(`Failed to get Firebase token: ${err}`);
    }

    if (!token)
        console.error("No token found.");

    // create element
    const info = document.createElement("div");
    info.className = "info";
    // and track the main element
    const melissaDiv = document.getElementById("melissa");
    melissaDiv.appendChild(info);

    // create loading indicator
    createLoadingIndicator("lg", "melissa", "append");

    // request deletion from server
    const response = await fetch(`${serverUrl}/api/auride/getUserData`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(userIdentifer ? { "userIdentifier": userIdentifer } : {}),
            ...(reqType ? { "reqType": reqType } : {})
        }
    });
    if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Failed to fetch user data: ", errorMessage.error);

        // visually show error
        info.classList.add("error");
        info.innerHTML = `
            <img src="/assets/mascot/concerned.png" draggable="false" class="errorImg" />
            <h2>We ran into an error :(</h2>
            <p>This user may not exist, deleted their account, or an internal server error occurred.</p>
            <details>
                <summary>Error Details for Developers</summary>
                <p>${errorMessage.error}</p>
            </details>

            <div class="goBackToHome">
                <p>Return to the home page?</p>
                <a href="/home"><button>Go home</button></a>
            </div>
        `;

        // remove loading indicator
        const noteLoadingIndicator = document.getElementById("noteLoadingIndicator");
        if (noteLoadingIndicator)
            noteLoadingIndicator.remove();

        return;
    }

    const responseJson = await response.json();
    const userData = responseJson.returnedUserData;

    // then, render the user page
    melissaDiv.innerHTML = ""; // clear
    document.title = `${userData.display} (@${userData.username}) | Auride`;

    // does current have them blocked?
    let currentUserHasBlocked = false;
    const snapshot = await firebase.database().ref(`users/${user.uid}/blocked/${userData.uid}`).once("value");
    if (snapshot.exists())
        currentUserHasBlocked = true;

    // is there a banner? is there a pfp? should we show pronouns?
    // is it themselves, or are they following?
    const bannerLink = userData.banner ? storageLink(`images/banner/${userData.uid}/${userData.banner}`) : "/assets/imgs/Transparency.png";
    const pfpLink = userData.pfp ? storageLink(`images/pfp/${userData.uid}/${userData.pfp}`) : "/assets/imgs/defaultPfp.png";
    const showPronouns = userData.pronouns ? "block" : "none";
    let isFollowing = null;

    // is user following? is user not following?
    // is it themselves? is there even a user?
    let whatToDoFollowing = null;
    if (user && user.uid === userData.uid) {
        isFollowing = `${faIcon("user-pen").outerHTML} Edit Profile`;
        whatToDoFollowing = `window.location.href = '/settings'`;
    } else if (user && userData.whoFollows && user.uid in userData.whoFollows) {
        isFollowing = `${faIcon("user-check").outerHTML} Following`;
        whatToDoFollowing = `followUser('${userData.uid}', 'uid')`;
    } else {
        isFollowing = `${faIcon("user-plus").outerHTML} Follow`;
        whatToDoFollowing = `followUser('${userData.uid}', 'uid')`;
    }

    // does user have badges?
    const badges = document.createElement("span");
    badges.className = "noteBadges";
    if (userData.isVerified)
        badges.innerHTML += faIcon("circle-check").outerHTML;
    if (userData.isSubscribed)
        badges.innerHTML += faIcon("heart").outerHTML;
    if (userData.activeContributor)
        badges.innerHTML += faIcon("handshake-angle").outerHTML;

    info.innerHTML = `
        <img class="userImage-banner" id="userImage-banner" draggable="false" src="${bannerLink}" />
        <img class="userImage-profile" id="userImage-profile" draggable="false" src="${pfpLink}" /> 
        <h1 id="display-profile">${format(userData.display, ["html", "emoji"])}</h1>
        <h2 id="username-profile">@${userData.username}</h2>
        <h2 id="pronouns-profile" style="display: ${showPronouns}">${userData.pronouns}</h2>
        <p id="bio-profile" class="bio-profile">${format(userData.bio)}</p>

        <br />

        <!-- TODO: make these clickable to show appropriate data -->
        <p class="followers-following"><b><span id="followers">${userData.followers} </span></b>Followers <span id="following" style="margin-left: 10px;"><b>${userData.following}</b> </span> Following</p> 

        <span><button onclick="${whatToDoFollowing}" class="followButton" id="followButton">${isFollowing}</button> <button class="userActions" id="userActions"><i class="fa-solid fa-caret-down"></i> More</button></span>

        <div class="divider"></div>
        <div class="filters"><button class="active" id="filterNotes" onclick="swapFilter('notes')">Notes</button> <button onclick="swapFilter('achievements')" id="filterAchievements">Achievements</button></div>

        <div class="notes" id="notes" style="max-width: 100%; margin-left: 0px; transform: translateY(5px);">
            <div id="ifUserBlocked_Current" style="display: none;">
                <div class="content">
                    <h2 id="whoIsBlocked"> is blocked</h2>
                    <p id="whoIsBlocked_desc"> is blocked. Would you like to view their notes anyway or unblock them?</p>

                    <span><button onclick="document.getElementById('ifUserBlocked_Current').style.display = 'none'" id="showNotesButton">Show Notes</button> <button onclick="unblockUser()" id="unblockUserButton">Unblock</button></span>
                </div>
            </div>

            <div class="newNotesAdded" id="newNotesAdded">
                <!-- Notes go here. This content is user-generated, no default HTML should be here. -->
            </div>
        </div>

        <div class="notes" id="achievementsContent" style="max-width: 100%; margin-left: 0px; transform: translateY(5px); display: none;">
            <div class="note locked" id="firstStepsAchievement">
                <h3><i class="fa-solid fa-pencil"></i> First Steps</h3>
                <p class="description">${format(userData.display, ["html", "emoji"])} hasn't unlocked this achievement yet.</p>
                <p class="unlockDate" style="font-size: 14px; color: var(--text-semi-transparent);"></p>
            </div>

            <div class="note locked" id="expressYourselfAchievement">
                <h3><i class="fa-solid fa-bullhorn"></i> Express Yourself</h3>
                <p class="description">${format(userData.display, ["html", "emoji"])} hasn't unlocked this achievement yet.</p>
                <p class="unlockDate" style="font-size: 14px; color: var(--text-semi-transparent);"></p>
            </div>

            <div class="note locked" id="theSocialButterflyAchievement">
                <h3><i class="fa-solid fa-user-plus"></i> The Social Butterfly</h3>
                <p class="description">${format(userData.display, ["html", "emoji"])} hasn't unlocked this achievement yet.</p>
                <p class="unlockDate" style="font-size: 14px; color: var(--text-semi-transparent);"></p>
            </div>

            <div class="note locked" id="chatterboxAchievement">
                <h3><i class="fa-solid fa-comments"></i> Chatterbox</h3>
                <p class="description">${format(userData.display, ["html", "emoji"])} hasn't unlocked this achievement yet.</p>
                <p class="unlockDate" style="font-size: 14px; color: var(--text-semi-transparent);"></p>
            </div>
        </div>
    `;

    // finally, show info to melissa
    melissaDiv.innerHTML = info.outerHTML;
    // show user badges
    const displayProfile = document.getElementById("display-profile");
    displayProfile.appendChild(badges);
    // is user deceased?
    if (userData.memorialAccount?.isDeceased) {
        const userBio = document.getElementById("bio-profile");

        // show popup
        openDeceasedUserPopup(userData.username);

        // add the remembering text below username
        const rememberingTxt = document.createElement("p");
        rememberingTxt.innerHTML = `${faIcon("dove").outerHTML} Remembering @${userData.username}. <a href="/blog/memorialized-accounts">Learn more about memorial accounts</a>.`;
        rememberingTxt.className = "rememberingUser";
        userBio.parentNode.insertBefore(rememberingTxt, userBio);

        // if they have a linked obituary, link it
        if (userData.memorialAccount.obituary) {
            const rememberingTxt = document.createElement("p");
            rememberingTxt.innerHTML = `${faIcon("book").outerHTML} See @${userData.username}'s obituary <a href="${userData.memorialAccount.obituary}" target="_blank">here</a>.`;
            rememberingTxt.className = "rememberingUser";
            userBio.parentNode.insertBefore(rememberingTxt, userBio);
        }

        // show the user that they cannot interact with this account
        const followButton = document.getElementById("followButton");
        followButton.textContent = "Cannot Unfollow";
        followButton.setAttribute("onclick", "javascript:void(0);");
    }

    // is current user blocked by the other user?
    // if so, just show that they are. server handles actual functionality
    if (userData.requestedUserHasBlocked || currentUserHasBlocked) {
        const notes = document.getElementById("notes");
        const achievements = document.getElementById("achievementsContent");
        const followButton = document.getElementById("followButton");
        const userActions = document.getElementById("userActions");
        const filterAchievements = document.getElementById("filterAchievements");
        const filterNotes = document.getElementById("filterNotes");

        // text needs to change per instance
        let blockedString;
        let blockedDetailsString;
        if (userData.requestedUserHasBlocked) {
            blockedString = "blocked you.";
            blockedDetailsString = "You cannot see their notes or interact with them.";
        } else if (currentUserHasBlocked) {
            blockedString = "is blocked."
            blockedDetailsString = "You cannot see their notes or interact with them until you unblock them.";
        }
        
        // change the html of notes
        notes.innerHTML = `
            <div class="blocked">
                <h2>${format(userData.display, ["emoji", "html"])} ${blockedString}</h2>
                <p>${blockedDetailsString}</p>
            </div>
        `;
        // remove other unnecessary elements in a blocked state
        achievements.remove();
        followButton.remove();
        userActions.style.marginLeft = "15px";
        filterAchievements.remove();
        filterNotes.remove();
    }

    // does user have achievements?
    if (userData.achievements?.transsocial?.firstSteps)
        renderAchievementUnlocked(
            "firstStepsAchievement",
            userData.achievements?.transsocial?.firstSteps,
            "Every journey begins with a single step... or in this case, a single note."
        );
    if (userData.achievements?.transsocial?.expressYourself)
        renderAchievementUnlocked(
            "expressYourselfAchievement", 
            userData.achievements?.transsocial?.expressYourself,
            "Sharing is caring, and you just shared your first note!"
        );
    if (userData.achievements?.transsocial?.theSocialButterfly)
        renderAchievementUnlocked(
            "theSocialButterflyAchievement", 
            userData.achievements?.transsocial?.theSocialButterfly,
            "You've spread your wings! Your first follow is in the books!"
        );
    if (userData.achievements?.transsocial?.chatterbox)
        renderAchievementUnlocked(
            "chatterboxAchievement", 
            userData.achievements?.transsocial?.chatterbox,
            "From silence to words. Your first reply has been made!"
        );

    // add event listener to user actions button
    const userActionsBtn = document.getElementById("userActions");
    userActionsBtn.onclick = () => userActions(user, userData, currentUserHasBlocked);

    // TODO: migrate following and unfollowing to server
    // then you're done! yippee.
}

// show achievement
function renderAchievementUnlocked(element, achievement, description) {
    const elementDiv = document.getElementById(element);
    if (!elementDiv || !element) return;

    // remove the opaque look from the note
    elementDiv.classList.remove("locked");
    
    // then, change the elements description & date
    const aDescription = elementDiv.querySelector(".description");
    const unlockDate = elementDiv.querySelector(".unlockDate");

    aDescription.textContent = description;
    unlockDate.textContent = `Unlocked ${achievement.unlockedWhen}`;
}

// test
if (pathName.startsWith("/u/")) {
    // get username then call function
    const username = pathName.split("/")[2];
    if (username)
        renderUPage(username, "username");
}