export default function searchPage() {
    document.title = "Search | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>Search is unavailable</h2>
        <p class="description">
            Due to the complexity of searching, time constraints, and low demand for the search function,
            it is temporarily unavailable. We will re-add searching very soon though!
        </p>
        <button onclick="$nav('/home')">Go Home</button>
    `;
    return el;
}