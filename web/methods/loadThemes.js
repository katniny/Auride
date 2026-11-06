import { apiFetch } from "../main.js";
import { getToken } from "./getToken.js";

export async function loadThemes() {
    // if all goes well, get a token
    const token = await getToken();

    if (!token)
        throw new Error("Please log in to load themes.");
    
    // finally, get data
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/loadThemes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to fetch note data: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.success;
}