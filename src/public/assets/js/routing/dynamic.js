// TODO: i cant finish this until modules are done...
// annoying, but it'll be better for auride long term

// TODO: this requires a major code refactor, but
// we shouldn't need this
const scriptsToReload = [
    "/assets/js/ts_fas_acih.js",
    "/assets/js/pathName.js"
];

// when requested, render the route
async function renderRoute(path, state = []) {
    const app = document.querySelector("app");

    // fetch the next page
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("Failed to fetch page.");
        const text = await res.text();

        // create a fake DOM to parse
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // grab the new <app> content from it
        const newApp = doc.querySelector("app");
        if (!newApp) throw new Error("No <app> found in response.");

        // swap the contents
        app.innerHTML = newApp.innerHTML;
        reloadScripts(scriptsToReload);

        // update title
        document.title = doc.title || "Auride";

        // scroll to top and focus main
        window.scrollTo(0, 0);
        app.focus();

        // re-run inline scripts
        runInlineScripts(newApp);
    } catch (err) {
        console.error(err);
        app.innerHTML = `<h2>Error loading page... :(</h2>`;
    }
}

// navigate within auride
function navigateTo(url, opts = { replace: false }) {
    // get the requested path
    const path = url.pathname + url.search + url.hash;
    
    // wants to replace?
    if (opts.replace)
        history.replaceState({}, "", path);
    else
        history.pushState({}, "", path);

    // render
    renderRoute(path);
}

// helper: is this link internal to our origin?
function isInternalLink(url) {
    if (!url.protocol.startswith("http")) return false;
    return url.origin === location.origin;
}

// helper: re-execute inline scripts since innerHTML doesn't run them
function reloadScripts(urls = []) {
    urls.forEach(src => {
        // remove any old script with the same src
        const old = document.querySelector(`script[src="${src}"]`);
        if (old) old.remove();

        // create a new script element
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    });
}

function runInlineScripts(container) {
    container.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");

        // copy attributes (like type or src)
        for (const attr of oldScript.attributes)
            newScript.setAttribute(attr.name, attr.value);

        // load scripts
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    });
}

// click listener
document.addEventListener('click', (e) => {
    // only left clicks
    if (e.button !== 0) return;

    // ignore modifier keys (ctrl, shift, alt, meta)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // get closest link
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (link.hasAttribute("download")) return;
    if (link.target && link.target !== "_self") return;

    // resolve full url
    const url = new URL(href, location.href);

    // only intercept same-origin links
    if (url.origin !== location.origin) return;

    // prevent browser default navigation
    e.preventDefault();

    // update history + render
    history.pushState({}, "", url.pathname + url.search + url.hash);
    renderRoute(url.pathname + url.search + url.hash);
});

// handle back/forward
window.addEventListener('popstate', () => {
    renderRoute(location.pathname + location.search + location.hash);
});

// initial render on page load
renderRoute(location.pathname + location.search + location.hash, history.state);