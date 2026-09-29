export default function birthdayPage() {
    document.title = "Birthdays Now Required | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Auride & Birthdays</h1>
            <p style="color: var(--text-semi-transparent);">Created: 9/22/2026</p>
            <p style="color: var(--text-semi-transparent);">Updated: Never</p>

            <br />

            <p>Starting September 22, 2026, Auride will start requiring your birthday to use Auride Canary.</p>
            <p>Once Auride Canary is the main Auride experience, everyone will need to provide their Date of Birth to continue using Auride.</p>

            <br />
            
            <h3>Why this change?</h3>
            <p>For child safety concerns and to cooperate with local laws, we want to help protect minors from protecting they shouldn't, such as pornographic content.</p>
            <p>
                For parents: while this is a good first step, we will soon be introducing parental controls to help protect your children 
                from content you don't want them seeing. You'll be able to what content flags they'll see, filter words, and more.
            </p>

            <br />

            <h3>Privacy Concerns?</h3>
            <p>Don't worry, we will never sell or share your data with third parties, and we will never publicly share your birthday on Auride.</p>
            <p>ID/AI-face verification are steps we will never implement. If we were to add "harder" age verification, it would likely be with a temporary credit card hold similar to Steam.</p>

            <br />

            <h3>What's affected?</h3>
            <p>If your account is marked as under 18, the following NSFW/Sensitive content flags will be affected:</p>
            <ul>
                <li>Adult Content such as porn: <b>hidden</b> until you are 18.</li>
                <li>Sexually Suggestive such as bikini pictures: <b>hidden</b> by default, but "Blur" will be available in the settings. "Show" will not be available until you're 18.</li>
                <li>Non-Sexual Nudity such as art sculptures: <b>hidden</b> by default, but can be changed in the settings.</li>
                <li>Fetish Content such as BDSM: <b>hidden</b> until you are 18.</li>
                <li>Erotic Writing: <b>hidden</b> until you are 18.</li>
                <li>Graphic Violence such as cartoonish gore: <b>hidden</b> by default, but can be changed in the settings.</li>
                <li>Horror Imagery such as "Welcome to the Game III": <b>blurred</b> by default, but can be changed in the settings.</li>
                <li>Abuse/Trauma Mentions: <b>blurred</b> by default, but can be changed in the settings.</li>
                <li>Drug Use: <b>blurred</b> by default, but can be changed in the settings.</li>
                <li>Flash-Seizure Risk: <b>blurred</b> by default, but can be changed in the settings.</li>
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