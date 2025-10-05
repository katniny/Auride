const changePoliticalContentPrefModal = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 15px; margin-right: 5px;" onclick="closePoliticalContentPopup()"></i> <h2>Edit your Political Content Preferences</h2>
    <p>Change your preferences for political content.</p>

    <br />

    <h3>Legacy Political Content</h3>
    <p>Notes that were flagged as political before our new flagging system.</p>
    <p id="legacyPoliticalPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeLegacyPoliticalContentPref('Show')">Show</button> <button onclick="changeLegacyPoliticalContentPref('Blur')">Blur</button> <button onclick="changeLegacyPoliticalContentPref('Hide')">Hide</button>
    </div>
    
    <br />

    <h3>Political Discussion</h3>
    <p>Notes that contain political discussions or commentary on current events, policies, or ideologies.</p>
    <p id="politicalDiscussionPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changePoliticalDiscussionPref('Show')">Show</button> <button onclick="changePoliticalDiscussionPref('Blur')">Blur</button> <button onclick="changePoliticalDiscussionPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>War and Conflict</h3>
    <p>Notes that contains discussion about war, conflict, or violence, which may be disturbing or upsetting.</p>
    <p id="warAndConflictPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeWarAndConflictPref('Show')">Show</button> <button onclick="changeWarAndConflictPref('Blur')">Blur</button> <button onclick="changeWarAndConflictPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Identity Debates</h3>
    <p>Notes that contain discussions around sensitive topics related to identity, such as gender, race, or sexuality.</p>
    <p id="identityDebatesPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeIdentityDebatesPref('Show')">Show</button> <button onclick="changeIdentityDebatesPref('Blur')">Blur</button> <button onclick="changeIdentityDebatesPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>Conspiracy Theories</h3>
    <p>Notes that contain possibly controversial theories or unverified claims, which may not be factual.</p>
    <p id="conspiracyTheoriesPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeConspiracyTheoriesPref('Show')">Show</button> <button onclick="changeConspiracyTheoriesPref('Blur')">Blur</button> <button onclick="changeConspiracyTheoriesPref('Hide')">Hide</button>
    </div>

    <br />

    <h3>News Media</h3>
    <p>Notes that contain news coverage or discussions around real-world events, which may be upsetting or distressing.</p>
    <p id="newsMediaPrefSet" style="color: var(--success-color);"></p>
    <div class="resizeButtons">
        <button onclick="changeNewsMediaPref('Show')">Show</button> <button onclick="changeNewsMediaPref('Blur')">Blur</button> <button onclick="changeNewsMediaPref('Hide')">Hide</button>
    </div>
`;

function showPoliticalPrefChangeModal() {
    // append and put the content inside the modal
    const changePoliticalPopup = document.createElement("dialog");
    changePoliticalPopup.setAttribute("id", "changePoliticalPopup");
    changePoliticalPopup.innerHTML = changePoliticalContentPrefModal;
    document.body.appendChild(changePoliticalPopup);

    // then, finally show modal
    changePoliticalPopup.showModal();
}

function closePoliticalContentPopup() {
    const politicalContentPopup = document.getElementById("changePoliticalPopup");

    politicalContentPopup.close();
    setTimeout(() => {
        politicalContentPopup.remove();
    }, 500);
}

// change prefs
function changeLegacyPoliticalContentPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
        showPolitics: type
    }).then(() => {
        document.getElementById("legacyPoliticalPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changePoliticalDiscussionPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        politicalDiscussion: type
    }).then(() => {
        document.getElementById("politicalDiscussionPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeWarAndConflictPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        warNConflict: type
    }).then(() => {
        document.getElementById("warAndConflictPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeIdentityDebatesPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        identityDebates: type
    }).then(() => {
        document.getElementById("identityDebatesPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeConspiracyTheoriesPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        conspiracyTheories: type
    }).then(() => {
        document.getElementById("conspiracyTheoriesPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}

function changeNewsMediaPref(type) {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/flagPrefs`).update({
        newsMedia: type
    }).then(() => {
        document.getElementById("newsMediaPrefSet").textContent = `Set preference to ${type} successfully!`;
    });
}