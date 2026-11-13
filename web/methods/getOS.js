export function getOS() {
    const ua = navigator.userAgent;
    const platform = navigator.userAgentData?.platform || navigator.platform || "";

    if (/android/i.test(ua))
        return "android";
    if (/iPhone|iPad|iPod/i.test(ua))
        return "ios";
    if (platform === "MacIntel" && navigator.maxTouchPoints > 1) 
        return "ios";
    if (/win/i.test(platform))
        return "windows";
    if (/mac/i.test(platform))
        return "macos";
    if (/linux/i.test(platform))
        return "linux";

    return "unknown";
}