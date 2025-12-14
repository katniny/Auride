import { db, auth } from "../firebase/config.js";
import { storageLink } from "../utils/storageLink.js";
import { mediaObserver } from "../ui/mediaObserver.js";
import { format } from "../text/format.js";
import { faIcon } from "../utils/faIcon.js";
import { timeAgo } from "../ui/timeAgo.js";
import { navigate } from "../router.js";
import { currentUserData, userData } from "../users/current.js";
import { getUserData } from "../methods/getUserData.js";
import { getNoteData } from "../methods/getNoteData.js";

const pathName = window.location.pathname;

// determine how to render the "username" segment
// e.g., "@katniny • she/her • 6h"
function renderUsername(username, pronouns, time) {
    const displayDate = timeAgo(time);
    if (pronouns)
        return `@${username} • ${pronouns} • ${displayDate}`;
    else
        return `@${username} • ${displayDate}`;
}

// when requested, render how nsfw/sensitive/political should
async function renderWarning(noteId, flagType, legacyPref, modernPrefs) {
    const cover = document.createElement("div");
    cover.className = "contentWarning";
    cover.id = `${noteId}-blur`;

    // if user doesnt have any prefs, we return false by default
    if (!modernPrefs) return false;

    // map all flag types to their respective preference key, description, and label
    const flags = {
        adultContent: [modernPrefs.adultContent, adultContentDescription, "Flagged as Adult Content"],
        sexuallySuggestive: [modernPrefs.sexuallySuggestive, sexuallySuggestiveDescription, "Flagged as Sexually Suggestive"],
        nonSexualNudity: [modernPrefs.nonSexualNudity, nonSexualNudityDescription, "Flagged as Non-Sexual Nudity"],
        fetishContent: [modernPrefs.fetishContent, fetishContentDescription, "Flagged as Fetish Content"],
        erotica: [modernPrefs.erotica, eroticWritingsDescription, "Flagged as Erotic Writing"],
        graphicViolence: [modernPrefs.graphicViolence, graphicViolenceDescription, "Flagged as Graphic Violence"],
        horrorImagery: [modernPrefs.horrorImagery, horrorImageryDescription, "Flagged as Horror Imagery"],
        abuseTraumaMentions: [modernPrefs.abuseTraumaMentions, abuseTraumaMentionsDescription, "Flagged as Abuse/Trauma Mentions"],
        selfHarmSuicideMentions: [modernPrefs.selfHarmSuicideMentions, selfHarmSuicideMentionsDescription, "Flagged as Self-Harm/Suicide Mentions"],
        drugUse: [modernPrefs.drugUse, drugUseDescription, "Flagged as Drug Use"],
        flashSeizureRisk: [modernPrefs.flashSeizureRisk, flashSeizureDescription, "Flagged as Flash/Seizure Risk"],
        politicalDiscussion: [modernPrefs.politicalDiscussion, politicalDiscussionDescription, "Flagged as Political Discussion"],
        warNConflict: [modernPrefs.warNConflict, warAndConflictDescription, "Flagged as War and Conflict"],
        identityDebates: [modernPrefs.identityDebates, identityDebatesDescription, "Flagged as Identity Debates"],
        conspiracyTheories: [modernPrefs.conspiracyTheories, conspiracyTheoriesDescription, "Flagged as Conspiracy Theories"],
        newsMedia: [modernPrefs.newsMedia, newsMediaDescription, "Flagged as News Media"]
    };

    const flagInfo = flags[flagType];
    if (!flagInfo) return false;

    const [prefSetting, warningText, flagText] = flagInfo;

    // handle preference logic
    if (prefSetting === "Show") return true;
    if (prefSetting !== "Blur") return false;

    cover.innerHTML = `
        <p class="warningInfo" id="${noteId}-warningInfo">${warningText}</p>
        <button class="closeWarning" id="${noteId}-closeWarning" onclick="removeNsfw('${noteId}-closeWarning')">View Note</button>
        <p class="contentWarning-showBelowText">${faIcon("solid", "flag").outerHTML} ${flagText}</p>
    `;

    return cover;
}

