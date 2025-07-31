export function storageLink(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/o/` + path.replaceAll("/", "%2F") + "?alt=media";
}

window.storageLink = storageLink;