import { setTheme } from "../methods/setTheme";
import { themes } from "../public/defaultThemes";

export async function setDefaultTheme(theme, set = true) {
    const themeColors = themes[theme];

    if (!themeColors)
        throw new Error("No theme found! Using default theme..");

    // change css
    for (const [property, value] of Object.entries(themeColors))
        document.documentElement.style.setProperty(`--${property}`, `${value}`);

    // cache & dispatch event
    if (set)
        await setTheme(theme);
    localStorage.setItem("currentTheme", theme);
    document.dispatchEvent(new Event("changedTheme"));
}

export async function setCustomTheme(colors, set = true) {
    if (!colors) {
        setDefaultTheme("Dark");
        setTheme("Dark");
        console.log(colors);
        throw new Error("No colors for the theme! Using default theme..");
    }

    // change css
    for (const [val, color] of Object.entries(colors))
        document.documentElement.style.setProperty(`--${val}`, `${color}`);

    // cache & dispatch event
    if (set)
        await setTheme("Custom", colors);
    localStorage.setItem("currentTheme", "Custom");
    localStorage.setItem("customThemeColors", JSON.stringify(colors));
}