// render the note itself
export async function renderNote(noteData) {
    // if the note id is empty, return -- the note doesnt exist or is invalid
    if (noteData.id === undefined || noteData.id === null) return;
    // or if there just isnt noteData
    if (!noteData) return;

    // get current users data
    const currentUsersData = await currentUserData();

    // valid types for interaction (types like loving/renoting)
    const noteInteractions = [
        {
            key: "like",
            icon: "heart",
            count: noteData.likes,
            userList: noteData.whoLiked,
            activeClass: "liked"
        },
        {
            key: "renote",
            icon: "retweet",
            count: noteData.renotes,
            userList: noteData.whoRenoted,
            activeClass: "renoted"
        }
    ]

    // if loading icon, remove it
    const noteLoadingIndicator = document.getElementById("noteLoadingIndicator");
    if (noteLoadingIndicator)
        noteLoadingIndicator.remove();

    // create the note div
    const noteDiv =  document.createElement("div");
    noteDiv.className = "note";
    noteDiv.id = noteData.id;

    // get current user data
    const user = auth.currentUser;
    const currentUser = currentUsersData;

    // is the note nsfw/sensitive/political?
    // if so, what are the user prefs?
    let cover;
    if (noteData.isNsfw && noteData.isNsfw !== "noNsfwContent") {
        if (currentUser)
            cover = await renderWarning(noteData.id, noteData.isNsfw, currentUser.showNsfw, currentUser.flagPrefs);
        else
            return; // just dont show to signed out users
    } else if (noteData.isSensitive && noteData.isSensitive !== "noSensitiveContent") {
        if (currentUser)
            cover = await renderWarning(noteData.id, noteData.isSensitive, currentUser.showSensitive, currentUser.flagPrefs);
        else
            return; // just dont show to signed out users
    } else if (noteData.isPolitical && noteData.isPolitical !== "noPoliticalContent") {
        if (currentUser)
            cover = await renderWarning(noteData.id, noteData.isPolitical, currentUser.showPolitics, currentUser.flagPrefs);
        else
            return; // just dont show to signed out users
    }

    // did renderWarning() return false? if so, return
    if (cover === false)
        return;
    // if the cover isnt false but isnt true either,
    // we can assume its the returned html
    if (cover instanceof Node)
        noteDiv.appendChild(cover);

    // get the note senders data
    const noteSender = await getUserData(noteData.whoSentIt, "uid");
    if (!noteSender || !noteSender.display || !noteSender.username || !noteSender.pfp)
        // TODO: add default user data
        // ^ should be a lot easier now!
        return;

    // if on /u/, did they renote it?
    // we need to get the username from the url: /u/{username}
    if (pathName.startsWith("/u/")) {
        const getUsername = pathName.split("/")[2];
        // get their uid
        getUserData(getUsername, "username").once((data) => {
            if (noteData.whoSentIt !== data.uid) {
                const formattedUsername = format(getUsername, ["html", "emoji"]);

                // create text
                const renotedText = document.createElement("p");
                renotedText.classList.add("userRenoted");
                renotedText.innerHTML = `${faIcon("solid", "retweet").outerHTML} ${formattedUsername} renoted`;
                noteDiv.insertBefore(renotedText, userPfp);
            }
        });
    }

    // create pfp for user
    const userPfp = document.createElement("img");
    userPfp.className = "notePfp";
    userPfp.src = storageLink(`images/pfp/${noteData.whoSentIt}/${noteSender.pfp}`);
    userPfp.draggable = false;
    userPfp.loading = "lazy";
    noteDiv.appendChild(userPfp);
    mediaObserver.observe(userPfp);

    // create display name for user
    const displayName = document.createElement("a");
    displayName.className = "noteDisplay";
    displayName.innerHTML = format(noteSender.display, ["html", "emoji"]);
    displayName.href = `/u/${noteSender.username}`;

    // create badges to add to the display name, if they exist
    const badges = document.createElement("span");
    badges.className = "noteBadges";
    if (noteSender.isVerified) badges.appendChild(faIcon("solid", "circle-check", "", "sm"));
    if (noteSender.isSubscribed) badges.appendChild(faIcon("solid", "heart", "", "sm"));
    if (noteSender.activeContributor) badges.appendChild(faIcon("solid", "handshake-angle", "", "sm"));

    // if badges, append to display name, then show display name
    if (badges.innerHTML) displayName.appendChild(badges);
    noteDiv.appendChild(displayName);

    // TODO: we should not need a line break to seperate display name and username
    noteDiv.appendChild(document.createElement("br"));

    // create username for user
    const username = document.createElement("a");
    username.classList.add("noteUsername");
    username.textContent = renderUsername(noteSender.username, noteSender.pronouns, noteData.createdAt);
    username.href = `/u/${noteSender.username}`;
    noteDiv.appendChild(username);

    // create text to show in the note
    const text = document.createElement("p");
    text.innerHTML = format(noteData.text);
    text.className = "noteText";
    if (!noteData.replyingTo) // if not replying to a note, allow redirection
        text.addEventListener("click", function () { navigate(`/note/${noteData.id}`) });
    noteDiv.appendChild(text);

    // render note media
    if (noteData.image) {
        // get the file type
        let ext = noteData.image.split(".").pop();
        const isVideo = ext.split("?")[0] === "mp4";
        const isAudio = ext.split("?")[0] === "mp3";

        // create element based on type, then add attributes
        const media = document.createElement(isVideo ? "video" : (isAudio ? "audio" : "img"));
        media.className = "uploadedImg";
        media.src = noteData.image;
        media.alt = noteData.alt;
        media.loading = "lazy";

        // hide by default (it'll get shown when in view)
        media.style.visibility = "hidden";
        media.style.opacity = "0";

        if (isVideo || isAudio) {
            // add controls to video/audio
            media.controls = true;
            media.muted = true;
            media.loop = true;
            media.autoplay = currentUsersData?.autoplayVideos;
        } else {
            // else, its an image
            // TODO: maybe make this a function so we can use it in a few places?
            media.draggable = false;
            media.onclick = () => {
                // create modal elements
                const modal = document.createElement("div");
                const modalImg = document.createElement("img");

                // style modal
                Object.assign(modal.style, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    cursor: "zoom-out"
                });

                Object.assign(modalImg.style, {
                    maxWidth: "90%",
                    maxHeight: "90%",
                    borderRadius: "8px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)"
                });

                modalImg.src = media.src;

                // close modal on click
                modal.onclick = () => {
                    document.body.removeChild(modal);
                };

                modal.appendChild(modalImg);
                document.body.appendChild(modal);
            }
        }

        // if note has music, render spotify iframe
        if (noteData.music) {
            const embed = document.createElement("iframe");
            embed.src = `https://open.spotify.com/embed/track/${noteData.music}`;
            embed.allow = "encrypted-media";
            embed.allowTransparency = true;

            // then add to note
            noteDiv.appendChild(embed);
        }

        // then append to note div
        noteDiv.appendChild(media);
        mediaObserver.observe(media);
    }

    // if quote renoting, show the quoted note
    if (noteData.quoting) {
        const container = document.createElement("div");
        container.className = "quoteContainer";
        container.addEventListener("click", function () { navigate(`/note/${noteData.quoting}`) });

        // create pfp
        const quotePfp = document.createElement("img");
        quotePfp.className = "quotePfp";
        quotePfp.draggable = false;

        // header
        const quoteHeader = document.createElement("div");
        quoteHeader.className = "quoteHeader";

        // user display/username
        const quoteDisplay = document.createElement("span");
        quoteDisplay.className = "quoteDisplay";
        const quoteUsername = document.createElement("span");
        quoteUsername.className = "quoteUsername";

        // text content
        const quoteContent = document.createElement("div");
        quoteContent.className = "quoteContent";
        const quoteText = document.createElement("span");
        quoteText.className = "quoteText";

        quoteContent.appendChild(quoteHeader);
        quoteHeader.appendChild(quoteDisplay);
        quoteHeader.appendChild(quoteUsername);

        try {
            // get note and user data
            const quoteData = await getNoteData(noteData.quoting);
            const quoteUserData = await getUserData(quoteData.whoSentIt, "uid");

            // set pfp, display, and username
            quotePfp.src = storageLink(`images/pfp/${quoteUserData.uid}/${quoteUserData.pfp}`);
            quoteDisplay.textContent = quoteUserData.display;
            quoteUsername.textContent = renderUsername(quoteUserData.username, quoteUserData.pronouns, quoteData.createdAt);

            // format and set text
            let content = format(quoteData.text);
            if (content.length > 247)
                content = content.substring(0, 247) + "...";
            quoteText.innerHTML = content;
        } catch (error) {
            // if error, set default data
            quotePfp.src = "/assets/imgs/defaultPfp.png";
            quoteDisplay.textContent = "Deleted User";
            quoteUsername.textContent = "@ghost";
            quoteText.textContent = "Failed to load note. This note may be deleted.";
        }

        quoteContent.appendChild(quoteText);
        container.appendChild(quotePfp);
        container.appendChild(quoteContent);
        noteDiv.appendChild(container);
    }

    // if user wants larger note buttons (e.g., easier interaction on mobile),
    // enable it for them
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("buttonRow");
    if (currentUser?.experiments?.noteButtonLayout)
        buttonRow.classList.add("buttonRowExperiment");

    // show good actions
    noteInteractions.forEach(interaction => {
        // create the interaction button with appropriate values
        const btn = document.createElement("p");
        btn.classList.add(`${interaction.key}Btn`);
        btn.id = `${interaction.key}-${noteData.id}`;

        // get the count
        const count = interaction.count || 0;
        btn.innerHTML = `${faIcon("solid", interaction.icon).outerHTML} ${count}`;

        // did user interact?
        if (user && interaction.userList && interaction.userList[user.uid])
            btn.classList.add(interaction.activeClass);

        // append
        buttonRow.appendChild(btn);
    });

    // get replies
    const replyBtn = document.createElement("p");
    replyBtn.className = "replyBtn";

    const replyCount = noteData.replies || 0; // get count
    replyBtn.innerHTML = `${faIcon("solid", "comment").outerHTML} ${replyCount}`; // set count

    // if on note, @ user
    // else, take user to note
    if (!pathName.startsWith("/note"))
        replyBtn.addEventListener("click", function () { navigate(`/note/${noteData.id}`) });
    else 
        replyBtn.addEventListener("click", function () { replyToNote(replyBtn) });
    buttonRow.appendChild(replyBtn);

    // allow quote renoting
    const quoteBtn = document.createElement("p");
    quoteBtn.className = "quoteRenoteBtn";
    quoteBtn.appendChild(faIcon("solid", "quote-left"));
    quoteBtn.addEventListener("click", function () { quoteRenote(noteData.id); });
    buttonRow.appendChild(quoteBtn);

    // add favorite button
    const favoriteBtn = document.createElement("p");
    favoriteBtn.classList.add("favoriteBtn");
    const favIcon = faIcon("solid", "bookmark", "", "xs");
    favIcon.id = `favorite-${noteData.id}`;
    if (user) {
        // add to users favorites
        // TODO: once working on note interactions, put this on the server!
        db.ref(`users/${user.uid}/favorites/${noteData.id}`).once("value", snapshot => {
            if (snapshot.exists())
                favIcon.style.color = "var(--main-color)";
        });
    }
    favoriteBtn.appendChild(favIcon);
    favoriteBtn.addEventListener("click", function () { favorite(noteData.id); });
    buttonRow.appendChild(favoriteBtn);

    noteDiv.appendChild(buttonRow);

    // the more menu is now by the display name!
    const moreMenu = document.createElement("div");
    moreMenu.appendChild(faIcon("solid", "ellipsis"));
    moreMenu.classList.add("noteMoreMenu");
    username.parentNode.insertBefore(moreMenu, username);

    // create the submenu to show when "more" is clicked
    const moreSubMenu = document.createElement("div");
    if (user && user.uid === noteData.whoSentIt)
        moreSubMenu.innerHTML = `
            <button onclick="createEditNoteUI('${noteData.id}');">${faIcon("solid", "pen-to-square").outerHTML} Edit Note</button>
            <button class="danger" onclick="createDeleteNoteUI('${noteData.id}')">${faIcon("solid", "trash").outerHTML} Delete Note</button>
        `;
    else
        moreSubMenu.innerHTML = `
            ${faIcon("solid", "circle-info").outerHTML} No interactions are currently available.
        `;
    moreSubMenu.classList.add("noteMoreSubMenu");
    noteDiv.appendChild(moreSubMenu);

    moreSubMenu.tabIndex = -1;
    // is the menu open? if so, hide it
    // else, show and focus
    moreMenu.onclick = () => {
        if (moreSubMenu.classList.contains("open")) {
            moreSubMenu.classList.remove("open");
        } else {
            moreSubMenu.classList.add("open");
            moreSubMenu.focus();
        }
    };

    // if not focused on menu, close
    moreSubMenu.addEventListener("focusout", (e) => {
        // check if focus went outside the submenu
        if (!moreSubMenu.contains(e.relatedTarget))
            moreSubMenu.classList.remove("open");
    });

    // assuming all goes well, return the note div
    return noteDiv;
}