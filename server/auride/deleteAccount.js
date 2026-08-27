const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const auth = admin.auth();

auride.delete("/api/auride/deleteAccount", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // needs to reauth?
        const thirtySeconds = 30 * 1000;
        const authTime = ctx.currentUser.lastAuth * 1000;
        if (Date.now() - authTime > thirtySeconds) {
            return res.status(401).json({ error: "Please reauthenticate." });
        }

        // get username and free it up
        const username = await db.ref(`/users/${ctx.currentUser.uid}/username`).once("value");
        await db.ref(`/taken-usernames/${username.val()}`).remove();

        // remove user from db
        await db.ref(`/users/${ctx.currentUser.uid}`).remove();

        // remove user from auth
        await auth.deleteUser(ctx.currentUser.uid);

        return res.status(200).json({ success: "Account deleted." });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});