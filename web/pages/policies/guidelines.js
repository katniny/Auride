export default function guidelinesPage() {
    document.title = "Community Guidelines | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Community Guidelines</h1>
            <p class="description">Last updated: 6/25/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <p>Auride aims to be an inclusive and safe place for everyone to express themselves and connect with others. While we encourage open communication, these guidelines are essential to maintain a healthy and respectful community.</p>

            <br />

            <h2>Be Respectful</h2>
            <li><b>Inclusivity:</b> Welcome and embrace people from all backgrounds. Do not discriminate based on race, ethnicity, religion, gender identity, sexual orientation, disability, or any other personal characteristic.</li>
            <li><b>No Hate:</b> Refrain from attacking, harassing, or bullying others. Content promoting violence or hatred toward any specific group or individual is not tolerated.</li>
            <li><b>Constructive Criticism:</b> Express your opinions thoughtfully, even in disagreement. Personal insults or name-calling will not be tolerated.</li>

            <br />

            <h2>Content Guidelines</h2>
            <li><b>NSFW Responsibility:</b> If you post content of a sexually explicit nature, it MUST be clearly marked as NSFW (Not Safe for Work). Failure to do so can result in content removal or account restrictions.</li>
            <li><b>Sensitive Content:</b> Certain topics may be sensitive in nature. Clearly mark such with a "sensitive" warning so users can choose whether to engage witth it.</li>
            <li><b>Self-Harm:</b> While we allow for open discussions on difficult topics, content that actively promotes or glorifies self-harm is not permitted. If you or someone else you know is struggling, please seek help. Auride recommends the <a href="https://www.crisistextline.org/help-for-self-harm/" target="_blank" style="color: var(--main-color)">Crisis Text Line</a>, you aren't alone.</li>
            <li><b>Illegal Activity:</b> Do not use Auride for illegal purposes or to promote illegal activity.</li>

            <br />

            <h2>Protecting Others (and Yourself)</h2>
            <li><b>Keep it Private:</b> Do not share personally identifiable information (yours or others) such as addresses, phone numbers, or social security numbers.</li>
            <li><b>Underage Safety:</b> Adults should not engage in sexually suggestive conversations with minors, even if the minor initiates.</li>
            <li><b>Spam:</b> We don't allow spam, excessive self-promotion, or attempts to manipulate the platform's visiblilty algorithms.</li>

            <br />

            <h2>Consequences</h2>
            <p>Violating these guidelines may result in:</p>
            <li>Content Removal</li>
            <li>Temporary or Permanent Account Restrictions</li>
            <li>Account Termination</li>
            <li>In severe cases (e.g. illegal activity, threats) we may report to the authorities.</li>

            <br />

            <h2>We're all in this together</h2>
            <p>Auride thrives when our community is healthy and respectful. Let's work together to maintain a vibrant, welcoming, and safe place for everyone.</p>

            <br />

            <h2>Updates</h2>
            <p>These guidelines may evolve over time. Check back occassinally for updates. Your continued use of Auride signifies your agreement to these guidelines.</p>

            <br />
        </div>
    `;
    return el;
}