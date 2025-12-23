export default function notePreviewsPage() {
    document.title = "Note Previews | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>What are note previews?</h1>
            <p style="color: var(--text-semi-transparent);">Created: 5/6/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 12/22/2025</p>

            <br />

            <p>
                As of the new Auride rewrite, this is no longer used -- as an alternative, it just renders your note normally with
                all normal note functionality, because it <i>is</i> just a note.
            </p>

            <br />

            <p>When replying to another note on Auride, and it successfully sends, you'll be presented with a preview of your note which looks similar to a regular note. But the differences are:</p>
            <ul>
                <li>You cannot directly reply</li>
                <li>You cannot quote renote</li>
                <li>You cannot favorite your note</li>
                <li>Your pronouns will not appear next to your username</li>
            </ul>

            <br />

            <p>This is because the "preview" is <b>technically not a real note</b>. While it looks like one, and is meant to represent the note that is actually there including updating Loves/Renotes, it is only meant for visual feedback so you know that your note successfully sent.</p>
            <p>To see the real note with the above features available, and not the one that's there to be visual feedback, please refresh the page.</p>
            </ul>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}