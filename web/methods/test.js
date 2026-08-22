import { getToken } from "./getToken.js";

export async function testAurideRouter(apiToCall, httpMethod) {
    // get a token
    const token = await getToken();
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/${apiToCall}`, {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error(`Failed to create note with status code ${res.status}.`);

    // else, return data
    const data = await res.json();
    console.log(data);
    return await data?.returnedStatus;
}