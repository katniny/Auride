// TO:DO - seperate this code!
// its just in a new script for 
// 1) code seperation, since i would like to depreciate ts_fas_acih.js
// 2) bug fixing
// but a lot of these should be new scripts!

let notesPageRef = null;
let notesPageRefString = null;
let currentLoadingNotes = false; // has to be at the top or loadInitialNotes() breaks...

// get the notes ref path
switch(true) {
    case pathName === "/home":
        notesPageRef = firebase.database().ref("notes");
        notesPageRefString = "notes";

        loadInitalNotes();
        attachListeners();

        break;
    case pathName.startsWith("/u/"):
        // get username
        const username = pathName.split("/")[2].toLowerCase();
        let uid = null;
        
        // then, get uid
        firebase.database().ref(`/taken-usernames/${username}`).once("value").then(snapshot => {
            uid = snapshot.val().user;

            notesPageRef = firebase.database().ref(`/users/${uid}/posts`);
            notesPageRefString = `/users/${uid}/posts`;

            loadInitalNotes();
            attachListeners();
        });
        break;
    case pathName.startsWith("/note/"):
        // get note id
        const noteId = pathName.split("/")[2];

        notesPageRef = firebase.database().ref(`/notes/${noteId}/notesReplying`);
        notesPageRefString = `/notes/${noteId}/notesReplying`;

        loadInitalNotes();
        attachListeners();

        break;
    case pathName === "/favorites":
        // see if user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // get users favorites
                firebase.database().ref(`/users/${user.uid}`).once("value").then(snapshot => {
                    const favorites = snapshot.val().favorites;
                    // make sure user has favorites
                    if (favorites) {
                        notesPageRef = firebase.database().ref(`/users/${user.uid}/favorites`);
                        notesPageRefString = `/users/${user.uid}/favorites`;

                        loadInitalNotes();
                        attachListeners();
                    }
                });
            }
        });
        break;
    default:
        notesPageRef = firebase.database().ref("pleaseDefinePathInNotesDotJS");
        notesPageRefString = "pleaseDefinePathInNotesDotJS";
        console.error(`
            Please define the path for this page in /public/assets/js/notes/notes.js.\n
            If you are a user and are experiencing this error, please report this to our GitHub Issues:
            https://github.com/katniny/Auride/issues
        `);
        // don't dispatch event here. dev needs to know path is broken!
        break;
}

const notesDiv = document.getElementById("notes");
const batchSize = null;
const noteLoadingIndicator = document.getElementById("noteLoadingIndicator");
const newNotesAvailable = document.getElementById("newNotesAvailable");
let isLoading = false;
let lastNoteKey = null;
let loadedNotesId = new Set();
let userAutoplayPreference = null;

// function to fetch and cache user's autoplay pref
function fetchAutoplayPreference() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`users/${user.uid}/autoplayVideos`).once("value", (snapshot) => {
                    const evenExists = snapshot.exists();
                    const pref = snapshot.val();

                    if (evenExists === true) {
                        userAutoplayPreference = (pref === "true"); // this sets it to their preference
                    } else {
                        userAutoplayPreference = true;
                    }
                    resolve(userAutoplayPreference);
                }).catch(reject);
            } else {
                userAutoplayPreference = true;
                resolve(userAutoplayPreference);
            }
        });
    });
}

fetchAutoplayPreference(); // call on start

// show notes without refreshing
// revolutionary tech y'all
function loadNotesFromButton() {
    // remove existing notes
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => note.remove());

    // load the new notes
    loadInitalNotes();
}

// Note Rendering
// observer to only show images/videos/etc. when about to be visible for performance
const mediaObserver = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.visibility = "visible";
            entry.target.style.opacity = "1";
        } else {
            entry.target.style.visibility = "hidden";
            entry.target.style.opacity = "0";
        }
    });
}, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
});

async function loadInitalNotes() {
    // if loading notes, return 
    if (currentLoadingNotes) return;
    currentLoadingNotes = true;

    // create loading indicator to give some visual feedback
    await createLoadingIndicator("lg", "notes");
    const loadingIndicator = document.getElementById("noteLoadingIndicator");
    
    // fetch note data from server
    const response = await fetch(`${serverUrl}/api/auride/getNoteData?limit=15&path=${notesPageRefString}`);
    if (!response.ok) {
        console.error("Failed to fetch notes: ", response.statusText);
        currentLoadingNotes = false;
        document.getElementById("noteLoadingIndicator").remove(); // FIXME: loadingIndicator.remove() doesnt work here?
        return;
    }

    // then, parse and render notes
    const notesArray = await response.json();

    if (notesArray.length > 0) {
        // update lastNoteKey
        notesArray.sort((a, b) => b.createdAt - a.createdAt);
        lastNoteKey = notesArray[notesArray.length - 1]?.key;

        // keep newest at bottom
        renderNotes(notesArray);
        currentLoadingNotes = false;
        document.getElementById("noteLoadingIndicator").remove(); // FIXME: loadingIndicator.remove() doesnt work here?
        if (newNotesAvailable)
            newNotesAvailable.style.display = "none";
    }
}

