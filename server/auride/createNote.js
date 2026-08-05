const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");

auride.post("/api/auride/createNote", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get note values
        const noteId = req.body.noteId;
        const noteText = req.body.text;
        const noteFilePath = req.body.filepath;
        const nsfwFlag = req.body.nsfwFlag;
        const sensitiveFlag = req.body.sensitiveFlag;
        const politicalFlag = req.body.politicalFlag;
        const musicId = req.body.musicId;
        const replyingTo = req.body.replyingTo;

        // double-checks!
        // make sure the note text or file exists
        if (noteText.trim() === "" && !noteFilePath)
            return res.status(403).json({ error: "Your note can't be empty!" });

        // make sure the note isnt too logn
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
            // FIXME: why is the client creating ids?? i have no idea why i did this
            // we should do this server-side!!!!
            const doesNoteExistDbRef = db.ref(`${notePath}/${noteId}`);
            const noteExistsSnapshot = await doesNoteExistDbRef.once("value");
            if (noteExistsSnapshot.exists())
                return res.status(403).json({ error: "A note with this ID already exists!" });

            // finally, check if the note ID is 20 characters and starts with a dash
            // FIXME: see FIXME above
            if (!noteId.startsWith("-") || noteId.length !== 20)
                return res.status(403).json({ error: "Requested note ID isn't valid." });

            // finally, write
            const dbRef = db.ref(`${notePath}/${noteId}`);
            const currentTime = admin.database.ServerValue.TIMESTAMP;
            dbRef.update({
                createdAt: currentTime,
                text: noteText || null,
                whoSentIt: ctx.currentUser.uid,
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

            // if theres a @mention in the text, check if the username exists
            // if it does, push it as a notification
            const usernameRegex = /@(\w+)/g;
            const matches = [...noteText.matchAll(usernameRegex)];
            if (matches.length > 0) {
                const usernames = matches.map(match => match[1]);
                usernames.forEach(async username => {
                    // if the username exists in the db, we can send them a notification
                    const isUsername = await db.ref(`/taken-usernames/${username}`).once("value");
                    if (isUsername.exists()) {
                        // get userid
                        const userId = isUsername.val();

                        // where should the notification go?
                        // push it correctly
                        let notificationLocation;
                        if (validReply)
                            notificationLocation = `${replyingTo}#${noteId}`;
                        else
                            notificationLocation = `${noteId}`;

                        // push notification
                        sendNotification(userId.user, ctx.currentUser.uid, "Mention", notificationLocation);
                    }
                });
            }

            // add to user notes, unless its a reply
            // TODO: we want a "replies" filter on user profiles one day, so we'll need to track replies too
            const userDbRef = db.ref(`users/${ctx.currentUser.uid}/posts/${noteId}`);
            if (!validReply)
                userDbRef.update({
                    "isRenote": false
                });

            // if its a valid reply, increment the reply count & give original poster a notification
            if (validReply) {
                // add replyingTo
                dbRef.update({
                    "replyingTo": replyingTo || null
                });

                // increment reply count
                const crementRef = db.ref(`/notes/${replyingTo}/replies`);
                await crementRef.transaction(currentValue => {
                    return (currentValue || 0) + 1;
                });

                // push notification
                sendNotification(rawNoteData.whoSentIt, ctx.currentUser.uid, "Reply", replyingTo);
            }

            // then, finish
            return res.status(200).json({ success: "Note sent successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});