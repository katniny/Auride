const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const storedUsers = require("../core/userCache.js");
const { returnUserData } = require("./functions/returnUserData.js");

auride.get("/api/auride/getUserData", {
    requireActiveAccount: false,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get request type - if it's "username", we'll need to get the users uid
        const userIdentifier = req.headers.useridentifier;
        const reqType = req.headers.reqtype;

        // do userIdentifier and reqType exist?
        if (!userIdentifier)
            return res.status(400).json({ error: "Please provide a UID or username." });
        if (!reqType || reqType !== "username" && reqType !== "uid")
            return res.status(400).json({ error: "We need to know your request type!" });

        let userUid = null;
        if (reqType === "username") {
            const dbRef = await db.ref(`/taken-usernames/${userIdentifier}`).once("value");

            // if dbRef doesnt exist, throw an error!
            if (!dbRef.exists()) {
                console.log("no user with uid/username");
                return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });
            }

            // else, continue
            userUid = dbRef.val().user;
        } else {
            userUid = userIdentifier;
        }

        // double check, is the uid valid?
        if (!userUid) {
            console.log("no user with uid/username [2]");
            return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });
        }

        // do we have it in ram? if so, just load that
        const userInRam = storedUsers.get(userUid);
        if (userInRam)
            return res.status(200).json({ success: await returnUserData(userInRam, userUid, ctx) });

        // is the user requesting the data suspended? if so, dont return any user data for them
        if (userUid !== ctx.currentUser.uid && ctx.currentUser.suspension?.suspended)
            return res.status(403).json({ error: "Cannot access other users data when suspended." });

        // finally, lets get the user data
        let rawUserData = null;
        const userDataRef = await db.ref(`/users/${userUid}`).once("value");
        rawUserData = userDataRef.val();
        
        // is the user suspended?
        if (rawUserData.suspensionStatus === "suspended" && userUid !== ctx.currentUser.uid)
            return res.status(403).json({ error: "This user is suspended." });

        const returnedUserData = await returnUserData(rawUserData, userUid, ctx);

        // load into ram
        await storedUsers.set(userIdentifier, rawUserData );

        return res.status(200).json({ success: returnedUserData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});