// infinite loading
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreNotes();
    }
});

let canLoadMore = false;
async function loadMoreNotes() {
    // if has no lastNoteKey or is loading notes, return 
    if (!lastNoteKey) return;
    if (currentLoadingNotes) return;
    currentLoadingNotes = true;

    // create loading indicator to give some visual feedback
    createLoadingIndicator("lg", "notes");
    const loadingIndicator = document.getElementById("noteLoadingIndicator");
    
    // fetch note data from server
    const response = await fetch(`${serverUrl}/api/auride/getNoteData?endBefore=${lastNoteKey}&limit=15&path=${notesPageRefString}`);
    if (!response.ok) {
        console.error("Failed to fetch notes: ", response.statusText);
        currentLoadingNotes = false;
        noteLoadingIndicator.remove();
        return;
    }

    // then, parse and render notes
    const notesArray = await response.json();

    if (notesArray.length > 0) {
        // update lastNoteKey
        notesArray.sort((a, b) => b.createdAt - a.createdAt);
        lastNoteKey = notesArray[notesArray.length - 1]?.key;

        // keep newest at bottom
        renderNotes(notesArray);
        currentLoadingNotes = false;
        loadingIndicator.remove();
    }
}

// retrieve data from the "notes" node
let currentlyRendering = false;
function renderNotes(notesArray) {
    if (currentlyRendering) return;
    const notesContainer = document.getElementById("notes");

    notesArray.forEach(noteData => {
        let noteDiv = renderNote(noteData);
        if (noteDiv == null) return;
        if (document.getElementById(noteData.id)) return;

        loadedNotesId.add(noteData.id);

        // i wanted to refactor this too but touching this actually gives you a curse until you put it back exactly as it was

        firebase.database().ref(`users/${noteData.whoSentIt}`).get().then(function (snapshot) {
            const userData = snapshot.val();
            if (userData.suspensionStatus == "suspended") noteDiv.remove();
        })

        if (pathName == "/home") {
            if (noteData.replyingTo === undefined) {
                if (noteData.isDeleted !== true) {
                    if (noteLoadingIndicator)
                        noteLoadingIndicator.remove();
                    notesContainer.appendChild(noteDiv);
                    currentlyRendering = false;
                }
            }
        } else if (pathName == "/u" || pathName.startsWith("/u/")) {
            let userParam = undefined;

            if (pathName.startsWith("/u/")) {
                userParam = pathName.split("/")[2].toLowerCase();
            } else {
                userParam = pageURL.searchParams.get("id").toLowerCase();
            }

            firebase.database().ref(`taken-usernames/${userParam}`).get().then(function (snapshot) {
                const uid = snapshot.val().user;

                // make sure duplicates do not show up
                if (document.getElementById(noteData.id)) return;
                console.log(noteData);

                if (noteData.replyingTo === undefined) {
                    if (noteData.isDeleted !== true) {
                        if (noteLoadingIndicator)
                            noteLoadingIndicator.remove();
                        notesContainer.appendChild(noteDiv);
                        currentlyRendering = false;
                    }
                }
            })
        } else if (pathName === "/favorites") {
            database.ref(`users/${auth.currentUser.uid}/favorites/${noteData.id}`).get().then(function (snapshot) {
                if (snapshot.exists()) {
                    if (noteLoadingIndicator)
                        noteLoadingIndicator.remove();
                    notesContainer.appendChild(noteDiv);
                    currentlyRendering = false;
                }
            });
        } else if (pathName === "/note" || pathName.startsWith("/note/") || pathName === "/note.html") {
            let noteId = undefined;

            if (pathName.startsWith("/note/")) {
                noteId = pathName.split("/")[2];
            } else {
                noteId = pageURL.searchParams.get("id");
            }

            if (noteData.replyingTo === noteId) {
                if (noteData.isDeleted !== true) {
                    if (noteLoadingIndicator)
                        noteLoadingIndicator.remove();
                    notesContainer.appendChild(noteDiv);
                    currentlyRendering = false;
                }
            }
        }
    });

    if (newNotesAvailable)
        newNotesAvailable.style.display = "none";
}

