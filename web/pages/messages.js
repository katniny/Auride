export default function messagesPage() {
    document.title = "Messages | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>Messages are temporarily unavailable</h2>
        <p class="description">
            Auride Messages are temporarily unavailable as they undergo major changes.
            We hope to release them before the end of 2026.
        </p>
        <button onclick="$nav('/home')">Go Home</button>
    `;
    return el;
}