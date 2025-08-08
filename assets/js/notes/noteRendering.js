import { fetchNoteData } from "./fetchNoteData";
import { renderNoteUI } from "./renderNoteUI";

// create the notes container
const notesContainer = document.createElement("div");
notesContainer.id = "notes";
notesContainer.className = "notes";
document.body.appendChild(notesContainer);

// handle lastCreatedAt, checking if auride is loading notes,
// and batch size
let lastCreatedAt = null;
let loading = false;
const batchSize = 7;

// handle fetching notes on the client-side
// this handles home page notes ONLY!!
function loadNotes(missing = batchSize) {
    if (loading || missing <= 0) return;
    loading = true;

    let query = firebase.database().ref(`/notes`).orderByChild("createdAt");

    if (lastCreatedAt !== null)
        query = query.endAt(lastCreatedAt - 1);

    query = query.limitToLast(missing);

    query.once("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            loading = false;
            return;
        }

        let notesArr = Object.entries(data)
            .map(([key, val]) => ({ key, ...val }))
            .sort((a, b) => b.createdAt - a.createdAt);

        // remove duplicates when paginating
        if (lastCreatedAt !== null) {
            notesArr = notesArr.filter(note => note.createdAt < lastCreatedAt);
        }

        // render newest -> oldest
        // make an array of fetch promises
        const fetchPromises = notesArr.map(note => {
            return fetchNoteData(note.key).then(noteData => ({ note, noteData }));
        });

        // wait for all fetches to finish
        Promise.all(fetchPromises).then(results => {
            let renderedNotes = 0;

            results.forEach(({ note, noteData }) => { // feel free to ignore noteData, just returns success true or false
                // make sure its not a deleted note
                if (note.isDeleted) return;

                // make sure its not a reply
                // TO:DO make specific functions for note, user, search and favorites pages
                if (note.replyingTo) return;

                // const p = document.createElement("p");
                // p.textContent = `Hi, my key is ${note.key} and I have the following text: "${note.text}". Oh, also, I might be a reply: ${note.replyingTo || null}!`;
                // p.style.marginTop = "75px";
                // fragment.appendChild(p);

                // then, fetch user data and display note
                fetchProtectedUserData(note.whoSentIt).then((userData) => {
                    renderNoteUI(note, userData);
                });

                renderedNotes++;
            });

            if (notesArr.length > 0)
                lastCreatedAt = notesArr[notesArr.length - 1].createdAt;

            loading = false;

            // if we skipped any (say deleted notes, private notes, etc.)
            // then fill in the gap
            const stillMissing = missing - renderedNotes;
            if (stillMissing > 0)
                loadNotes(stillMissing);
        });
    });
}

// handle scroll
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10)
        loadNotes();
}

window.addEventListener("scroll", handleScroll);

loadNotes();