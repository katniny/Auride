import { defineConfig } from "vite";
import { readdirSync, statSync } from "fs";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'

function customRewrite() {
    return {
        name: "custom-rewrite",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url.startsWith("/u/")) {
                    req.url = "/u.html";
                } else if (req.url.startsWith("/note/")) {
                    req.url = "/note.html";
                } else if (req.url.startsWith("/userstudio/")) {
                    req.url = "/userstudio.html";
                }
                next();
            });
        }
    }
}

// recursively find all .html files
function getHtmlInputs(dir = __dirname, inputs = {}) {
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = statSync(fullPath);

        if (
          stat.isDirectory() &&
          // Ignore directories that will not contain application HTML
          !entry.includes("node_modules") &&
          !entry.includes("storage")
        ) {
          getHtmlInputs(fullPath, inputs);
        } else if (entry.endsWith(".html")) {
            // create a name like "index", "subdir/page", etc.
            const relativePath = path.relative(__dirname, fullPath);
            const name = relativePath.replace(/\\/g, "/").replace(/\.html$/, "");
            inputs[name] = fullPath;
        }
    }

    return inputs;
}

export default defineConfig({
    plugins: [customRewrite(), VitePWA({
        manifest: {
            name: "Auride",
            short_name: "Auride",
            description: "Auride is an social media platform built to be a safe place for everyone! 💝",
            display: "minimal-ui",
            id: "auride.xyz",
            start_url: "/home.html",
            theme_color: "#ef97be",
            background_color: "#1d1d1d",
            icons: [{ src: "/assets/imgs/favicon.png" }]
        },
        injectRegister: false,
        registerType: "autoUpdate",
    })],
    server: {
        fs: {
            strict: true
        }
    },
    appType: "mpa",
    build: {
        rollupOptions: {
            input: getHtmlInputs()
        }
    }
});