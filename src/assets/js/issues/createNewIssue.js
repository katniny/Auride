import { faIcon } from "../utils.js"; 
import { sendGitHubIssue } from "./sendGitHubIssue.js";

const initialCreateIssueHTML = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeCreateIssuePopup()"></i>

    <button class="submitReport" onclick="createNewBugReport()">
        ${faIcon("bug").outerHTML} Issue
    </button>

    <button class="submitReport" onclick="createNewEnhancementReq()">
        ${faIcon("lightbulb").outerHTML} Enhancement
    </button>
`;

const initialCreateIssueSignedOutHTML = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeCreateIssuePopup()"></i>

    <h3 style="margin-top: 25px;">Experienced an issue on Auride?</h3>
    <p>We're sorry! :(</p>
    <p>Please create an Auride account to report issues using Auride Issues.</p>
`;

const issueHTML = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeCreateIssuePopup()"></i>

    <br />
    <br />

    <h3>Add a title</h3>
    <input id="bugName" value="[Bug]: " />
    <p class="smallerText">
        Thank you for taking the time to help us improve Auride!
        Please note that these tickets are to be treated seriously, any content deemed disrespectful,
        non-serious, or does not adequately follow the steps below will be immediately closed and potentionally removed.

        <br />
        <br />

        This is an English-only form. If you do not speak English, please use Google Translate or similar to translate into English.
    </p>

    <br />

    <h3>Browser</h3>
    <p class="smallerText">Please select the type of browser that you were using. If you're unsure, you can search "What browser engine does YOUR_BROWSER use?". If you use the app, please leave this blank.</p>
    <select id="browserEngineDropdown">
        <option value="invalid">None</option>
        <option value="chromiumBased">Chromium-based (Google Chrome, Vivaldi, Brave, etc.)</option>
        <option value="firefoxBased">Firefox-based (Firefox, Librewolf, Floorp, etc.)</option>
        <option value="webkitBased">WebKit-based (Safari, GNOME Web, etc.)</option>
    </select>

    <br />
    <br />

    <h3>Operating System</h3>
    <p class="smallerText">What operating system did you experience this on?</p>
    <select id="operatingSystemDropdown">
        <option value="invalid">None</option>
        <option value="windows8OrOlder">Windows 8.1 or older</option>
        <option value="win10">Windows 10</option>
        <option value="win11">Windows 11</option>
        <option value="debianBased">Debian-based Linux OS (Debian, Deepin, etc.)</option>
        <option value="archBased">Arch-based Linux OS (Arch, Manjaro, etc.)</option>
        <option value="ubuntuBased">Ubuntu-based Linux OS (Ubuntu, Linux Mint, etc.)</option>
        <option value="fedoraBased">Fedora-based Linux OS (Fedora, Red Hat Enterprise Linux, etc.)</option>
        <option value="slackwareBased">Slackware-based Linux OS (Slackware, openSUSE, etc.)</option>
        <option value="other">Other (please let us know in the description!)</option>
    </select>

    <br />
    <br />

    <h3>Description</h3>
    <p class="smallerText">Provide a description of the issue you are reporting.</p>
    <textarea id="bugReportDesc"></textarea>

    <br />
    <br />

    <h3>Steps to reproduce</h3>
    <p class="smallerText">Step-by-step process on how to reproduce the issue. Be short and to the point. If you're unsure, leave this blank.</p>
    <textarea id="stepsToRepro"></textarea>

    <br />
    <br />

    <label><input type="checkbox" id="properlyFilledOut" />I agree that I properly filled out the item above<span class="required">*</span></label>
    <label><input type="checkbox" id="issueClosedIfImproper" />I understand an issue may be closed if process is not properly followed<span class="required">*</span></label>
    <label><input type="checkbox" id="reproInDevEnv" />I could replicate this issue in a local development environment</label>
    <label><input type="checkbox" id="resolveIssueSelf" />I will resolve this issue myself</label>
    <label><input type="checkbox" id="searchedForSimilar" />I have searched for similar issues<span class="required">*</span></label>

    <br />

    <p class="errorTxt" id="bugReportErrorTxt">Error text goes here.</p>

    <br />

    <button onclick="createNewBugReport(true)" id="createReport">Create Issue</button> <button onclick="closeCreateIssuePopup()" id="cancelSendReport">Nevermind</button>
