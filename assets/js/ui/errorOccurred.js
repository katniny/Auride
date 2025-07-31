export function errorOccurred(error) {
    // replace body html
    document.body.innerHTML = `
        <img src="/assets/imgs/All_transparent.png" draggable="false" alt="Auride logo" width="350px" />

        <h1 style="margin-top: 10px;">Uh oh! An error occurred!</h1>
        <p>Auride encountered an error while trying to perform a vital function.</p>

        <br />

        <p>For Developers: This is the occur that occurred in your code.</p>
        <p>For Users: This is an issue on our end, not yours! Please try refreshing the page. If it happens again, please report this issue on our <a href="https://github.com/katniny/Auride/issues" target="_blank">GitHub issue tracker</a>.</p>

        <br />

        <details>
            <summary>Error Details (Click for Details)</summary>
            <small>${error}</small>
            <br />
            <small>Check the console (Typically Ctrl + Shift + I or F12) for additional details.
        </details>
    `;

    // add styling to body
    document.body.style.textAlign = "center";
    document.body.style.margin = "35px";
    
    // set theme back to default
    setGlobalTheme("Dark", false);
}

window.errorOccurred = errorOccurred;