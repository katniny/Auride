// if a script is used on every page, we can call it here
// as a "dependency"
function loadScript(src, async) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = async;
        script.type = "module";
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

async function loadAllScripts() {
    try {
        await loadScript("/assets/js/router.js", false);

        // finished!
        console.log("All-page scripts loaded successfully.");
        document.dispatchEvent(new Event("scriptsLoaded"));
    } catch (error) {
        console.error("Error loading Firebase scripts: ", error);
    }
}

loadAllScripts();