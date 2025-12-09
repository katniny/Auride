export default function userPage(params) {
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Note page</h1>
        <p>Viewing note: ${params.id}</p>
    `;
    return el;
}