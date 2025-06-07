let transsocialVersion = "v2025.6.7";
let transsocialUpdate = "v2025067-2";
let transsocialReleaseVersion = "pre-alpha";
let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `TransSocial is currently in the ${transsocialReleaseVersion} stage (version ${transsocialVersion}). A lot of features are missing or are in development and will be added with updates. <a href="/indev">Learn more</a>.`;
}
