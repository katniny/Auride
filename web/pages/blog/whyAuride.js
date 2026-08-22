export default function whyAuridePage() {
    document.title = "Why Auride | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Why choose Auride over anything else?</h1>
            <p style="color: var(--text-semi-transparent);">Created: 10/20/2024</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>You're probably seeing this through our advertising and you're likely wondering "Why choose Auride over anything else when alternatives like Bluesky are more popular?"</p>
            <p>Well, here's why:</p>

            <br />

            <b>Legend:</b>
            <p>✅ Yes
            <br/>〰️ Kind of
            <br/>❌ No
            <br/>🔗 With Restrictions
            </p>
            <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 10px;">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Auride</th>
                        <th>Twitter</th>
                        <th>Bluesky</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>🖼️ Training AI with your posts</td>
                        <td>❌</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>🚫 Blocking</td>
                        <td>✅</td>
                        <td>〰️</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>📽️ GIF Support</td>
                        <td>✅</td>
                        <td>🔗</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>🎨 Custom Themes</td>
                        <td>✅</td>
                        <td>❌</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>🧑‍💻 Open Source</td>
                        <td>✅</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>🚩 Post Flagging</td>
                        <td>✅</td>
                        <td>❌</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>✔️ Pay to Verify</td>
                        <td>❌</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>🛠️ Proper Moderation</td>
                        <td>✅</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>⭐ Suggest Features to Devs</td>
                        <td>✅</td>
                        <td>❌</td>
                        <td>〰️🔗</td>
                    </tr>
                </tbody>
            </table>

            <br />

            <h2>Your Art, Your Control</h2>
            <p>Unlike many other platforms, Auride respects your creative work. We will <b>never train AI</b> with your notes, ensuring your content remains yours. We believe in putting creators first, allowing you to share freely without the worry of your art being used against your will.</p>

            <br />

            <h2>Say Goodbye to Sneaky Blocking</h2>
            <p>Our blocking feature is straightforward: When you block someone on Auride, they're truly gone from your timeline. No more peeking from blocked accounts or unwanted interactions. This is how blocking should work and this is how it will always work on Auride!</p>

            <br />

            <h2>GIFs Galore!</h2>
            <p>If you love GIFs, you're in luck! Unlike Bluesky, Auride allows you to express yourself with GIFs. Whether you're sharing a funny moment or want to share something outside a video, we've got you covered!</p>

            <br />

            <h2>Make It Your Own</h2>
            <p>With <b>Custom Themes</b>, you can personalize your Auride experience. Choose colors and styles that resonate with you and make your profile stand out from the crowd.</p>

            <br />

            <h2>Safe and Secure</h2>
            <p>Our note flagging system keeps the community safe by allowing users to report inappropriate content easily, as well as filter it from their timeline. With proper moderation in place, we ensure that everyone has a positive experience on Auride.</p>

            <br />

            <h2>Transparency Matters</h2>
            <p>We're proud to be open source, giving you the complete view on how Auride operates. This means you can contribute, suggest improvements, and help shape the future of our platform. We believe in community-driven development!</p>

            <br />

            <h2>No Paywalls for Verification</h2>
            <p>Unlike Twitter, we believe verification should be accessible to all. There's no need to pay for a badge; your voice matters regardless of your wallet size.</p>

            <br />

            <h2>Feature Suggestions Welcome</h2>
            <p>At Auride, we value your input. Our platform is built around our community, and we encourage you to suggest features directly to our developers by creating a note or on Discord. If you have an idea that could enhance your experience, we want to hear it!</p>

            <br />

            <h2>Introducing TransMusic</h2>
            <p>We're excited to announce that our TransMusic platform is on the way! This upcoming platform will allow you to share and discover music like never before. Whether you're an aspiring artist looking to share your music or a music lover searching for new music, TransMusic will be your go-to hub for all things music.</p>
            <p>Just like Auride, our music platform will prioritize user rights and creative freedom, ensuring you have the best experience possible.</p>

            <br />

            <h2>Join Us Today!</h2>
            <p>In a world where social media often prioritizes profit over people, Auride stands out as a platform dedicated to user rights, creativity, and community engagement. If you're looking for a social media experience that puts you first, come join us and be part of something special!</p>
            <a href="/auth/register"><button>Join Us Today</button></a>

            <br />
            <br />
        </div>
    `;
    return el;
}