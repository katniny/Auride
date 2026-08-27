import { getMediaLink } from "../methods/dev/getMediaLink";

export async function storageLink(path) {
    // if in build environment, we have some tricks (due to weird docker issues)
    // which is incompatible with prod.
    if (import.meta.env.VITE_BUILD_ENV === "DEV") {
        // get id and return
        const id = await getMediaLink(path);
        return `${import.meta.env.VITE_STORAGE_URL}/files/${id}`;
    }
    // if in prod, just return the path directly
    return `${import.meta.env.VITE_STORAGE_URL}/${path}`;
}