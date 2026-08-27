import { themes } from "../public/defaultThemes";

export async function setDefaultTheme(theme) {
    const themeColors = themes[theme];

    if (!themeColors)
        throw new Error("No theme found! Using default theme..");

    // change css
    for (const [property, value] of Object.entries(themeColors))
        document.documentElement.style.setProperty(`--${property}`, `#${value}`);

    // cache
    localStorage.setItem("currentTheme", theme);
}