let aurideVersion = "v2025.11.28";
let aurideUpdate = "v202511028-2";
let aurideReleaseVersion = "alpha";
let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `Auride is in ${aurideReleaseVersion} (${aurideVersion}). Features are still being added. <a href="/indev">Learn more</a>.`;
}
