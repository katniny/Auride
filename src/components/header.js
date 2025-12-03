import { LitElement, html, css } from "lit";
import { userInfoReady, currentUser } from "../firebase/currentUser.js";

export class AurideHeader extends LitElement {
    // header css
    static styles = css`
        header {
            background: var(--header-color);
            position: fixed;
            width: 100vw;
            height: 60px;
            top: 0;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
        }

        header #headerLogo {
            height: 55px;
            margin: 5px 0 5px 5px;
        }

        header .right .pfp {
            border-radius: 50%;
            height: 40px;
            cursor: pointer;
            background: var(--profile-picture-bg);
        }
    `;

    // properties
    static properties = {
        user: { type: Object }
    };

    async firstUpdated() {
        await userInfoReady;
        this.user = currentUser;
    }

    render() {
        console.log(this.user);

        // the right part of the header html
        let rightHeaderHtml;
        if (this.user && this.user !== "Not signed in") {
            rightHeaderHtml = html`
                <img class="pfp" src="${import.meta.env.VITE_STORAGE_URL}/images/pfp/${this.user.uid}/${this.user.pfp}" />
            `;
        }
        else if (this.user && this.user === "Not signed in") {
            rightHeaderHtml = html`
                <img class="pfp" src="/assets/imgs/defaultPfp.png" />
            `;
        } else {
            rightHeaderHtml = html`
                <img class="pfp skeleton" />
            `;
        }
            

        return html`
            <header>
                <div class="left">
                    <a href="/"><img id="headerLogo" src="/assets/imgs/All_transparent.png" draggable="false" /></a>
                </div>
                <div class="center">
                    <input id="searchBar" />
                </div>
                <div class="right">
                    ${rightHeaderHtml}
                </div>
            </header>
        `;
    }
}

customElements.define("auride-header", AurideHeader);