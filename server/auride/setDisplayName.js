const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/setDisplayName", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get display name value
        const newDisplay = req.body.displayName;

        // double-checks!
        // make sure the note text or file exists
        if (newDisplay.trim() === "")
            return res.status(403).json({ error: "Your display name can't be empty!" });

        // if okay, make sure display name isnt forbidden
        if (newDisplay.toLowerCase() === "deleted user")
            return res.status(403).json({ error: "Forbidden display name." });

        // make sure display name isnt too long
        if (newDisplay.length > 25)
            return res.status(403).json({ error: "Your display name is too long, please use 25 characters or less." });

        // if all else is okay, set it as the users new display name
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            display: newDisplay
        });

        // then, finish
        return res.status(200).json({ success: "Display name set successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});