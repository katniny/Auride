import { storageLink } from "../storageLink";

// create placeholder html (we'll add it later)
const aurideAccountsHtml = `
    <h3>Auride Accounts</h3>
    <p>Follow accounts associated with Auride.</p>

    <br id="lookingForAurideAccsBr" />

    <p id="lookingForAurideAccs"><i class="fa-solid fa-circle-notch fa-spin" style="color: var(--text);"></i> We're looking!</p>

    <div class="katniny">
        
    </div>

    <br />
    <br />
`;

// create the element
const aurideAccounts = document.createElement("div");
aurideAccounts.innerHTML = aurideAccountsHtml;
aurideAccounts.className = "aurideAccounts";
document.body.appendChild(aurideAccounts);

// then attempt to fetch the 3 accounts
// !! will not work in dev envs, only for the auride firebase config !!
let ranFetchKatniny = false;
let ranFetchAuride = false;
let ranFetchKatninyStudios = false;

async function fetchKatniny() {
    const profileSection = document.querySelector(`div[class="katniny"]`);
    const failedHtml = `<p class="infoCaution">Failed to get info for @katniny.</p>`;

    try {
        const katninyData = await fetchProtectedUserData(import.meta.env.VITE_KATNINY_UID);

        profileSection.innerHTML += `
            <div class="katninyProfile">
                <img class="recommendAcc-pfp" src="${storageLink(`images/pfp/${import.meta.env.VITE_KATNINY_UID}/${katninyData.pfp}`)}" id="katninyPfp" draggable="false"> <p id="katninyDisplay">${katninyData.display}<i class="fa-solid fa-circle-check fa-var(--main-color)" aria-hidden="true"></i></p>
                <br> <a href="/u/${katninyData.username}" id="followBtn-1"><button class="followBtn">Follow</button></a>
                <p id="katninyUser-pronouns">@${katninyData.username}</p>
            </div>

            <br />
        `;

        ranFetchKatniny = true;
        document.dispatchEvent(new Event("katninyAccAddedToAurideAccsSection"));
    } catch (e) {
        if (ranFetchKatniny) return;

        profileSection.innerHTML += failedHtml;
        console.error(e);
        
        ranFetchKatniny = true;
        document.dispatchEvent(new Event("katninyAccAddedToAurideAccsSection"));
    }
}

async function fetchAuride() {
    const profileSection = document.querySelector(`div[class="katniny"]`);
    const failedHtml = `<p class="infoCaution">Failed to get info for @auride.</p>`;

    try {
        const aurideData = await fetchProtectedUserData(import.meta.env.VITE_AURIDE_UID);

        profileSection.innerHTML += `
            <div class="auride">
                <img class="recommendAcc-pfp" src="${storageLink(`images/pfp/${import.meta.env.VITE_AURIDE_UID}/${aurideData.pfp}`)}" id="auridePfp" draggable="false"> <p id="aurideDisplay">${aurideData.display}<i class="fa-solid fa-circle-check fa-var(--main-color)" aria-hidden="true"></i></p>
                <br> <a href="/u/${aurideData.username}" id="followBtn-1"><button class="followBtn">Follow</button></a>
                <p id="aurideUser-pronouns">@${aurideData.username}</p>
            </div>

            <br />
        `;

        ranFetchAuride = true;
        document.dispatchEvent(new Event("aurideAccAddedToAurideAccsSection"));
    } catch (e) {
        if (ranFetchAuride) return;

        profileSection.innerHTML += failedHtml;
        console.error(e);
        
        ranFetchAuride = true;
        document.dispatchEvent(new Event("aurideAccAddedToAurideAccsSection"));
    }
}

async function fetchKatninyStudios() {
    const profileSection = document.querySelector(`div[class="katniny"]`);
    const failedHtml = `<p class="infoCaution">Failed to get info for @katninystudios.</p>`;
    const lookingForAurideAccs = document.getElementById("lookingForAurideAccs");
    const lookingForAurideAccsBr = document.getElementById("lookingForAurideAccsBr");

    try {
        const kStudiosData = await fetchProtectedUserData(import.meta.env.VITE_KATNINYSTUDIOS_UID);

        profileSection.innerHTML += `
            <div class="katninystudios">
                <img class="recommendAcc-pfp" src="${storageLink(`images/pfp/${import.meta.env.VITE_KATNINYSTUDIOS_UID}/${kStudiosData.pfp}`)}" id="katninystudiosPfp" draggable="false"> <p id="katninystudiosDisplay">${kStudiosData.display}<i class="fa-solid fa-circle-check fa-var(--main-color)" aria-hidden="true"></i></p>
                <br> <a href="/u/${kStudiosData.username}" id="followBtn-1"><button class="followBtn">Follow</button></a>
                <p id="katninystudiosUser-pronouns">@${kStudiosData.username}</p>
            </div>
        `;

        ranFetchKatninyStudios = true;

        // and since this is the final one,
        // remove the "We're looking!" notice
        lookingForAurideAccs.remove();
        lookingForAurideAccsBr.remove();
    } catch (e) {
        if (ranFetchKatninyStudios) return;

        profileSection.innerHTML += failedHtml;
        console.error(e);

        lookingForAurideAccs.remove();
        
        ranFetchKatninyStudios = true;
    }
}

// just run the 3 functions
document.addEventListener("userInfoReady", () => {
    fetchKatniny();

    // wait for fetchKatniny() to finish running
    document.addEventListener("katninyAccAddedToAurideAccsSection", () => {
        fetchAuride();
    });

    // wait for fetchAuride() to finish running
    document.addEventListener("aurideAccAddedToAurideAccsSection", () => {
        fetchKatninyStudios();
    });
});