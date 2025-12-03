const deleteModal = `
    <h2>Delete note?</h2>
    <p class="description">This can't be undone. Deleting this note will remove it from anywhere notes will appear.</p>

    <br />

    <p id="noteDeletionErrors">noteDeletionErrors</p>
    <button onclick="deleteNote_fully()" id="deleteNoteFullyBtn" style="width: 100%;"><i class="fa-solid fa-trash"></i> Yes, delete</button>
    <button onclick="deleteNote_nevermind()" id="dontDeleteNoteBtn" style="width: 100%;"><i class="fa-solid fa-xmark"></i> Nevermind, I change my mind</button>
`;

function createDeleteNoteUI(noteId) {
    // append and put the content inside the modal
    const deleteNotePopup = document.createElement("dialog");
    deleteNotePopup.setAttribute("id", "checkIfNoteDeletion");
    deleteNotePopup.innerHTML = deleteModal;
    document.body.appendChild(deleteNotePopup);

    // make sure that the onclick id is correct
    document.getElementById("deleteNoteFullyBtn").setAttribute("onclick", `deleteNote_fully("${noteId}")`);

    // then, finally show modal
    deleteNotePopup.showModal();
}

function closeDeleteNoteUI() {
    const deleteNotePopup = document.getElementById("checkIfNoteDeletion");

    deleteNotePopup.close();
    setTimeout(() => {
        deleteNotePopup.remove();
    }, 500);
}

// delete note
async function deleteNote_fully(noteId) {
    const deleteNoteBtn = document.getElementById("deleteNoteFullyBtn");
    const dontDeleteNoteBtn = document.getElementById("dontDeleteNoteBtn");
    const errorText = document.getElementById("noteDeletionErrors");
    errorText.classList.remove("shown");

    if (deleteNoteBtn.classList.contains("working") || dontDeleteNoteBtn.classList.contains("working")) return;
    updateDeleteBtnsState("working");

    // get token, if exists
    const user = firebase.auth().currentUser;
    let token = null;
    if (user) {
        try {
            token = await user.getIdToken();
        } catch (err) {
            updateDeleteBtnsState("finished");
            errorText.textContent = "Failed to get a valid token. Please try again or signing into an account.";
            errorText.classList.add("shown");
            console.error(`Failed to get Firebase token: ${err}`);
        }
    }

    if (!token) {
        updateDeleteBtnsState("finished");
        errorText.textContent = "No token found. Are you signed in?";
        errorText.classList.add("shown");
        return "No token found";
    }
    
    // if on note page, add the current note view id to note id
    let noteIdToSend = null;
    if (pathName.startsWith("/note/")) {
        // get note id & set id to send
        const noteViewId = await pathName.split("/")[2];
        noteIdToSend = `${noteViewId}/${noteId}`;
    } else {
        // if not on note page, just send the raw note id
        noteIdToSend = noteId;
    }

    // request deletion from server
    const response = await fetch(`${serverUrl}/api/auride/deleteNote`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(noteId ? { "noteId": noteIdToSend } : {})
        }
    });
    if (!response.ok) {
        updateDeleteBtnsState("finished");
        errorText.textContent = "A server occurred deleting your note.";
        errorText.classList.add("shown");
        console.error("Failed to delete note: ", response.statusText);
        return;
    }

    // close popup & delete div
    closeDeleteNoteUI();
    const noteDiv = document.getElementById(noteId);
    if (noteDiv) noteDiv.remove();
}

// cancel note deletion
function deleteNote_nevermind() {
    if (document.getElementById("dontDeleteNoteBtn").classList.contains("working")) return;

    closeDeleteNoteUI();
}

// update the state of the buttons
function updateDeleteBtnsState(state) {
    const deleteNoteBtn = document.getElementById("deleteNoteFullyBtn");
    const dontDeleteNoteBtn = document.getElementById("dontDeleteNoteBtn");

    switch (state) {
        case "working":
            deleteNoteBtn.classList.add("working");
            deleteNoteBtn.innerHTML = `${faIcon("circle-notch", "spin").outerHTML} Working...`;
            
            dontDeleteNoteBtn.classList.add("working");
            dontDeleteNoteBtn.innerHTML = `${faIcon("circle-notch", "spin").outerHTML} Cannot cancel...`;
            break;
        case "finished":
            deleteNoteBtn.classList.remove("working");
            deleteNoteBtn.innerHTML = `${faIcon("trash").outerHTML} Yes, delete`;
            
            dontDeleteNoteBtn.classList.remove("working");
            dontDeleteNoteBtn.innerHTML = `${faIcon("xmark").outerHTML} Nevermind, I change my mind`;
            break;
        default:
            deleteNoteBtn.classList.remove("working");
            deleteNoteBtn.innerHTML = `${faIcon("xmark").outerHTML} Unauthorized operation`;
            
            dontDeleteNoteBtn.classList.remove("working");
            dontDeleteNoteBtn.innerHTML = `${faIcon("xmark").outerHTML} Unauthorized operation`;
            break;
    }
}