export default function nsfwBlockedPage() {
    document.title = "NSFW Blocked in the UK | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Why NSFW is blocked on Auride in Certain Regions</h1>
            <p style="color: var(--text-semi-transparent);">Created: 7/30/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 12/22/2025</p>

            <br />

            <p>NOTICE: This is no longer in effect.</p>

            <br />

            <p>This month, the United Kingdom passed the <b>Online Safety Act</b>, which means that websites that host NSFW content of any kind have to verify a user's age, whether that be from a government-issued ID or credit card details.</p>

            <br />

            <p>This law obviously includes sites like Pornhub, but also is enforced on social media sites that allow it, such as Auride, Reddit, or X.</p>

            <br />

            <p>Unfortunately, due to this law being passed, Auride will now have to hide NSFW in this region. You were originally not going to be able to change your NSFW preferences -- but you will still be able to do so for when Auride will start allowing NSFW in the UK again.</p>

            <br />

            <p>Katniny Studios, the creator of Auride, <b>stands against this law</b>, as we believe it pushes for more internet censorship designed as "protecting children". While blocking access to porn sites from children is a good thing, we have already seen the UK government try to abuse this power to hide important topics, such as menstruation.</p>

            <br />

            <p>If you live in the UK and stand against this, we highly suggest you to sign to revert the Online Safety Act <a href="https://petition.parliament.uk/petitions/722903" target="_blank">here</a>, which has already received over 430,000 signatures at the time of writing.</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}