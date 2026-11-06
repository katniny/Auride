const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");
const { giveAchievement } = require("./functions/unlockAchievement.js");

auride.post("/api/auride/publishTheme", {
    rateLimit: 2000,
    requireToken: true
}, async (req, res, ctx) => {
    try {
        // get note values
        const alreadyExistingTheme = req.body.alreadyExistingTheme;
        const colors = req.body.colors;
        const themeName = req.body.themeName;
        const themeDesc = req.body.themeDesc;

        if (!colors)
            return res.status(400).json({ error: "Please provide colors for your theme!" });
        if (!themeName.trim() === "" || !themeName)
            return res.status(400).json({ error: "Please provide a name for your theme!" });

        // check character limit
        if (themeName.length > 30)
            return res.status(400).json({ error: "The max character limit is 30." });
        if (themeDesc?.length > 100)
            return res.status(400).json({ error: "The max character limit is 100." });
        
        // make sure values are okay
        const acceptedValues = [
            "background",
            "banner-button-bg",
            "button-text",
            "button-transparent-hover",
            "content-warning",
            "error-text",
            "header-color",
            "hovered-button-text",
            "like-color",
            "logo-accent-color",
            "logo-base-color",
            "main-color",
            "main-color-darker",
            "note-background",
            "note-seperator",
            "profile-picture-bg",
            "renote-color",
            "reply-background",
            "reply-hovered-background",
            "sidebar-button-border",
            "sidebar-button-hover",
            "sidebar-create-note-button",
            "sidebar-create-note-button-hover",
            "sidebar-text",
            "success-color",
            "text",
            "warning-text"
        ];
        console.log(colors);
        let invalidTheme = false;
        let whatInvalid = null;
        Object.entries(colors).forEach(([colorName, colorValue]) => {
            if (!acceptedValues.includes(colorName)) {
                invalidTheme = true;
                whatInvalid = colorName;
            }
        });

        if (invalidTheme)
            return res.status(403).json({ error: `Invalid color "${whatInvalid}".` });

        // create new id for theme
        let themeId;
        const themesRef = db.ref("themes");
        if (!alreadyExistingTheme) {
            themeId = themesRef.push().key;
        }

        // save theme
        db.ref(`users/${ctx.currentUser.uid}/savedThemes/${themeName}`).update({
            version: 2,
            name: themeName,
            colors: colors,
            published: themeId
        });

        // then publish
        // push
        db.ref(`themes/${themeId}`).update({
            creator: ctx.currentUser.uid,
            themeColors: colors,
            title: colors,
            desc: ""
        });
        
        return res.status(200).json({ success: "Theme published successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});