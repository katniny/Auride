export default function userPage(params) {
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>User profile</h1>
        <p>Viewing user: ${params.id}</p>
    `;
    return el;
}