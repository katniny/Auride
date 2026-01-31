import { currentUserData } from "../../users/current.js";

export async function isSignedIn() {
    // wait for users data
    const usersData = await currentUserData();

    // if the data exists, they're logged in
    if (usersData)
        return true;

    // else, they arent
    return false;
}