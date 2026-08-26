const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/setUsername", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get display name value
        const newUsername = req.body.username;

        // double-checks!
        // make sure the note text or file exists
        if (newUsername.trim() === "")
            return res.status(403).json({ error: "Your username can't be empty!" });

        // if okay, make sure display name isnt forbidden
        if (newUsername.toLowerCase() === "ghost")
            return res.status(403).json({ error: "Forbidden display name." });

        // make sure display name isnt too long
        if (newUsername.length > 20)
            return res.status(403).json({ error: "Your username is too long, please use 20 characters or less." });

        // make sure username doesnt have illegal characters
        const hasIllegalCharacters = /[^a-z0-9_]/.test(newUsername);
        if (hasIllegalCharacters)
            return res.status(403).json({ error: "Illegal character(s). Auride supports lowercase letters, numbers, and underscores only." });

        // make sure username doesnt exist
        const usernameExists = (await db.ref(`/taken-usernames/${newUsername}`).once("value")).exists();
        if (usernameExists)
            return res.status(403).json({ error: "Username taken." });

        // else, if all good, make sure username gets taken and set it as users username
        await db.ref(`/taken-usernames/${newUsername}`).update({
            user: ctx.currentUser.uid
        });
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            username: newUsername
        });

        // then, finish
        return res.status(200).json({ success: "Username set successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});