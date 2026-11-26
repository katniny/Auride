import { waitForElement } from "../ui/waitForElement.js";
import { renderNote } from "./renderNoteDiv.js";
import { allLoadedNotes } from "./getNotes.js";
import { currentUserData } from "../users/current.js";
import { auth } from "../firebase/config.js";
import { faIcon } from "../utils/faIcon.js";
import { apiFetch } from "../main.js";

let currentlyRendering = false;
export async function renderNotes(notesArray, currentUsersData) {
    const start = performance.now();
    const fragment = document.createDocumentFragment();
    // if currently working, dont work more
    if (currentlyRendering)
        return "Currently working...";
    currentlyRendering = true;

    // get the notes container
    await waitForElement("notes"); // wait for it though!
    const notesContainer = document.getElementById("notes");
    
    // if blocked, dont render notes
    // TODO: make this proper server-side validation
    const blockedContainer = notesContainer.querySelector(".blocked");
    if (blockedContainer) {
        currentlyRendering = false;
        return;
    }

    // parse notes
    const renderedNotes = await Promise.all(
        notesArray.map(async (noteData) => {
            try {
                return await renderNote(noteData);
            } catch (err) {
                console.error(`Failed to render note ${noteData.id}:`, err);
                return null;
            }
        })
    );

    // append all rendered notes
    for (const noteDiv of renderedNotes) {
        if (!noteDiv)
            continue;

        if (document.getElementById(noteDiv.id))
            continue;

        allLoadedNotes.add(noteDiv.id);
        fragment.appendChild(noteDiv);
    }
    notesContainer.appendChild(fragment);
    currentlyRendering = false;
    const duration = performance.now() - start;
    console.log(`All notes rendered in ${duration.toFixed(2)}ms`);
}

// on page nav, we are no longer rendering current batch
document.addEventListener("navigatedToNewPage", () => {
    // clean up variables
    currentlyRendering = false;
});