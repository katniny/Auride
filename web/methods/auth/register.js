import { auth } from "../../firebase/config.js";
import { navigate } from "../../router.js";
import { getToken } from "../getToken.js";

export async function registerUser(email, password) {
    // check for identifier & id type
    if (!email)
        throw new Error("You need an email to register!");
    if (!password || password.trim() === "")
        throw new Error("You need a password to register.");

    // ensure user isnt already signed in
    const token = await getToken();
    if (token)
        throw new Error("You're already signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Failed to create account: ${error.error}`); 
    }

    // else, return data
    const data = await res.json();
    console.log(data);
    console.log(data.success);
    auth.signInWithCustomToken(data.success).then(() => {
        window.location.replace("/auth/name"); // make sure we refresh so user data refreshes as well
    });
    return await data?.returnedStatus;
}