export async function fetchProtectedUserData(uid) {
    const auth = firebase.auth();
    const user = auth.currentUser;

    try {
        let token = null;
        if (user)
            token = await user.getIdToken();

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auride/getUser`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token || null}`,
                "X-Auride-UID": uid
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.log("Failed to fetch:", error);
            return;
        }

        const userData = await response.json();
        return userData;
    } catch (err) {
        console.error("Failed to fetch user data", err);
    }
}

window.fetchProtectedUserData = fetchProtectedUserData;