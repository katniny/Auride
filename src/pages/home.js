import { loadNotes } from "../notes/getNotes.js";
import { format } from "../text/format.js";
import { versioningString } from "../ui/versioning.js";
import { currentUserData } from "../users/current.js";
import { uploadMedia } from "../methods/uploadMedia.js";

export default async function homePage() {
    // get user data
    const currentUsersData = await currentUserData();

    // construct greeting string
    let greetingString;
    // get time & get the first part based on that
    const hours = new Date().getHours();
    const getGreeting = h =>
        h >= 5 && h < 8 ? "Good early morning" :
        h >= 8 && h < 12 ? "Good morning" :
        h >= 12 && h < 17 ? "Good afternoon" :
        h >= 17 && h < 20 ? "Good evening" :
        h >= 21 && h < 24 ? "Good late night" :
        "Have a good night";
    greetingString = currentUsersData ? `${getGreeting(hours)}, ${format(currentUsersData.display, ["html", "emoji"])}!` : `${getGreeting(hours)}!`;

    // construct string for the "quick note sending" div
    let whatsOnYourMindString = currentUsersData ? `What's on your mind, ${format(currentUsersData.display, ["html", "emoji"])}?` : "What's on your mind?";

    // set title
    document.title = "Auride";
    
    // set html
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="greeting">
            <h2 class="time">${greetingString}</h2>
            <p class="versionString description">${versioningString}</p>
            <div class="sendNoteQuick">
                ${whatsOnYourMindString}
            </div>
        </div>
        <div id="notes"></div>
    `;

    // load notes
    loadNotes();
    
    // done!
    return el;
}