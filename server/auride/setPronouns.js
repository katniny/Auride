const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/setPronouns", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get display name value
        const newPronouns = req.body.pronouns;

        // double-checks!
        // make sure pronouns arent too long
        if (newPronouns.length > 15)
            return res.status(403).json({ error: "Your pronouns are too long, please use 15 characters or less." });

        // if all else is okay, set it as the users new display name
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            pronouns: newPronouns
        });

        // then, finish
        return res.status(200).json({ success: "Pronouns set successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});