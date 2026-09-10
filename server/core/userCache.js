// just import it as needed - separate so we can
// watch users as they update and make sure they arent cached
// inappropriately (e.g., still returning a user that was deleted)
//
// TODO: this doesnt matter hugely _now_ due to small userbase, but we should
// clear ones that are unaccessed for a while (whether time or pushed out from queue)!!
const admin = require("firebase-admin");
const db = admin.database();

const storedUsers = new Map();

// watch for child_changed. if we have it, unload from ram
// FIXME: this is lazy, we should put checking users into a function so we can
// just double-check and update it appropriately
db.ref("/users").on("child_changed", (snapshot) => {
    // get uid
    const userId = snapshot.key;

    console.log(userId);

    if (storedUsers.get(userId)) {
        console.log("User changed");
        storedUsers.delete(userId);
    }
});

// watch for child_removed. if we have it, unload from ram
// unlike above, this isnt lazy since deleted users are removed completely
db.ref("/users").on("child_removed", (snapshot) => {
    // get id
    const userId = snapshot.key;

    console.log(userId);

    if (storedUsers.get(userId)) {
        console.log("User removed");
        storedUsers.delete(userId);
    }
});

module.exports = storedUsers;