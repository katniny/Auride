if (window.isTransSocialApp) {
    console.log("Running inside the TransSocial app!");

    // add dragging
    const header = document.getElementById("header")
    header.style.webkitAppRegion = "drag";
    // but dont allow dragging of elements *inside* the header
    header.querySelectorAll("*").forEach(el => {
        el.style.webkitAppRegion = "no-drag";
    });

    const rightHeader = document.querySelector("#header .right");
    document.getElementById("userPfp-header").style.marginRight = "15px";

    // add minimize button
    const minimizeButton = document.createElement("div");
    minimizeButton.innerHTML = `<i class="fa-solid fa-window-minimize"></i>`;
    minimizeButton.setAttribute("class", "windowInteraction minimize");
    minimizeButton.onclick = () => {
        window.transsocial?.windowAction?.("minimize");
    };
    rightHeader.appendChild(minimizeButton);

    // add maximize button
    const maximizeButton = document.createElement("div");
    maximizeButton.innerHTML = `<i class="fa-solid fa-window-restore"></i>`;
    maximizeButton.setAttribute("class", "windowInteraction maximize");
    maximizeButton.onclick = () => {
        window.transsocial?.windowAction?.("maximize");
    };
    rightHeader.appendChild(maximizeButton);

    // add close button
    const closeButton = document.createElement("div");
    closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeButton.setAttribute("class", "windowInteraction close");
    closeButton.onclick = () => {
        window.transsocial?.windowAction?.("close");
    };
    rightHeader.appendChild(closeButton);
} else {
    console.log("Running in a normal browser.");
}