export async function checkFile(file) {
    // define support image, video and audio types
    const supportedImageExts = ["png", "jpg", "jpeg", "gif"];
    const supportedVideoExts = ["mp4"];
    const supportedAudioExts = ["mp3", "ogg"];
    
    // make sure the file is supported
    const ext = file.name.split(".").pop().toLowerCase();
    if (!ext)
        throw new Error("Unknown file types cannot be uploaded.");
    if (!supportedImageExts.includes(ext) && !supportedVideoExts.includes(ext) && !supportedAudioExts.includes(ext))
        throw new Error("Unsupported file type. Only .png, .jpg (or .jpeg), .gif, .mp4, and .mp3 files are supported.");

    // check file size
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize)
        throw new Error("The max file size is 10MB!");

    // get type
    let fileType;
    if (supportedImageExts.includes(ext))
        fileType = "image";
    if (supportedVideoExts.includes(ext))
        fileType = "video";
    if (supportedAudioExts.includes(ext))
        fileType = "audio";

    // if all goes well, return
    return fileType;
}