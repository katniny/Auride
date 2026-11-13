import { faIcon } from "../../utils/faIcon.js";

export function downloadOptions() {
    // create modal
    const modal = document.createElement("dialog");
    modal.innerHTML = `
        <h2>
            ${faIcon("solid", "download").outerHTML} Other Download Options
        </h2>

        <div class="os windows">
            <h3>${faIcon("brands", "microsoft").outerHTML} Windows</h3>
            <p class="description">Requires a 64-bit CPU and Windows 10 or later. ARM64 coming soon.</p>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride-Setup.msi">
                <button>${faIcon("brands", "microsoft").outerHTML} MSI Installer (Recommended)</button>
            </a>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride-Setup.exe">
                <button>${faIcon("brands", "microsoft").outerHTML} EXE Installer</button>
            </a>
        </div>

        <div class="os macos">
            <h3>${faIcon("brands", "apple").outerHTML} macOS</h3>
            <p class="description">Requires an Apple Silicon CPU and macOS 15 or later.</p>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride.dmg">
                <button>${faIcon("brands", "apple").outerHTML} DMG Installer</button>
            </a>
        </div>

        <div class="os linux">
            <h3>${faIcon("brands", "linux").outerHTML} Linux</h3>
            <p class="description">Requires a 64-bit CPU and Ubuntu 22.04 or later. ARM64 coming soon.</p>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride.AppImage">
                <button>${faIcon("brands", "linux").outerHTML} AppImage (Recommended)</button>
            </a>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride.deb">
                <button>${faIcon("brands", "debian").outerHTML} .deb (Debian/Ubuntu)</button>
            </a>
            <a href="https://github.com/katniny/Auride/releases/latest/Auride.rpm">
                <button>${faIcon("brands", "fedora").outerHTML} .rpm (Fedora)</button>
            </a>
        </div>

        <div class="os android">
            <h3>${faIcon("brands", "android").outerHTML} Android</h3>
            <p class="description">Supports both 64-bit and ARM64. Requires Android 12 or newer.</p>
            <!--<a href="https://github.com/katniny/Auride/releases/latest/Auride.deb">
                <button>${faIcon("brands", "google-play").outerHTML} Google Play Store (Recommended)</button>
            </a>-->
            <a href="https://github.com/katniny/Auride/releases/latest/Auride.apk">
                <button>${faIcon("brands", "android").outerHTML} APK (Recommended)</button>
            </a>
        </div>

        <br />

        <button class="closePopup">Done</button>
    `;

    // add attributes
    modal.className = "otherDownloadsPopup";
    document.getElementById("app").appendChild(modal);

    // set close popup button
    const closeBtns = modal.querySelectorAll(".closePopup");
    closeBtns.forEach(closeBtn => {
        closeBtn.onclick = () => closeVisitLinkPopup();
    });
    
    // show modal
    modal.showModal();
}

// close popup
function closeVisitLinkPopup() {
    const app = document.getElementById("app");

    // if the app has the modal, get it
    const modal = app.querySelector(".otherDownloadsPopup");
    if (modal) {
        // close, then delete after 250ms
        modal.close();
    }
}

window.downloadOptions = downloadOptions;