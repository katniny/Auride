import { faIcon } from "../utils/faIcon.js";

export default function openSourcePage() {
    document.title = "Open Source | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Open Source Attributions</h1>
        <p class="description">Thank you to all the projects that power Auride!</p>
        <p class="description">
            You can also view the raw packages we pull in: <a href="https://github.com/katniny/Auride/blob/main/web/package.json" target="_blank">frontend</a>,
            <a href="https://github.com/katniny/Auride/blob/main/server/package.json" target="_blank">backend</a>,
            <a href="https://github.com/katniny/Auride/blob/main/apps/package.json" target="_blank">app</a>.
        </p>

        <div class="openSourceProject">
            <h2>Vite</h2>
            <p class="description">Next generation frontend tooling. It's fast!</p>
            <a href="https://github.com/vitejs/vite" target="_blank"><button>Source Code</button></a>
            <a href="https://vite.dev" target="_blank"><button>Website</button></a>
        </div>

        <div class="openSourceProject">
            <h2>Tauri</h2>
            <p class="description">Build smaller, faster, and more secure desktop and mobile applications with a web frontend.</p>
            <p class="description">
                Sub-dependencies Auride uses from Tauri:
                <a href="https://github.com/tauri-apps/plugins-workspace" target="_blank">
                    @tauri-apps/plugin-http, @tauri-apps/plugin-os, @tauri-apps/api, @tauri-apps/cli
                </a>
            </p>
            <a href="https://github.com/tauri-apps/tauri" target="_blank"><button>Source Code</button></a>
            <a href="https://tauri.app" target="_blank"><button>Website</button></a>
        </div>

        <div class="openSourceProject">
            <h2>Firebase</h2>
            <p class="description">Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world.</p>
            <a href="https://github.com/firebase/firebase-js-sdk" target="_blank"><button>Source Code</button></a>
            <a href="https://firebase.google.com" target="_blank"><button>Website</button></a>
        </div>

        <div class="openSourceProject">
            <h2>Modern Screenshot</h2>
            <p class="description">Quickly generate image from DOM node using HTML5 canvas and SVG.</p>
            <a href="https://github.com/qq15725/modern-screenshot" target="_blank"><button>Source Code</button></a>
        </div>

        <div class="openSourceProject">
            <h2>protobuf.js</h2>
            <p class="description">High-performance Protocol Buffers for JavaScript and TypeScript. Conformant through Edition 2026, and unusually versatile. No protoc required.</p>
            <a href="https://github.com/protobufjs/protobufjs" target="_blank"><button>Source Code</button></a>
        </div>

        <div class="openSourceProject">
            <h2>cors</h2>
            <p class="description">Node.js CORS middleware</p>
            <a href="https://github.com/expressjs/cors" target="_blank"><button>Source Code</button></a>
        </div>

        <div class="openSourceProject">
            <h2>Express</h2>
            <p class="description">Fast, unopinionated, minimalist web framework for node.</p>
            <a href="https://github.com/expressjs/express" target="_blank"><button>Source Code</button></a>
            <a href="https://expressjs.com" target="_blank"><button>Website</button></a>
        </div>

        <div class="openSourceProject">
            <h2>Firebase Admin</h2>
            <p class="description">Firebase Admin Node.js SDK</p>
            <a href="https://github.com/firebase/firebase-admin-node" target="_blank"><button>Source Code</button></a>
            <a href="https://firebase.google.com/docs/admin/setup" target="_blank"><button>Website</button></a>
        </div>

        <div class="openSourceProject">
            <h2>ws</h2>
            <p class="description">Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js</p>
            <a href="https://github.com/websockets/ws" target="_blank"><button>Source Code</button></a>
        </div>

        <div class="openSourceProject">
            <h2>nodemon</h2>
            <p class="description">Monitor for any changes in your node.js application and automatically restart the server - perfect for development</p>
            <a href="https://github.com/remy/nodemon" target="_blank"><button>Source Code</button></a>
            <a href="https://nodemon.io" target="_blank"><button>Website</button></a>
        </div>
    `;
    return el;
}