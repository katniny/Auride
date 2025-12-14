const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.get("/api/auride/getSingularNoteData", async (req, res) => {
    if (req.method !== "GET")
        return res.status(403).json({ error: "This method can only be accessed via GET." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        let token = null;
        if (typeof req.headers.authorization === "string") {
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1])
                token = parts[1].trim();
        }

        // verify token
        let userUidFromRequest = null;
        if (token) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                userUidFromRequest = decodedToken.uid;
            } catch (err) {
                console.error(`Invalid token: ${err}`);
            }
        }

        // now that user is authenticated (assuming there is one), continue
        // get the note id
        const noteIdHeader = req.headers.noteid || "";
        if (!noteIdHeader)
            return res.status(400).json({ error: "No note ID provided." });

        // if theres a note id, check if its a reply or not
        const splitNoteIdHeader = await noteIdHeader.split("/");
        let noteId = null;
        let parentId = null;
        let isReply = false;
        if (splitNoteIdHeader[1]) {
            // set the main note as the reply, and parent id as, well, the parent
            noteId = splitNoteIdHeader[1];
            parentId = splitNoteIdHeader[0];
            isReply = true;
        } else
            // else, just set the main noteId as the header
            noteId = splitNoteIdHeader;

        // get note from firebase
        let noteRef = null;
        if (isReply)
            noteRef = db.ref(`notes/${parentId}/notesReplying/${noteId}`);
        else
            noteRef = db.ref(`notes/${noteId}`);

        // make sure it exists
        const snapshot = await noteRef.once("value");
        if (!snapshot.exists())
            return res.status(403).json({ error: "Note not found." });
        const noteData = snapshot.val();

        // if deleted, return
        // this is no longer how we "delete" notes, we actually delete them now, 
        // but this is for compatibility for old auride clients
        if (noteData.isDeleted)
            return res.status(403).json({ error: "This note has been deleted." });
        // if no "whoSentIt", return
        if (!noteData.whoSentIt)
            return res.status(403).json({ error: "We're not sure who sent this note." });

        // check certain user data
        const userData = (await db.ref(`users/${noteData.whoSentIt}`).once("value")).val();
        if (!userData || !userData.display || !userData.username)
            return res.status(403).json({ error: "We're not sure who the user who sent this note is." });
        if (userData.suspensionStatus === "suspended")
            return res.status(403).json({ error: "You can't view a note from a suspended user." });
        
        // then, return note data!
        return res.status(200).json({ returnedNoteData: noteData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch notes." });
    }
});

module.exports = router;