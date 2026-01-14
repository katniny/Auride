import { db } from "../../firebase/config.js";
import { checkFile } from "../../methods/checkFileType.js";
import { pushNote } from "../../methods/pushNote.js";
import { uploadMedia } from "../../methods/uploadMedia.js";
import { previewFormat } from "../../text/format.js";
import { currentUserData } from "../../users/current.js";
import { faIcon } from "../../utils/faIcon.js";
import { searchSpotify } from "../../utils/searchSpotify.js";

let selectedMusicId = null; // if the user selects a track
let selectedMusicDetails = { // details just to display info to the user
    name: null,
    artist: null,
    albumCoverLink: null
};
let noteSending = false;
export async function showCreateNotePopup() {
    // get current users data
    const currentUsersData = await currentUserData();

    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <!-- the editor -->
        <div class="tab editorTab active">
            <h3 class="closePopupIcon">
                ${faIcon("solid", "circle-xmark").outerHTML}
            </h3>
            <div class="editor">
                <div id="preview" class="editorPreview" data-placeholder="What's on your mind, ${currentUsersData.display}?"></div>
                <textarea id="composer" class="editorInput" spellcheck="true"></textarea>
                <p class="description" id="noteCharacterLimit">0/1,250</p>
            </div>

            <img class="uploadedImg" src draggable="false" />
            <video class="uploadedVideo" src draggable="false" controls autoplay="${currentUsersData?.autoplayVideos}"></video>
            <audio class="uploadedAudio" src controls></audio>
            <p class="mediaNotUploaded description">Your media hasn't been uploaded yet, this is just a preview.</p>
            <div class="interactionsForMedia">
                <button class="removeMedia">${faIcon("solid", "trash").outerHTML} Remove Media</button>
                <button class="addAltToMedia">${faIcon("solid", "message").outerHTML} Add Alt Text</button>
            </div>
        </div>

        <!-- music selection -->
        <div class="tab musicTab">
            <h3 class="backIcon">
                ${faIcon("solid", "arrow-left").outerHTML}
            </h3>

            <h2>Music</h2>
            <p class="description">Show off your favorite music!</p>
            <input class="musicSearch" type="text" placeholder="Golden" />
            <button class="searchMusic">${faIcon("solid", "magnifying-glass").outerHTML} Search</button>
            <div class="selectedSongDetails"></div>
            <div class="musicQueries">
                <p class="encouragement description">Try searching for your favorite song!</p>
            </div>
        </div>

        <!-- flag selection -->
        <div class="tab flagTab">
            <h3 class="backIcon">
                ${faIcon("solid", "arrow-left").outerHTML}
            </h3>

            <h2>Flags</h2>
            <p class="description">Help people on Auride see the content they want to see.</p>
            <!-- nsfw -->
            <h3 class="selection">NSFW</h3>
            <a href="/blog/nsfw-flags">Learn more about NSFW flags.</a>
            <br />
            <select name="nsfwFlags">
                <option value="none">None</option>
                <option value="adultContent">Adult Content</option>
                <option value="sexuallySuggestive">Sexually Suggestive</option>
                <option value="nonSexualNudity">Non-Sexual Nudity</option>
                <option value="fetishContent">Fetish Content</option>
                <option value="erotica">Erotic Writing</option>
            </select>

            <!-- sensitive content -->
            <h3 class="selection">Sensitive</h3>
            <a href="/blog/sensitive-flags">Learn more about Sensitive flags.</a>
            <br />
            <select name="sensitiveFlags">
                <option value="none">None</option>
                <option value="graphicViolence">Graphic Violence</option>
                <option value="horrorImagery">Horror Imagery</option>
                <option value="abuseTraumaMentions">Abuse/Trauma Mentions</option>
                <option value="selfHarmSuicideMentions">Self-Harm/Suicide Mentions</option>
                <option value="drugUse">Drug Use</option>
                <option value="flashSeizureRisk">Flash Seizure Risk</option>
            </select>

            <!-- political content -->
            <h3 class="selection">Political</h3>
            <a href="/blog/political-flags">Learn more about Political flags.</a>
            <br />
            <select name="politicalFlags">
                <option value="none">None</option>
                <option value="politicalDiscussion">Political Discussion</option>
                <option value="warNConflict">War & Conflict</option>
                <option value="identityDebates">Identity Debates</option>
                <option value="conspiracyTheories">Conspiracy Theories</option>
                <option value="newsMedia">News Media</option>
            </select>
        </div>

        <br />

        <p class="errorMsg caution"></p>
        <div class="noteCustomization">
            <button class="createNote">${faIcon("solid", "pencil").outerHTML} Create</button>
            <div class="interactions">
                <input type="file" id="noteFilePicker" style="display: none;" />
                <a class="interaction editor">invisible editor button to prevent errors</a>
                <a class="interaction media moreMargin">${faIcon("solid", "image").outerHTML} Media</a>
                <a class="interaction flag">${faIcon("solid", "flag").outerHTML} Flags</a>
                <a class="interaction music">${faIcon("solid", "music").outerHTML} Music</a>
            </div>
        </div>
    `;

    // add attributes
    modal.className = "createNotePopup";
    document.getElementById("app").appendChild(modal);

    // set close popup button
    const createNoteBtn = modal.querySelector(".createNote");
    createNoteBtn.onclick = () => createNote();
    const closeIcon = modal.querySelector(".closePopupIcon");
    closeIcon.onclick = () => closeCreateNotePopup();

    // allow errors
    const errorMsg = modal.querySelector(".errorMsg");
    function showError(message) {
        errorMsg.textContent = message;
    }

    // set back icon
    const closeIcons = modal.querySelectorAll(".backIcon");
    closeIcons.forEach(icon => {
        icon.onclick = () => changeTab("editor", "editorTab");
    });

    // show preview when typing
    const input = modal.querySelector(".editorInput");
    const preview = modal.querySelector(".editorPreview");
    function syncScroll() {
        preview.scrollTop = input.scrollTop;
    }

    const maxCharCount = 1250;
    input.addEventListener("input", () => {
        // set height
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
        preview.style.height = input.style.height;

        // show format in preview mode (to prevent inline breakage)
        preview.innerHTML = previewFormat(input.value);

        // trim input if too long
        if (input.value.length > maxCharCount)
            input.value = input.value.slice(0, maxCharCount);

        // show format in preview mode
        preview.innerHTML = previewFormat(input.value.slice(0, maxCharCount));

        // update counter
        const characterLimitText = modal.querySelector("#noteCharacterLimit");
        const charCount = input.value.length;
        characterLimitText.textContent = `${charCount}/1,250`;
    });

    input.addEventListener("scroll", syncScroll);

    // add changing tabs functionality to buttons
    const flagTabBtn = modal.querySelector(".interaction.flag");
    const musicTabBtn = modal.querySelector(".interaction.music");

    flagTabBtn.onclick = () => changeTab("flag", "flagTab");
    musicTabBtn.onclick = () => changeTab("music", "musicTab");

    function activateTab(btnClass, tabClass) {
        const btnEl = modal.querySelector(`.interaction.${btnClass}`);
        const tabEl = modal.querySelector(`.tab.${tabClass}`);

        // if they dont exist, dont run
        if (!btnEl || !tabEl)
            return;

        // apply anim
        tabEl.style.animation = "tabOpening 0.3s ease";
        tabEl.classList.add("active");
        btnEl.classList.add("active");
    }

    function changeTab(btnClass, tabClass) {
        const activeTabs = modal.querySelectorAll(".tab.active");
        const activeBtns = modal.querySelectorAll(".interaction.active");

        // user clicked the same button, do the main editor
        let canActivate = true;
        if (activeTabs[0] && activeTabs[0].classList.contains(tabClass)) {
            canActivate = false;
            activateTab("editor", "editorTab");
        }

        // deactivate all active tabs
        activeTabs.forEach(tab => {
            tab.style.animation = "tabClosing 0.3s ease";
            tab.style.position = "fixed";
            setTimeout(() => {
                tab.classList.remove("active");
                tab.style.animation = "";
                tab.style.position = "";
            }, 250);
        });
        activeBtns.forEach(btn => {
            btn.classList.remove("active");
        });

        // activate the requested tab/button
        if (canActivate)
            activateTab(btnClass, tabClass);
    }

    // if someone clicks on the media button, they likely want to upload a file
    // so allow them
    const mediaBtn = modal.querySelector(".interaction.media");
    const filePicker = modal.querySelector("#noteFilePicker");
    mediaBtn.onclick = () => {
        if (!noteSending) 
            filePicker.click();
    }

    // if the file picker gets a new file, show the file
    const uploadedImg = modal.querySelector(".uploadedImg");
    const uploadedVideo = modal.querySelector(".uploadedVideo");
    const uploadedAudio = modal.querySelector(".uploadedAudio");
    const mediaNotUploaded = modal.querySelector(".mediaNotUploaded");
    const removeMedia = modal.querySelector(".removeMedia");
    const addAltToMedia = modal.querySelector(".addAltToMedia");
    const interactionsForMedia = modal.querySelector(".interactionsForMedia");

    function showMediaType(type, file) {
        // clear error message
        showError("");
        // these will always be shown
        mediaNotUploaded.classList.add("shown");
        interactionsForMedia.classList.add("shown");

        // then, update
        switch (type) {
            case "image":
                // add/remove classes
                uploadedImg.classList.add("current");
                uploadedVideo.classList.remove("current");
                uploadedAudio.classList.remove("current");
                removeMedia.classList.add("shown");
                addAltToMedia.classList.add("shown");

                // update src
                uploadedImg.src = file;
                break;
            case "video":
                // add/remove classes
                uploadedImg.classList.remove("current");
                uploadedVideo.classList.add("current");
                uploadedAudio.classList.remove("current");
                removeMedia.classList.add("shown");
                addAltToMedia.classList.add("shown");

                // update src
                uploadedVideo.src = file;
                break;
            case "audio":
                // add/remove classes
                uploadedImg.classList.remove("current");
                uploadedVideo.classList.remove("current");
                uploadedAudio.classList.add("current");
                removeMedia.classList.add("shown");
                addAltToMedia.classList.remove("shown");

                // update src
                uploadedAudio.src = file;
                break;
            default:
                // hide all elements
                uploadedImg.classList.remove("current");
                uploadedVideo.classList.remove("current");
                uploadedAudio.classList.remove("current");
                removeMedia.classList.remove("shown");
                addAltToMedia.classList.remove("shown");
                mediaNotUploaded.classList.remove("shown");
                interactionsForMedia.classList.remove("shown");

                // clear all srcs
                uploadedAudio.src = "";
                uploadedImg.src = "";
                uploadedVideo.src = "";
                break;
        }
    }

    filePicker.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        // if theres no file somehow, return
        if (!file) {
            showError("File cannot be empty.");
            return;
        }

        // read the file
        const fileUrl = URL.createObjectURL(file);
        
        // check the file and get its type
        let fileType;
        try {
            fileType = await checkFile(file);
        } catch (err) {
            console.error(err.message);
            showError(err.message);
            return;
        }

        // check file type then show the element based on it
        showMediaType(fileType, fileUrl);
    });

    // if the user wants to clear their media, allow them to do so
    removeMedia.addEventListener("click", () => {
        showMediaType(null, null);
    });

    // allow users to search music
    let userIsCurrentlySearching = false;
    const searchMusicBtn = modal.querySelector(".searchMusic");
    const musicSearch = modal.querySelector(".musicSearch");
    searchMusicBtn.onclick = () => searchMusic(musicSearch.value.trim());
    musicSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            searchMusicBtn.click();
    });

    function searchMusic(song) {
        //selectedMusicDetails.name
        //selectedMusicDetails.artist
        //selectedMusicId
        // ensure theres a query
        if (song.trim() === "") {
            showError("Your search can't be empty!");
            return;
        }

        // make sure user isnt already searching
        if (userIsCurrentlySearching)
            return;

        userIsCurrentlySearching = true;
        showError("");
        searchMusicBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Searching...`;

        // add track id to track 
        function addMusicToNote(trackId, trackName, artistName, albumCoverLink) {
            const selectedSongDetails = modal.querySelector(".selectedSongDetails");

            if (noteSending)
                return;

            // if no track id, name, or artist name - we're likely clearing it
            if (!trackId || !trackName || !artistName || !albumCoverLink) {
                selectedSongDetails.innerHTML = "";
                selectedMusicDetails.artist = null;
                selectedMusicDetails.name = null;
                selectedMusicId = null;
                selectedMusicDetails.albumCoverLink = null;
                return;
            }

            // then, set values
            selectedMusicDetails.artist = artistName;
            selectedMusicDetails.name = trackName;
            selectedMusicId = trackId;
            selectedMusicDetails.albumCoverLink = albumCoverLink;

            // show ui
            selectedSongDetails.innerHTML = `
                <h3>Currently Selected Song:</h3>
                <div class="details">
                    <div class="albumCover">
                        <img src="${albumCoverLink}" draggable="false" />
                    </div>
                    <div class="songDetails">
                        <h3>${trackName}</h3>
                        <p class="description">by ${artistName}</p>
                        <button class="trashSongSelection">${faIcon("solid", "trash").outerHTML} Remove Song Selection</button>
                    </div>
                </div>
                <h3 class="findNewSong">Or, find a new song selection here:</h3>
                <div class="divider"></div>
            `;

            // allow user to trash their current song selection
            const trashBtn = selectedSongDetails.querySelector(".trashSongSelection");
            trashBtn.onclick = () => addMusicToNote(null, null, null, null);
        }

        // search spotify
        searchSpotify(song).then((songs) => {
            // go through the songs
            const musicQueries = modal.querySelector(".musicQueries");
            musicQueries.innerHTML = "";

            for (const track of songs) {
                // create container
                console.log(track);
                const embedContainer = document.createElement("div");
                embedContainer.className = "songSelector";

                // create embed
                const embed = document.createElement("iframe");
                embed.src = `https://open.spotify.com/embed/track/${track.id}`;
                embed.allow = "encrypted-media";
                embed.allowTransparency = true;
                
                // add button to add song to note
                const addMusicBtn = document.createElement("button");
                addMusicBtn.innerHTML = `${faIcon("solid", "circle-play").outerHTML} Add ${track.name} by ${track.artists[0].name}`;
                addMusicBtn.onclick = () => { 
                    addMusicToNote(track.id, track.name, track.artists[0].name, track.album.images[0].url);
                    changeTab("editor", "editorTab");                
                }
                
                // then display
                embedContainer.appendChild(embed);
                embedContainer.appendChild(addMusicBtn);
                musicQueries.appendChild(embedContainer);
            }
            searchMusicBtn.innerHTML = `${faIcon("solid", "magnifying-glass").outerHTML} Search`;
            userIsCurrentlySearching = false;
        }).catch((err) => {
            showError("Something went wrong fetching songs from Spotify. Please check your internet connection and adblocker, if you have one.");
            searchMusicBtn.innerHTML = `${faIcon("solid", "magnifying-glass").outerHTML} Search`;
            userIsCurrentlySearching = false;
            console.error(err);
        });
    }

    // allow users to create notes
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "Return")
            createNote();
    });
    createNoteBtn.onclick = () => createNote();

    async function createNote() {
        // set create buttons status
        function setCreateNoteBtnStatus(status) {
            switch (status) {
                case "sending":
                    createNoteBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
                    break;
                case "notWorking":
                    createNoteBtn.innerHTML = `${faIcon("solid", "pencil").outerHTML} Create`;
                    break;
                default:
                    break;
            }
        }

        // ensure a note isnt already sending
        if (noteSending)
            return;
        noteSending = true;
        setCreateNoteBtnStatus("sending");
        showError("");

        // save what the values are so the user doesnt switch them last minute
        const nsfwFlags = modal.querySelector(`select[name="nsfwFlags"]`).value;
        const sensitiveFlags = modal.querySelector(`select[name="sensitiveFlags"]`).value;
        const politicalFlags = modal.querySelector(`select[name="politicalFlags"]`).value;
        const file = filePicker.files[0];
        const musicId = selectedMusicId;

        // if no user somehow, return
        if (!currentUsersData) {
            showError("We detected that you're signed out, please sign into an Auride account.");
            setCreateNoteBtnStatus("notWorking");
            noteSending = false;
            return;
        }

        // get the note text
        const noteText = input.value;
        if (noteText.trim() === "" && !file) {
            showError("Your note can't be empty!");
            setCreateNoteBtnStatus("notWorking");
            noteSending = false;
            return;
        }

        // if text over 1,250 characters somehow, prevent
        if (noteText.length > maxCharCount) {
            showError("Your note is too long. Only 1,250 characters or less is permitted.");
            noteSending = false;
            setCreateNoteBtnStatus("notWorking");
            return;
        }

        // request a note id
        // TODO: this is done on the client because firebase has built-in protections and doing this on the server would cause
        // a desync between media and the note itself, so once we move uploading media to the server-side, we can fix this
        const newNoteKey = db.ref("notes").push().key;

        // if theres a file, upload it
        if (file)
            uploadMedia(file, "notes", "noteId", newNoteKey).catch((err) => {
                showError(err.message);
                noteSending = false;
                setCreateNoteBtnStatus("notWorking");
                return;
            });

        // now ask the server to upload note
        try {
            // set path based on whether theres a file or not
            let mediaPath;
            if (file)
                mediaPath = `images/notes/${newNoteKey}/${file.name}`;
            else
                mediaPath = "";
            await pushNote(newNoteKey, mediaPath, noteText, nsfwFlags, 
                sensitiveFlags, politicalFlags, musicId
            )
            noteSending = false;
            closeCreateNotePopup();
        } catch(err) {
            showError(err.message);
            console.error(err.message);
            noteSending = false;
            setCreateNoteBtnStatus("notWorking");
            return;
        }
    }

    // show modal
    modal.showModal();
}

// close popup
function closeCreateNotePopup() {
    const app = document.getElementById("app");
    if (noteSending)
        return;

    // if the app has the modal, get it
    const modal = app.querySelector(".createNotePopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}