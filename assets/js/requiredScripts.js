// alert dev console users to be careful :p
import { errorOccurred } from "./ui/errorOccurred";
import { pathname } from "./pathname";

// if not literally developing though
if (!window.location.origin.startsWith("http://127.0.0.1") && !window.location.origin.startsWith("http://localhost")) {
   console.log("%cStop!", "color: red; font-size: 35px;");
   console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Auride feature or 'hack' someone's account, it is a scam and will give them access to your Auride account.", "color: white; font-size: 15px; font-family: sans-serif;");
   console.log(" ");
}

// if a script is used on every page, we call it here
// as a "dependency"
function loadScript(src, async, type, crossorigin) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = async;
        if (type) {
            script.type = type;
        }
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

async function loadAllScripts(minimal) {
    try {
        // you can set `minimal` to true to only load necessary
        // scripts, just make sure to define page by adding an or statement!
        // e.g., if (pathname.startsWith("/auth/") || pathname === "/home")
        // if minimal is activate, feel free to still import scripts that
        // will break loading the page, as they will be considered necessary!

        // error occurred ui
        // should be first, just in case anything should happen during this
        // process!
        await loadScript("/assets/js/ui/errorOccurred.js", false, "module");

        // load firebase scripts
        await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js", false);
        await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js", false);
        await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js", false);
        await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-storage.js", false);
        await loadScript("/assets/js/firebase.js", false, "module");

        // load user info
        if (!minimal) {
            // sidebar
            await loadScript("/assets/js/ui/sidebar.js", false, "module");

            // header
            await loadScript("/assets/js/ui/header.js", false, "module");

            // auride accounts
            await loadScript("/assets/js/ui/aurideAccounts.js", false, "module");

            await loadScript("/assets/js/users/userInfo.js", false, "module");
        }
        // page loader & theme loader
        await loadScript("/assets/js/ui/setTheme.js", false, "module");
        await loadScript("/assets/js/ui/loadCachedTheme.js", false, "module");

        await loadScript("/assets/js/ui/pageLoader.js", false, "module");

        // load scripts necessary for fetching data
        await loadScript("/assets/js/users/fetchUserData.js", false, "module");

        // html element behaviors
        await loadScript("/assets/js/closeModalBehavior.js", false);

        // fontawesome
        await loadScript("https://kit.fontawesome.com/be7c331826.js", false, "", "anonymous");

        // done!
        console.log("All page scripts loaded successfully!");
        document.dispatchEvent(new Event("scriptsLoaded"));
    } catch (error) {
        console.error("Error loading scripts: ", error);
        errorOccurred(error);
    }
}

if (pathname.startsWith("/auth/"))
    loadAllScripts(true);
else
    loadAllScripts(false);