export default function downloadPage() {
    document.title = "Download | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <img src="/assets/imgs/All_transparent.png" draggable="false" width="250px" />
        <h2>Auride apps are coming soon</h2>
        <p class="description">
            However, as of right now, they aren't available. Auride apps for Android, iOS, Windows, macOS and Linux will release
            in early or mid 2027. We will share more news as it becomes available.
        </p>
        <button onclick="$nav('/home')">Go Home</button>
    `;
    return el;
}