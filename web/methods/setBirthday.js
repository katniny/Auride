import { apiFetch } from "../main.js";
import { getToken } from "./getToken.js";

export async function setBirthday(birthday) {
    // get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/setBirthday`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "birthday": birthday,
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to set birthday with status code ${res.status}.`);
    }

    // else, return data
    const data = await res.json();
    return await data?.success;
}