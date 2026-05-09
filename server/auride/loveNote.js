const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");

auride.post("/api/auride/loveNote", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get the note id & if the note has a parent id
        const noteId = req.headers.noteid;
        const parentNoteId = req.headers.parentnoteid;

        // does noteId exist?
        if (!noteId)
            return res.status(400).json({ error: "Please provide a note ID." });

        // if the requested note has a parent id, change path
        let notePath;
        if (parentNoteId && parentNoteId !== "undefined" && parentNoteId !== "null")
            notePath = `notes/${parentNoteId}/notesReplying/${noteId}`;
        else
            notePath = `notes/${noteId}`;

        // get note data
        let rawNoteData = null;
        const noteDataRef = await db.ref(notePath).once("value");
        rawNoteData = noteDataRef.val();

        // is the note deleted?
        if (rawNoteData.isDeleted)
            return res.status(403).json({ error: "This note is deleted." });

        // has user loved this note?
        // decrement love count and remove from lovers IF loved
        const whoLoved = rawNoteData.whoLiked || {};
        const whoLovedKeys = Object.keys(whoLoved);
        const crementRef = db.ref(`${notePath}/likes`);
        if (whoLovedKeys.includes(ctx.currentUser.uid)) {
            // unlove
            await db.ref(`${notePath}/whoLiked/${ctx.currentUser.uid}`).remove();

            // decrement love count
            crementRef.transaction(currentValue => {
                return Math.max((currentValue || 0) - 1, 0);
            });

            return res.status(200).json({ success: "Note unloved successfully." });
        }

        // else, love
        const loveNote = await db.ref(`${notePath}/whoLiked/${ctx.currentUser.uid}`).update({
            uid: ctx.currentUser.uid
        });

        // increment love count
        crementRef.transaction(currentValue => {
            return (currentValue || 0) + 1;
        });

        // send love notification
        sendNotification(rawNoteData.whoSentIt, ctx.currentUser.uid, "Love", noteId);

        // then, finish
        return res.status(200).json({ success: "Note loved successfully." });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});