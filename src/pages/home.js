export default function homePage() {
    document.title = "Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Home</h1>
        <p>This is normal text that should appear white.</p>
        <button onclick="$nav('/about')">Go to about</button>
        <a href="/about">Go to About</a>
    `;
    return el;
}