const admin = require("firebase-admin");
const db = admin.database();

const alreadyHasAchievement = new Map();
async function giveAchievement(uid, achievement) {
    if (!uid)
        throw new Error("Achievement requested, but UID was not provided.");
    if (!achievement)
        throw new Error("Achievement requested, but no achievement was provided.");
    
    // do we have them stored in ram already?
    let achievements = await alreadyHasAchievement.get(uid);
    if (achievements?.[achievement]) {
        // if yes, return true
        return achievements?.[achievement];
    } else { // otherwise, lets fetch
        const hasAchievementRef = await db.ref(`/users/${uid}/achievements/transsocial/${achievement}`).once("value");
        // do they have achievement?
        let unlockedWhen;
        let hasAchievement;
        if (hasAchievementRef.exists()) {
            const data = hasAchievementRef.val();
            hasAchievement = true;
            unlockedWhen = data.unlockedWhen;

            // load achievement into ram
            await alreadyHasAchievement.set(uid, {
                [achievement]: {
                    unlockedWhen: data.unlockedWhen,
                    unlocked: true
                }
            });
        } else {
            // unlock achievement
            const currentServerTime = admin.database.ServerValue.TIMESTAMP;
            const unlockAchievementRef = await db.ref(`/users/${uid}/achievements/transsocial/${achievement}`).update({
                unlocked: true,
                unlockedWhen: currentServerTime
            });

            // load achievement into ram
            await alreadyHasAchievement.set(uid, {
                [achievement]: {
                    unlockedWhen: currentServerTime,
                    unlocked: true
                }
            });
        }

        // get value again now its been written
        achievements = await alreadyHasAchievement.get(uid);
        console.log(achievements);
        console.log(achievement);
        console.log(achievements?.achievement);

        return achievements?.[achievement];
    }
}

module.exports = { giveAchievement };