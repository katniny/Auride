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
   let link = undefined;
   storage.ref(path).getDownloadURL().then(function (url) {
       link = url;
   });
   return link;
}

