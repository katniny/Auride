const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/createNote", async (req, res) => {
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
        // get values
        const noteId = req.headers.noteid;
        const noteText = req.headers.text;
        const noteFilePath = req.headers.filepath;
        const nsfwFlag = req.headers.nsfwflag;
        const sensitiveFlag = req.headers.sensitiveflag;
        const politicalFlag = req.headers.politicalflag;
        const musicId = req.headers.musicid;
        const replyingTo = req.headers.replyingto;

        // double-checks!
        // make sure the note text or file exists
        if (noteText.trim() === "" && !noteFilePath)
            return res.status(403).json({ error: "Your note can't be empty!" });

        // make sure the note isnt too long
        if (noteText.length > 1250)
            return res.status(403).json({ error: "Your note is too long. Only 1,250 characters or less is permitted." });

        // if replying, check if note exists & update path
        let notePath;
        let validReply = false;
        let rawNoteData = null;
        if (replyingTo && replyingTo !== "undefined") {
            const replyingToNoteExists = db.ref(`notes/${replyingTo}`);
            const snapshot = await replyingToNoteExists.once("value");
            rawNoteData = snapshot.val();
            if (snapshot.exists()) {
                notePath = `notes/${replyingTo}/notesReplying`;
                validReply = true;
            } else
                return res.status(400).json({ error: "The note you're attempting to reply to doesn't exist." });
        } else
            notePath = "notes";

        // check if the path exists already
        const doesNoteExistDbRef = db.ref(`${notePath}/${noteId}`);
        const noteExistsSnapshot = await doesNoteExistDbRef.once("value");
        if (noteExistsSnapshot.exists())
            return res.status(403).json({ error: "A note with this ID already exists!" });
        
        // finally, check if the note ID is 20 characters and starts with a dash
        if (!noteId.startsWith("-") || noteId.length !== 20)
            return res.status(403).json({ error: "Requested note ID isn't valid." });

        // finally, write
        const dbRef = db.ref(`${notePath}/${noteId}`);
        const currentTime = admin.database.ServerValue.TIMESTAMP;
        dbRef.update({
            createdAt: currentTime,
            text: noteText || null,
            whoSentIt: userUidFromRequest,
            id: noteId,
            likes: 0,
            renotes: 0,
            replies: 0,
            isNsfw: nsfwFlag || null,
            isSensitive: sensitiveFlag || null,
            isPolitical: politicalFlag || null,
            alt: "" || null,
            media: {
                "numOne": noteFilePath || null
            },
            music: musicId || null,
        });
        
        // add to user notes, unless its a reply
        const userDbRef = db.ref(`users/${userUidFromRequest}/posts/${noteId}`);
        if (!validReply)
            userDbRef.update({
                "isRenote": false
            });

        // if its a valid reply, increment the reply count & give original poster a notification
        if (validReply) {
            // add replyingTo
            dbRef.update({
                "replyingTo": replyingTo || null
            })

            // increment
            const crementRef = db.ref(`/notes/${replyingTo}/replies`);
            await crementRef.transaction(currentValue => {
                return (currentValue || 0) + 1;
            });

            // push notification
            const userUid = rawNoteData.whoSentIt;
            const notificationIdRef = db.ref(`/users/${userUid}/notifications`).push();
            const notificationId = notificationIdRef.key;
            const unreadNotifsRef = db.ref(`/users/${userUid}/notifications/unread`);
            if (rawNoteData.whoSentIt !== userUidFromRequest) {
                // increase notification count
                unreadNotifsRef.transaction(currentValue => {
                    return (currentValue || 0) + 1;
                });
                // send notification itself
                const sendNotification = await db.ref(`/users/${userUid}/notifications/${notificationId}`).update({
                    type: "Reply",
                    who: userUidFromRequest,
                    postId: replyingTo
                });
            }
        }

        // then, finish
        return res.status(200).json({ message: "Note sent successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to love note." });
    }
});

module.exports = router;