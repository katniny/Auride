export default function welcomeAuroraPage() {
    document.title = "What Qualifies as Political | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>What Qualifies as Political on Auride?</h1>
            <p style="color: var(--text-semi-transparent);">Created: 2/24/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>At Auride, we strive to create a welcoming, safe place for all users to express themselves freely. As part of that commitment, we've established guidelines for what constitutes "political" content on our platform. While we encourage open conversations on a variety of topics, we want to make sure that discussions about politics, social justice, and activism are handled thoughfully and respectfully.</p>
            <p>So, what qualifies as political?</p>

            <br />

            <b>Political Content Includes:</b>
            <ul>
                <li><b>Government Policies and Laws:</b> Discussions related to political decisions, laws, or regulations, especially those that impact marginalized groups such as the LGBTQ+ community, people of color, or other historically oppressed communities.</li>
                <li><b>Social Justice Issues:</b> Topics like systemic inequality, human rights, activism, and movements (e.g. Black Lives Matter, trans rights advocacy, etc.) that challenge or aim to change societal structures and policies.</li>
                <li><b>Political Ideologies and Movements:</b> Posts discussing political parties, philosophies, ideologies, or systems (such as capitalism, socialism, conservatism, etc.) as they relate to the rights and treatment of marginalized communities.</li>
            </ul>

            <br />

            <p><b>Personal Experiences:</b> Sharing personal experiences of discrimination, struggles, or triumphs is an important part of how we connect with one another. These stories are welcome on Auride <i>unless</i> they begin to evolve into larger political discussions about policies, laws, or societal structures. For example, sharing a personal story about being discriminated against at work wouldn't require the political flag, but if the conversation expands into how government policies or workplace laws play a role in such experiences, it may be flagged as political.</p>

            <br />

            <p><b>What we don't tolerate:</b> While we welcome political discussions that are constructive, respectful, and though-provoking, we have a zero-tolerance policy for content that promotes harmful, bigoted, or discriminatory views under the guise of "just politics". Auride is a safe place, and content that fosters hate, discrimination, or exclusion will be flagged and removed, regardless of how it's framed.</p>

            <br />

            <p><b>Why we're defining this:</b> Auride is committed to protecting the voices of marginalized communities and ensuring that everyone feels safe in our space. The political landscape today is complex, and as conditions worsen for the LGBTQ+ and poeple of color in many parts of the world, we believe it's important to define what kinds of political content are appropriate for our platform. Our goal is not to limit free expression, but to create a space where discussions can happen in a thoughtful, responsible, and respectful way.</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}