`;

const enhancementHTML = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeCreateIssuePopup()"></i>

    <br />
    <br />

    <h3>Add a title</h3>
    <input id="enhanceName" value="[Enhancement]: " />
    <p class="smallerText">
        Thank you for taking the time to help us improve Auride!
        Please note that these tickets are to be treated seriously, any content deemed disrespectful,
        non-serious, or does not adequately follow the steps below will be immediately closed and potentionally removed.

        <br />
        <br />

        This is an English-only form. If you do not speak English, please use Google Translate or similar to translate into English.
    </p>

    <br />

    <h3>Description</h3>
    <p class="smallerText">Provide a description of the enhancement you are requesting. Go into detail!</p>
    <textarea id="enhanceDesc"></textarea>

    <br />
    <br />

    <h3>How would your feature improve Auride?</h3>
    <textarea id="enhanceImproveAurideHow"></textarea>

    <br />
    <br />

    <h3>Additional Notes</h3>
    <textarea id="additionalNotes"></textarea>

    <br />
    <br />

    <label><input type="checkbox" id="properlyFilledOut" />I agree that I properly filled out the item above<span class="required">*</span></label>
    <label><input type="checkbox" id="issueClosedIfImproper" />I understand an issue may be closed if process is not properly followed<span class="required">*</span></label>
    <label><input type="checkbox" id="implementFeatureSelf" />I will implement this feature myself</label>
    <label><input type="checkbox" id="searchedForSimilar" />I have searched for similar issues<span class="required">*</span></label>

    <br />

    <p class="errorTxt" id="enhanceErrorTxt">Error text goes here.</p>

    <br />

    <button onclick="createNewEnhancementReq(true)" id="createReport">Create Enhancement</button> <button onclick="closeCreateIssuePopup()" id="cancelSendReport">Nevermind</button>
`;

// show the modal when requested
function createNewIssue() {
    // append and put the content inside the modal
    const notePopup = document.createElement("dialog");
    notePopup.setAttribute("id", "createIssuePopup");
    if (firebase.auth().currentUser)
        notePopup.innerHTML = initialCreateIssueHTML;
    else
        notePopup.innerHTML = initialCreateIssueSignedOutHTML;
    document.body.appendChild(notePopup);

    // finally, show modal.
    notePopup.showModal();
}
window.createNewIssue = createNewIssue;

