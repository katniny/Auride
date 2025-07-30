// set the cached theme, which will be loaded each load
export function setCachedTheme(theme, colors) {
    // custom theme
    if (colors) {
        setGlobalCustomTheme(colors, false);
        localStorage.setItem("cachedTheme", JSON.stringify(colors));
        return;
    }

    // standard thene
    setGlobalTheme(theme, false);
    localStorage.setItem("cachedTheme", theme);
}

// then, if a theme is cached,
// set it as the theme
if (localStorage.getItem("cachedTheme")) {
    const theme = localStorage.getItem("cachedTheme");
    if (theme.startsWith("{")) {
        const jsonified = JSON.parse(theme);
        setGlobalCustomTheme(jsonified, false);
    } else {
        setGlobalTheme(theme, false);
    }
}

window.setCachedTheme = setCachedTheme;