const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.get("/api/auride/getUserData", async (req, res) => {
    if (req.method !== "GET")
        return res.status(403).json({ error: "This method can only be accessed via GET." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        let token = null;

        // verify token (if there is one)
        // safely verify token.. randomly broke for non-auth users? should look into this
        let userUidFromRequest = null;
        if (typeof req.headers.authorization === "string") {
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1])
                token = parts[1].trim();
        }

        // now that user is authenticated (assuming there is one), continue
        // get request type -- if it's "username", we'll need to get the users uid
        const userIdentifer = req.headers.useridentifier;
        const reqType = req.headers.reqtype;

        // do userIdentifier and reqType exist?
        if (!userIdentifer)
            return res.status(400).json({ error: "Please provide a UID or username." });
        if (!reqType || reqType !== "username" && reqType !== "uid")
            return res.status(400).json({ error: "We need to know your request type!" });

        let userUid = null;
        if (reqType === "username") {
            const dbRef = await db.ref(`/taken-usernames/${userIdentifer}`).once("value");

            // if dbRef doesnt exist, throw an error!
            if (!dbRef.exists())
                return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });

            // else, continue
            userUid = dbRef.val().user;
        } else {
            userUid = userIdentifer;
        }

        // double check, is the uid valid?
        if (!userUid)
            return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });

        // finally, lets get the user data
        let rawUserData = null;
        const userDataRef = await db.ref(`/users/${userUid}`).once("value");
        rawUserData = userDataRef.val();

        // is the user suspended?
        if (rawUserData.suspensionStatus === "suspended")
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

        // is user blocked?
        const blocked = rawUserData.blocked || {};
        const blockedKeys = Object.keys(blocked);
        const cleanedUid = String(userUidFromRequest).trim();
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
        if (userUid === userUidFromRequest) {
            // if so, we can return some additional data
            returnedUserData.autoplayVideos = rawUserData?.autoplayVideos;
        }

        return res.status(200).json({ returnedUserData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch user data with error: ${err}` });
    }
});

module.exports = router;