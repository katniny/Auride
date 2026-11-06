import { apiFetch } from "../main.js";
import { getToken } from "./getToken.js";

export async function saveTheme(name, colors, bypassCheck) {
    // get a token
    const token = await getToken();
    
    // make sure they're passing a name
    if (!name)
        throw new Error("Please provide a name for your theme!");
    if (!colors)
        throw new Error("Please provide colors for your theme!");

    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/saveTheme`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "colors": colors,
            "themeName": name,
            "bypassThemeCheck": bypassCheck
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        if (res.status !== 409) {
            const data = await res.json();
            throw new Error(data.error || `Failed to save theme with status code ${res.status}.`);
        } else
            throw new Error("VERIFY_OVERWRITE_THEME");
    }

    // else, return data
    const data = await res.json();
    return await data?.success;
}