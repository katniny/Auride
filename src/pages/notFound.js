export default function loadNotFound() {
    document.title = "404 | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        404
    `;
    return el;
}