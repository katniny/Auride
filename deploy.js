const fs = require("fs/promises");
const { execSync } = require("child_process");
const path = require("path");

// helper function to rename files
async function move(from, to) {
    await fs.rename(from, to);
}

// helper function to copy files
async function copy(src, dest) {
    await fs.cp(src, dest, { recursive: true });
}

async function run() {
    const root = process.cwd();

    // set vars
    const src = path.join(root, "src");
    const dist = path.join(src, "dist");
    // files to rename & to move
    const envVars = path.join(src, "public/assets/js/envVars.js");
    const envVarsDev = path.join(src, "public/assets/js/envVars-dev.js");

    const firebase = path.join(src, "public/assets/js/firebase.js");
    const firebaseDev = path.join(src, "public/assets/js/firebase-dev.js");

    // prod files
    const prodEnvVars = path.join(root, "prod/public/assets/js/envVars.js");
    const prodFirebase = path.join(root, "prod/public/assets/js/firebase.js");

    try {
        // move prod and dev files
        console.log("Switching to production files...");
        await move(envVars, envVarsDev);
        await move(firebase, firebaseDev);
        await move(prodEnvVars, envVars);
        await move(prodFirebase, firebase);

        // build auride
        console.log("Building project...");
        execSync("npm run build", { cwd: src, stdio: "inherit" });

        // copy .vercel and vercel.json to the dist
        console.log("Copying Vercel config...");
        await copy(path.join(root, ".vercel"), path.join(dist, ".vercel"));
        await copy(path.join(root, "vercel.json"), path.join(dist, "vercel.json"));

        console.log("Deploying to Vercel...");
        execSync("vercel --prod", { cwd: dist, stdio: "inherit" });
    } finally {
        // revert changes
        console.log("Reverting file changes...");

        await move(envVars, prodEnvVars);
        await move(firebase, prodFirebase);
        await move(envVarsDev, envVars);
        await move(firebaseDev, firebase);

        console.log("Successfully deployed Auride.");
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});