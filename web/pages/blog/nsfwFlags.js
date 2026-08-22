export default function nsfwBlockedPage() {
    document.title = "NSFW Flags | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="blogStyle">
            <h1>Definitions of Mature Content Flags on Auride</h1>
            <p style="color: var(--text-semi-transparent);">Created: 4/12/2025</p>
            <p style="color: var(--text-semi-transparent);">Updated: 6/25/2025</p>

            <br />

            <p>When creating a post that contains adult or mature content, it's important to flag it properly so others control how (or if) they see it.</p>
            <p>Here's a breakdown of what each NSFW tag means and when you should use it.</p>

            <br />

            <h2>Adult Content</h2>
            <p><b>Use this if</b>: Your post includes explicit sexual imagery, visible genitalia, or graphic sexual acts.</p>
            <p>This is the most explicit flag, only apply it to content that would be considered pornographic or sexually explicit.</p>

            <br />

            <h2>Sexually Suggestive</h2>
            <p><b>Use this if</b>: Your post contains sexual themes or suggestive imagery, but <b>doesn't</b> show actual nudity or explicit acts.</p>
            <p>Examples include seductive notes, revealing outfits, or flirtatious art. It's more about the vibe than the visuals.</p>

            <br />

            <h2>Non-Sexual Nudity</h2>
            <p><b>Use this if</b>: Your post contains nudity that isn't meant to be sexual.</p>
            <p>This can include things like art, figure drawing, medical illustrations, or nature-related nudity. Think of it like museum-safe nudity.</p>

            <br />

            <h2>Fetish Content</h2>
            <p><b>Use this if</b>: Your post includes fetish-related material, whether visual or written.</p>
            <p>This includes niche or kink-related content, even if it's not explicitly sexual or doesn't involve nudity. This tag helps people avoid or seek out specific adult interests.</p>

            <br />

            <h2>Erotic Writing</h2>
            <p><b>Use this if</b>: Your post contains written content with sexual themes, explicit themes, or adult fantasies.</p>
            <p>This is for stories, poems, or dialogue that are erotic in nature, even if there's no image or visual media involved.</p>

            <br />

            <p>💡 Tip: If you're ever unsure, it's better to <b>tag than not tag</b>. Users have control over how they view flagged content, and your transparency helps keep Auride safe for everyone.</p>

            <br />

            <p>Thank you,</p>
            <p>Katty <a href="/u/katniny">(@katniny)</a></p>

            <br />
            <br />
        </div>
    `;
    return el;
}