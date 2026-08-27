export async function useODFont(val) {
    localStorage.setItem("useODFont", val);

    if (val === true) {
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
        `;
        document.head.appendChild(style);
    }
}