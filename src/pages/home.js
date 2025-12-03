import { LitElement, html, css } from "lit";

export class HomePage extends LitElement {
    static styles = css`
        h1 {
            color: #ff88cc;
            text-align: center;
        }
    `;

    firstUpdated() {
        document.title = "Home | Auride";
    }

    render() {
        return html`
            <h1>Welcome Home!</h1>
            <p>This is normal text that should render white.</p>
        `;
    }
}

customElements.define("home-page", HomePage);