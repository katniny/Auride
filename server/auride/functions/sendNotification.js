const admin = require("firebase-admin");
const db = admin.database();

async function sendNotification(toWho, fromWho, type, noteId) {
    // make sure required fields exist
    if (!toWho || !fromWho || !type)
        throw new Error("Invalid call to create notification!");

    // if type is reply, ensure noteId exists
    if (type === "Reply" && !noteId)
        throw new Error("You wanted to send a reply notification, but didn't give us a note ID!");

    // create notification
    // create key
    const notificationIdRef = db.ref(`/users/${toWho}/notifications`).push();
    const notificationId = notificationIdRef.key;
    const unreadNotifsRef = db.ref(`/users/${toWho}/notifications/unread`);
    const currentTime = admin.database.ServerValue.TIMESTAMP;

    // if the user isnt themselves, send notification
    if (toWho !== fromWho) {
        // increase their notifications unread count
        unreadNotifsRef.transaction(currentValue => {
            return (currentValue || 0) + 1;
        });
        // send notification
        const sendNotification = await db.ref(`/users/${toWho}/notifications/${notificationId}`).update({
            type: type,
            who: fromWho,
            postId: noteId || null,
            sent: currentTime
        });
    }
}
module.exports = { sendNotification };