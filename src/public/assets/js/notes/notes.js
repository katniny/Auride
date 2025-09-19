// TO:DO - seperate this code!
// its just in a new script for 
// 1) code seperation, since i would like to depreciate ts_fas_acih.js
// 2) bug fixing
// but a lot of these should be new scripts!

let notesPageRef = null;
let notesPageRefString = null;

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
    default:
        notesPageRef = firebase.database().ref("pleaseDefinePathInNotesDotJS");
        notesPageRefString = "pleaseDefinePathInNotesDotJS";
        console.log(`
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
let isLoading = false;
let lastNoteKey = null;
let loadedNotesId = [];
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
    // get the notes
    const snapshot = await notesPageRef.limitToLast(25).once("value");

    const notesArray = [];
    const promises = [];

    snapshot.forEach(childSnapshot => {
        const noteKey = childSnapshot.key;
        const val = childSnapshot.val();

        if (val.content || val.createdAt) {
            val.key = noteKey;
            notesArray.push(val);
        } else {
            const p = firebase.database().ref(`/notes/${noteKey}`).once("value").then(snap => {
                if (snap.exists()) {
                    const note = snap.val();
                    note.key = snap.key;
                    notesArray.push(note);
                }
            });
            promises.push(p);
        }
    });

    await Promise.all(promises);

    notesArray.sort((a, b) => b.createdAt - a.createdAt);
    lastNoteKey = notesArray[notesArray.length - 1]?.key;

    renderNotes(notesArray);
}

// infinite loading
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreNotes();
    }
});

async function loadMoreNotes() {
    if (!lastNoteKey) return;

    const snapshot = await notesPageRef.orderByKey().endBefore(lastNoteKey).limitToLast(25).once("value");

    const notesArray = [];
    const promises = [];

    snapshot.forEach(childSnapshot => {
        const noteKey = childSnapshot.key;
        const val = childSnapshot.val();

        if (val.content || val.createdAt) {
            val.key = noteKey;
            notesArray.push(val);
        } else {
            const p = firebase.database().ref(`/notes/${noteKey}`).once("value").then(snap => {
                if (snap.exists()) {
                    const note = snap.val();
                    note.key = snap.key;
                    notesArray.push(note);
                }
            });
            promises.push(p);
        }
    });

    await Promise.all(promises);

    if (notesArray.length > 0) {
        // update lastNoteKey
        notesArray.sort((a, b) => b.createdAt - a.createdAt);
        lastNoteKey = notesArray[notesArray.length - 1]?.key;

        // keep newest at bottom
        renderNotes(notesArray.reverse());
    }
}

// retrieve data from the "notes" node
function renderNotes(notesArray) {
    const notesContainer = document.getElementById("notes");

    if (document.getElementById("newNotesAvailable")) {
        document.getElementById("newNotesAvailable").style.display = "none";
    }

    notesArray.forEach(noteData => {
        let noteDiv = renderNote(noteData);
        if (noteDiv == null) return;
        if (document.getElementById(noteData.id)) return;

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

                if (noteData.whoSentIt === uid) {
                    if (noteData.replyingTo === undefined) {
                        if (noteData.isDeleted !== true) {
                            if (noteLoadingIndicator)
                                noteLoadingIndicator.remove();
                            notesContainer.appendChild(noteDiv);
                        }
                    }
                }
            })
        } else if (pathName === "/favorites") {
            database.ref(`users/${auth.currentUser.uid}/favorites/${noteData.id}`).get().then(function (snapshot) {
                if (snapshot.exists()) {
                    if (noteLoadingIndicator)
                        noteLoadingIndicator.remove();
                    notesContainer.appendChild(noteDiv);
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
                }
            }
        }
    })
}

// When a new note is added, let the user know.
firebase.database().ref("notes/").on("child_added", (snapshot) => {
    const isReply = snapshot.val();
    if (isReply.replyingTo === undefined) {
        if (pathName === "/home" || pathName === "/home.html") {
            document.getElementById("newNotesAvailable").style.display = "block";
        }
    }
})

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
                                            postId: noteId,
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
                                    firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                                        const getUser = snapshot.val();
                                        sendNotification(getUser.whoSentIt, {
                                            type: "Renote",
                                            who: user.uid,
                                            postId: noteId,
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