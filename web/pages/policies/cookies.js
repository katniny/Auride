export default function cookiesPage() {
    document.title = "Cookies | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Cookies</h1>
            <p class="description">Last updated: 6/25/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <p>This Cookie Policy explains how Auride uses cookies and similar tracking technologies when you visit or use our applications.</p>

            <br />

            <h2>What are Cookies?</h2>
            <p>Cookies are small text files that websites place on your computer or mobile device when you visit. They are widely used to make websites function more efficiently, to personalize user experiences, and to provide usage analytics.</p>

            <br />

            <h2>How We Use Cookies</h2>
            <p>Auride uses cookies for several purposes:</p>
            <li><b>Essential Cookies:</b> These are strictly necessary for the core functions of our site, such as enabling login, managing your session, and preventing fraud.</li>
            <li><b>Functionality Cookies:</b> These remember your preferences on the site, such as your language or display settings, making the site more convenient to use.</li>

            <br />

            <h2>Your Control Over Cookies</h2>
            <li><b>Browser Settings:</b> Most browsers allow you to manage cookie settings, including enabling or disabling certain types of cookies or blocking cookies entirely. Consult your browser's help resources for instructions.</li>

            <br />

            <h2>Changes to Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time. We'll post a notice on our website when significant changes are made.</p>

            <br />
        </div>
    `;
    return el;
}