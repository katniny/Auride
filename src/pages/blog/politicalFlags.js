export default function politicalFlagsPage() {
    document.title = "Political Flags | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Definitions of Political Content Flags on Auride</h1>
            <p style="color: var(--text-semi-transparent);">Created: 4/12/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>Some conversations can spark big feelings, disagreements, or debates, and that's okay! Auride encourages thoughtful discussion, but we also want to make users to feel safe and in control of their home page. Use these flags if your post touches on political or culurally intense topics.</p>

            <br />

            <h2>Political Discussion</h2>
            <p><b>Use this if</b>: Your post talks about laws, governments, political parties, protests, or elections.</p>
            <p>This includes both personal opinions and general discussions, whether you're sharing an idea, asking a question, or just reposting a political moment.</p>

            <br />

            <h2>War & Conflict</h2>
            <p><b>Use this if</b>: Your post discusses armed conflict, war zones, military action, or humanization crises.</p>
            <p>This includes current and historical events, as well as images and articles about global conflict, even if they're fact-based or neutral.</p>

            <br />

            <h2>Identity Debates</h2>
            <p><b>Use this if</b>: Your post includes debate or commentary around personal identity, such as gender, sexuality, race, disability, religion, etc.</p>
            <p>This includes defending, critizing, or discussing identity-related issues in a political or controversial context.</p>

            <br />

            <h2>Conspiracy Theories</h2>
            <p><b>Use this if</b>: Your post shares, jokes about, or discusses conspiracy theories, real or fictional. Even lighthearted stuff should be flagged, since these topics can be sensitive, polarizing, or spread misinformation.</p>

            <br />

            <h2>News Media</h2>
            <p><b>Use this if</b>: Your post shares or comments on news articles, headlines, or media coverage of serious events.</p>
            <p>This includes mainstream news, independent journalism, or even just a screenshot of a news post, whether global or local.</p>

            <br />

            <p><b>💡 Tip</b>: Political topics are totally allowed, but these tags help people decide when and how they want to engage. Let's keep Auride thoughtful, not overwhelming!</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}