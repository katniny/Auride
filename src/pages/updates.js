import { getUpdate } from "../components/updateContainer.js";
import { currentAurideVersion } from "../ui/versioning.js";

function createNoUpdateText(version) {
    const text = document.createElement("h3");
    text.textContent = `There are no any ${version || "...unknown update version..."} versions yet. We're working to get there!`;
    text.className = "noUpdatesAvailableText";
    return text;
}

export default async function aboutPage() {
    document.title = "Updates | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h3>Filter Version:</h3>
        <div class="filterVersionButtons">
            <button class="filterVersion indev">Indev</button>
            <button class="filterVersion prealpha">Pre-Alpha</button>
            <button class="filterVersion alpha">Alpha</button>
            <button class="filterVersion beta">Beta</button>
            <button class="filterVersion prerelease">Pre-Release</button>
            <button class="filterVersion release">Release</button>
        </div>

        <!-- dont worry about filling these. they're automatically filled by updates.jsonc -->
        <div class="changes indev"></div>
        <div class="changes prealpha"></div>
        <div class="changes alpha"></div>
        <div class="changes beta"></div>
        <div class="changes prerelease"></div>
        <div class="changes release"></div>
    `;

    // function to show the selected update
    async function showUpdates(update) {
        // get the button and div for the active update
        const currentUpdateButton = el.querySelector(`.filterVersionButtons button.${update}`);
        if (currentUpdateButton)
            currentUpdateButton.classList.add("active");
        const currentUpdateDiv = el.querySelector(`div.changes.${update}`);
        if (currentUpdateDiv)
            currentUpdateDiv.classList.add("active");

        // get updates
        const updateLog = await getUpdate(update);
        console.log(updateLog);
        
        // if theres an update log, lets start filling the page
        // is there updates?
        if (!updateLog || !updateLog?.anyUpdatesAvailable) {
            currentUpdateDiv.appendChild(createNoUpdateText(update));
            return;
        }

        // start making the update divs
        for (const [version, changes] of Object.entries(updateLog)) {
            // we already checked for updates, skip this key
            if (version === "anyUpdatesAvailable")
                continue;

            // create the actual div
            const updateDiv = document.createElement("div");
            updateDiv.className = "update";
            updateDiv.innerHTML = `
                <h2>${version}-${update}</h2>
                <h3 class="releasedDate">Released on ${changes.released}</h3>
                <div class="divider"></div>
            `;

            for (const [changeName, changeData] of Object.entries(changes)) {
                console.log(changeName);
                console.log(changeData);

                // create change div
                const changeDiv = document.createElement("div");
                changeDiv.innerHTML = `
                    <li class="${changeName} change">${changeData.text}</li>
                `;

                // is it a user facing change?
                if (changeData.notUserFacingChange) {
                    // get the element
                    const changeEl = changeDiv.querySelector(`.${changeName}`);
                    
                    // create dev env badge
                    const devEnvBadge = document.createElement("span");
                    devEnvBadge.className = "devEnv";
                    devEnvBadge.textContent = "(Dev Env) ";
                    changeEl.prepend(devEnvBadge);
                }

                // does it have subtext?
                if (changeData.subtext)
                    changeDiv.innerHTML += `
                        <li class="subtext">${changeData.subtext}</li>
                    `;
                
                // append, just ensure its not undefined (for some reason this happens?)
                // FIXME: figure out why the first object of each changeDiv has `undefined`
                if (changeData.text !== undefined)
                    updateDiv.appendChild(changeDiv);
            }

            // finally, append div to html
            el.appendChild(updateDiv);
        }
    }

    // show current update
    showUpdates(currentAurideVersion);

    // let each button update versions
    const updateFilterButtons = el.querySelectorAll(".filterVersion");
    for (const button of updateFilterButtons) {
        button.addEventListener("click", () => {
            // remove all current updates
            const updates = el.querySelectorAll(".update");
            for (const update of updates) {
                update.remove();
            }

            // remove all "no update available" text
            const noUpdatesAvailableTxt = el.querySelectorAll(".noUpdatesAvailableText");
            for (const noUpdate of noUpdatesAvailableTxt) {
                noUpdate.remove();
            }

            // mark all active elements as inactive
            const changesDivs = el.querySelectorAll(".changes");
            for (const changeDiv of changesDivs) {
                changeDiv.classList.remove("active");
            }
            const filterVersionBtns = el.querySelectorAll(".filterVersion");
            for (const button of filterVersionBtns) {
                button.classList.remove("active");
            }

            showUpdates(button.classList[1]);
        });
    }

    return el;
}