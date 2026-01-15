const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/loveNote", async (req, res) => {
    if (req.method !== "POST")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

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
        const userDataRef = await db.ref(notePath).once("value");
        rawNoteData = userDataRef.val();

        // is the note deleted?
        if (rawNoteData.isDeleted)
            return res.status(403).json({ error: "This note is deleted." });

        // does user follow them?
        // decrement follower count and remove from followers IF following
        const whoLiked = rawNoteData.whoLiked || {};
        const whoLikedKeys = Object.keys(whoLiked);
        const cleanedUid = String(noteId).trim();
        const crementRef = db.ref(`${notePath}/likes`);
        if (whoLikedKeys.includes(userUidFromRequest)) {
            // unlove
            await db.ref(`${notePath}/whoLiked/${userUidFromRequest}`).remove();

            // decrement follower count
            crementRef.transaction(currentValue => {
                return Math.max((currentValue || 0) - 1, 0);
            });

            return res.status(200).json({ message: "User unfollowed successfully." });
        }

        // else, follow
        const loveNote = await db.ref(`${notePath}/whoLiked/${userUidFromRequest}`).update({
            uid: userUidFromRequest
        });

        // increment follower count
        crementRef.transaction(currentValue => {
            return (currentValue || 0) + 1;
        });

        // send love notification
        let userUid = rawNoteData.whoSentIt;
        const notificationIdRef = db.ref(`/users/${userUid}/notifications`).push();
        const notificationId = notificationIdRef.key;
        const unreadNotifsRef = db.ref(`/users/${userUid}/notifications/unread`);
        if (rawNoteData.whoSentIt !== userUidFromRequest) {
            unreadNotifsRef.transaction(currentValue => {
                return (currentValue || 0) + 1;
            });
            const sendNotification = await db.ref(`/users/${userUid}/notifications/${notificationId}`).update({
                type: "Love",
                who: userUidFromRequest,
                postId: noteId
            });
        }

        // then, finish
        return res.status(200).json({ message: "Note loved successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to love note." });
    }
});

module.exports = router;