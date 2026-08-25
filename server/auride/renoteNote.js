const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");
const { giveAchievement } = require("./functions/unlockAchievement.js");

auride.post("/api/auride/renoteNote", {
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

        // has user already renoted?
        // decrement renote count and remove from renoters IF renoted
        const whoRenoted = rawNoteData.whoRenoted || {};
        const whoRenotedKeys = Object.keys(whoRenoted);
        const cleanedUid = String(noteId).trim();
        const crementRef = db.ref(`${notePath}/renotes`);
        if (whoRenotedKeys.includes(ctx.currentUser.uid)) {
            // unrenote
            await db.ref(`${notePath}/whoRenoted/${ctx.currentUser.uid}`).remove();

            // decrement follower count
            crementRef.transaction(currentValue => {
                return Math.max((currentValue || 0) - 1, 0);
            });

            return res.status(200).json({ success: "Note unrenoted successfully." });
        }

        // else, renote
        const renoteNote = await db.ref(`${notePath}/whoRenoted/${ctx.currentUser.uid}`).update({
            uid: ctx.currentUser.uid
        });

        // increment renote count
        crementRef.transaction(currentValue => {
            return (currentValue || 0) + 1;
        });

        // send renote notification
        sendNotification(rawNoteData.whoSentIt, ctx.currentUser.uid, "Renote", noteId);

        // unlock achievement
        let expressYourselfAchievementInfo;
        if (rawNoteData.whoSentIt !== ctx.currentUser.uid)
            expressYourselfAchievementInfo = await giveAchievement(ctx.currentUser.uid, "expressYourself");

        // then, finish
        return res.status(200).json({ success: "Note renoted successfully.", achievement: { expressYourself: expressYourselfAchievementInfo } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});