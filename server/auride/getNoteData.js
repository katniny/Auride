const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.get("/api/auride/getNoteData", {
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        const { endBefore, limit, path, onlyFollowing } = req.query;
        const onlyFollowingBool = onlyFollowing === "true";

        // if theres a path, use that for the db. else, use notes
        if (path)
            notesRef = db.ref(path);
        else
            notesRef = db.ref("notes");

        let query = notesRef.orderByKey();

        // if we have an endBefore, we want our db to endBefore the id
        if (endBefore)
            query = query.endBefore(endBefore);

        // if limit, make sure we only return that amount of notes
        if (limit && limit > 1)
            query = query.limitToLast(parseInt(limit * 2, 10)); // double it to increase chances of getting full limit - TODO: ensure we reach limit if possible without this hack
        else
            return res.status(403).json({ error: "Please load 2 or more notes." });

        // then get the snapshot
        const snapshot = await query.once("value");

        // parse the notesArray to return
        // and promises, if necessary!
        const notesArray = [];
        const promises = [];

        snapshot.forEach(childSnapshot => {
            const note = childSnapshot.val();

            // function, since this code is repeated more than once
            function fetchFullNote(childNote) {
                promises.push((async () => {
                    const snap = await db.ref(`notes/${childNote.key}`).once("value");
                    const fullNote = snap.val();

                    if (!fullNote)
                        return;
                    fullNote.key = childNote.key;

                    // ignore reply and deletion.. details below
                    if (fullNote.replyingTo && !path.startsWith("/notes/-"))
                        return;
                    if (fullNote.isDeleted)
                        return;
                    const userData = (await db.ref(`users/${fullNote.whoSentIt}`).once("value")).val();
                    if (!userData || userData.username === undefined || userData.display === undefined)
                        return;

                    // ignore if onlyFollowing is true and user is not following
                    const followers = userData.whoFollows || {};
                    if (onlyFollowingBool && !followers[ctx.currentUser.uid])
                        return;

                    notesArray.push(fullNote);
                })());
            }

            // check.. is it notes from a user profile or favorite?
            if (note.isRenote != null || note.favorited != null)
                fetchFullNote(childSnapshot);

            // is it a reply? if so, ignore it
            // note: replyingTo IS deprecated, however, older forks of auride may still have notes
            // that contain replyingTo.
            // if you do, please go to /upgrading/upgradeReplies.js, we end support for this soon!
            // TODO: end support for replyingTo
            if (note.replyingTo && !path.startsWith("/notes/-"))
                return;
            // is it deleted? if so, ignore it
            if (note.isDeleted)
                return;

            promises.push((async () => {
                const userData = (await db.ref(`users/${note.whoSentIt}`).once("value")).val();
                if (!userData || userData.username === undefined || userData.display === undefined)
                    return; // they dont exist, or we shouldnt render their note anyways

                // if the user only wants following users, lets check if
                // they follow this user
                const followers = userData.whoFollows || {};
                if (onlyFollowingBool && !followers[ctx.currentUser.uid])
                    return;

                // else, continue
                note.key = childSnapshot.key;
                notesArray.push(note);
            })());
        });
        await Promise.all(promises);

        // return :)
        res.json({ success: notesArray });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});