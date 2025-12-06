import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";

export let userData = null;
// promise to resolve user data
// other scripts can `await` this safely
let userDataPromiseResolve;
let userDataPromise = new Promise((resolve) => {
    userDataPromiseResolve = resolve;
});

// helper function so other modules can access the promise
export function currentUserData() {
    return userDataPromise;
}

// listen for firebase auth state
onAuthStateChanged(auth, async (user) => {
    // if the user is signed out, clear everything and resolve null
    if (!user) {
        userData = null;
        userDataPromiseResolve(null);
        return;
    }

    // when the user is signed in, create a promise that fetches their info
    const promise = (async () => {
        // get token for backend auth
        const token = await user.getIdToken();

        // request user data
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getUserData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "userIdentifier": user.uid,
                "reqType": "uid"
            }
        });

        // if something goes wrong, act as if the user is signed out
        if (!res.ok) {
            userData = null;
            return null;
        }

        // return user data
        const data = await res.json();
        userData = data.returnedUserData;
        console.log(userData);
        return userData;
    })();

    // resolve the initial waiting promise if it's still pending
    userDataPromiseResolve?.(promise);

    // update userDataPromise for future calls
    userDataPromise = promise;
});