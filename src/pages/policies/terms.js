export default function termsPage() {
    document.title = "Terms of Service | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Terms of Service</h1>
            <p class="description">Last updated: 6/25/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <h2>Introduction</h2>
            <li>Welcome to Auride, a social platform dedicated to providing a safe and welcoming environment for everyone. These Terms of Service ("Terms") govern your use of Auride's website, mobile applications, and any related services (collectively, the "Service").</li>
            <li>By accessing or using our Service, you signify your agreement to these Terms. If you do not agree, you may not use the Service.</li>
            <b>Important Notice: Auride is NOT a dating site, hookup site, or any kind of platform for sexual relations. Anyone using Auride inappropriately for romantic or sexual purposes will be banned immediately. We take this very seriously to maintain a safe and respectful community for everyone, especially the trans community.</b>

            <br />
            <br />

            <h2>1. Eligibility</h2>
            <li>You must be at least 13 years old to use Auride. In certain regions, the minimum age may be higher. It is your responsibility to comply with the age restrictions in your jurisdiction.</li>
            <li>You represent and warrant that you have the legal right and capacity to enter into this agreement.</li>

            <br />

            <h2>2. Account Creation</h2>
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the security of your account credientials and are fully responsible for activities occuring under your account.</li>
            <li>You must immediately notify Auride of any unauthorized use of your account.</li>

            <br />

            <h2>3. User Conduct</h2>
            <li><b>No Dating or Sexual Content:</b> <b>Auride is not a dating site or sex platform. Romantic or sexual advances, discussions, or interactions are not allowed</b>. Fetishization, objectification, or any other form of harassment directed at users based on their gender identity, sexual orientation, or any other factor will result in a permanent ban.</li>
            <li><b>Respectful Community:</b> Auride aims to be a safe and inclusive place. Conduct that is hateful, discriminatory, threatening, or that promotes illegal activities is strictly prohibited.</li>
            <li><b>NSFW Content:</b> Content of a sexually explicit nature is permitted ONLY if clearly marked as NSFW (Not Safe for Work). However, NSFW content must not be used to facilitate or encourage romantic or sexual interactions. Failure to mark content or misuse of the NSFW label may result in content removal or account suspension.</li>
            <li><b>Sensitive Content:</b> Certain sensitive topics may be allowed but MUST be clearly marked as "sensitive". This helps users make informed choices about the content they engage with.</li>
            <li><b>Responsibility:</b> You are solely responsible for your content and interactions on Auride. The views and opinions you express are your own.</li>
            <li><b>AI Content Ban</b>: The use of artifical intelligence (AI) or automated tools to generate content, interact with users, or engage with Auride in any way is prohibited. This includes but is not limited to AI-generated posts, comments, or direct messages. Violations may result in content removal and a permanent ban.</li>
            <li><b>Security and Exploits</b>: You may not attempt to bypass, exploit, or interfere with Auride's security measures--whether those measures are present or not. This includes, but is not limited to, injecting malicious code (e.g. XSS, SQL injections), manipulating site functionality in unintended ways, or attempting to gain unauthorized access to accounts, data, or system resources. Any such actions will result in an immediate and permanent suspension. If you discover a security vulnerability, you must report it instead of exploiting it.</li>
            <li><b>Prohibited Actions:</b> You may not:</li>
            <li style="list-style: inside; list-style-type: circle; color: var(--text-semi-transparent); transform: translateX(10px);">Post unlawful content, or content that violates intellectual property rights</li>
            <li style="list-style: inside; list-style-type: circle; color: var(--text-semi-transparent); transform: translateX(10px);">Spam, harass, or stalk other users</li>
            <li style="list-style: inside; list-style-type: circle; color: var(--text-semi-transparent); transform: translateX(10px);">Use Auride for any commercial purpose without our express consent</li>
            <li style="list-style: inside; list-style-type: circle; color: var(--text-semi-transparent); transform: translateX(10px);">Attempt to circumvent any of our security features or technical measures</li>

            <br />

            <h2>4. Content Ownership</h2>
            <li>You retain ownership of the content you post on Auride. However, by posting content, you grant Auride a non-exclusive, worldwide, royalty-free license to use, copy, reproduce, adapt, and display your content in connection with the operation of the Service.</li>

            <br />

            <h2>5. Privacy</h2>
            <li>Our <a href="/policies/privacy" style="color: var(--main-color)">Privacy Policy</a> details how your personal information is collected, used, or shared. Please review it carefully.</li>

            <br />

            <h2>6. Intellectual Property</h2>
            <li>Auride's name, logo, and other trademarks are our property. You may not use them without our written permission.</li>
            <li>We respect the intellectual property right of others. If you believe your copyright has been infringed, please contact us.</li>

            <br />

            <h2>7. Disclaimer of Warranties</h2>
            <li>The Service is provided on an "AS IS" basis without warranties of any kind. We make no guarantee regarding the uptime, security, or availability of Auride.</li>

            <br />

            <h2>8. Limitation of Liability</h2>
            <li>To the maximum extent permitted by law, Auride shall not be liable for any damages arising from your use of the Service.</li>

            <br />

            <h2>9. Termination</h2>
            <li>We reserve the right to suspend or terminate your account at any time, with or without notice, if you violate these Terms.</li>
            <li>Upon termination or suspension, your right to use the Service will immediately cease.</li>

            <br />

            <h2>10. Dispute Resolution</h2>
            <li>These Terms will be governed by the laws of South Dakota. Any disputes shall be resolved through binding arbitration in South Dakota.</li>

            <br />

            <h2>11. Modification to Terms</h2>
            <li>We may modify these Terms at any time. We'll notify you of significant changes by posting a notice on the Service or via email. Your continued use signifies acceptance of the modified Terms.</li>

            <br />
        </div>
    `;
    return el;
}