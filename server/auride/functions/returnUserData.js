const admin = require("firebase-admin");
const db = admin.database();
const storedUsers = require("../../core/userCache.js");
const { filterUserData } = require("./filterUserData.js");

async function returnUserData(userIdentifier, reqType, ctx) {
    // do userIdentifier and reqType exist?
    if (!userIdentifier)
        throw new Error("Please provide a UID or username.");
    if (!reqType || reqType !== "username" && reqType !== "uid")
        throw new Error("We need to know your request type!");

    let userUid = null;
    if (reqType === "username") {
        const dbRef = await db.ref(`/taken-usernames/${userIdentifier}`).once("value");

        // if dbRef doesnt exist, throw an error!
        if (!dbRef.exists()) {
            console.log("no user with uid/username");
            throw new Error("Failed to find a user with that selected UID/username.");
        }

        // else, continue
        userUid = dbRef.val().user;
    } else {
        userUid = userIdentifier;
    }

    // double check, is the uid valid?
    if (!userUid) {
        console.log("no user with uid/username [2]");
        throw new Error("Failed to find a user with that selected UID/username.");
    }

    // do we have it in ram? if so, just load that
    const userInRam = storedUsers.get(userUid);
    if (userInRam)
        return await filterUserData(userInRam, userUid, ctx);

    // is the user requesting the data suspended? if so, dont return any user data for them
    if (userUid !== ctx.currentUser.uid && ctx.currentUser.suspension?.suspended)
        throw new Error("Cannot access other users data when suspended.");

    // finally, lets get the user data
    let rawUserData = null;
    const userDataRef = await db.ref(`/users/${userUid}`).once("value");
    rawUserData = userDataRef.val();
        
    // is the user suspended?
    if (rawUserData.suspensionStatus === "suspended" && userUid !== ctx.currentUser.uid)
        throw new Error("This user is suspended.");

    // load into ram
    await storedUsers.set(userIdentifier, rawUserData );

    // filter user data and return it
    const returnedUserData = await filterUserData(rawUserData, userUid, ctx);

    return returnedUserData;
}

module.exports = { returnUserData };