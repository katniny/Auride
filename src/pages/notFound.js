export default function loadNotFound() {
    document.title = "Page Not Found | Auride";
    const el = document.createElement("div");
    const pathname = window.location.pathname;
    el.innerHTML = `
        <div class="pageNotFound">
            <img class="pageFailAurora" src="/assets/mascot/concerned.png" draggable="false" />
            <h2>We were unable to find that page :(</h2>
            <p class="description">
                We were unable to find ${pathname}.
                The page doesn't exist, got moved, or got lost to time.
            </p>

            <br />

            <a href="/u/${pathname}">Were you looking for a profile?</a>

            <br />

            <p>Go to the home page? We know that page exists!</p>
            <a href="/home"><button>Go Home</button></a>
        </div>
    `;
    return el;
}