import { getOS } from "../methods/getOS.js";
import { downloadOptions } from "../ui/modals/downloadOptions.js";
import { faIcon } from "../utils/faIcon.js";

export default function downloadPage() {
    document.title = "Download | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <div class="coverPageWarning">
            <h1>${faIcon("solid", "circle-exclamation").outerHTML} Work in Progress</h1>
            <p>
                This is a very early experimental build of the Auride apps. It has no auto-updating, broken functionality, 
                and unfinished features. By installing, you agree that you will keep builds up-to-date yourself before reporting any 
                issues and that you acknowledge these broken features.
            </p>
            <button class="agreeToWarning">I agree</button>
            <a href="/home"><button>Nevermind</button></a>
        </div>
        <div class="appCta">
            <img src="/assets/imgs/marketing/app_cta.png" draggable="false" />
            <h1>Use Auride Everywhere</h1>
            <p>
                Hang out wherever you are. Auride is available for Windows, macOS, Linux and Android. iOS coming soon.
            </p>
            <a href="#" class="downloadLink"><button class="downloadBtn">Download for Desktop</button></a>
            <button class="downloadOthersBtn">Other Download Options</button>
        </div>
    `;

    // hide warning
    const agreeToWarning = el.querySelector(".agreeToWarning");
    agreeToWarning.onclick = () => {
        el.querySelector(".coverPageWarning").remove();
    };

    // get the os and replace button as appropriate
    const currentOs = getOS();
    const downloadBtn = el.querySelector(".downloadBtn");
    const downloadLink = el.querySelector(".downloadLink");
    switch (currentOs) {
        case "windows":
            downloadBtn.innerHTML = `${faIcon("brands", "microsoft").outerHTML} Download for Windows`;
            downloadLink.href = "https://github.com/katniny/Auride/releases/latest/download/Auride-Setup.msi";
            break;
        case "macos":
            downloadBtn.innerHTML = `${faIcon("brands", "apple").outerHTML} Download for macOS`;
            downloadLink.href = "https://github.com/katniny/Auride/releases/latest/download/Auride.dmg";
            break;
        case "linux":
            downloadBtn.innerHTML = `${faIcon("brands", "linux").outerHTML} Download for Linux (AppImage)`;
            downloadLink.href = "https://github.com/katniny/Auride/releases/latest/download/Auride.AppImage";
            break;
        case "android":
            downloadBtn.innerHTML = `${faIcon("brands", "android").outerHTML} Download for Android`;
            downloadLink.href = "https://github.com/katniny/Auride/releases/latest/download/Auride.apk";
            break;
        case "ios":
            downloadBtn.innerHTML = `${faIcon("brands", "apple").outerHTML} iOS is Coming Soon`;
            downloadLink.href = "#";
            break;
        default:
            downloadBtn.innerHTML = `${faIcon("solid", "circle-question").outerHTML} Unknown Platform`;
            downloadLink.href = "#";
            break;
    }

    // show more downloads
    const downloadOthersBtn = el.querySelector(".downloadOthersBtn");
    downloadOthersBtn.onclick = () => {
        downloadOptions();
    };

    return el;
}