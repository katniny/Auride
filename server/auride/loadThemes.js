const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.get("/api/auride/loadThemes", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get their themes
        const themes = await db.ref(`users/${ctx.currentUser.uid}/savedThemes`).once("value");

        return res.status(200).json({ success: themes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});