import { auth } from "../firebase/config.js";
import { getIdToken, onAuthStateChanged } from "firebase/auth";

export let currentUser = null;

export const userInfoReady = new Promise(resolve => {
    // if current user is already loaded, just return that
    if (currentUser)
        resolve(currentUser);

    // get the users auth state
    onAuthStateChanged(auth, async (user) => {
        // if not signed in, return null
        if (!user) {
            currentUser = "Not signed in";
            resolve(currentUser);
            return;
        }

        // get firebase token for backend
        const token = await getIdToken(user, true);

        // call the backend to get the users auride profile
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getUserData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                "userIdentifier": user.uid,
                "reqType": "uid"
            }
        });

        // if response isnt okay, assume deleted user or something
        if (!res.ok) {
            currentUser = "Not signed in";
            resolve(currentUser);
            return;
        }

        // set res.json() as final object and return
        const resJson = await res.json();
        currentUser = resJson.returnedUserData;
        resolve(currentUser);
    });
});