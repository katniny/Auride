import { auth } from "../firebase/config.js";

export async function getToken() {
    const user = auth.currentUser;
    let token = null;
    if (user) {
        try {
            token = await user.getIdToken();
        } catch (err) {
            console.error(`Failed to get Firebase token: ${err}`);
        }
    }

    return token;
}