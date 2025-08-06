export async function fetchNoteData(id) {
    const auth = firebase.auth();
    let user = auth.currentUser;

    if (!user) {
        user = null;   
    }

    try {
        let token = null;
        if (user) {
            token = await user.getIdToken();
        }

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auride/fetchNoteData`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-Auride-NoteID": id
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.log("Response not ok. Server response:", error);
            return { success: false, error: error?.error || "Failed to fetch note data." };
        }

        const responseData = await response.json();
        console.log("Server succeeded:", responseData);
        return { success: true };
    } catch (err) {
        console.error("Failed to fetch note data: ", err);
        return { success: false, error: err?.error || "Network or server error. Please try again later." };
    }
}

window.fetchNoteData = fetchNoteData;