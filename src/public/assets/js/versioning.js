let aurideVersion = "v2025.12.17";
let aurideUpdate = "v202512017-1";
let aurideReleaseVersion = "alpha";
let hasUpdateNotes = true;

const notices = document.getElementsByClassName("version-notice");
for (let notice of notices)
   notice.innerHTML = `
      Auride is in ${aurideReleaseVersion} (${aurideVersion}).
      Features are still being added. <a href="/indev">Learn more</a>.
   `;