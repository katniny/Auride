const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.get("/api/auride/getUserNotifications", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // does user want only their notification count or some notifications?
        const typeIdentifier = req.headers.typeidentifier; 

        // does typeIdentifier exist?
        if (!typeIdentifier)
            return res.status(400).json({ error: "Please add what type of notification return you want." });

        // make sure the type exists
        if (typeIdentifier !== "batch" && typeIdentifier !== "count")
            return res.status(400).json({ error: "Please specify a correct return type." });

        // if they want only the count, get it
        let notificationCount;
        const notificationCountRef = await db.ref(`users/${ctx.currentUser.uid}/notifications/unread`).once("value");
        notificationCount = notificationCountRef.val();
        if (typeIdentifier === "count")
            return res.status(200).json({ success: notificationCount });

        // else, they want a batch
        // make sure they dont have a starting point they want
        const lastNotificationKey = req.headers.lastkey;
        let query = db.ref(`/users/${ctx.currentUser.uid}/notifications`).orderByKey();
        
        if (lastNotificationKey)
            query = query.endBefore(lastNotificationKey).limitToLast(16);
        else
            query = query.limitToLast(16);
        
        const snapshot = await query.get();

        // and, since they're requesting a batch, they're viewing their notifications in some way
        // so empty their unread
        notificationCount = 0;
        let notificationClearRef = db.ref(`/users/${ctx.currentUser.uid}/notifications`).update({
            unread: 0
        });

        return res.status(200).json({ success: snapshot });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});