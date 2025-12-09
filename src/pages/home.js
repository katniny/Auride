import { loadNotes } from "../notes/getNotes.js";

export default async function homePage() {
    document.title = "Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div id="notes"></div>
    `;
    loadNotes();
    return el;
}