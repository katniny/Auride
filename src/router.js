import { faIcon } from "./utils/faIcon.js";

// import pages
// defines all routes in the app, each with a path and a loader function
export const routes = [
    // main pages
    { path: "/", loader: () => navigate("/home") },
    { path: "/home", loader: () => import("./pages/home.js") },
    { path: "/about", loader: () => import("./pages/about.js") },
    { path: "/u/:id", loader: () => import("./pages/user.js") },
    { path: "/note/:id", loader: () => import("./pages/note.js") },
    { path: "404", loader: () => import("./pages/notFound.js") },

    // policies
    { path: "/policies/terms", loader: () => import("./pages/policies/terms.js") },
    { path: "/policies/privacy", loader: () => import("./pages/policies/privacy.js") },
    { path: "/policies/guidelines", loader: () => import("./pages/policies/guidelines.js") },
    { path: "/policies/copyright", loader: () => import("./pages/policies/copyright.js") },
    { path: "/policies/cookies", loader: () => import("./pages/policies/cookies.js") },
    { path: "/policies/child-safety", loader: () => import("./pages/policies/childSafety.js") },

    // blogs
    { path: "/blog/introducing-aurorai", loader: () => import("./pages/blog/introducingAurorAI.js") },
    { path: "/blog/memorialized-accounts", loader: () => import("./pages/blog/memorializedAccounts.js") },
    { path: "/blog/new-flagging-system", loader: () => import("./pages/blog/newFlaggingSystem.js") },
    { path: "/blog/note-previews", loader: () => import("./pages/blog/notePreviews.js") },
    { path: "/blog/nsfw-blocked", loader: () => import("./pages/blog/nsfwBlocked.js") },
    { path: "/blog/nsfw-flags", loader: () => import("./pages/blog/nsfwFlags.js") },
    { path: "/blog/political-flags", loader: () => import("./pages/blog/politicalFlags.js") },
    { path: "/blog/retiring-transsocial", loader: () => import("./pages/blog/retiringTranssocial.js") },
    { path: "/blog/sensitive-flags", loader: () => import("./pages/blog/sensitiveFlags.js") },
    { path: "/blog/transsocial-relaunched-1yo", loader: () => import("./pages/blog/transsocialRelaunched1yo.js") },
    { path: "/blog/welcome-aurora", loader: () => import("./pages/blog/welcomeAurora.js") },
    { path: "/blog/what-qualifies-as-political", loader: () => import("./pages/blog/whatQualifiesAsPolitical.js") },
    { path: "/blog/why-auride", loader: () => import("./pages/blog/whyAuride.js") }
];

// navigate to a path without reloading the page
export function navigate(path) {
    // push new URL to history
    history.pushState({}, "", path);
    
    // update the view
    handleRoute();
}

// match current pathname to a route and extract params
function matchRoute(pathname) {
    for (const route of routes) {
        // split route and path into segmnets, ignoring empty strings
        const routeParts = route.path.split("/").filter(Boolean);
        const pathParts = pathname.split("/").filter(Boolean);

        // skip if lengths dont match
        if (routeParts.length !== pathParts.length)
            continue;

        // store dynamic parameters
        const params = {};
        let matched = true;

        // check each segment
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(":")) {
                // dynamic segment, save param
                const paramName = routeParts[i].slice(1);
                params[paramName] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                // static segment mismatch
                matched = false;
                break;
            }
        }

        // return route and extracted params
        if (matched)
            return { route, params };
    }

    // no match found
    return null;
}

// handle the current route and render the appropriate view
export async function handleRoute() {
    // get current path and find matching route
    const pathname = window.location.pathname;
    const match = matchRoute(pathname);
    
    // clear current content
    const app = document.getElementById("app");
    const loadingIndicator = await faIcon("solid", "circle-notch", "spin", "xl").outerHTML;
    app.innerHTML = `
        <span id="pageLoadingIndicator">
            ${loadingIndicator}
        </span>
    `;
    const pageLoadingIndicator = document.getElementById("pageLoadingIndicator");

    // if no route matched, load 404 page
    if (!match) {
        const mod404 = await routes.find(r => r.path === "404").loader();
        app.appendChild(mod404.default());
        pageLoadingIndicator.remove();
        return;
    }

    // load matched route module
    const module = await match.route.loader();
    const view = await module.default(match.params);
    app.appendChild(view);

    // let out a event that other elements used to know we navigated
    pageLoadingIndicator.remove();
    document.dispatchEvent(new Event("navigatedToNewPage"));
}

// handle internal link clicks to use client-side navigation
document.addEventListener("click", e => {
    // find closest <a> tag
    const a = e.target.closest("a");
    if (!a) return;

    // get link
    const href = a.getAttribute("href");
    if (!href)
        return;

    // ignore external links
    if (!href.startsWith("/") && !href.startsWith(window.location.origin))
        return;

    // ignore special clicks (ctrl/meta/middle click, etc.)
    if (e.metaKey, e.ctrlKey, e.shiftKey, e.button !== 0)
        return;

    // prevent full page reload and navigate via router
    e.preventDefault();
    navigate(href);
});

// handle browser back/forward buttons
window.addEventListener("popstate", handleRoute);