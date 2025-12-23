export default function memorializedPage() {
    document.title = "Memorialized Accounts | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Memorialized Accounts</h1>
            <p style="color: var(--text-semi-transparent);">Created: 5/31/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: Never</p>

            <br />

            <p>Memorialized accounts are a way to honor someone's life and keep their memory alive within the community after they've passed.</p>
            <p>Here's what happens when an account is memorialized:</p>
            <ul>
                <li><b>Remembering</b> will be under the persons username</li>
                <li>Notes, direct messages, and other forms of community content will stay visible to the audience they originally shared them with</li>
                <li>Once an account is memorialized, you cannot follow, unfollow, block or report that person</li>
                <li>The account's content remains unchanged -- everything they shared stays just as they left it</li>
                </ul>

            <br />

            <p>We keep these accounts preserved out of respect, and to give friends and loved ones a space to reflect, grieve, and celebrate their life.</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}