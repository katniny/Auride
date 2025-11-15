const changeMatureContentPrefModal = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 15px; margin-right: 5px;" onclick="closeMatureContentPopup()"></i> <h2>Edit your Mature Content Preferences</h2>
    <p>Change your preferences for mature content.</p>

    <br />

    <h3>Legacy Mature Content</h3>
    <p>Notes that were flagged as mature before our new flagging system.</p>
    <p id="legacyMaturePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeLegacyNSFWContentPref('Show')">Show</button> <button onclick="changeLegacyNSFWContentPref('Blur')">Blur</button> <button onclick="changeLegacyNSFWContentPref('Hide')">Hide</button>
    </div>
    
    <br />

    <h3>Adult Content</h3>
    <p>Notes that contain explicit sexual content or nudity.</p>
    <p id="adultContentPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeAdultContentPref('Show')">Show</button> <button onclick="changeAdultContentPref('Blur')">Blur</button> <button onclick="changeAdultContentPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Sexually Suggestive</h3>
    <p>Notes that contain sexually suggestive themes or imagery, but without explicit nudity or sexual acts.</p>
    <p id="sexuallySuggestivePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeSexuallySuggestivePref('Show')">Show</button> <button onclick="changeSexuallySuggestivePref('Blur')">Blur</button> <button onclick="changeSexuallySuggestivePref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Fetish Content</h3>
    <p>Notes that contain niche or fetish content that may not be appropriate for all audiences.</p>
    <p id="fetishPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeFetishPref('Show')">Show</button> <button onclick="changeFetishPref('Blur')">Blur</button> <button onclick="changeFetishPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Non-Sexual Nudity</h3>
    <p>Notes that contain nudity, but it is not sexual in nature (e.g. artistic or educational nudity).</p>
    <p id="nonSexualPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeNonSexualPref('Show')">Show</button> <button onclick="changeNonSexualPref('Blur')">Blur</button> <button onclick="changeNonSexualPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Erotic Writing Content</h3>
    <p>Notes that contain explicit or erotic written content.</p>
    <p id="eroticaPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeEroticaPref('Show')">Show</button> <button onclick="changeEroticaPref('Blur')">Blur</button> <button onclick="changeEroticaPref('Hide')">Hide</button>
    </div>
`;

function showMatureContentPrefChangeModal() {
    // append and put the content inside the modal
    const changeMaturePopup = document.createElement("dialog");
    changeMaturePopup.setAttribute("id", "changeMaturePopup");
    changeMaturePopup.innerHTML = changeMatureContentPrefModal;
    document.body.appendChild(changeMaturePopup);

    // then, finally show modal
    changeMaturePopup.showModal();
}
window.showMatureContentPrefChangeModal = showMatureContentPrefChangeModal;

function closeMatureContentPopup() {
    const matureContentPopup = document.getElementById("changeMaturePopup");

    matureContentPopup.close();
    setTimeout(() => {
        matureContentPopup.remove();
    }, 100);
}
window.closeMatureContentPopup = closeMatureContentPopup;

// change prefs
function changeLegacyNSFWContentPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
        showNsfw: type
    }).then(() => {
        document.getElementById("legacyMaturePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeLegacyNSFWContentPref = changeLegacyNSFWContentPref;

function changeAdultContentPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        adultContent: type
    }).then(() => {
        document.getElementById("adultContentPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeAdultContentPref = changeAdultContentPref;

function changeSexuallySuggestivePref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        sexuallySuggestive: type
    }).then(() => {
        document.getElementById("sexuallySuggestivePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeSexuallySuggestivePref = changeSexuallySuggestivePref;

function changeFetishPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        fetishContent: type
    }).then(() => {
        document.getElementById("fetishPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeFetishPref = changeFetishPref;

function changeNonSexualPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        nonSexualNudity: type
    }).then(() => {
        document.getElementById("nonSexualPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeNonSexualPref = changeNonSexualPref;

function changeEroticaPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        erotica: type
    }).then(() => {
        document.getElementById("eroticaPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}
window.changeEroticaPref = changeEroticaPref;