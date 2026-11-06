import { loadThemes } from "../../methods/loadThemes.js";
import { faIcon } from "../../utils/faIcon.js";

export async function loadThemesPopup() {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <h2>
            ${faIcon("solid", "download").outerHTML} Load Theme
        </h2>
        <p class="description">
            Load one of your saved themes.
        </p>

        <br />

        <div class="savedThemes">
            ${faIcon("solid", "circle-notch", "spin", "lg").outerHTML}
        </div>

        <br />

        <button class="closePopup">Nevermind</button>
    `;

    // add attributes
    modal.className = "loadThemesPopup";
    document.getElementById("app").appendChild(modal);

    // set close popup button
    const closeBtn = modal.querySelector(".closePopup");
    closeBtn.onclick = () => closeLoadThemesPopup();

    // get themes
    const themes = await loadThemes();
    console.log(themes);
    const themeHolder = modal.querySelector(".savedThemes");
    const fragment = document.createDocumentFragment();
    Object.entries(themes).forEach(async themeEntry => {
        const div = document.createElement("div");
        div.className = "loadedTheme";
        const theme = themeEntry[1];
        
        // does theme meet standards?
        let meetsStandard;
        if (theme?.version !== 2)
            meetsStandard = "Not up-to-date with latest colors";
        else
            meetsStandard = "Up-to-date!";

        // published?
        let isPublished;
        if (theme?.published)
            isPublished = "Public";
        else
            isPublished = "Not published yet";

        div.innerHTML = `
            <h3>${theme?.name}</h3>
            <p class="description">${meetsStandard}</p>
            <p class="description">${isPublished}</p>
        `;

        // load theme on click
        div.onclick = () => {
            const colorInputs = document.querySelectorAll("input[au-raw-css-val]");
            const themeTracker = document.querySelector(".themeTracker");
            const themePublish = document.querySelector(".themePublishWarning");
            // load
            colorInputs.forEach(colorInput => {
                const rawCssVal = colorInput.getAttribute("au-raw-css-val");
                colorInput.value = theme?.colors[rawCssVal];
                colorInput.dispatchEvent(new Event("input"));
                themeTracker.textContent = theme?.name;
                themePublish.style.display = "block";
                closeLoadThemesPopup();
            });
        };

        fragment.appendChild(div);
    });
    themeHolder.innerHTML = "";
    themeHolder.appendChild(fragment);
    
    // show modal
    modal.showModal();
}

// close popup
function closeLoadThemesPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".loadThemesPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}