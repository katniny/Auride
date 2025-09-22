const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.get("/api/auride/getNoteData", async (req, res) => {
    try {
        const { endBefore, limit } = req.query;
        const notesRef = db.ref("notes");

        let query = notesRef.orderByKey();

        // if we have an endBefore, we want our db to, well, endBefore the ID
        if (endBefore)
            query = query.endBefore(endBefore);

        // if limit, make sure we only return that amount of notes
        if (limit && limit > 1)
            query = query.limitToLast(parseInt(limit, 10));
        else
            res.status(500).json({ error: "Please load 2 or more notes." });

        // then, get the snapshot
        const snapshot = await query.once("value");

        // parse the notesArray to return
        const notesArray = [];
        snapshot.forEach(childSnapshot => {
            const note = childSnapshot.val();

            // is it a reply? if so, ignore it
            // note: replyingTo IS depreciated, however, older forks of auride may still have notes 
            // that contain replyingTo.
            // if you do, please go to /upgrading/upgradeReplies.js, we end support for this soon!
            // TODO: end support for replyingTo
            if (note.replyingTo)
                return;

            // is it deleted? if so, ignore it
            if (note.isDeleted)
                return;

            // else, continue
            note.key = childSnapshot.key;
            notesArray.push(note);
        });

        // return :)
        res.json(notesArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch notes." });
    }
});

module.exports = router;