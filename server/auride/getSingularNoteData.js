const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.get("/api/auride/getSingularNoteData", {
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
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
            // set the main note as the reply, and parent id as the parent
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
        return res.status(200).json({ success: noteData });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});