// just import it as needed - separate so we can
// watch notes as they update and make sure they arent cached
// inappropriately (e.g., still returning a note that was deleted)
//
// TODO: this doesnt matter hugely _now_ due to small userbase, but we should
// clear ones that are unaccessed for a while (whether time or pushed out from queue)!!
const admin = require("firebase-admin");
const db = admin.database();

const storedNotes = new Map();

// watch for child_changed. if we have it, unload from ram
// FIXME: this is lazy, we should put checking notes into a function so we can
// just double-check and update it appropriately
db.ref("/notes").on("child_changed", (snapshot) => {
    // get id
    const noteId = snapshot.key;

    console.log(noteId);

    if (storedNotes.get(noteId)) {
        console.log("Note changed");
        storedNotes.delete(noteId);
    }
});

// watch for child_removed. if we have it, unload from ram
// unlike above, this isnt lazy since deleted notes are removed completely
db.ref("/notes").on("child_removed", (snapshot) => {
    // get id
    const noteId = snapshot.key;

    console.log(noteId);

    if (storedNotes.get(noteId)) {
        console.log("Note removed");
        storedNotes.delete(noteId);
    }
});

module.exports = storedNotes;