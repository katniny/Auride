// the character count
const displayNameText = document.getElementById("displayName-text");
const maxDisplay = 25;

displayNameText.addEventListener("input", () => {
    const currentLength = displayNameText.value.length;

    if (currentLength > maxDisplay) {
        displayNameText.value = displayNameText.value.substring(0, maxDisplay);
    }

    document.getElementById("characterLimit_display").textContent = `${currentLength}/25`;
});

// setting the display name
function setDisplayName() {
    if (!document.getElementById("saveDisplay").classList.contains("disabled")) {
        document.getElementById("saveDisplay").innerHTML = `${faIcon("spinner", "spin-pulse").outerHTML} Setting Display...`;
        document.getElementById("saveDisplay").classList.add("disabled");
        document.getElementById("errorUsingDisplay").style.display = "none";

        const displayValue = document.getElementById("displayName-text").value.trim();

        if (displayValue === "") {
            document.getElementById("errorUsingDisplay").textContent = "Your display name cannot be empty."
            document.getElementById("errorUsingDisplay").style.display = "block";
            document.getElementById("saveDisplay").innerHTML = `Save`;
            document.getElementById("saveDisplay").style.display = "none";
            document.getElementById("saveDisplay").classList.remove("disabled");
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                firebase.database().ref(`users/${user.uid}`).update({
                    display: document.getElementById("displayName-text").value
                })
                    .then(() => {
                        document.getElementById("errorUsingDisplay").textContent = `Saved successfully! This change will apply across Auride.`;
                        document.getElementById("errorUsingDisplay").style.display = "block";
                        document.getElementById("errorUsingDisplay").style.color = `var(--success-color)`;
                        document.getElementById("saveDisplay").innerHTML = `Save`;
                        document.getElementById("saveDisplay").style.display = "none";
                        document.getElementById("saveDisplay").classList.remove("disabled");
                    }).catch((error) => {
                        document.getElementById("errorUsingDisplay").textContent = `Error saving display name: ${error.message}`;
                        document.getElementById("errorUsingDisplay").style.display = "block";
                        document.getElementById("saveDisplay").innerHTML = `Save`;
                        document.getElementById("saveDisplay").style.display = "none";
                        document.getElementById("saveDisplay").classList.remove("disabled");
                    })
            })
        }
    }
}
