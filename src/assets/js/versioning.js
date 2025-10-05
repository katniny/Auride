export const aurideVersion = "v2025.10.x";
export const aurideUpdate = "v20251004-1";
export const aurideReleaseVersion = "alpha";
export const hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices) {
   notice.innerHTML = `Auride is currently in the ${aurideReleaseVersion} stage (version ${aurideVersion}). A lot of features are missing or are in development and will be added with updates. <a href="/indev">Learn more</a>.`;
}
