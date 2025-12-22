import { waitForElement } from "../ui/waitForElement.js";
import { currentUserData } from "../users/current.js";
import { auth } from "../firebase/config.js";
import { renderNotes } from "./renderNotes.js";
import { faIcon } from "../utils/faIcon.js";
import { getUserData } from "../methods/getUserData.js";

// init variables
let pathname = window.location.pathname;
let notesPageRef = null;
let currentlyLoadingNotes = false;
let loadOnlyFollowingNotes = false;
let listeningToWebsocket = false;
let lastLoadedNoteKey = null;
export let allLoadedNotes = new Set();

document.addEventListener("navigatedToNewPage", () => {
    // clean up variables
    resetVariables();

    // change path
    getRequestPath();
});

// get the path to use in requests
async function getRequestPath() {
    switch (true) {
        case pathname === "/home":
            notesPageRef = "notes";
            break;
        case pathname.startsWith("/u/"):
            // get username
            const username = pathname.split("/")[2].toLowerCase();
            
            try {
                const data = await getUserData(username, "username");
                notesPageRef = `/users/${data.uid}/posts`;
            } catch (err) {
                console.error(`Something went wrong: ${err}`);
            }
            break;
        case pathname.startsWith("/note/"):
            // get note id
            const noteId = pathname.split("/")[2];
            
            // then, set variables
            notesPageRef = `/notes/${noteId}/notesReplying`;
            console.log(notesPageRef);
            break;
        case pathname === "/favorites":
            (async () => {
                // is user logged in?
                const userData = await currentUserData();
                console.log(userData);
            })();
            break;
        default:
            notesPageRef = `pleaseSetMe`;
            break;
    }
}

// reset all variables
function resetVariables() {
    // clean up variables
    pathname = window.location.pathname;
    notesPageRef = null;
    currentlyLoadingNotes = false;
    loadOnlyFollowingNotes = false;
    lastLoadedNoteKey = null;
    allLoadedNotes = new Set();
}

// reset all variables then call loadNotes()
function loadNotesFromScratch() {
    // reset variables
    resetVariables();

    // change path
    getRequestPath();

    // then, load notes
    loadNotes();
}

// load notes
export async function loadNotes() {
    // dont load more notes if already doing so
    if (currentlyLoadingNotes)
        return;
    currentlyLoadingNotes = true;

    await waitForElement("notes");
    const notesContainer = document.getElementById("notes");

    // create loading indicator
    const loadingIndicator = await faIcon("solid", "circle-notch", "spin");
    loadingIndicator.id = "noteLoadingIndicator";
    notesContainer.appendChild(loadingIndicator);

    // get the request path
    pathname = window.location.pathname; // set it here or it reports the last pathname, which obviously causes bugs
    console.log(pathname);
    await getRequestPath();
    
    // then, form url based on variables
    let requestUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auride/getNoteData?limit=15`;
    if (notesPageRef)
        requestUrl += `&path=${notesPageRef}`;
    else {
        // TODO: i want to create a custom error handler that'll show errors on the page itself
        // e.g., via a little pill or something on the top of the screen
        console.error(`notesPageRef is unknown... did you set it? Current value: ${notesPageRef}`);
        return;
    }
    if (loadOnlyFollowingNotes) // if the user only wants to load notes from users they follow
        requestUrl += `&path=${loadOnlyFollowingNotes}`;
    if (lastLoadedNoteKey) // if there have been notes loaded already
        requestUrl += `&endBefore=${lastLoadedNoteKey}`;

    console.log(requestUrl);
    console.log(lastLoadedNoteKey);

    // get user token
    const user = auth.currentUser;
    let token = null;
    if (user) {
        try {
            token = await user.getIdToken();
        } catch (err) {
            console.error(`Failed to get Firebase token: ${err}`);
        }
    }

    // then, send the request the server
    const res = await fetch(requestUrl, {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
    });

    // if the response isn't okay, handle cleanly
    if (!res.ok) {
        console.error(`Failed to fetch notes: ${res.statusText}`);
        currentlyLoadingNotes = false;
        loadingIndicator.remove();
        return;
    }

    // then, parse and render notes
    const notesArray = await res.json();
    console.log(notesArray);
    if (notesArray.length > 0) {
        console.log(notesArray);
        // update lastNoteKey
        notesArray.sort((a, b) => b.createdAt - a.createdAt);
        lastLoadedNoteKey = notesArray[notesArray.length - 1]?.key;

        // keep newest at bottom
        renderNotes(notesArray);
        currentlyLoadingNotes = false;

        // set up ws
        if (!listeningToWebsocket) {
            const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL);
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);

                if (message.type === "new_note")
                    newNoteAdded(message.noteId);
            };
        }
        listeningToWebsocket = true; // we can call this only once, server doesnt return page-specific data!

        return;
    }
}

// if new note added, render
function newNoteAdded(id) {
    // does id already exist?
    if (document.getElementById(id))
        return;

    // if not, let user know theres a new note
    const newNotesAvailable = document.createElement("div");
    newNotesAvailable.id = "newNotesAvailable";
    newNotesAvailable.onclick = () => {
        // remove self
        newNotesAvailable.remove();

        // remove currently loaded notes
        document.getElementById("notes").innerHTML = "";

        // then, reload notes
        loadNotesFromScratch();
    };
    newNotesAvailable.innerHTML = `
        ${faIcon("solid", "bell").outerHTML} New Notes
    `;
    document.getElementById("app").appendChild(newNotesAvailable);
}

// infinite note loading
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadNotes();
    }
});