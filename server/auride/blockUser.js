// TODO: test me! i dont know if i work!
const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();

auride.post("/api/auride/blockUser", {
    requireToken: true,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get request type - if it's "username", we'll need to get the users uid
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
            // else continue
            userUid = dbRef.val().user;
        } else {
            userUid = userIdentifer;
        }

        // double check, is the uid valid?
        if (!userUid)
            return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });

        // get user data
        let rawUserData = null;
        const userDataRef = await db.ref(`/users/${ctx.currentUser.uid}`).once("value");
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
            const unblockUser = await db.ref(`/users/${ctx.currentUser.uid}/blocked/${userUid}`).remove();
            return res.status(200).json({ success: "Unblocked successfully." });
        }

        // else, add to blocked list & unfollow
        const blockUser = await db.ref(`/users/${ctx.currentUser.uid}/blocked/${userUid}`).update({
            user: userUid
        });

        // decrement follower count and remove from followers IF following
        const following = rawUserData.followingWho || {};
        const followingKeys = Object.keys(following);
        const cleanedFUid = String(userUid).trim();
        const decrementRef = db.ref(`/users/${userUid}/followers`);
        if (followingKeys.includes(cleanedFUid)) {
            // unfollow
            const unfollowUser = await db.ref(`/users/${ctx.currentUser.uid}`).update({
                uid: null
            });
            const unfollowUserFromOther = await db.ref(`users/${userUid}/whoFollows/${ctx.currentUser.uid}`).update({
                uid: null
            });

            // decrement follower count
            decrementRef.transaction(currentValue => {
                if (!currentvalue)
                    return 0; // if no followers, return 0
                return currentValue - 1;
            });
        }

        // then, finish
        return res.status(200).json({ success: "User blocked successfully." });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});