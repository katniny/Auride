const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/blockUser", async (req, res) => {
    if (req.method !== "POST")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        let token = null;
        if (typeof req.headers.authorization === "string") {
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1])
                token = parts[1].trim();
        }
        
        // verify token
        let userUidFromRequest = null;
        if (token) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                userUidFromRequest = decodedToken.uid;
            } catch (err) {
                console.error(`Invalid token: ${err}`);
            }
        }

        if (!token || !userUidFromRequest)
            return res.status(403).json({ error: "Must be authenticated." });

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

        // get user data
        let rawUserData = null;
        const userDataRef = await db.ref(`/users/${userUidFromRequest}`).once("value");
        rawUserData = userDataRef.val();

        // get other users data
        let rawOtherUserData = null;
        const otherUserDataRef = await db.ref(`/users/${userUid}`).once("value");
        rawOtherUserData = otherUserDataRef.val();

        // is the user suspended?
        if (rawOtherUserData.suspensionStatus === "suspended")
            return res.status(403).json({ error: "This user is suspended." });
        // is the user deceased?
        if (rawOtherUserData.memorialAccount?.isDeceased)
            return res.status(403).json({ error: "You can't block a deceased user." });

        // does user have them blocked?
        const blocked = rawUserData.blocked || {};
        const blockedKeys = Object.keys(blocked);
        const cleanedUid = String(userUid).trim();
        if (blockedKeys.includes(cleanedUid)) {
            // if so, unblock
            const unblockUser = await db.ref(`/users/${userUidFromRequest}/blocked/${userUid}`).remove();
            return res.status(200).json({ message: "Unblocked successfully." });
        }

        // else, add to blocked list & unfollow
        const blockUser = await db.ref(`/users/${userUidFromRequest}/blocked/${userUid}`).update({
            user: userUid
        });
        
        // decrement follower count and remove from followers IF following
        const following = rawUserData.followingWho || {};
        const followingKeys = Object.keys(following);
        const cleanedFUid = String(userUid).trim();
        const decrementRef = db.ref(`/users/${userUid}/followers`);
        if (followingKeys.includes(cleanedFUid)) {
            // unfollow
            const unfollowUser = await db.ref(`/users/${userUidFromRequest}/followingWho/${userUid}`).update({
                uid: null
            });
            const unfollowUserFromOther = await db.ref(`users/${userUid}/whoFollows/${userUidFromRequest}`).update({
                uid: null
            });

            // decrement follower count
            decrementRef.transaction(currentValue => {
                if (!currentValue) return 0; // if no followers, return 0
                return currentValue - 1; // else, subtract one
            });
        }

        // then, finish
        return res.status(200).json({ message: "User blocked successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to block user." });
    }
});

module.exports = router;