const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/renoteNote", async (req, res) => {
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
        // get request type -- if it's "username", we'll need to get the users uid
        const noteId = req.headers.noteid;

        // does noteId exist?
        if (!noteId)
            return res.status(400).json({ error: "Please provide a note ID." });

        // get note data
        let rawNoteData = null;
        const userDataRef = await db.ref(`/notes/${noteId}`).once("value");
        rawNoteData = userDataRef.val();

        // is the user suspended?
        if (rawNoteData.isDeleted)
            return res.status(403).json({ error: "This note is deleted." });

        // does user follow them?
        // decrement follower count and remove from followers IF following
        const whoRenoted = rawNoteData.whoRenoted || {};
        const whoRenotedKeys = Object.keys(whoRenoted);
        const cleanedUid = String(noteId).trim();
        const crementRef = db.ref(`/notes/${noteId}/renotes`);
        if (whoRenotedKeys.includes(userUidFromRequest)) {
            // unrenote
            await db.ref(`/notes/${noteId}/whoRenoted/${userUidFromRequest}`).remove();

            // decrement follower count
            crementRef.transaction(currentValue => {
                return Math.max((currentValue || 0) - 1, 0);
            });

            return res.status(200).json({ message: "User unfollowed successfully." });
        }

        // else, follow
        const renoteNote = await db.ref(`/notes/${noteId}/whoRenoted/${userUidFromRequest}`).update({
            uid: userUidFromRequest
        });

        // increment follower count
        crementRef.transaction(currentValue => {
            return (currentValue || 0) + 1;
        });

        // send renote notification
        let userUid = rawNoteData.whoSentIt;
        const notificationIdRef = db.ref(`/users/${userUid}/notifications`).push();
        const notificationId = notificationIdRef.key;
        const unreadNotifsRef = db.ref(`/users/${userUid}/notifications/unread`);
        if (rawNoteData.whoSentIt !== userUidFromRequest) {
            unreadNotifsRef.transaction(currentValue => {
                return (currentValue || 0) + 1;
            });
            const sendNotification = await db.ref(`/users/${userUid}/notifications/${notificationId}`).update({
                type: "Renote",
                who: userUidFromRequest,
                postId: noteId
            });
        }

        // then, finish
        return res.status(200).json({ message: "Note renoted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to renote note." });
    }
});

module.exports = router;