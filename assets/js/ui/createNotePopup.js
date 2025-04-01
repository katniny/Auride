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

        <p style="font-size: small; color: var(--text-semi-transparent); display: none; transform: translateY(-10px);" id="hasntBeenUploadedNotice">Image hasn't been uploaded to TransSocial's server yet. This is just a preview.</p>
        <a href="javascript:void(0);" style="display: none; float: left; max-width: auto; transform: translateY(-10px);" id="removeUploadedImage" onclick="removeImage()">Remove Image</a> <a href="javascript:void(0);" style="display: none; float: left; max-width: auto; transform: translateY(-10px); margin-left: 7px;" id="addAltTextToImage" onclick="addAltText()">Add Alt Text</a>
        <p id="noteError"></p>
    </div>

    <!-- Settings Tab -->
    <div class="settingsStuff hidden" id="settingStuff">
        <i class="fa-solid fa-arrow-left fa-lg" style="float: left; margin-top: 10px;" onclick="swapNoteTab('note')"></i>

        <br />

        <h2 style="margin-top: 10px;">Add a content warning</h2> 
        <p style="font-size: 14px; color: var(--text-semi-transparent);">Add a content warning to this note by selecting a category. This helps people see only the content they want to on TransSocial.</p>

        <!-- NSFW Checkbox -->
        <input type="checkbox" id="isNsfw" /> <span class="noteContainsNsfwContent">Note contains NSFW content.</span> 
        <p class="optionAlt">This may include nudity, intercourse, intense violence, etc.</p>

        <!-- Content Warning Checkbox -->
        <input type="checkbox" id="isSensitive" /> Note contains sensitive content.
        <p class="optionAlt">Select this if your note has potentionally triggering content.</p>

        <!-- Political Checkbox -->
        <input type="checkbox" id="isPolitical" /> Note contains political content.
        <p class="optionAlt">Select this if your note has political content.</p>

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
            <i class="fa-solid fa-flag fa-lg" onclick="swapNoteTab('note')"></i> <i class="fa-solid fa-image fa-lg" onclick="uploadImage()"><input type="file" id="imageUploadInput" accept="image/png, image/jpeg, image/webp, video/mp4, image/gif" style="display: none;"></i> <i class="fa-solid fa-music fa-lg" onclick="swapNoteTab('music')"></i>
        </div>
    </div>
`;

// show the modal when requested
function createNotePopup() {
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

                document.getElementById("notePopupQuotePfp").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteData.whoSentIt}%2F${userData.pfp}?alt=media`;
                document.getElementById("notePopupQuoteDisplay").textContent = userData.display;
                document.getElementById("notePopupQuoteUsername").textContent = `@${userData.username}`;
                document.getElementById("notePopupQuoteText").textContent = noteData.text;
            })
        })
    }
}

function closeCreateNotePopup() {
    const notePopup = document.getElementById("createNote-popup");

    document.getElementById("noteContent-textarea").value = "";
    document.getElementById("uploadingImage").style.display = "none";
    removeImage();
    document.getElementById("hasntBeenUploadedNotice").style.display = "none";
    if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
        document.getElementById("replyingOrCreating").innerText = "Create a Note!";
        isReplying_notehtml = false;
    }
    document.getElementById("isNsfw").checked = false;
    document.getElementById("isSensitive").checked = false;
    document.getElementById("isPolitical").checked = false;
    renotingNote = null;
    document.getElementById("spotifyPlayer").innerHTML = "";
    document.getElementById("songQuery").value = "";
    pickedMusic = null;

    notePopup.close();
    setTimeout(() => {
        notePopup.remove();
    }, 500);
}