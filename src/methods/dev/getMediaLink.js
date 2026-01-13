export async function getMediaLink(path) {
    // check for path
    if (!path)
        throw new Error("We need the route that you're wanting to fetch!");
    
    // finally, get data
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auride/dev/getMediaLink`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "path": path
        }
    });
    // if response isn't okay, user is invalid
    if (!res.ok)
        throw new Error("Failed to request path.");

    // else, return data
    const data = await res.json();
    console.log(data);
    return await data?.returnedLink;
}