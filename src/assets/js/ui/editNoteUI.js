const editModal = `
    <!-- Display above everything else when a note is updating -->
    <div class="coverUpdatingNote" id="coverUpdatingNote" style="display: none;"></div>

    <h2>Edit Note Content</h2>
    <p>Removing images is currently not supported at this time.</p>

    <textarea id="newTextContent" placeholder="What do you want your note to say now?"></textarea>
    <p id="newTextContent-characterLimit" style="color: var(--text-semi-transparent)">0/1,250</p>

    <br />
    <br />

    <button onclick="applyEdits()" id="applyEditsBtn">Apply</button> <button onclick="dontApplyEdits()">Nevermind</button>
`;

function createEditNoteUI(noteId) {
    // append and put the content inside the modal
    const editNotePopup = document.createElement("dialog");
    editNotePopup.setAttribute("id", "editNoteContent");
    editNotePopup.innerHTML = editModal;
    document.body.appendChild(editNotePopup);

    // make sure the character limit is displayed
    document.getElementById("newTextContent").addEventListener("input", () => {
        const currentLength = document.getElementById("newTextContent").value.length;

        if (currentLength > 1250) {
            document.getElementById("newTextContent").value = document.getElementById("newTextContent").value.substring(0, 1250);
        }

        document.getElementById("newTextContent-characterLimit").textContent = `${currentLength}/1,250`;
    });

    // make sure that the onclick id is correct
    document.getElementById("applyEditsBtn").setAttribute("onclick", `applyEdits("${noteId}")`);

    // then, finally show modal
    editNotePopup.showModal();
}

function closeEditNotePopup() {
    const notePopup = document.getElementById("editNoteContent");

    notePopup.close();
    setTimeout(() => {
        notePopup.remove();
    }, 100);
}