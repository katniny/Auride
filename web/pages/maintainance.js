export default function aboutPage() {
    document.title = "Maintainance | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Auride is not under maintainance at this time.</h1>
        <button onclick="$nav('/')">Use Auride!</button>
    `;
    return el;
}