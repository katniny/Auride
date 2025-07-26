// listen for element to get uploaded to
export function uploadedPfp() {
    const pfpUploader = document.getElementById("profilePicture");
    const errorTxt = document.getElementById("errorTxt");

    errorTxt.style.display = "none";

    // check if theres even a file
    if (pfpUploader.files.length === 0) {
        errorTxt.textContent = "You cannot submit no profile picture.";
        errorTxt.style.display = "inline-block";
        return;
    }

    // if we didnt get returned, we have an image! define it
    const file = pfpUploader.files[0];

    // ensure that the image is not above 5mb
    if (file.size > 5 * 1024 * 1024) {
        errorTxt.textContent = "Your profile picture cannot be above 5MB.";
        errorTxt.style.display = "inline-block";
        return;
    }

    // ensure that the image is either a:
    // - png
    // - jpeg (jpg)
    // - webp
    // file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
        errorTxt.textContent = "Only JPEG (JPG), PNG, or WebP images can be uploaded.";
        errorTxt.style.display = "inline-block";
        return;
    }

    // read the img and make user confirm their image
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        openPfpConfirm(imageUrl);
    };

    reader.readAsDataURL(file);
}

window.uploadedPfp = uploadedPfp;