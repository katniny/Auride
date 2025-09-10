import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync, statSync } from "fs";
import path from "path";

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

        if (stat.isDirectory()) {
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
    plugins: [customRewrite()],
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