// When a new note is added, let the user know.
let initialNoteLoad = true;
// lets get all the initial notes as to prevent a flood of notes being called,
// and being flagged as a "new" note
firebase.database().ref("notes/").once("value").then((snapshot) => {
    initialNoteLoad = false;
});

firebase.database().ref("notes/").on("child_added", (snapshot) => {
    // make sure not to run this on the initial note load
    if (initialNoteLoad) return;

    // continue if its not the initial note load
    const note = snapshot.val();
    if (note.replyingTo === undefined) {
        if (pathName === "/home" || pathName === "/home.html") {
            newNotesAvailable.style.display = "block";
            console.log(note);
        }
    }
});

// we can attach listeners within a function,
// as to prevent race conditions on pages that take longer than a few
// milliseconds to run!
function attachListeners() {
    notesPageRef.on("child_changed", (snapshot) => {
        const data = snapshot.val();

        // Check if any specific field (child) is updated
        if (document.getElementById(`like-${data.id}`)) {
            document.getElementById(`like-${data.id}`).innerHTML = `${faIcon("heart").outerHTML} ${data.likes}`;
        }
        if (document.getElementById(`renote-${data.id}`)) {
            document.getElementById(`renote-${data.id}`).innerHTML = `${faIcon("retweet").outerHTML} ${data.renotes}`;
        }

        firebase.auth().onAuthStateChanged((user) => {
            const uid = user.uid;

            // If user loved the note, update the UI to display that.
            if (data.whoLiked && data.whoLiked[uid]) {
                document.getElementById(`like-${data.id}`).classList.add("liked");
            } else {
                if (document.getElementById(`like-${data.id}`)) {
                    document.getElementById(`like-${data.id}`).classList.remove("liked");
                }
            }

            // If user renoted the note, update the UI to display that.
            if (data.whoRenoted && data.whoRenoted[uid]) {
                document.getElementById(`renote-${data.id}`).classList.add("renoted");
            } else {
                if (document.getElementById(`renote-${data.id}`)) {
                    document.getElementById(`renote-${data.id}`).classList.remove("renoted");
                }
            }
        })
    });
}

document.addEventListener('click', function (event) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;

            if (event.target.classList.contains("likeBtn") || event.target.classList.contains("fa-solid" && "fa-heart")) {
                const likeButton = event.target;
                const noteId = findNoteId(likeButton);

                let pathToUse = null;
                if (notesPageRefString.startsWith("/users/"))
                    pathToUse = `/notes/`;
                else
                    pathToUse = notesPageRefString;

                const loveCountRef = firebase.database().ref(`${pathToUse}/${noteId}/likes`);
                loveCountRef.once("value", (snapshot) => {
                    const data = snapshot.val();
                    let useMainNoteForNotif = null;

                    // see if the notification should link to the main note
                    const pathToUseCutUp = pathToUse.split("/");
                    if (pathToUseCutUp[3])
                        // will always be the 4 slash. e.g. /notes/noteId/replyingTo
                        //                                               ^
                        useMainNoteForNotif = true;

                    firebase.database().ref(`${pathToUse}/${noteId}/whoLiked`).once("value", (snapshot) => {
                        const likedData = snapshot.val();
                        if (likedData && likedData[uid]) {
                            firebase.database().ref(`${pathToUse}/${noteId}`).update({
                                likes: data - 1
                            });

                            firebase.database().ref(`${pathToUse}/${noteId}/whoLiked/${uid}`).remove();
                            // TODO: get this pathName independent... this is hacky
                            const loveBtn = document.getElementById(`like-${noteId}`);
                            if (pathName.startsWith("/u/") && loveBtn) {
                                loveBtn.classList.remove("liked");
                                const renoteCount = parseInt(loveBtn.textContent.trim());
                                loveBtn.innerHTML = `${faIcon("heart").outerHTML} ${renoteCount - 1}`;
                            }
                        } else {
                            firebase.database().ref(`${pathToUse}/${noteId}`).update({
                                likes: data + 1
                            });

                            firebase.database().ref(`${pathToUse}/${noteId}/whoLiked/${uid}`).update({
                                uid: uid
                            });

                            loveCountRef.off();

                            firebase.database().ref(`${pathToUse}/${noteId}`).once("value", (snapshot) => {
                                const whoSentIt_note = snapshot.val();

                                if (user.uid !== whoSentIt_note.whoSentIt) {
                                    firebase.database().ref(`${pathToUse}/${noteId}`).once("value", (snapshot) => {
                                        const getUser = snapshot.val();
                                        sendNotification(getUser.whoSentIt, {
                                            type: "Love",
                                            who: user.uid,
                                            postId: useMainNoteForNotif ? `${pathToUseCutUp[2]}#${noteId}` : noteId,
                                        });
                                    })
                                }
                            })

                            // TODO: get this pathName independent... this is hacky
                            const loveBtn = document.getElementById(`like-${noteId}`);
                            if (pathName.startsWith("/u/") && loveBtn) {
                                loveBtn.classList.add("liked");
                                const renoteCount = parseInt(loveBtn.textContent.trim());
                                loveBtn.innerHTML = `${faIcon("heart").outerHTML} ${renoteCount + 1}`;
                            }
                        }
                    });
                })
            }
        }
    })
});

