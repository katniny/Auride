const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.get("/api/auride/downloadUserData", {
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

        // get data and return
        const userData = await db.ref(`/users/${ctx.currentUser.uid}`).once("value");

        return res.status(200).json({ success: userData.val() });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});