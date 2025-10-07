import { renotingNote } from "../ts_fas_acih";
import { isTextareaEmpty } from "./textAreaEmpty";
import { isReplying_notehtml } from "../ts_fas_acih";
import { pathName } from "../pathName";

let pickedMusic = null;

const modal = `
    <div class="creatingStuff">
        <!-- Display above everything else when a note is sending -->
        <div class="coverCreateANote" id="coverCreateANote" style="display: none;"></div>

        <!-- Main Tab -->
        <div class="mainTab-noteCreation" id="mainTab-noteCreation">
            <h2 style="float: right; opacity: 0; cursor: default;" id="replyingOrCreating">Create a Note!</h2> <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeCreateNotePopup()"></i>
            <textarea rows="0" placeholder="What's on your mind?" id="noteContent-textarea"></textarea>
            <p id="characterLimit_note" style="color: var(--text-semi-transparent)">0/1,250</p>

            <br />

            <p id="uploadingImage" style="color: var(--success-color); display: none;">Uploading image...</p>
            <button onclick="publishNote()" class="publishNoteBtn"><i class="fa-solid fa-pen-to-square"></i> Create!</button>

            <br />

            <img id="imgToBeUploaded" draggable="false" />
            <video id="vidToBeUploaded" draggable="false" autoplay="true" muted="true" controls style="display: none;"></video>
            <audio id="audioToBeUploaded" autoplay="true" muted="true" controls style="display: none;"></audio>

            <br />
            <br />

            <div id="quotingNote">
                <div class="quoteContainer">
                    <img src="" alt="Quote user pfp" class="quotePfp" id="notePopupQuotePfp">
                    <div class="quoteContent">
                    <div class="quoteHeader">
                        <span class="quoteDisplay" id="notePopupQuoteDisplay"></span>
                        <span class="quoteUsername" id="notePopupQuoteUsername"></span>
                    </div>
                    <span class="quoteText" id="notePopupQuoteText"></span>
                </div>
            </div>
        </div>

        <p style="font-size: small; color: var(--text-semi-transparent); display: none; transform: translateY(-10px);" id="hasntBeenUploadedNotice">Your media hasn't been uploaded to Auride's server yet. This is just a preview.</p>
        <a href="javascript:void(0);" style="display: none; float: left; max-width: auto; transform: translateY(-10px);" id="removeUploadedImage" onclick="removeImage()">Remove Media</a> <a href="javascript:void(0);" style="display: none; float: left; max-width: auto; transform: translateY(-10px); margin-left: 7px;" id="addAltTextToImage" onclick="addAltText()">Add Alt Text</a>
        <p id="noteError"></p>

        <br />
    </div>

    <!-- Settings Tab -->
    <div class="settingsStuff hidden" id="settingStuff">
        <i class="fa-solid fa-arrow-left fa-lg" style="float: left; margin-top: 10px;" onclick="swapNoteTab('note')"></i>

        <br />

        <h2 style="margin-top: 10px;">Add a content warning</h2> 
        <p style="font-size: 14px; color: var(--text-semi-transparent);">Add a content warning to this note by selecting a category. This helps people see only the content they want to on Auride.</p>

        <!-- NSFW Dropdown -->
        <span class="noteContainsNsfwContent">Does your note contain NSFW content?</span> 
        <select id="nsfwDropdown">
            <option value="noNsfwContent">None</option>
            <option value="adultContent">Adult Content</option>
            <option value="sexuallySuggestive">Sexually Suggestive</option>
            <option value="nonSexualNudity">Non-Sexual Nudity</option>
            <option value="fetishContent">Fetish Content</option>
            <option value="erotica">Erotic Writings</option>
        </select> 
        <p class="optionAlt">This may include adult material, explicit nudity, sexual themes, or other mature content. <a href="/blog/nsfw-flags">Learn more about these flags</a>.</p>

        <!-- Sensitive Content Dropdown -->
        Does your note contain sensitive content?
        <select id="sensitiveDropdown">
            <option value="noSensitiveContent">None</option>
            <option value="graphicViolence">Graphic Violence</option>
            <option value="horrorImagery">Horror Imagery</option>
            <option value="abuseTraumaMentions">Abuse/Trauma Mentions</option>
            <option value="selfHarmSuicideMentions">Self-Harm/Suicide Mentions</option>
            <option value="drugUse">Drug Use</option>
            <option value="flashSeizureRisk">Flash-Seizure Risk</option>
        </select> 
        <p class="optionAlt">This may include violence, trauma, abuse, or other potentially triggering material. <a href="/blog/sensitive-flags">Learn more about these flags</a>.</p>

        <!-- Political Dropdown -->
        Does your note have political content?
        <select id="politicalDropdown">
            <option value="noPoliticalContent">None</option>
            <option value="politicalDiscussion">Political Discussion</option>
            <option value="warNConflict">War & Conflict</option>
            <option value="identityDebates">Identify Debates</option>
            <option value="conspiracyTheories">Conspiracy Theories</option>
            <option value="newsMedia">News Media</option>
        </select> 
        <p class="optionAlt">This may include political discussions, debates, or sensitive topics related to current events, war, or ideologies. <a href="/blog/political-flags">Learn more about these flags</a>.</p>

        <br />
    </div>

    <!-- music tab, lets gooooo -->
    <div class="hidden" id="musicTab">
        <i class="fa-solid fa-arrow-left fa-lg" style="float: left; margin-top: 10px;" onclick="swapNoteTab('note')"></i>
         
        <br />

        <h2 style="margin-top: 10px;">Add music to your note</h2>
        <p style="font-size: 14px; color: var(--text-semi-transparent);">Suggest music to people, or just make your note feel more lively!</p>

        <input type="text" placeholder="Search for a song" id="songQuery" />
        <button onclick="displayTracks(document.getElementById('songQuery').value)">Search</button>

        <br />

        <div id="spotifyPlayer">
            <p>Try searching for a song!</p>
        </div>

        <br />
    </div>

    <!-- Settings -->
    <div class="settingsIcons-noteCreation">
        <div class="icons">
            <i class="fa-solid fa-flag fa-lg" onclick="swapNoteTab('note')"></i> <i class="fa-solid fa-image fa-lg" onclick="uploadImage()"><input type="file" id="imageUploadInput" accept="image/png, image/jpeg, image/webp, video/mp4, image/gif, audio/mp3" style="display: none;"></i> <i class="fa-solid fa-music fa-lg" onclick="swapNoteTab('music')"></i>
        </div>
    </div>
`;

