// show character limit
const pronounsText = document.getElementById("pronouns-text");
const maxPronouns = 15;

pronounsText.addEventListener("input", () => {
    const currentLength = pronounsText.value.length;

    if (currentLength > maxPronouns) {
        pronounsText.value = pronounsText.value.substring(0, maxPronouns);
    }

    document.getElementById("characterLimit_pronouns").textContent = `${currentLength}/15`;
});

// set pronouns
function setPronouns() {
    if (!document.getElementById("savePronouns").classList.contains("disabled")) {
        if (!document.getElementById("savePronouns").classList.contains("disabled")) {
            document.getElementById("savePronouns").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Updating pronouns...`;
            document.getElementById("savePronouns").classList.add("disabled");

            firebase.auth().onAuthStateChanged((user) => {
                firebase.database().ref(`users/${user.uid}`).update({
                    pronouns: document.getElementById("pronouns-text").value
                }).then(() => {
                    document.getElementById("savePronouns").innerHTML = `Save`;
                    document.getElementById("savePronouns").classList.remove("disabled");
                    document.getElementById("savePronouns").style.display = "none";
                })
            })
        }
    }
}