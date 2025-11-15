// the html
const saveThemePopup = `
    <h2>Save Theme</h2>
    <p>Save your theme to modify later.</p>

    <input type="text" id="themeName" placeholder="Enter a name for this theme" />
    <p id="characterLimit_Theme" style="color: var(--text-semi-transparent);">0/30</p>
    <p id="errorSavingTheme" style="display: none; color: var(--error-text);"></p>
            
    <br />

    <button onclick="saveTheme()" id="saveThemeBtn">Save Theme</button> <button onclick="dontSaveTheme()" id="dontSaveThemeBtn">Nevermind</button>
`;

// opening
function saveTheme_Open() {
    // append and put the content inside the modal
    const saveThemePopupElement = document.createElement("dialog");
    saveThemePopupElement.setAttribute("id", "saveTheme");
    saveThemePopupElement.innerHTML = saveThemePopup;
    document.body.appendChild(saveThemePopupElement);

    // make sure the character limit is displayed
    document.getElementById("themeName").addEventListener("input", () => {
        const currentLength = document.getElementById("themeName").value.length;

        if (currentLength > 30) {
            document.getElementById("themeName").value = document.getElementById("themeName").value.substring(0, 30);
        }

        document.getElementById("characterLimit_Theme").textContent = `${currentLength}/30`;
    });

    // then, finally show modal
    saveThemePopupElement.showModal();
}

// closing
function dontSaveTheme() {
    if (!document.getElementById("dontSaveThemeBtn").classList.contains("disabled")) {
        document.getElementById("themeName").value = "";
        document.getElementById("saveTheme").close();

        setTimeout(() => {
            document.getElementById("saveTheme").remove();
        }, 500);
    }
}