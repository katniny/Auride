import { currentUserData } from "../users/current.js";
import { storageRef } from "../utils/storage.js";
import { checkFile } from "./checkFileType.js";
import { routeMediaLink } from "./dev/routeMediaLink.js";
import { updatePfpName } from "./update/pfpName.js";

export async function uploadMedia(file, path, typeToUse, noteId) {
    try {
        // get current user data
        // if none, user isnt signed in, and needs to!
        // TODO: this should be handled by the TUS server (or server in general), not the client!
        const currentUsersData = await currentUserData();
        if (!currentUsersData)
            throw new Error("You must be signed in to upload any kind of media.");

        // is there a path?
        if (!path)
            throw new Error("You must specify a path to upload! (e.g., `banner` or `pfp`");

        // ensure path is supported
        const supportedPaths = [
            "pfp",
            "banner",
            "notes"
        ]
        if (!supportedPaths.includes(path))
            throw new Error("We're not sure what path you're attempting to use.");

        // is there a type?
        if (!typeToUse)
            throw new Error("You must tell us whether you want to use the current users UID or a note ID.");

        // if the typeToUse is "noteId", check if theres a note id specified
        if (typeToUse === "noteId" && !noteId)
            throw new Error("What's the note ID you're wanting to upload to?");

        // is there a file?
        if (!file)
            throw new Error("You must specify media to upload!");

        const uploadedFile = file;

        // based on the params, form the url
        let uploadUrl = `images/${path}/`;
        if (typeToUse === "uid")
            uploadUrl += currentUsersData.uid;
        else if (typeToUse === "noteId")
            uploadUrl += noteId;
        uploadUrl += `/${uploadedFile.name}`;

        // make sure the file is a supported type & isnt above 10mb
        try {
            const isValid = checkFile(uploadedFile);
        } catch (err) {
            console.error(`Something went uploaded the file: ${err.message}`);
            throw new Error(err.message);
        }

        // turn it into a File
        const uploadTask = storageRef(uploadUrl);

        // get task progress
        uploadTask.onUploadProgress((snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        });

        // upload
        uploadTask.put(uploadedFile).then((snapshot) => {
            // done
            console.log(snapshot);
            console.log(snapshot.lastResponse._xhr.responseURL); // _xhr
            
            if (import.meta.env.VITE_BUILD_ENV === "DEV") {
                // break returned link up
                const fullUrl = snapshot.lastResponse._xhr.responseURL;
                const mediaId = fullUrl.split("/")[4]; // e.g., http://example.com/files/c07b6c99e71e888d22285ad1be2713be
                
                // ask server to save url
                routeMediaLink(mediaId, uploadUrl);
                console.log(`Uploaded media successfully to
                    ${import.meta.env.VITE_STORAGE_URL}/files/${mediaId}, and asked server to route
                    ${uploadUrl} to it.`
                );
            }

            // update names appropriately
            //"pfp",
            //"banner",
            //"note"
            switch (path) {
                case "pfp":
                    updatePfpName(uploadedFile.name);
                    break;
                default:
                    // ?
                    break;
            }

            return true;
        });
    } catch (err) {
        console.error(`Media upload failed: ${err}`);
        throw err;
    }
}