export default function issuesPage() {
    document.title = "Issues | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h2>Issues are temporarily unavailable</h2>
        <p class="description">
            Due to issues with GitHub tokens and time constrants, Auride Issues will be available again
            at a later date. To report issues, please use <a href="https://github.com/katniny/Auride/issues" target="_blank">GitHub Issues</a>, 
            thanks!
        </p>
        <button onclick="$nav('/')">Go Home</button>
    `;
    return el;
}