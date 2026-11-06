const admin = require("firebase-admin");

async function returnUserData(userData, userUid, ctx) {
    // filter data
    const returnedUserData = {
        activeContributor: userData.activeContributor || false,
        achievements: userData.achievements || null,
        banner: userData.banner || null,
        bio: userData.bio || "No user bio provided.",
        display: userData.display || "Deleted user",
        followers: userData.followers || 0,
        following: userData.following || 0,
        followingWho: userData.followingWho || null,
        pfp: userData.pfp || null,
        pronouns: userData.pronouns || null,
        username: userData.username || "ghost",
        whoFollows: userData.whoFollows || null,
        isSubscribed: userData.isSubscribed || false,
        isVerified: userData.isVerified || false,
        notes: userData.posts || null,
        memorialAccount: {
            isDeceased: userData.memorialAccount?.isDeceased || false,
            obituary: userData.memorialAccount?.obituary || null
        },
        uid: userUid
    };

    // get join date
    const userAuthAdmin = await admin.auth().getUser(userUid);
    returnedUserData.joinedAt = userAuthAdmin.metadata.creationTime;

    // is user blocked?
    const blocked = userData.blocked || {};
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
        returnedUserData.autoplayVideos = userData?.autoplayVideos;
        returnedUserData.flagPrefs = userData?.flagPrefs;
        returnedUserData.suspended = ctx.currentUser.suspension;
        returnedUserData.theme = userData?.theme || null;
        returnedUserData.customThemeColors = userData?.themeColors || null;
        returnedUserData.savedThemes = userData?.savedThemes || null;
        returnedUserData.useODFont = userData?.useODFont || null;
        returnedUserData.showPrideFlag = userData?.showPrideFlag || null;
        returnedUserData.birthdayInfo = userData?.birthdayInfo || null;
    }

    return returnedUserData;
}

module.exports = { returnUserData };