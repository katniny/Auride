export function getTextColor(hex) {
    // remove # if present
    hex = hex.replace("#", "");

    // convert to rgb
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // calculate luminance
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;

    // if luminance is dark, return white, else black
    return luminance > 0.5 ? "black" : "white";
}