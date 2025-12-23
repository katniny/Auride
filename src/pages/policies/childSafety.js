export default function cookiesPage() {
    document.title = "Child Safety | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Child Safety</h1>
            <p class="description">Last updated: 6/25/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <p>Auride recognizes the importance of protecting children and young people while using our platform. While we allow a diverse range of expression and sensitive topics, we are committed to providing safeguards and resources to help keep minors safe.</p>

            <br />

            <h2>Age Restrictions</h2>
            <li>Users must be at least 13 years old to access Auride. We may require age verification procedures for users suspected to be under the minimum age in their jurisdiction.</li>
            <li>Misrepresenting your age to access Auride is a serious violation of our <a href="/policies/terms" style="color: var(--main-color)">Terms of Service</a>.</li>

            <br />

            <h2>Content Moderation</h2>
            <li><b>Proactive Measures:</b> We employ a mix of automated tools and human moderation to identify and remove content that depicts or exploits minors in a sexually suggestive or harmful matter.</li>
            <!--<li><b>Reporting Systems:</b> We provide easy-to-use mechanisms for users to report inappropriate content or interactions involving minors. All reports are taken seriously and investigated promptly.</li>-->

            <br />

            <h2>User Education</h2>
            <p><b>Safety Resources:</b> We provide links on our website with safety resources for young users, parents, and guardians. These include:</p>
            <li>Tips for recognizing and reporting harmful content or interactions</li>
            <li>Guidelines on online privacy and responsible social media use</li>
            <li>Links to external support organizations</li>

            <br />

            <h2>Parental Guidance</h2>
            <li>We strongly encourage parents and guardians to have open conversations with young people about safe and responsible online behavior.</li>
            <li>We recommend parents to be aware of the social platforms their children use and familiarize themselves with available parental controls.</li>

            <br />

            <h2>Additional Protection for Minors</h2>
            <li><b>Sensitivity Warnings:</b> Content of a sensitive nature, even if allowed on Auride, must be clearly marked. This helps young users make informed choices about the content they see.</li>

            <br />

            <h2>Collaboration with Law Enforcement</h2>
            <li>We cooperate with law enforcement agencies in investigations related to the suspected explication or abuse of minors.</li>

            <br />

            <h2>Evolving Commitment</h2>
            <li>We recognize that protecting children online is an ongoing effort. We will continually review and update our safety measures in response to new technologies, potential risks, and user feedback.</li>

            <br />

            <h2>Important Notes</h2>
            <li><b>Zero Tolerance:</b> Auride has a zero-tolerance policy for any behavior that endangers, exploits, or abuses children. Offenders may face immediate account termination and be reported to authorities.</li>
            <li><b>Transparency:</b> We strive to be transparent in communicating our child safety policies and reporting on their effectiveness.</li>
            <li><b>Challenges:</b> Due to the nature of Auride allowing NSFW and sensitive content, fully protecting minors remains a challenge. This policy represents our best efforts to balance that with free expression.</li>

            <br />

            <h2>Contact Us</h2>
            <p>For any questions about our Child Safety Policy, or to report suspected abuse, please contact us at childsafety@auride.xyz</p>

            <br />
        </div>
    `;
    return el;
}