// show the modal when requested
export function createNotePopup() {
    // append and put the content inside the modal
    const notePopup = document.createElement("dialog");
    notePopup.setAttribute("id", "createNote-popup");
    notePopup.innerHTML = modal;
    document.body.appendChild(notePopup);

    // make sure the main tab is shown
    document.getElementById("mainTab-noteCreation").classList.remove("hidden");
    document.querySelector(".settingsStuff").classList.add("hidden");
    document.getElementById("musicTab").classList.add("hidden");

    // finally, show modal.
    notePopup.showModal();

    // show character limit
    document.getElementById("noteContent-textarea").addEventListener('input', () => {
        const currentLength = document.getElementById("noteContent-textarea").value.length;
 
        if (currentLength > 1250) {
            document.getElementById("noteContent-textarea").value = document.getElementById("noteContent-textarea").value.substring(0, 1250);
        }
 
        document.getElementById("characterLimit_note").textContent = `${currentLength}/1,250`;
    });

    // if the user is renoting another note, show the note!
    // quality of life ^-^
    if (renotingNote === null) {
        document.getElementById("quotingNote").style.display = "none";
    } else {
        document.getElementById("quotingNote").style.display = "block";

        firebase.database().ref(`notes/${renotingNote}`).once("value", (snapshot) => {
            const noteData = snapshot.val();

            firebase.database().ref(`users/${noteData.whoSentIt}`).once("value", (snapshot) => {
                const userData = snapshot.val();

                document.getElementById("notePopupQuotePfp").src = storageLink(`images/pfp/${noteData.whoSentIt}/${userData.pfp}`);
                document.getElementById("notePopupQuoteDisplay").textContent = userData.display;
                document.getElementById("notePopupQuoteUsername").textContent = `@${userData.username}`;
                document.getElementById("notePopupQuoteText").textContent = noteData.text;
            })
        })
    }
}

