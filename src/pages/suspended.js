import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";
import { navigate } from "../router.js";

export default async function suspendedPage() {
    // get users data
    const suspendedUserData = await currentUserData();

    // is user actually suspended?
    if (!suspendedUserData?.suspended || !suspendedUserData?.suspended?.suspended !== true)
        navigate("/");

    const el = document.createElement("div");
    const pfpLink = await storageLink(`images/pfp/${suspendedUserData.uid}/${suspendedUserData.pfp}`);
    el.innerHTML = `
        <img src="${pfpLink}" class="userPfp" draggable="false" />
        <h1 class="suspensionNotice">${faIcon("solid", "triangle-exclamation").outerHTML} We suspended your account, ${suspendedUserData.display}</h1>
        
        <div class="divider"></div>

        <h2>What does this mean?</h2>
        <div class="suspensionWdtm">
            ${faIcon("solid", "triangle-exclamation").outerHTML}
            Your account violated one of our policies.
        </div>
        <div class="suspensionWdtm">
            ${faIcon("solid", "ban").outerHTML}
            Your account has been disabled, and cannot be used.
        </div>
        <div class="suspensionWdtm">
            ${faIcon("solid", "lock").outerHTML}
            Your profile, notes, and themes are not visible on Auride.
        </div>

        <div class="divider"></div>

        <h2>Why?</h2>
        <div class="suspensionWdtm">
            ${faIcon("solid", "question").outerHTML}
            ${suspendedUserData?.suspended?.suspensionNotes?.reason || "No reason provided."}
        </div>
        
        <div class="divider"></div>

        <h2>When will my account be unsuspended?</h2>
        <div class="suspensionWdtm">
            ${faIcon("solid", "calendar").outerHTML}
            ${suspendedUserData?.suspended?.suspensionNotes?.expiration || "No expiration provided."}
        </div>
    `;

    // set title
    document.title = `Suspended | Auride`;

    return el;
}