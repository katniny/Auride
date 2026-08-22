import { format } from "../../text/format.js";
import { faIcon } from "../../utils/faIcon.js";

export function showDeceasedUserPopup(displayName) {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <h2>
            ${faIcon("solid", "dove").outerHTML} Remembering ${format(displayName, ["html", "emoji"])}
        </h2>
        <p class="description">
            This account has been memorialized. <a href="/blog/memorialized-accounts">Memorialized accounts</a>
            are a way to honor and remember someone's life after they've passed away, keeping their memory alive
            within our community.
        </p>

        <br />

        <p class="description">
            If you're struggling, please know you're not alone. You matter and there are people who care about you.
            <a href="/resources/suicide-prevention">Click here for suicide prevention resources</a> and support, or reach out to
            someone you trust.
        </p>

        <br />

        <button class="closePopup">May ${format(displayName, ["html", "emoji"])} Rest in Peace</button>
    `;

    // add attributes
    modal.className = "deceasedUserPopup";
    document.getElementById("app").appendChild(modal);

    // set close popup button
    const closeBtn = modal.querySelector(".closePopup");
    closeBtn.onclick = () => closeDeceasedUserPopup();
    
    // show modal
    modal.showModal();
}

// close popup
function closeDeceasedUserPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".deceasedUserPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}