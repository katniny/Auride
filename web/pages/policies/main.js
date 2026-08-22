export default function privacyPage() {
    document.title = "Privacy Policy | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h2>Our Policies</h2>
            <p class="description">Here you can access all our important policies, like our Privacy Policy and Terms of Service. These policies exist to protect both you and our community, ensuring everyone has a safe, respectful, and enjoyable experience while using Auride.</p>

            <br />
            <a href="/policies/terms"><button>Terms of Service</button></a>
            <p class="description">Review the rules and guidelines for using Auride.</p>

            <br />
            <a href="/policies/privacy"><button>Privacy Policy</button></a>
            <p class="description">Learn how we collect, use, and protect your information.</p>

            <br />
            <a href="/policies/child-safety"><button>Child Safety</button></a>
            <p class="description">Discover how we ensure a safe environment for young users.</p>

            <br />
            <a href="/policies/cookies"><button>Cookies</button></a>
            <p class="description">Understand how we use cookies to enhance your experience.</p>

            <br />
            <a href="/policies/copyright"><button>Copyright</button></a>
            <p class="description">Learn about our copyright policies and rights regarding Auride's content.</p>

            <br />
            <a href="/policies/guidelines"><button>Community Guidelines</button></a>
            <p class="description">Review our guidelines to help maintain a respectful and inclusive community.</p>

            <br />
        </div>
    `;
    return el;
}