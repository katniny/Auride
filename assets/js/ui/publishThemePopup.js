const publishThemePopupHTML = `
    <h2>Publish your theme</h2>
    <p>Ready to publish your theme? We're ready to see it!</p>

    <input type="text" id="themeTitle" placeholder="What's the name of this theme?" />
    <p id="characterLimit_ThemeTitle" style="color: var(--text-semi-transparent)">0/30</p>

    <textarea id="themeDescription" placeholder="Enter a description for this theme!"></textarea>
    <p id="characterLimit_ThemeDescription" style="color: var(--text-semi-transparent)">0/250</p>
    <p id="themeSuccessfullyPublished" style="color: var(--success-color); display: none;">Your theme has been successfully published! It is available on the TransSocial User Studio <a href="/userstudio" style="color: var(--main-color)">here.</a></p>

    <br />

    <button onclick="publishTheme()">Publish Theme</button> <button onclick="dontPublishTheme()">Nevermind</button>
`;

// open modal
function publishTheme_Open() {
    // append and put the content inside the modal
    const publishThemePopup = document.createElement("dialog");
    publishThemePopup.setAttribute("id", "publishTheme");
    publishThemePopup.innerHTML = publishThemePopupHTML;
    document.body.appendChild(publishThemePopup);

    // make sure the character limit is displayed
    document.getElementById("themeTitle").addEventListener("input", () => {
        const currentLength = document.getElementById("themeTitle").value.length;

        if (currentLength > 30) {
            document.getElementById("themeTitle").value = document.getElementById("themeTitle").value.substring(0, 30);
        }

        document.getElementById("characterLimit_ThemeTitle").textContent = `${currentLength}/30`;
    });

    document.getElementById("themeDescription").addEventListener("input", () => {
        const currentLength = document.getElementById("themeDescription").value.length;

        if (currentLength > 250) {
            document.getElementById("themeDescription").value = document.getElementById("themeDescription").value.substring(0, 250);
        }

        document.getElementById("characterLimit_ThemeDescription").textContent = `${currentLength}/250`;
    });

    // then, finally show modal
    publishThemePopup.showModal();
}