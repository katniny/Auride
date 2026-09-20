import { faIcon } from "../../utils/faIcon.js";

export function showVisitLinkPopup(link) {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <h2>
            ${faIcon("solid", "link").outerHTML} Visit this website?
        </h2>
        <p class="description">
            This is an external link not affliated with Auride and may not be safe to visit.
        </p>
        <p class="linkVisiting">
            ${link}
        </p>

        <br />

        <a href="${link}" target="_blank"><button class="closePopup">Yes, visit link</button></a>
        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "visitLinkPopup";
    document.getElementById("app").appendChild(modal);

    // set close popup button
    const closeBtns = modal.querySelectorAll(".closePopup");
    closeBtns.forEach(closeBtn => {
        closeBtn.onclick = () => closeVisitLinkPopup();
    });
    
    // show modal
    modal.showModal();
}

// close popup
function closeVisitLinkPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".visitLinkPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}

window.showVisitLinkPopup = showVisitLinkPopup;