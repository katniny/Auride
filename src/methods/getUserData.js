import { getToken } from "./getToken.js";

export async function getUserData(id, type) {
    // check for identifier & id type
    if (!id)
        throw new Error("Attempted to get user data without an identifier. Please get a UID or username!");
    if (!type)
        throw new Error("Attempted to get user data without an ID type.");

    // if all goes well, get a token
    const token = await getToken();
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getUserData`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "userIdentifier": id,
            "reqType": type
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to fetch user data: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.returnedUserData;
}