let aurideVersion = "v2025.11.7";
let aurideUpdate = "v20251107-1";
let aurideReleaseVersion = "alpha";
let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `Auride is in ${aurideReleaseVersion} (${aurideVersion}). Features are still being added. <a href="/indev">Learn more</a>.`;
}
