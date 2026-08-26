import { userData } from "../users/current.js";
import { getToken } from "./getToken.js";

export async function setDisplayName(displayName) {
    // check for identifier & id type
    if (!displayName)
        throw new Error("Please give us a display name.");

    // if all goes well, get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/setDisplayName`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "displayName": displayName,
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to set display name with status code ${res.status}.`);
    }

    // update display name on client
    userData.display = displayName;

    // else, return data
    const data = await res.json();
    return await data?.success;
}