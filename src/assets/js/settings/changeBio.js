// show character limit
const bioText = document.getElementById("bioText");
const maxBio = 500;

bioText.addEventListener("input", () => {
    const currentLength = bioText.value.length;

    if (currentLength > maxBio) {
        bioText.value = bioText.value.substring(0, maxBio);
    }

    document.getElementById("characterLimit_bio").textContent = `${currentLength}/500`;
})

// set bio
function setBio() {
    if (!document.getElementById("saveBio").classList.contains("disabled")) {
        document.getElementById("saveBio").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Updating bio...`;
        document.getElementById("saveBio").classList.add("disabled");

        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`users/${user.uid}`).update({
                bio: document.getElementById("bioText").value
            }).then(() => {
                document.getElementById("saveBio").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Updating bio...`;
                document.getElementById("saveBio").classList.remove("disabled");
                document.getElementById("saveBio").style.display = `none`;
            })
        })
    }
}
