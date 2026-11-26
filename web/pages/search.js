export default function searchPage() {
    document.title = "Search | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>WIP</h2>
        <button onclick="$nav('/home')">Go Home</button>
    `;
    return el;
}