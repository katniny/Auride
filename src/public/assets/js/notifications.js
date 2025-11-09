import { pathName } from "./pathName.js";

// if on /notifications, set unread to 0
if (pathName === "/notifications") {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.database().ref(`users/${user.uid}/notifications`).update({
            unread: 0
        })
    });
}

// get notifications
let knownNotificationKeys = new Set();
let hasLoadedInitial = false;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const notificationsRef = firebase.database().ref(`users/${user.uid}/notifications`);

        notificationsRef.on("value", (snapshot) => {
            const notifications = snapshot.val() || {};
            const currentKeys = Object.keys(notifications);
            const newKeys = [];

            for (const key of currentKeys) {
                if (!knownNotificationKeys.has(key)) {
                    newKeys.push(key); // it's new!
                    knownNotificationKeys.add(key);
                }
            }

            // push notifications only after initial load
            if (hasLoadedInitial && newKeys.length > 0) {
                for (const key of newKeys) {
                    const notif = notifications[key];
                    const who = notif.who || "Someone";
                    const type = notif.type || "interacted";
                    const noteId = notif.postId;

                    // get user
                    firebase.database().ref(`users/${who}/display`).once("value", (snapshot) => {
                        // then finally push!
                        const display = snapshot.val();
                    
                        getNotificationType(display, type, noteId);
                    });
                }
            }

            // update the visible counter
            firebase.database().ref(`users/${user.uid}/notifications/unread`).once("value", (snapshot) => {
                const unreadCount = snapshot.val() || 0;
                updateNotificationCount(unreadCount);
            });

            hasLoadedInitial = true;
        });
    }
});

// function to update notification count
function updateNotificationCount(count) {
    const notifElem = document.getElementById("notificationsCount");
    if (!notifElem) return;

    if (count !== null && count !== 0) {
        notifElem.classList.add("show");
        notifElem.textContent = count;
    } else {
        notifElem.classList.remove("show");
    }
}

function pushNotification(title, body, clickCallback) {
    if (Notification.permission === "granted") {
        const notif = new Notification(title, { body });
        if (clickCallback) {
            notif.onclick = (event) => {
                event.preventDefault();
                clickCallback();
            };
        }
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                const notif = new Notification(title, { body });
                if (clickCallback) {
                    notif.onclick = (event) => {
                        event.preventDefault();
                        clickCallback();
                    };
                }
            }
        });
    }
}

// get notification type to forward to pushNotification()
// along with text
function getNotificationType(who, type, noteId) {
    if (type === "Reply") {
        const title = `${who} replied to your note!`;
        const body = "Click on this notification to see the reply, or go to Auride!";
        
        pushNotification(title, body, () => {
            window.location.href = `/note/${noteId}`;
        });
    } else if (type === "Love") {
        const title = `${who} loved your note!`;
        const body = `Click on this notification to see the note ${who} loved, or go to Auride!`;
        
        pushNotification(title, body, () => {
            window.location.href = `/note/${noteId}`;
        });
    } else if (type === "Renote") {
        const title = `${who} renoted your note!`;
        const body = `Click on this notification to see the note ${who} renoted, or go to Auride!`;
        
        pushNotification(title, body, () => {
            window.location.href = `/note/${noteId}`;
        });
    } else if (type === "Mention") {
        const title = `${who} mentioned you!`;
        const body = `Click on this notification to see the note ${who} mentioned you in, or go to Auride!`;
        
        pushNotification(title, body, () => {
            window.location.href = `/note/${noteId}`;
        });
    }
}