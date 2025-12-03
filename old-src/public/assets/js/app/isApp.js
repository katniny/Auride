const isTauri = typeof window.__TAURI__ !== "undefined";
let version = null;

// to get the current tauri app version
async function getTauriVersion() {
    version = await window.__TAURI__.app.getVersion();
}
// run this automatically, if running on the app
if (isTauri) {
    // get current version
    getTauriVersion();
    
    // then see if update available
    isUpdateAvailable().then((update) => {
        showNewUpdateAvailablePopup();
    });
}

// to see if an update is required
async function isUpdateAvailable() {
    const githubUrl = "https://api.github.com/repos/katniny/Auride/releases";

    try {
        const res = await fetch(githubUrl);
        if (!res.ok) throw new Error("failed to fetch releases.");

        // get json file
        const releases = await res.json();

        // if not an array or array is empty, return
        if (!Array.isArray(releases) || releases.length === 0) return;

        // get the latest release tag
        const latestRelease = releases[0].tag_name.replace(/^v/, '');

        // simple version compare
        const isNewer = compareVersions(latestRelease, version) > 0;

        return isNewer;
    } catch (err) {
        console.error(err);
        return;
    }
}

// compare versions
function compareVersion(a, b) {
    // map numbers
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    
    // compare versions
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na > nb) return 1;
        if (na < nb) return -1;
    }
    return 0;
}