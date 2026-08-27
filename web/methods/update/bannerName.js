import { db } from "../../firebase/config";
import { currentUserData } from "../../users/current.js";

// TODO: handle this server-side
export async function updateBannerName(name) {
    // ensure user is signed in
    const currentUsersData = await currentUserData();
    if (!currentUsersData)
        throw new Error("Please ensure the user is signed in.");

    // then, ask the db to update the users pfp name
    db.ref(`users/${currentUsersData.uid}`).update({
        banner: name
    });

    // done
    return true;
}