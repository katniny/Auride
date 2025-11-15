const deleteModal = `
    <h2>Delete note?</h2>
    <p>This can't be undone. Deleting this note will remove it from anywhere notes will appear.</p>

    <br />

    <button onclick="deleteNote_fully()" id="deleteFullyBtn" style="width: 100%;"><i class="fa-solid fa-trash"></i> Yes, delete</button>
    <button onclick="deleteNote_nevermind()" style="width: 100%;"><i class="fa-solid fa-xmark"></i> Nevermind, I change my mind</button>
`;

function createDeleteNoteUI(noteId) {
    // append and put the content inside the modal
    const deleteNotePopup = document.createElement("dialog");
    deleteNotePopup.setAttribute("id", "checkIfNoteDeletion");
    deleteNotePopup.innerHTML = deleteModal;
    document.body.appendChild(deleteNotePopup);

    // make sure that the onclick id is correct
    document.getElementById("deleteFullyBtn").setAttribute("onclick", `deleteNote_fully("${noteId}")`);

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
function deleteNote_fully(noteId) {
    firebase.database().ref(`notes/${noteId}`).update({
        isDeleted: true
    });

    document.getElementById("noteDeleted").showModal();
    closeDeleteNoteUI();
}

// cancel note deletion
function deleteNote_nevermind() {
    closeDeleteNoteUI();
}