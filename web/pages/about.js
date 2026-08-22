export default function aboutPage() {
    document.title = "About";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>About</h1>
        <p>some really cool info about auride</p>
        <button onclick="$nav('/')">Go to home</button>
        <a href="/">Go to Home</a>
    `;
    return el;
}