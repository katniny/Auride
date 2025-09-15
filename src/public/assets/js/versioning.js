let aurideVersion = "v2025.9.15";
let aurideUpdate = "v20250915-1";
let aurideReleaseVersion = "alpha";
let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `Auride is currently in the ${aurideReleaseVersion} stage (version ${aurideVersion}). A lot of features are missing or are in development and will be added with updates. <a href="/indev">Learn more</a>.`;
}
