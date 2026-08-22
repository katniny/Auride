import { getToken } from "../getToken.js";

export async function routeMediaLink(id, path) {
    // check for identifier & id type
    if (!id)
        throw new Error("We need the TUS ID to know what to route!");
    if (!path)
        throw new Error("We need the route that you're wanting to pretend the link is!");

    // if all goes well, get a token
    const token = await getToken();
    
    // user isnt signed in
    if (!token)
        throw new Error("Failed to get a token. Please ensure the user is signed in.");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/dev/routeMediaLink`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "tusId": id,
            "fakePath": path
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error("Failed to request fake path to the server. You may manually set one in the filePaths.json file in the server folder.");

    // else, return data
    const data = await res.json();
    return await data?.returnedLink;
}