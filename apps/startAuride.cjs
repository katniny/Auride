const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// get paths relative to current file
const webDir = path.resolve(__dirname, "../web");
const distDir = path.resolve(webDir, "dist");
const appsSrcDir = path.resolve(__dirname, "../apps/src");

// build the frontend client
console.log("Building web...");
execSync("npm run build", {
    cwd: webDir,
    stdio: "inherit"
});

// copy the frontend to the app src
console.log("Copying data...");
fs.cpSync(distDir, appsSrcDir, {
    recursive: true
});

// once done, run the app
console.log("Done! Running app...")
execSync("npm run tauri dev", {
    cwd: appsSrcDir,
    stdio: "inherit"
});