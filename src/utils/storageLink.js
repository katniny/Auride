export function storageLink(path) {
    return `${import.meta.env.VITE_STORAGE_URL}/${path}`;
}