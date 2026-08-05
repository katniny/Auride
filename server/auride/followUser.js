// TODO: test me! i dont know if i work!
const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const { sendNotification } = require("./functions/sendNotification.js");

auride.post("/api/auride/followUser", {
    requireToken: true,
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
            if (!dbRef.exists())
                return res.status(400).json({ error: "Failed to find a user with that selected UID/username." });

            // else, continue
            userUid = dbRef.val().user;
        } else
            userUid = userIdentifier;

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
            return res.status(403).json({ error: "You can't follow a deceased user." });

        // does user follow them?
        // decrement follower count and remove from followers IF following
        const following = rawUserData.followingWho || {};
        const followingKeys = Object.keys(following);
        const cleanedUid = String(userUid).trim();
        const crementRef = db.ref(`/users/${userUid}/followers`);
        if (followingKeys.includes(cleanedUid)) {
            // unfollow
            const unfollowUser = await db.ref(`/users/${ctx.currentUser.uid}/followingWho/${userUid}`).update({
                uid: null
            });
            const unfollowUserFromOther = await db.ref(`users/${userUid}/whoFollows/${ctx.currentUser.uid}`).update({
                uid: null
            });

            // decrement follower count
            crementRef.transaction(currentUser => {
                if (!currentValue)
                    return 0; // if no followers, return 0
                return currentValue - 1; // else, subtract one
            });

            return res.status(200).json({ success: "User unfollowed successfully." });
        }

        // else, follow
        const followUser = await db.ref(`/users/${ctx.currentUser.uid}/followingWho/${userUid}`).update({
            uid: userUid
        });
        const followUserFromOther = await db.ref(`users/${userUid}/whoFollows/${ctx.currentUser.uid}`).update({
            uid: ctx.currentUser.uid
        });

        // increment follower count
        crementRef.transaction(currentValue => {
            if (!currentValue)
                return 1; // if no followers, return 1
            return currentValue + 1; // else, add one
        });

        // send follow notification
        sendNotification(userUid, ctx.currentUser.uid, "Follow");

        // then, finish
        return res.status(200).json({ success: "User followed successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// router.post("/api/auride/followUser", async (req, res) => {
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to follow user." });
//     }
// });

// module.exports = router;