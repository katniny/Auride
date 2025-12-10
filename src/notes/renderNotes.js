import { waitForElement } from "../ui/waitForElement.js";
import { renderNote } from "./renderNoteDiv.js";
import { allLoadedNotes } from "./getNotes.js";
import { currentUserData } from "../users/current.js";
import { auth } from "../firebase/config.js";
import { faIcon } from "../utils/faIcon.js";

let currentlyRendering = false;
export async function renderNotes(notesArray) {
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

    // await user data
    const currentUsersData = await currentUserData();

    // parse notes
    for (const noteData of notesArray) {
        // get the note div
        let noteDiv = await renderNote(noteData);
        // if no note div is returned, skip
        if (!noteDiv)
            continue;
        // if note already exists, skip
        if (document.getElementById(noteData.id))
            continue;

        // add note to loaded notes
        allLoadedNotes.add(noteData.id);

        // then, get notes user data
        let noteUserData = null;
        if (currentUsersData.uid === noteData.whoSentIt)
            noteUserData = currentUsersData;
        else {
            // get token
            const user = auth.currentUser;
            let token = null;
            if (user) {
                try {
                    token = await user.getIdToken();
                } catch (err) {
                    console.error(`Failed to get Firebase token: ${err}`);
                }
            }
            
            // then get user data
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getUserData`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "userIdentifier": noteData.whoSentIt,
                    "reqType": "uid"
                }
            });
            // if response isn't okay, user is invalid
            if (!res.ok)
                continue;

            const userD = await res.json();
            noteUserData = userD.returnedUserData;
        }

        // then, render note
        notesContainer.appendChild(noteDiv);
    }
    currentlyRendering = false;
}

// on page nav, we are no longer rendering current batch
document.addEventListener("navigatedToNewPage", () => {
    // clean up variables
    currentlyRendering = false;
});