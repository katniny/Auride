import { getToken } from "./getToken.js";

export async function getNoteData(id) {
    // check for identifier & id type
    if (!id)
        throw new Error("Attempted to get note data without an identifier. Please get a note ID!");

    // if all goes well, get a token
    const token = await getToken();
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/getSingularNoteData`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "noteId": id,
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to fetch note data: ${res.status}`);

    // else, return data
    const data = await res.json();
    return await data?.returnedNoteData;
}