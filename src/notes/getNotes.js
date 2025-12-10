import { waitForElement } from "../ui/waitForElement.js";
import { currentUserData } from "../users/current.js";
import { auth } from "../firebase/config.js";
import { renderNotes } from "./renderNotes.js";
import { faIcon } from "../utils/faIcon.js";

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
    pathname = window.location.pathname;
    notesPageRef = null;
    currentlyLoadingNotes = false;
    loadOnlyFollowingNotes = false;
    listeningToWebsocket = false;
    lastLoadedNoteKey = null;
    allLoadedNotes = new Set();

    // change path
    getRequestPath();
});

// get the path to use in requests
function getRequestPath() {
    switch (true) {
        case pathname === "/home":
            notesPageRef = "notes";
            break;
        case pathname.startsWith("/u/"):
            // get username
            const username = pathname.split("/")[2].toLowerCase();
            // TODO: call server to get notes
            break;
        case pathname.startsWith("/note/"):
            // get note id
            const noteId = pathname.split("/")[2];
            
            // then, set variables
            notesPageRef = `/notes/${noteId}/notesReplying`;
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
    getRequestPath();
    
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
        return;
    }
}

// infinite note loading
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadNotes();
    }
});