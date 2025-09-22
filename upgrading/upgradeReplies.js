// if you have an instance of Auride that runs old notes
// before September 15, 2025 that hosts replies,
// please run this script to upgrade your replies from our old form
// (which is running through every /note/ entry looking for the replyingTo value)
// to our new method!

// run npm install to install dependencies for this script
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-transsocial-test-default-rtdb.firebaseio.com"
});

const db = admin.database();

async function migrateReplies() {
    try {
        // get the notes, assuming there are any
        const notesSnap = await db.ref("/notes").once("value");
        if (!notesSnap.exists()) {
            console.log("No notes exist.");
            return;
        }

        // then, migrate notes
        const notes = notesSnap.val();
        for (const noteId in notes) {
            const note = notes[noteId];
            if (note.replyingTo) {
                const parentId = note.replyingTo;
                const replyRef = db.ref(`/notes/${parentId}/notesReplying`).push();
                await replyRef.set({
                    id: noteId,
                    ...note
                });

                // now remove the old entry
                await db.ref(`/notes/${noteId}`).remove();

                console.log(`Moved note ${noteId} under replies of ${parentId}!`);
            } else {
                console.log("Not a reply! Skipping.");
            }
        }

        console.log("Finished migrating replies!");
    } catch (err) {
        console.error("Error migration replies: ", err);
    }
}

migrateReplies();