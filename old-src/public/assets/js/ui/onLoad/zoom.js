function setZoomLevel(level) {
    const zoomMap = { 
        normal: "1",
        large: "1.07"
    };
    const newZoom = zoomMap[level];
    if (!newZoom) return;

    document.documentElement.style.setProperty("--zoom-level", newZoom);
    currentlySetZoom = level;
}