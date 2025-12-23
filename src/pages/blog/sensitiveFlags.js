export default function sensitiveFlagsPage() {
    document.title = "Sensitive Flags | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Definitions of Sensitive Content Flags on Auride</h1>
            <p style="color: var(--text-semi-transparent);">Created: 4/12/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>Some posts can be upsetting, disturbing, or triggering for others, even if they're not NSFW. If your post includes difficult topics or intense visuals, flagging it helps keep Auride a safer place for everyone.</p>

            <br />

            <h2>Graphic Violence</h2>
            <p><b>Use this if</b>: Your post contains dipictions of injury, blood, or violence.</p>
            <p><b>Note:</b> Only obviously <i>fake</i> gore is allowed (like stylized art, low-detail pixel blood, etc.). <i>Realistic</i> or <i>real</i> gore <b>is not permitted</b>. Even cartoon gore must be toned down, over-the-top splatter or intense mutilation is not allowed.</p>

            <br />

            <h2>Horror Imagery</h2>
            <p><b>Use this if</b>: Your post features unsettling, creepy, or disturbing visuals.</p>
            <p>This includes scary characters, eerie environments, or things meant to provoke fear or unease. Think horror game screenshots, spooky drawings, or psychological horror vibes.</p>

            <br />

            <h2>Abuse/Trauma Mentions</h2>
            <p><b>Use this if</b>: Your post references physical, emotional, or psychological abuse, or traumatic events.</p>
            <p>This includes mentions of domestic violence, childhood trauma, PTSD, or other sensitive life experiences, even if it's handled respectfully.</p>

            <br />

            <h2>Self-Harm/Suicide Mentions</h2>
            <p><b>Use this if</b>: Your post discusses or references self-harm, suicidal thoughts, or experiences.</p>
            <p>Even indirect or fictional mentions should be flagged, this is a very sensitive topic for many, and flagging it allows others to make the choice to engage or not.</p>

            <br />

            <h2>Drug Use</h2>
            <p><b>Use this if</b>: Your post includes dipictions or discussions of drug use (legal or illegal), addiction, or substance abuse.</p>
            <p>This includes both casual mentions (like art with characters smoking) and serious conversations around drug struggles.</p>

            <br />

            <h2>Flash/Seizure Risk</h2>
            <p><b>Use this if</b>: Your post includes rapid flashing lights, strobe effects, or animations that could trigger photosensitive seizures.</p>
            <p>This one's for GIFs, videos, or animations that could be dangerous for people with epliepsy or other light sensitivities.</p>

            <br />

            <p>💡 <b>Tip</b>: When in doubt, flag it! Giving others control over what they see is a great way to help make Auride feel welcoming and comforting for everyone!</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}