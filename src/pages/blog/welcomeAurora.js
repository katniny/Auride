export default function welcomeAuroraPage() {
    document.title = "Welcome Aurora | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Welcome Aurora to Auride!</h1>
            <p style="color: var(--text-semi-transparent);">Created: 12/24/2024</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>We're very excited to share something super special with you today: Auride officially has a mascot! Say hello to Aurora! She's here to bring some extra personality to the platform, and maybe cause a little chaos...</p>

            <br />

            <h2>Who is Aurora?</h2>
            <p>Officially 'born' December 24, 2024, She's the embodiment of everything Auride stands for: fun, community, and a space where everyone can feel safe and welcome.</p>
            <p>She's energetic and a little mischievous, but always kind.</p>

            <br />

            <h2>Why?</h2>
            <p>We wanted to bring a little more personality to Auride, and what better way than to give our community a new friendo? Aurora will be available across the notes, display names, and bios in the form of emojis. Speaking of...</p>

            <br />

            <h2>Custom Emojis!</h2>
            <p>To really bring her to life, we've created a set of custom emojis featuring Aurora. These emojis can be used in your display names, bios, and notes by typing [emoji] (e.g. [excited]). Here's the full list of emojis:</p>
            <ul>
                <li style="margin-left: 15px;"><b>[concerned]</b></li>
                <li style="margin-left: 15px;"><b>[excited]</b></li>
                <li style="margin-left: 15px;"><b>[love]</b></li>
                <li style="margin-left: 15px;"><b>[peace]</b></li>
                <li style="margin-left: 15px;"><b>[smug]</b></li>
                <li style="margin-left: 15px;"><b>[tired]</b></li>
                <li style="margin-left: 15px;"><b>[violence]</b></li>
                <li style="margin-left: 15px;"><b>[yelling]</b></li>
            </ul>
            <p>We won't show you the emojis here, that's no fun... you can add her to your display name, bio, or notes to see these emojis though! :D</p>

            <br />

            <h2>Contribution</h2>
            <p>We can't take credit for her art, Aurora's art assets were created by <a href="https://chereverie.art/" target="_blank">Chereverie</a> and can be found on <a href="https://picrew.me/en/image_maker/100365" target="_blank">Picrew</a>.</p>
            <p>In agreement with Chereverie's terms ("if you use or post them, please credit me as chereverie, and/or link to my social media, and share it with your friends!!"), we have added her to <a href="/contributors">the contributors list</a> under "External Contributors", definition can be found on the <a href="/contributors">contributors page</a>.</p>
            <img src="/assets/imgs/cher_agreement.png" alt="The full agreement terms" draggable="false" style="margin-top: 5px;" />

            <br />
            <br />
            <p>We'd love to hear your feedback and ideas! If you have any ideas (e.g. a new emoji), let us know by creating a note! Aurora is for all of us, so let's make her as awesome as the Auride community!</p>
            <p>Welcome to the family, Aurora!</p>

            <p>Love,</p>
            <p>Aurora</p>

            <br />
            <br />
        </div>
    `;
    return el;
}