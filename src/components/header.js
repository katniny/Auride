import { LitElement, html, css } from "lit";
import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";

export class AurideHeader extends LitElement {
    static styles = css`
        header {
            background: #ff88cc;
            padding: 1rem;
            text-align: center;
            color: white;
        }
        a {
            color: white;
            margin: 0 1rem;
            text-decoration: none;
        }
    `;

    render() {
        // test
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid);
            } else {
                console.log("Not signed in.");
            }
        });
        
        return html`
            <header>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </header>
        `;
    }
}

customElements.define("auride-header", AurideHeader);