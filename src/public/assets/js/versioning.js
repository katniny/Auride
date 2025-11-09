export let aurideVersion = "v2025.11.7";
export let aurideUpdate = "v20251107-1";
export let aurideReleaseVersion = "alpha";
export let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `Auride is in ${aurideReleaseVersion} (${aurideVersion}). Features are still being added. <a href="/indev">Learn more</a>.`;
}
