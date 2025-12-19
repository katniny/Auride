import { getToken } from "./getToken.js";

export async function renoteNote(id) {
    // check for identifier & id type
    if (!id)
        throw new Error("Attempted to renote a note without an ID. Please get a note ID!");

    // if all goes well, get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/renoteNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "noteId": id,
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to renote note: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.returnedStatus;
}