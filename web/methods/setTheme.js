import { apiFetch } from "../main.js";
import { userData } from "../users/current.js";
import { getToken } from "./getToken.js";

export async function setTheme(theme, colors) {
    // get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");

    if (!theme)
        throw new Error("Invalid theme selected!");
    if (theme === "Custom" && !colors)
        throw new Error("No colors for custom theme!");
    
    // finally, get data
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/setTheme`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "theme": theme,
            "customColors": colors
        })
    });
    // if response isn't okay, user is invalid
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to set theme with status code ${res.status}.`);
    }

    // else, return data
    const data = await res.json();
    return await data?.success;
}