function findNoteId(likeButton) {
    // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
    return likeButton.closest(".note").id;
};

document.addEventListener('click', function (event) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;

            if (event.target.classList.contains("renoteBtn") || event.target.classList.contains("fa-solid" && "fa-retweet")) {
                const renoteButton = event.target;
                const noteId = findNoteId(renoteButton);

                let pathToUse = null;
                if (notesPageRefString.startsWith("/users/"))
                    pathToUse = `/notes/`;
                else
                    pathToUse = notesPageRefString;

                const renoteCountRef = firebase.database().ref(`${pathToUse}/${noteId}/renotes`);
                renoteCountRef.once("value", (snapshot) => {
                    const data = snapshot.val();
                    let useMainNoteForNotif = null;

                    // see if the notification should link to the main note
                    const pathToUseCutUp = pathToUse.split("/");
                    if (pathToUseCutUp[3])
                        // will always be the 4 slash. e.g. /notes/noteId/replyingTo
                        //                                               ^
                        useMainNoteForNotif = true;

                    firebase.database().ref(`${pathToUse}/${noteId}/whoRenoted`).once("value", (snapshot) => {
                        const renotedData = snapshot.val();
                        if (renotedData && renotedData[uid]) {
                            firebase.database().ref(`${pathToUse}/${noteId}`).update({
                                renotes: data - 1
                            });

                            firebase.database().ref(`${pathToUse}/${noteId}/whoRenoted/${uid}`).remove();
                            firebase.database().ref(`users/${uid}/posts/${noteId}`).remove();
                            // TODO: get this pathName independent... this is hacky
                            const renoteBtn = document.getElementById(`renote-${noteId}`);
                            if (pathName.startsWith("/u/") && renoteBtn) {
                                renoteBtn.classList.remove("renoted");
                                const renoteCount = parseInt(renoteBtn.textContent.trim());
                                renoteBtn.innerHTML = `${faIcon("retweet").outerHTML} ${renoteCount - 1}`;
                            }
                        } else {
                            firebase.database().ref(`${pathToUse}/${noteId}`).update({
                                renotes: data + 1
                            });

                            firebase.database().ref(`${pathToUse}/${noteId}/whoRenoted/${uid}`).update({
                                uid: uid
                            });

                            firebase.database().ref(`users/${uid}/posts/${noteId}`).update({
                                isRenote: true,
                            })

                            unlockAchievement("Express Yourself");

                            renoteCountRef.off();

                            firebase.database().ref(`${pathToUse}/${noteId}`).once("value", (snapshot) => {
                                const whoSentIt_note = snapshot.val();

                                if (user.uid !== whoSentIt_note.whoSentIt) {
                                    firebase.database().ref(`${pathToUse}/${noteId}`).once("value", (snapshot) => {
                                        const getUser = snapshot.val();
                                        sendNotification(getUser.whoSentIt, {
                                            type: "Renote",
                                            who: user.uid,
                                            postId: useMainNoteForNotif ? `${pathToUseCutUp[2]}#${noteId}` : noteId,
                                        });
                                    })
                                }
                            })

                            // TODO: get this pathName independent... this is hacky
                            const renoteBtn = document.getElementById(`renote-${noteId}`);
                            if (pathName.startsWith("/u/") && renoteBtn) {
                                renoteBtn.classList.add("renoted");
                                const renoteCount = parseInt(renoteBtn.textContent.trim());
                                renoteBtn.innerHTML = `${faIcon("retweet").outerHTML} ${renoteCount + 1}`;
                            }
                        }
                    });

                    return;
                })
            }
        }
    })
});

function findNoteId(renoteButton) {
    // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
    return renoteButton.closest(".note").id;
};