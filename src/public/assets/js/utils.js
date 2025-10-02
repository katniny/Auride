//@ts-check

function faIcon(
  /** @type {string} */ name,
  /** @type {string|null} */ size = null,
  /** @type {string|null} */ anim = null,
  /** @type {string|null} */ color = null,
  /** @type {string|null} */ marginLeft = null
) {
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-" + name);
  if (size) icon.classList.add("fa-" + size);
  if (anim) icon.classList.add("fa-" + anim);
  if (color) icon.style.color = color;
  if (marginLeft) icon.style.marginLeft = marginLeft;
  return icon;
}

const TUS_ENDPOINT = `https://best-energy-drink-is.fucking.monster`;
//const TUS_ENDPOINT = `http://localhost:6979`;
const TUS_UPLOAD_ENDPOINT = `${TUS_ENDPOINT}/files/`;
var storageLink = (/** @type {string} */ path) => `${TUS_ENDPOINT}/${path}`;

function storageRef(/** @type {string} */ path) {
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
