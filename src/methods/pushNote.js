import { getToken } from "./getToken.js";

export async function pushNote(id, file, text, nsfwFlag, sensitiveFlag, politicalFlag, musicId) {
    // check for identifier & id type
    if (!id)
        throw new Error("Attempted to create a note without an ID!");

    // if all goes well, get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/createNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "noteId": id,
            "text": text,
            "filePath": file,
            "nsfwFlag": nsfwFlag,
            "sensitiveFlag": sensitiveFlag,
            "politicalFlag": politicalFlag,
            "musicId": musicId
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to create note with status code ${res.status}.`);

    // else, return data
    const data = await res.json();
    return await data?.returnedStatus;
}