import { getMediaLink } from "../methods/dev/getMediaLink";

export async function storageLink(path) {
    if (import.meta.env.VITE_BUILD_ENV) {
        // get id and return
        const id = await getMediaLink(path);
        return `${import.meta.env.VITE_STORAGE_URL}/files/${id}`;
    }
    return `${import.meta.env.VITE_STORAGE_URL}/${path}`;
}