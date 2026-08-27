const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/setBio", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get bio value
        const newBio = req.body.bio;

        // double-checks!
        // make sure pronouns arent too long
        if (newBio.length > 500)
            return res.status(403).json({ error: "Your bio is too long, please use 500 characters or less." });

        // if all else is okay, set it as the users new display name
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            bio: newBio
        });

        // then, finish
        return res.status(200).json({ success: "Bio set successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});