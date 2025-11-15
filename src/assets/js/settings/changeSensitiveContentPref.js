const changeSensitiveContentPrefModal = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 15px; margin-right: 5px;" onclick="closeSensitiveContentPopup()"></i> <h2>Edit your Sensitive Content Preferences</h2>
    <p>Change your preferences for sensitive content.</p>

    <br />

    <h3>Legacy Sensitive Content</h3>
    <p>Notes that were flagged as sensitive before our new flagging system.</p>
    <p id="legacySensitivePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeLegacySensitiveContentPref('Show')">Show</button> <button onclick="changeLegacySensitiveContentPref('Blur')">Blur</button> <button onclick="changeLegacySensitiveContentPref('Hide')">Hide</button>
    </div>
    
    <br />

    <h3>Graphic Violence</h3>
    <p>Notes that contain graphic violence, easily-recognized cartoon gore, or disturbing imagery.</p>
    <p id="graphicViolencePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeGraphicViolencePref('Show')">Show</button> <button onclick="changeGraphicViolencePref('Blur')">Blur</button> <button onclick="changeGraphicViolencePref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Horror Imagery</h3>
    <p>Notes that contains frightening or disturbing visuals that may be unsettling.</p>
    <p id="horrorImageryPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeHorrorImageryPref('Show')">Show</button> <button onclick="changeHorrorImageryPref('Blur')">Blur</button> <button onclick="changeHorrorImageryPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Abuse/Trauma Mentions</h3>
    <p>Notes that contain references to abuse, trauma, or other sensitive topics that could be triggering.</p>
    <p id="abuseTraumaPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeAbuseTraumaPref('Show')">Show</button> <button onclick="changeAbuseTraumaPref('Blur')">Blur</button> <button onclick="changeAbuseTraumaPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Self-Harm/Suicide Mentions</h3>
    <p>Notes that contain mentions of self-harm or suicide.</p>
    <p id="selfHarmSuicidePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeSelfHarmSuicidePref('Show')">Show</button> <button onclick="changeSelfHarmSuicidePref('Blur')">Blur</button> <button onclick="changeSelfHarmSuicidePref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Drug Use Content</h3>
    <p>Notes that contain depictions or discussions of drug use.</p>
    <p id="drugUsePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeDrugUsePref('Show')">Show</button> <button onclick="changeDrugUsePref('Blur')">Blur</button> <button onclick="changeDrugUsePref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Flash/Seizure Content</h3>
    <p>Notes that contain flashing lights or visual effects that may trigger seizures in sensitive individuals.</p>
    <p id="flashSeizurePrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeFlashSeizurePref('Show')">Show</button> <button onclick="changeFlashSeizurePref('Blur')">Blur</button> <button onclick="changeFlashSeizurePref('Hide')">Hide</button>
    </div>
`;

function showSensitivePrefChangeModal() {
    // append and put the content inside the modal
    const changeSensitivePopup = document.createElement("dialog");
    changeSensitivePopup.setAttribute("id", "changeSensitivePopup");
    changeSensitivePopup.innerHTML = changeSensitiveContentPrefModal;
    document.body.appendChild(changeSensitivePopup);

    // then, finally show modal
    changeSensitivePopup.showModal();
}

function closeSensitiveContentPopup() {
    const sensitiveContentPopup = document.getElementById("changeSensitivePopup");

    sensitiveContentPopup.close();
    setTimeout(() => {
        sensitiveContentPopup.remove();
    }, 100);
}

// change prefs
function changeLegacySensitiveContentPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
        showSensitive: type
    }).then(() => {
        document.getElementById("legacySensitivePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeGraphicViolencePref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        graphicViolence: type
    }).then(() => {
        document.getElementById("graphicViolencePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeHorrorImageryPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        horrorImagery: type
    }).then(() => {
        document.getElementById("horrorImageryPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeAbuseTraumaPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        abuseTraumaMentions: type
    }).then(() => {
        document.getElementById("abuseTraumaPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeSelfHarmSuicidePref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        selfHarmSuicideMentions: type
    }).then(() => {
        document.getElementById("selfHarmSuicidePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeDrugUsePref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        drugUse: type
    }).then(() => {
        document.getElementById("drugUsePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeFlashSeizurePref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        flashSeizureRisk: type
    }).then(() => {
        document.getElementById("flashSeizurePrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}