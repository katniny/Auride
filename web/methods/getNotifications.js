import { getToken } from "./getToken.js";

export async function getNotifications(typeOfReturn, lastKey) {
    // check for type of return
    if (!typeOfReturn)
        throw new Error("Attempted to get notifications without a return type. Please get a type!");

    // if all goes well, get a token
    const token = await getToken();
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getUserNotifications`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "typeIdentifier": typeOfReturn,
            "lastKey": lastKey
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to fetch note data: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.success;
}