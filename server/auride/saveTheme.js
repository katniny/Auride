const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");
const { giveAchievement } = require("./functions/unlockAchievement.js");

auride.post("/api/auride/saveTheme", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get note values
        const bypassThemeCheck = req.body.bypassThemeCheck;
        const colors = req.body.colors;
        const themeName = req.body.themeName;

        if (!colors)
            return res.status(400).json({ error: "Please provide colors for your theme!" });
        if (!themeName.trim() === "" || !themeName)
            return res.status(400).json({ error: "Please provide a name for your theme!" });

        // check character limit
        if (themeName.length > 30)
            return res.status(400).json({ error: "The max character limit is 30." });

        // check if theme exists
        const themeExists = (await db.ref(`users/${ctx.currentUser.uid}/savedThemes/${themeName}`).once("value")).exists();
        if (themeExists && !bypassThemeCheck)
            return res.status(409).json({ error: "A theme with this name already exists." });

        // save theme
        db.ref(`users/${ctx.currentUser.uid}/savedThemes/${themeName}`).update({
            version: 2,
            name: themeName,
            colors: colors
        });
        
        return res.status(200).json({ success: "Theme saved successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});