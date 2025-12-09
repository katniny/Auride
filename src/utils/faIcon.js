// get the script ready upon function call in main.js
export function getFaReady() {
    // create script
    const script = document.createElement("script");
    script.src = `https://kit.fontawesome.com/${import.meta.env.VITE_FONT_AWESOME_ID}.js`;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
}

// when called, add an icon from fontawesome
export function faIcon(set, name, anim, size, color, marginLeft) {
    // create icon
    const icon = document.createElement("i");

    // add set and name
    // e.g., fa-solid fa-person
    if (!set || !name) {
        // TODO: i want to create a custom error handler that'll show errors on the page itself
        // e.g., via a little pill or something on the top of the screen
        console.error("Please define an icon set or name.");
        return;
    }
    icon.classList.add(`fa-${set}`);
    icon.classList.add(`fa-${name}`);

    // if size/anim/color/marginLeft, add it to the element
    if (size)
        icon.classList.add(`fa-${size}`);
    if (anim)
        icon.classList.add(`fa-${anim}`);
    if (color)
        icon.style.color = color;
    if (marginLeft)
        icon.style.marginLeft = marginLeft;

    // then, return the icon
    return icon;
}