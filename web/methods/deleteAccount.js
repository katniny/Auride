import { getToken } from "./getToken.js";

export async function deleteAccount() {
    // get a token
    const token = await getToken();
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/deleteAccount`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to download user data: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.success;
}