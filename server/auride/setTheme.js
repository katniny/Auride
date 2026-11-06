const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/setTheme", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get values
        const newTheme = req.body.theme;
        const customThemeColors = req.body.customColors;

        // double-checks!
        // make sure theme & custom theme colors are available (if applicable)
        if (!newTheme)
            return res.status(400).json({ error: "No theme selected." });
        if (newTheme === "Custom" && !customThemeColors)
            return res.status(400).json({ error: "Custom theme selected, but no colors!" });

        // if all good, apply theme
        db.ref(`users/${ctx.currentUser.uid}`).update({
            theme: newTheme,
            themeColors: customThemeColors
        });

        // then, finish
        return res.status(200).json({ success: "Theme set successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});