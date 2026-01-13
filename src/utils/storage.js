const TUS_ENDPOINT = import.meta.env.VITE_STORAGE_URL;
const TUS_UPLOAD_ENDPOINT = `${TUS_ENDPOINT}/files/`;
var storageLink = (/** @type {string} */ path) => `${TUS_ENDPOINT}/${path}`;

export function storageRef(/** @type {string} */ path) {
    /** @type {(progress: { bytesTransferred: number, totalBytes: number }) => void} */
    let onUploadProgress = () => {};

    return {
        getDownloadUrl: () => storageLink(path),
        onUploadProgress: (
            /** @type {(progress: { bytesTransferred: number, totalBytes: number }) => void} */ callback
        ) => {
            onUploadProgress = callback;
        },
        put: (/** @type {File} */ file) => {
            return new Promise((resolve, reject) => {
                const upload = new tus.Upload(file, {
                    endpoint: TUS_UPLOAD_ENDPOINT,
                    metadata: {
                        filename: path,
                    },
                    onSuccess: resolve,
                    onError: reject,
                    onProgress: (bytesTransferred, totalBytes) =>
                        onUploadProgress({ bytesTransferred, totalBytes }),
                    });

                    upload.findPreviousUploads().then((previousUploads) => {
                    if (previousUploads.length)
                        upload.resumeFromPreviousUpload(previousUploads[0]);
                    upload.start();
                });
            });
        },
        // TODO: It's not possible to delete files with TUS, we need to replace it with a proper backend eventually.
        delete: () => Promise.resolve(),
    };
}