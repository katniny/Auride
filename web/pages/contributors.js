export default function contributorsPage() {
    document.title = "Contributors | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>WIP</h1>
        <button onclick="$nav('/')">Go Home</button>
    `;
    return el;
}