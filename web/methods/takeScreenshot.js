import { domToBlob } from "modern-screenshot";
import { uploadMedia } from "./uploadMedia.js";

export async function uploadThemeScreenshot(themeId) {
    if (!themeId)
        throw new Error("No theme ID provided!");

    const blob = await domToBlob(document.body, {
        width: window.innerWidth,
        height: window.innerHeight
    });

    // turn blob into file
    const file = new File([blob], "screenshot.png", { type: "image/png" });

    // upload
    return await uploadMedia(file, "themes", "themesId", null, null, themeId);
}