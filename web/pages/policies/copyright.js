export default function copyrightPage() {
    document.title = "Copyright | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Copyright</h1>
            <p class="description">Last updated: 6/25/2025 (Formatted as MM/DD/YY)</p>
            <p class="description">Note: All policy changes take effect immediately upon being posted.</p>

            <br />

            <h2>Ownership</h2>
            <li>
                <b>Our Content:</b>
                All content, design elements, code, graphics, logos, trademarks, and service marks on the Auride website or
                within our applications (collectively, the "Site Content") are owned by or licensed to Auride.
                Unauthorized use or reproduction of the Site Content is prohibited.
            </li>
            <li>
                <b>Limited Permissions:</b> 
                You may access and use the Auride website and services only in accordance with our 
                <a href="/policies/terms" style="color: var(--main-color)">Terms of Service</a>.
            </li>

            <br />

            <h2>Changes to Copyright Policy</h2>
            <p>We may modify this Copyright Policy at any time. We'll post a notice on our website when significant changes are made.</p>

            <br />
        </div>
    `;
    return el;
}