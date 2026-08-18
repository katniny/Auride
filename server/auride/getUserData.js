const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

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

        // filter data
        const returnedUserData = {
            activeContributor: rawUserData.activeContributor || false,
            achievements: rawUserData.achievements || null,
            banner: rawUserData.banner || null,
            bio: rawUserData.bio || "No user bio provided.",
            display: rawUserData.display || "Deleted user",
            followers: rawUserData.followers || 0,
            following: rawUserData.following || 0,
            followingWho: rawUserData.followingWho || null,
            pfp: rawUserData.pfp || null,
            pronouns: rawUserData.pronouns || null,
            username: rawUserData.username || "ghost",
            whoFollows: rawUserData.whoFollows || null,
            isSubscribed: rawUserData.isSubscribed || false,
            isVerified: rawUserData.isVerified || false,
            notes: rawUserData.posts || null,
            memorialAccount: {
                isDeceased: rawUserData.memorialAccount?.isDeceased || false,
                obituary: rawUserData.memorialAccount?.obituary || null
            },
            uid: userUid
        };
        
        // get join date
        const userAuthAdmin = await admin.auth().getUser(userUid);
        returnedUserData.joinedAt = userAuthAdmin.metadata.creationTime;

        // is user blocked?
        const blocked = rawUserData.blocked || {};
        const blockedKeys = Object.keys(blocked);
        const cleanedUid = String(ctx.currentUser.uid).trim();
        if (blockedKeys.includes(cleanedUid)) {
            // if so, certain data needs filtered
            returnedUserData.achievements = null;
            returnedUserData.followingWho = null;
            returnedUserData.whoFollows = null;
            returnedUserData.notes = null;
            // then tell the client they're blocked
            returnedUserData.requestedUserHasBlocked = true;
        }
        
        // is user themselves?
        if (userUid === ctx.currentUser.uid) {
            // if so, we can return some additional data
            returnedUserData.autoplayVideos = rawUserData?.autoplayVideos;
            returnedUserData.flagPrefs = rawUserData?.flagPrefs;
            returnedUserData.suspended = ctx.currentUser.suspension;
        }

        return res.status(200).json({ success: returnedUserData });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});