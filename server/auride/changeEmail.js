const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const auth = admin.auth();

auride.post("/api/auride/changeEmail", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get new email
        const newEmail = req.body.email;

        // if user reauthenticated in the past 30 seconds,
        // allow email change
        const thirtySeconds = 30 * 1000;
        const authTime = ctx.currentUser.lastAuth * 1000;
        if (Date.now() - authTime > thirtySeconds) {
            return res.status(401).json({ error: "Please reauthenticate." });
        }

        // is email a valid format?
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail))
            return res.status(400).json({ error: "Please enter a valid email address." });

        // change email
        await auth.updateUser(ctx.currentUser.uid, {
            email: newEmail
        });
        await db.ref(`/users/${ctx.currentUser.uid}`).update({
            email: newEmail
        });

        // then, finish
        return res.status(200).json({ success: "Email changed successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});