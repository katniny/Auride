export function isNearBottom(threshold = 100) {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
}