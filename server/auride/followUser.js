const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/followUser", async (req, res) => {
    if (req.method !== "POST")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

        // verify token (if there is one)
        let userUidFromRequest = null;
        if (token) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            userUidFromRequest = decodedToken.uid;
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
            return res.status(403).json({ error: "You can't follow a deceased user." });

        // does user follow them?
        // decrement follower count and remove from followers IF following
        const following = rawUserData.followingWho || {};
        const followingKeys = Object.keys(following);
        const cleanedUid = String(userUid).trim();
        const crementRef = db.ref(`/users/${userUid}/followers`);
        if (followingKeys.includes(cleanedUid)) {
            // unfollow
            const unfollowUser = await db.ref(`/users/${userUidFromRequest}/followingWho/${userUid}`).update({
                uid: null
            });
            const unfollowUserFromOther = await db.ref(`users/${userUid}/whoFollows/${userUidFromRequest}`).update({
                uid: null
            });

            // decrement follower count
            crementRef.transaction(currentValue => {
                if (!currentValue) return 0; // if no followers, return 0
                return currentValue - 1; // else, subtract one
            });

            return res.status(200).json({ message: "User unfollowed successfully." });
        }

        // else, follow
        const followUser = await db.ref(`/users/${userUidFromRequest}/followingWho/${userUid}`).update({
            uid: userUid
        });
        const followUserFromOther = await db.ref(`users/${userUid}/whoFollows/${userUidFromRequest}`).update({
            uid: userUidFromRequest
        });

        // increment follower count
        crementRef.transaction(currentValue => {
            if (!currentValue) return 1; // if no followers, return 1
            return currentValue + 1; // else, add one
        });

        // send follow notification
        const notificationIdRef = db.ref(`/users/${userUid}/notifications`).push();
        const notificationId = notificationIdRef.key;
        const unreadNotifsRef = db.ref(`/users/${userUid}/notifications/unread`);
        unreadNotifsRef.transaction(currentValue => {
            if (!currentValue) return 1; // if no notifications, return 1
            return currentValue + 1; // else, add one
        });
        const sendNotification = await db.ref(`/users/${userUid}/notifications/${notificationId}`).update({
            type: "Follow",
            who: userUidFromRequest
        });

        // then, finish
        return res.status(200).json({ message: "User followed successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to follow user." });
    }
});

module.exports = router;