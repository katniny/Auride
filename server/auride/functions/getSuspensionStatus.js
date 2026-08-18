const admin = require("firebase-admin");
const db = admin.database();

const storedSuspendedUsers = new Map();
async function getSuspensionStatus(uid) {
    // do we have them stored in ram already?
    const suspensionStatus = await storedSuspendedUsers.get(uid);
    if (suspensionStatus) {
        // if yes, just give the client that
        return suspensionStatus;
    } else { // otherwise, lets fetch
        const possibleSuspendedUser = await db.ref(`/users/${uid}/suspensionStatus`).once("value");
        // are they suspended?
        let suspensionNotes = false;
        let isSuspended;
        if (possibleSuspendedUser.val() === "suspended") {
            isSuspended = true;
            suspensionNotes = await db.ref(`/users/${uid}/suspensionNotes`).once("value");
        }

        // load them into ram
        await storedSuspendedUsers.set(uid, {
            suspended: isSuspended,
            suspensionNotes: suspensionNotes.val()
        });

        return storedSuspendedUsers.get(uid);
    }
}

module.exports = { getSuspensionStatus };