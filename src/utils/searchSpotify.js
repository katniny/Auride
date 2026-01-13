// to get spotify access token
async function getAccessToken() {
    // ask spotify for a access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa(import.meta.env.VITE_SPOTIFY_TOKEN)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "grant_type": "client_credentials"
        })
    }).catch((error) => {
        throw new Error("Something went wrong searching Spotify. Please check your content blockers and internet access, or try again later.");
    });

    // then, search spotify
    const data = await response.json();
    return data.access_token;
}

export async function searchSpotify(text) {
    // get access token
    const accessToken = await getAccessToken();
    // then, ask spotify for songs
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(text)}&type=track&limit=5`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    // then, return
    const data = await response.json();
    return data.tracks.items;
}