import { LitElement, html, css } from "lit";

export class AboutPage extends LitElement {
    static styles = css`
        h1 {
            color: #88ccff;
            text-align: center;
        }
    `;

    firstUpdated() {
        document.title = "Auride, a safe place for everyone";
    }

    render() {
        return html`
            <h1>About page</h1>
        `;
    }
}

customElements.define("about-page", AboutPage);