import { storageLink } from "../storageLink";
import { timeAgo } from "../ui/timeAgo";

export function renderNoteUI(noteData, userData) {
    // create div
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.id = noteData.key;
    noteDiv.dataset.createdAt = new Date(noteData.createdAt).getTime();

    // get username html
    let noteUsernameHtml = null;
    if (userData.pronouns)
        noteUsernameHtml = `@${userData.username} • ${userData.pronouns}`;
    else
        noteUsernameHtml = `@${userData.username}`;

    // get how long ago the note was sent
    const howLongAgo = timeAgo(noteData.createdAt);
    noteUsernameHtml += ` • ${howLongAgo}`;

    // then, put the html in
    noteDiv.innerHTML = `
        <img class="notePfp" draggable="false" loading="lazy" src="${storageLink(`images/pfp/${noteData.whoSentIt}/${userData.pfp}`)}" alt="Profile picture of ${userData.username}" />
        <a class="noteDisplay" href="/u/${userData.username}">${userData.display}</a>
        <br />
        <a class="noteUsername" href="/u/${userData.username}">${noteUsernameHtml}</a>
        <p class="noteText">${noteData.text}</p>
    `;
    
    // get container of notes
    const notesContainer = document.getElementById("notes");

    // get all existing note elements
    const existingNotes = Array.from(notesContainer.getElementsByClassName("note"));

    // find the first note with createdAt older than the new note's date
    const newNoteTime = noteDiv.dataset.createdAt;
    let inserted = false;

    for (const existingNote of existingNotes) {
        const existingNoteTime = existingNote.dataset.createdAt;
        // if existing note is older (timestamp smaller), insert before it
        if (existingNoteTime < newNoteTime) {
            notesContainer.insertBefore(noteDiv, existingNote);
            inserted = true;
            break;
        }
    }

    // if we didnt insert it yet, append it at the end (oldest)
    if (!inserted)
        notesContainer.appendChild(noteDiv);
}

window.renderNoteUI = renderNoteUI;