import { getNoteData } from "../methods/getNoteData.js";
import { getUserData } from "../methods/getUserData.js";
import { loveNote } from "../methods/loveNote";
import { renoteNote } from "../methods/renoteNote";
import { loadNotes } from "../notes/getNotes.js";
import { format } from "../text/format.js";
import { timeAgo } from "../ui/timeAgo.js";
import { currentUserData } from "../users/current";
import { faIcon } from "../utils/faIcon.js";
import { storageLink } from "../utils/storageLink.js";

export default async function notePage(params) {
    const el = document.createElement("div");

    // get note data
    const noteData = await getNoteData(params.id);

    // then user data
    const userData = await getUserData(noteData.whoSentIt, "uid");

    // then current users data
    const currentUsersData = await currentUserData();

    if (!noteData || !userData) {
        console.error(":(");
    }

    console.log(noteData);
    console.log(userData);

    // load replies (if any)
    loadNotes();

    // user text
    let usernameString = `@${userData.username}`
    if (userData.pronouns)
        usernameString += ` • ${userData.pronouns}`;

    // track interactions
    let loveCount = noteData.likes || 0;
    let renoteCount = noteData.renotes || 0;
    let replyCount = noteData.replies || 0;

    // get the whats on your mind string
    let whatsOnYourMindString = currentUsersData ? `Join the conversation, ${format(currentUsersData.display, ["html", "emoji"])}!` : "Join the conversation!";

    // add any media
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "mediaContainer";
    if (noteData.image) {
        // TODO: allow clicking to zoom
        let mediaEl;
        // get type
        const src = noteData.image;
        const fileType = src.split(".").pop().toLowerCase();
        if (fileType === "mp4") {
            mediaEl = document.createElement("video");
            mediaEl.controls = true;
            if (currentUsersData)
                mediaEl.autoplay = currentUsersData?.autoplayVideos;
            mediaEl.muted = true;
        } else if (fileType === "mp3") {
            mediaEl = document.createElement("audio");
            mediaEl.controls = true;
        } else {
            mediaEl = document.createElement("img");
            mediaEl.draggable = false;
        }

        mediaEl.src = noteData.image;
        
        mediaContainer.appendChild(mediaEl);
    }

    // render
    el.innerHTML = `
        <div class="noteView">
            <div class="noteHeader">
                <div class="pfpContainer">
                    <img class="pfp" draggable="false" src="${storageLink(`images/pfp/${userData.uid}/${userData.pfp}`)}" />
                </div>
                <div class="displayContainer">
                    <a href="/u/${userData.username}" class="displayName">${format(userData.display, ["html", "emoji"])}</a>
                    <a href="/u/${userData.username}" class="username">${usernameString}</a>
                </div>
            </div>
            <div class="noteContainer">
                <p>${format(noteData.text)}</p>
                ${mediaContainer.outerHTML}
            </div>
            <div class="additionalInfo">
                <p class="timeSent description">${timeAgo(noteData.createdAt, "verbose")} • Sent from Earth</p>
            </div>

            <div class="divider"></div>

            <div class="noteInteractions">
                <!-- love -->
                <span class="love">
                    <span class="icon">
                        ${faIcon("solid", "heart").outerHTML}
                    </span>
                    <span class="loveCount">
                        ${loveCount}
                    </span>
                </span>
                <!-- renote -->
                <span class="renote">
                    <span class="icon">
                        ${faIcon("solid", "retweet").outerHTML}
                    </span>
                    <span class="renoteCount">
                        ${renoteCount}
                    </span>
                </span>
                <!-- replies -->
                <span class="replies">
                    <span class="icon">
                        ${faIcon("solid", "comment").outerHTML}
                    </span>
                    <span class="replyCount">
                        ${replyCount}
                    </span>
                </span>
                <!-- quote renote -->
                <span class="quoteRenote">
                    <span class="icon">
                        ${faIcon("solid", "quote-left").outerHTML}
                    </span>
                </span>
                <!-- favorite -->
                <span class="favorite">
                    <span class="icon">
                        ${faIcon("solid", "bookmark").outerHTML}
                    </span>
                </span>
            </div>

            <div class="divider"></div>
        </div>

        <div class="sendNoteQuick">
            ${whatsOnYourMindString}
        </div>
        <div id="notes" class="reversed"></div>
    `;

    // set title
    if (noteData.text)
        document.title = `${userData.display} on Auride: "${noteData.text}"`;
    else
        document.title = `${userData.display} uploaded media on Auride`;

    // get the love element and add an onclick 
    const loveCountEl = el.querySelector(".loveCount");
    const loveEl = el.querySelector(".love");
    let hasUserLoved = false;
    // if user has loved, mark as active off the bat
    if (currentUsersData && noteData.whoLiked && noteData.whoLiked[currentUsersData.uid]) {
        hasUserLoved = true;
        loveEl.classList.add("active");
    }
    loveEl.onclick = () => {
        // helper function to update the element
        if (!currentUsersData)
            return;

        function updateElement() {
            if (hasUserLoved) {
                loveCount--;
                loveEl.classList.remove("active");
                hasUserLoved = false;
            } else {
                loveCount++;
                loveEl.classList.add("active");
                hasUserLoved = true;
            }
        }
        updateElement();

        // update text
        loveCountEl.textContent = loveCount;

        // then, 
        loveNote(noteData.id).catch((err) => {
            updateElement();
        });
    };
    const renoteCountEl = el.querySelector(".renoteCount");
    const renoteEl = el.querySelector(".renote");
    let hasUserRenoted = false;
    // if user has renoted, mark as active off the bat
    if (currentUsersData && noteData.whoRenoted && noteData.whoRenoted[currentUsersData.uid]) {
        hasUserRenoted = true;
        renoteEl.classList.add("active");
    }
    renoteEl.onclick = () => {
        // helper function to update the element
        function updateElement() {
            if (hasUserRenoted) {
                renoteCount--;
                renoteEl.classList.remove("active");
                hasUserRenoted = false;
            } else {
                renoteCount++;
                renoteEl.classList.add("active");
                hasUserRenoted = true;
            }
        }
        updateElement();

        // update text
        renoteCountEl.textContent = renoteCount;

        // then, 
        renoteNote(noteData.id).catch((err) => {
            updateElement();
        });
    };

    // TODO: add favorites
    // TODO: add quote renoting

    return el;
}