function faIcon(name, size = null, anim = null, color = null, marginLeft = null) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-" + name);
    if (size) icon.classList.add("fa-" + size);
    if (anim) icon.classList.add("fa-" + anim);
    if (color) icon.style.color = color;
    if (marginLeft) icon.style.marginLeft = marginLeft;
    return icon;
}

function storageLink(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/` + path.replaceAll("/", "%2F") + "?alt=media";
}

