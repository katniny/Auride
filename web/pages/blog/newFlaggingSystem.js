export default function flagsPage() {
    document.title = "New Flagging System | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>The Most Powerful Content Flagging System Ever</h1>
            <p style="color: var(--text-semi-transparent);">Created: 4/12/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>I'm excited to roll out a <b>brand-new flagging system</b>, newly build to give <b>you</b> more control over what you see, and <b>creators</b> more tools to label their posts with care. This is the <b>most expansive content flagging system</b> on any social media platform, and it's officially live on Auride now!</p>

            <br />

            <h2>🌈 What's new?</h2>
            <p>Auride still has the main three major content types that can be flagged when making a post:</p>
            <ul>
                <li>NSFW (Not Safe for Work)</li>
                <li>Sensitive Content</li>
                <li>Political Content</li>
            </ul>
            <p>But now, each one has <b>multiple flags</b> you can choose from instead of just a simple checkbox, making it way easier to give people the heads-up they deserve.</p>

            <br />

            <h2>🧷 How it works</h2>
            <p>When creating a post, you can now choose from detailed flag options. For example:</p>
            <br />
            <h3>🟥 NSFW:</h3>
            <ul>
                <li>Adult Content (explicit sexual images)</li>
                <li>Sexually Suggestive (not nude, but suggestive)</li>
                <li>Non-Sexual Nudity (artistic or casual)</li>
                <li>Fetish Content</li>
                <li>Erotic Writing</li>
            </ul>
            <br />
            <h3>⚠️ Sensitive Content:</h3>
            <ul>
                <li>Graphic Violence (only stylized, clearly fake gore allowed!)</li>
                <li>Horror Imagery</li>
                <li>Abuse/Trauma Mentions</li>
                <li>Self-Harm/Suicide Mentions</li>
                <li>Drug Use</li>
                <li>Flash/Seizure Risk</li>
            </ul>
            <br />
            <h3>🗳️ Political Content:</h3>
            <ul>
                <li>Political Discussions</li>
                <li>War & Conflict</li>
                <li>Identity Debates</li>
                <li>Conspiracy Theories</li>
                <li>News Media</li>
            </ul>
            <p>This system helps readers know <i>exactly</i> what kind of content is behind a blur, while giving posters clear guidance on what each flags means. No more vague labels. No more guessing.</p>
            <a href="/blog/nsfw-flags">NSFW Flags Definitions</a>,
            <a href="/blog/sensitive-flags">Sensitive Flags Definitions</a>,
            <a href="/blog/political-flags">Political Flags Definitions</a>

            <br />

            <h2>👁️ Personalized Visibility</h2>
            <p>While this blog is about how creators flags content, it also ties into a big update for users. You'll still be able to choose how you want different types of flagged content to show up on your home page, <b>hidden</b>, <b>blurred</b>, or <b>shown</b>, and tailor that experience to your comfort.</p>
            <p>(We'll talk about that more soon!)</p>

            <br />

            <h2>🌟 Why it matters</h2>
            <p>Flagging shouldn't be one-size-fits-all. A meme with cartoon blood isn't the same as a trauma vent. A political rant isn't the same as a news post. We believe that nuance matters, and now, we're building a system that reflects that.</p>
            <p>With this new setup, we're making Auride a space that balances <b>expression</b> and <b>comfort</b>, <b>freedom</b>, and <b>safety</b>, all in one clean, powerful flow.</p>

            <br />

            <h2>🛠️ Ongoing Improvements</h2>
            <p>We'll keep refining the system based on your feedback! Got ideas for more flag types or better descriptions? Let us know! We're building this for <b>you</b>!</p>

            <br />

            <h2>❓ How to Use</h2>
            <p>The new system is just as simple as before! In your Settings under the Personalization tab, you will now see "Change Preferences". Clicking on it will open a popup where you can configure the preferences to your liking, and Auride will immediately reflect those changes on the site.</p>

            <br />

            <p>Thanks for making Auride what it is. Thoughtful, safe, expressive, and real. Now let's keep making it better, together.</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}