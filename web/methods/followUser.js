import { getToken } from "./getToken.js";

export async function followUser(userIdentifer, reqType) {
    // check for identifier & id type
    if (!userIdentifer)
        throw new Error("Attempted to follow user without an identifier. Please get a UID or username!");
    if (!reqType)
        throw new Error("Attempted to follow user without an ID type.");

    // if all goes well, get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/followUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "userIdentifier": userIdentifer,
            "reqType": reqType
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to follow user: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.returnedStatus;
}