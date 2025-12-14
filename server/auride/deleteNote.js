const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.delete("/api/auride/deleteNote", async (req, res) => {
    if (req.method !== "DELETE")
        return res.status(403).json({ error: "This method can only be accessed via DELETE." });

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

        if (!token || !userUidFromRequest)
            return res.status(403).json({ error: "Must be authenticated." });

        // now that user is authenticated (assuming there is one), continue
        // get the note id
        const noteIdHeader = req.headers.noteid;
        if (!noteIdHeader)
            return res.status(400).json({ error: "No note ID provided." });
        
        // if the header contains a slash, treat it as "noteViewId/noteId"
        // else, its a standalone note
        let noteIdToDelete = null;
        let hasParent = null;
        if (noteIdHeader.includes("/")) {
            const [noteViewId, replyId] = noteIdHeader.split("/");
            noteIdToDelete = replyId || noteViewId;
            hasParent = replyId ? noteViewId : null;
        } else {
            noteIdToDelete = noteIdHeader;
        }

        // create db path
        let dbPath = null;
        if (hasParent)
            dbPath = `/notes/${hasParent}/notesReplying/${noteIdToDelete}`;
        else
            dbPath = `/notes/${noteIdToDelete}`;
        
        // get admin uids
        const adminUids = process.env.ADMIN_ACCOUNT_UIDS.split(",");

        // does requested uid own the note or is the user an admin?
        db.ref(dbPath).once("value", snapshot => {
            const data = snapshot.val();
            const whoSentIt = data.whoSentIt;

            if (whoSentIt === userUidFromRequest || adminUids.includes(userUidFromRequest)) {
                // finally, request db deletion
                db.ref(dbPath).remove().then(() => {
                    // if has parent node, subtract replies by one
                    if (hasParent) {
                        db.ref(`notes/${hasParent}/replies`).transaction((currentValue) => {
                            // if somehow null/undefined, treat it as 0
                            return (currentValue || 0) - 1;
                        }).then(() => {
                            console.log("Successfully updated replies for parent note.");
                        }).catch((error) => {
                            console.log(error.message);
                            return res.status(400).json({ error: "Error updating replies for parent note." });
                        });
                    }

                    return res.status(200).json({ message: "Note deleted successfully." });
                }).catch((error) => {
                    return res.status(400).json({ error: error.message });
                });
            } else {
                return res.status(403).json({ error: "You're not authorized to delete this note." });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete note." });
    }
});

module.exports = router;