export function closeCreateNotePopup() {
    const notePopup = document.getElementById("createNote-popup");

    if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
        isReplying_notehtml = false;
    }
    renotingNote = null;
    pickedMusic = null;

    notePopup.close();
    setTimeout(() => {
        notePopup.remove();
    }, 500);
}

// listen for Ctrl + Enter shortcut
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter" && document.getElementById("createNote-popup"))
        publishNote();
});

// publish note
export async function publishNote() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const coverCreateANote = document.getElementById("coverCreateANote");
   
        // make sure ones not actively sending
        if (coverCreateANote.style.display !== "none") return;

        if (user) {
            coverCreateANote.style.display = "block";

            const notesRef = firebase.database().ref("notes");
            const userNotes = firebase.database().ref(`users/${user.uid}/posts`);
            const newNoteKey = notesRef.push().key;
            let isNotFlaggedNsfwButShouldBe = null;

            const noteContent = document.getElementById("noteContent-textarea").value;

            const imageUploadInput = document.getElementById("imageUploadInput");
            const file = imageUploadInput.files[0];

            if (isTextareaEmpty(noteContent) && !file) {
                document.getElementById("noteError").textContent = "You can't create notes without content! Try adding an image, text or both!";
                coverCreateANote.style.display = "none";
            }

            try {
                const response = await fetch("/nsfw_words.json");
                if (!response.ok) {
                    throw new Error("Network response not okay. Please check your internet connection.");
                }

                const nsfwWords = await response.json();

                const nsfwPattern = new RegExp(`\\b(${nsfwWords.join("|")})\\b`, "i"); 

                if (nsfwPattern.test(noteContent.toLowerCase()) && document.getElementById("nsfwDropdown").value === "noNsfwContent") {
                    const bad = document.createElement("dialog");
                    const h1 = document.createElement("h1");
                    const info = document.createElement("p");
                    const close = document.createElement("button");

                    h1.textContent = "Unflagged NSFW Detected";
                    info.innerHTML = "We detected NSFW content, but you have not flagged it. We allow NSFW as long as <br/>1) You aren't being a creep <br/>2) You flag it correctly<br/>To post this, please click the flag on the bottom of the note creation popup, check the NSFW checkbox, then try posting it again.<br/><br/>Attempting to circumvent this is a serious violation of our <a href='/policies/terms'>Terms of Service</a> and <a href='/policies/child-safety'>Child Safety</a> policies, and WILL get you permanently suspended without appeal.<br/><br/>If you believe this flag was an error, please let us know by creating a note.";
                    close.textContent = "Okay";

                    close.onclick = () => {
                        bad.close();

                        setTimeout(() => {
                            bad.delete();
                        }, 100);
                    }

                    bad.appendChild(h1);
                    bad.appendChild(info);
                    bad.appendChild(close);
                    document.body.appendChild(bad);
                    bad.showModal();

                    coverCreateANote.style.display = "none";
                    return;
                }
            } catch (error) { 
                document.getElementById("noteError").textContent = error;
                coverCreateANote.style.display = "none";
                return;
            }

            const renoteData = {
                isRenote: false,
            }

            const postData = {
                text: noteContent,
                whoSentIt: user.uid,
                id: newNoteKey,
                likes: 0,
                renotes: 0,
                replies: 0,
                isNsfw: document.getElementById("nsfwDropdown").value,
                isSensitive: document.getElementById("sensitiveDropdown").value,
                isPolitical: document.getElementById("politicalDropdown").value,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                alt: document.getElementById("altText_input").value
            }

            const usernameRegex = /@(\w+)/g;
            const matches = [...noteContent.matchAll(usernameRegex)];
            if (matches.length > 0) {
                const usernames = matches.map(match => match[1]);
                usernames.forEach(username => {
                const user = firebase.auth().currentUser;

                // check if it's a username
                firebase.database().ref(`taken-usernames/${username}`).once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        const userId = snapshot.val();

                        sendNotification(userId.user, {
                            type: "Mention",
                            who: user.uid,
                            postId: newNoteKey,
                        });
                    }
                });
                })
            }

            if (renotingNote !== null) {
                postData.quoting = renotingNote;
            }

            if (pickedMusic !== null) {
                postData.music = pickedMusic;
            }

            if (isReplying_notehtml === true) {
                unlockAchievement("Chatterbox");

                if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
                // send notification
                postData.replyingTo = uniNoteId_notehtml;

                firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                    const replyData = snapshot.val();

                    if (user.uid !== replyData.whoSentIt)
                        sendNotification(replyData.whoSentIt, {
                            type: "Reply",
                            who: user.uid,
                            postId: uniNoteId_notehtml,
                        });

                    if (replyData.replies === undefined) {
                        firebase.database().ref(`notes/${uniNoteId_notehtml}`).update({
                            replies: 1
                        });
                    } else {
                        firebase.database().ref(`notes/${uniNoteId_notehtml}`).update({
                            replies: replyData.replies + 1
                        });

                        loveCountRef.off();
                    }
                });

                // then, make note div
                const newNote = document.createElement("div");
                newNote.innerHTML = `
                    <img class="notePfp" draggable="false" loading="lazy" style="visibility: visible; opacity: 1;" src="${document.getElementById("userPfp-sidebar").src}"><a class="noteDisplay" href="/u/${document.getElementById("displayName-sidebar").textContent}">${document.getElementById("displayName-sidebar").textContent}</a>
                    <br><a class="noteUsername" href="/u/${document.getElementById("username-pronouns-sidebar")}">${document.getElementById("username-pronouns-sidebar").textContent} • 1s</a><p class="noteText">${postData.text}</p><div class="buttonRow"><p class="likeBtn" id="like-${postData.id}"><i class="fa-solid fa-heart" aria-hidden="true"></i> 0</p><p class="renoteBtn" id="renote-${postData.id}"><i class="fa-solid fa-retweet" aria-hidden="true"></i> 0</p></div>
                    <p class="noteIsBeingPreviewed"><i class="fa-solid fa-eye"></i> Your note was successfully sent, but this is a preview. To edit, favorite, or quote renote it, please refresh the page. <a href="/blog/note-previews.html">Learn more</a>.</p>
                `
                newNote.classList.add("note");
                newNote.id = postData.id;
                document.getElementById("notes").prepend(newNote);
                }
            } else {
                unlockAchievement("First Steps");
            }

            try {
                if (file) {
                    const imageRef = storageRef(`images/notes/${user.uid}/${newNoteKey}-${file.name}`);
                    const snapshot = await imageRef.put(file);
                    postData.image = imageRef.getDownloadUrl();
                }

                if (pathName.startsWith("/note/")) {
                    //await firebase.database().ref(`/notes/${uniNoteId_notehtml}/notesReplying`).child(newNoteKey).set(postData);
                } else {
                    console.log("I know I didn't run -- but I worked.");
                    //await notesRef.child(newNoteKey).set(postData);
                    //await userNotes.child(newNoteKey).set(renoteData);
                }

                closeCreateNotePopup();

                setTimeout(function () {
                    document.getElementById("successfullySent").style.display = "none";
                }, 3000);
            } catch (error) {
                document.getElementById("noteError").textContent = "Error publishing note: " + error.message;
                console.error(error);
                coverCreateANote.style.display = "none";
            }
        } else {
            loginPrompt();
        }
    })
};

window.createNotePopup = createNotePopup;
window.closeCreateNotePopup = closeCreateNotePopup;
window.publishNote = publishNote;