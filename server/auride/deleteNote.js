// TODO: test me! i dont know if i work!
const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");
const { isAdmin } = require("./functions/checkIfAdmin.js");

auride.delete("/api/auride/deleteNote", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get the note id
        const noteIdHeader = req.headers.noteid;
        if (!noteIdHeader)
            return res.status(400).json({ error: "No node ID provided." });

        // if the header contains a slash, treat it as "noteViewId/noteId"
        // else, its a standalone note
        let noteIdToDelete = null;
        let hasParent = null;
        if (noteIdHeader.includes("/")) {
            const [noteViewId, replyId] = noteIdHeader.split("/");
            noteIdToDelete = replyId || noteViewId;
            hasParent = replyId ? noteViewId : null;
        } else
            noteIdToDelete = noteIdHeader;
        
        // create db path
        let dbPath = null;
        if (hasParent)
            dbPath = `/notes/${hasParent}/notesReplying/${noteIdToDelete}`;
        else
            dbPath = `/notes/${noteIdToDelete}`;

        // check if admin
        const isUserAdmin = isAdmin(ctx.currentUser.uid);

        // does requested uid own the note or is the user an admin?
        db.ref(dbPath).once("value", snapshot => {
            const data = snapshot.val();
            const whoSentIt = data.whoSentIt;

            if (whoSentIt === ctx.currentUser.uid || isUserAdmin) {
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
                    return res.status(200).json({ success: "Note deleted successfully." });
                }).catch((error) => {
                    return res.status(400).json({ error: error.message });
                });
            } else {
                return res.status(403).json({ error: "You're not authorized to delete this note." });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});