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

        // double-checks!
        // make sure the note text or file exists
        if (noteText.trim() === "" && !noteFilePath)
            return res.status(403).json({ error: "Your note can't be empty!" });

        // make sure the note isnt too long
        if (noteText.length > 1250)
            return res.status(403).json({ error: "Your note is too long. Only 1,250 characters or less is permitted." });

        // check if the path exists already
        const doesNoteExistDbRef = db.ref(`notes/${noteId}`);
        const noteExistsSnapshot = await doesNoteExistDbRef.once("value");
        if (noteExistsSnapshot.exists())
            return res.status(403).json({ error: "A note with this ID already exists!" });
        
        
        // finally, check if the note ID is 20 characters and starts with a dash
        if (!noteId.startsWith("-") || noteId.length !== 20)
            return res.status(403).json({ error: "Requested note ID isn't valid." });

        // finally, write
        const dbRef = db.ref(`notes/${noteId}`);
        const currentTime = admin.database.ServerValue.TIMESTAMP;
        dbRef.update({
            createdAt: currentTime,
            text: noteText,
            whoSentIt: userUidFromRequest,
            id: noteId,
            likes: 0,
            renotes: 0,
            replies: 0,
            isNsfw: nsfwFlag,
            isSensitive: sensitiveFlag,
            isPolitical: politicalFlag,
            alt: "",
            media: {
                "numOne": noteFilePath
            },
            music: musicId
        });

        // then, finish
        return res.status(200).json({ message: "Note sent successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to love note." });
    }
});

module.exports = router;