let currentlySendingIssue = false;
function createNewBugReport(finished) {
    if (!finished) {
        const notePopup = document.getElementById("createIssuePopup");
        notePopup.innerHTML = issueHTML;
    } else {
        if (currentlySendingIssue) return;
        currentlySendingIssue = true;

        const bugName = document.getElementById("bugName");
        const browserEngine = document.getElementById("browserEngineDropdown");
        const operatingSystem = document.getElementById("operatingSystemDropdown");
        const bugReportDesc = document.getElementById("bugReportDesc");
        const stepsToRepro = document.getElementById("stepsToRepro");
        const properlyFilledOut = document.getElementById("properlyFilledOut");
        const issueClosedIfImproper = document.getElementById("issueClosedIfImproper");
        const reproInDevEnv = document.getElementById("reproInDevEnv");
        const resolveIssueSelf = document.getElementById("resolveIssueSelf");
        const searchedForSimilar = document.getElementById("searchedForSimilar");
        const errorTxt = document.getElementById("bugReportErrorTxt");
        const createReport = document.getElementById("createReport");
        const cancelSendReport = document.getElementById("cancelSendReport");

        // check if bug name is filled out
        const bugNameFormatted = bugName.value.trim().toLowerCase();
        const undescriptiveNames = [
            "[bug]:",
            "[bug]",
            "[bug:]",
            "bug",
            "bug:",
            ""
        ];
        if (undescriptiveNames.includes(bugNameFormatted)) {
            showBugReportError("Your bug report name isn't descriptive.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure browser engine and operating systems values are proper
        if (browserEngine.value === "invalid") {
            showBugReportError("Please select a browser engine.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }
        if (operatingSystem.value === "invalid") {
            showBugReportError("Please select an operating system.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }
        
        // make sure bug report description shows up
        if (bugReportDesc.value.trim() === "") {
            showBugReportError("Please add a description to your bug report.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure user agrees they properly filled out form
        if (!properlyFilledOut.checked) {
            showBugReportError("Please agree that you properly filled out the bug report.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure user agrees that their bug report will be closed if not properly filled out
        if (!issueClosedIfImproper.checked) {
            showBugReportError("Please agree to the notice that your bug report will be closed if it's not properly filled out.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure user agrees that they searched for similar issues
        if (!searchedForSimilar.checked) {
            showBugReportError("Please agree that you searched for similar issues.", "bugReportErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // if all goes through, call send github issue
        cancelSendReport.innerHTML = `${faIcon("circle-notch", "", "spin").outerHTML} Can't cancel...`;
        createReport.innerHTML = `${faIcon("circle-notch", "", "spin").outerHTML} Working...`;
        sendGitHubIssue(bugName.value, browserEngine.value, operatingSystem.value, 
            bugReportDesc.value, stepsToRepro.value, properlyFilledOut.checked, issueClosedIfImproper.checked, 
            reproInDevEnv.checked, resolveIssueSelf.checked, searchedForSimilar.checked, "bug"
        ).then((response) => {
            currentlySendingIssue = false;
            cancelSendReport.innerHTML = "Nevermind";
            createReport.innerHTML = "Create Issue";
            // check for responses
            switch (response) {
                case "No token found":
                    showBugReportError("Unable to verify who you are. Are you logged in? If you are, please try again.", "bugReportErrorTxt");
                    break;
                case "Failed to send report":
                    showBugReportError("An error occurred when sending the report to GitHub.", "bugReportErrorTxt");
                    break;
                case "Succeeded":
                    closeCreateIssuePopup();
                    fetchIssuesFromGitHub("open");
                    break;
                default:
                    showBugReportError("We're not sure if Auride succeeded, failed, or sent the report into the void.", "bugReportErrorTxt");
                    break;
            }
        });
    }
}
window.createNewBugReport = createNewBugReport;

function createNewEnhancementReq(finished) {
    if (!finished) {
        const notePopup = document.getElementById("createIssuePopup");
        notePopup.innerHTML = enhancementHTML;
    } else {
        if (currentlySendingIssue) return;
        currentlySendingIssue = true;

        const enhanceName = document.getElementById("enhanceName");
        const enhanceDesc = document.getElementById("enhanceDesc");
        const enhanceImproveAurideHow = document.getElementById("enhanceImproveAurideHow");
        const additionalNotes = document.getElementById("additionalNotes");
        const properlyFilledOut = document.getElementById("properlyFilledOut");
        const issueClosedIfImproper = document.getElementById("issueClosedIfImproper");
        const implementFeatureSelf = document.getElementById("implementFeatureSelf");
        const searchedForSimilar = document.getElementById("searchedForSimilar");
        const errorTxt = document.getElementById("enhanceErrorTxt");
        const createReport = document.getElementById("createReport");
        const cancelSendReport = document.getElementById("cancelSendReport");

        // check if bug name is filled out
        const enhanceNameFormatted = enhanceName.value.trim().toLowerCase();
        const undescriptiveNames = [
            "[enhancement]:",
            "[enhancement]",
            "[enhancement:]",
            "enhancement",
            "enhancement:",
            ""
        ];
        if (undescriptiveNames.includes(enhanceNameFormatted)) {
            showBugReportError("Your bug report name isn't descriptive.", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure enhancement description isnt empty
        if (enhanceDesc.value.trim() === "") {
            showBugReportError("Please add a description to your enhancement request.", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure how it would improve auride isnt empty
        if (enhanceImproveAurideHow.value.trim() === "") {
            showBugReportError("Please tell us how your feature would improve Auride!", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure user agrees they properly filled out report
        if (!properlyFilledOut.checked) {
            showBugReportError("Please agree that you properly filled out the enhancement request.", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure they understand the closing of an issue
        if (!issueClosedIfImproper.checked) {
            showBugReportError("Please agree that you understand an issue will be closed if not properly filled out.", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // make sure they searched for similar issues
        if (!searchedForSimilar.checked) {
            showBugReportError("Please agree that you searched for similar issues.", "enhanceErrorTxt");
            currentlySendingIssue = false;
            return;
        }

        // if all goes through, call send github issue
        cancelSendReport.innerHTML = `${faIcon("circle-notch", "", "spin").outerHTML} Can't cancel...`;
        createReport.innerHTML = `${faIcon("circle-notch", "", "spin").outerHTML} Working...`;
        sendGitHubIssue(enhanceName.value, null, null, 
            enhanceDesc.value, enhanceImproveAurideHow.value, properlyFilledOut.checked, issueClosedIfImproper.checked, 
            implementFeatureSelf.checked, null, searchedForSimilar.checked, "enhancement"
        ).then((response) => {
            currentlySendingIssue = false;
            cancelSendReport.innerHTML = "Nevermind";
            createReport.innerHTML = "Create Enhancement";
            // check for responses
            switch (response) {
                case "No token found":
                    showBugReportError("Unable to verify who you are. Are you logged in? If you are, please try again.", "enhanceErrorTxt");
                    break;
                case "Failed to send report":
                    showBugReportError("An error occurred when sending the report to GitHub.", "enhanceErrorTxt");
                    break;
                case "Succeeded":
                    closeCreateIssuePopup();
                    fetchIssuesFromGitHub("open")
                    break;
                default:
                    showBugReportError("We're not sure if Auride succeeded, failed, or sent the report into the void.", "enhanceErrorTxt");
                    break;
            }
        });
    }
}
window.createNewEnhancementReq = createNewEnhancementReq;

function closeCreateIssuePopup() {
    const notePopup = document.getElementById("createIssuePopup");

    notePopup.close();
    setTimeout(() => {
        notePopup.remove();
    }, 100);
}
window.closeCreateIssuePopup = closeCreateIssuePopup;

// show error
function showBugReportError(text, element) {
    const errorTxt = document.getElementById(element);
    errorTxt.style.display = "block";
    errorTxt.textContent = text;
}