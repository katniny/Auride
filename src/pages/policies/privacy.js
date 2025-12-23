export default function privacyPage() {
    document.title = "Privacy Policy | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Privacy Policy</h1>
            <p class="description">Last updated: 7/30/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <p>This Privacy Policy outlines how Auride collects, uses, and protects your personal information when you use our Service. We deeply value your privacy and aim to be transparent about our data practices.</p>

            <br />

            <h2>Information We Collect</h2>
            <li><b>Account Information:</b> When you create an account, you provide us with information such as your username, email address, and birth date to verify your age.</li>
            <li><b>Profile Information:</b> You may choose to provide additional information, like your display name, bio, profile picture, and pronouns.</li>
            <li><b>User Content:</b> This includes any posts, comments, or messages you create on Auride.</li>
            <li><b>Device Data:</b> We may collect information about the device you use to access Auride, such as IP address, browser type, and operating system.</li>
            <li><b>Location Data (Non-Persistent):</b> We may temporarily check your general region (such as country) based on your IP address for content filtering purposes. This data is not stored.</li>

            <br />

            <h2>How We Use Your Information</h2>
            <li><b>Provide the Service:</b> We use your information to operate Auride, personalize your experience, and connect you with other users.</li>
            <li><b>Communicate:</b> We may use your contact information to send important updates, security notices, or to respond to your inquiries.</li>
            <li><b>Security:</b> We use information to help maintain the security and integrity of Auride, and to detect and prevent fraud or abuse.</li>
            <li><b>Legal Compliance:</b> We may check your region to comply with local laws, such as restricting access to certain content based on age or content safety requirements.</li>

            <br />

            <h2>Information Sharing</h2>
            <li><b>Payments:</b> All payments are handled through <a href="https://stripe.com/" target="_blank" style="color: var(--main-color)">Stripe</a>. Auride does not store or process payment information. <a href="https://stripe.com/privacy" target="_blank" style="color: var(--main-color);">Stripe's privacy policy</a> governs how payment data is managed.</li>
            <li><b>We do NOT share your personal information with third parties for their marketing or advertising purposes.</b></li>
            <li><b>Service Providers:</b> In very limited circumstances, we may share necessary information with trusted service providers who assist us in operating Auride (e.g., web hosting). These providers are bound to protect your information.</li>
            <li><b>Legal Compliance:</b> We may disclose your information if required to do so by law or if we believe, in good faith, that such disclosure is necessary to protect our rights or safety, investigate fraud, or comply with a legal process.</li>

            <br />

            <h2>Your Choices</h2>
            <li><b>Account Information:</b> You can update or modify your account information in your <a href="/settings">profile settings</a>.</li>
            <li><b>Content:</b>You can edit or delete the content you post. Keep in mind that content may be cached or retained by others.</li>


            <br />

            <h2>Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no transmission over the internet is 100% secure. You're responsible for protecting your login credentials.</p>

            <br />

            <h2>Children's Privacy</h2>
            <p>Auride is not directed towards children under 13. We do not knowingly collect personal information from anyone under the minimum age in their jurisdiction.</p>

            <br />

            <h2>Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We'll notify you of significant changes by posting a notice on Auride or via email. Your continued use after changes signifies your acceptance.</p>

            <br />
        </div>
    `;
    return el;
}