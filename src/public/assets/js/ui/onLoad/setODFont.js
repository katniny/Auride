function useODFont() {
    const style = document.createElement("style");
    style.id = "odFontStyle";
    style.innerHTML = `
        @font-face {
            font-family: "OpenDyslexic";
            src: url("/assets/fonts/OpenDyslexic.otf") format("opentype");
        }

        * {
            font-family: "OpenDyslexic", sans-serif;
        }

        .aurideAccounts {
            font-size: 0.85rem;
        }

        .policies {
            margin-top: 425px;
        }
    `;
    document.head.appendChild(style);
    localStorage.setItem("useODFont", true);
}

// if in local storage, use od font by default
const useODFontSaved = localStorage.getItem("useODFont");
if (useODFontSaved)
    useODFont();