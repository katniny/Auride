import { userData } from "../users/current.js";
import { getToken } from "./getToken.js";

export async function setBio(bio) {
    // get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/setBio`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "bio": bio,
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to set bio with status code ${res.status}.`);
    }

    // update display name on client
    userData.bio = bio;

    // else, return data
    const data = await res.json();
    return await data?.success;
}