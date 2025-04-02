// show the character limit
const usernameText = document.getElementById("username-text");
const maxUser = 20;

usernameText.addEventListener("input", () => {
    const currentLength = usernameText.value.length;

    if (currentLength > maxUser) {
        usernameText.value = usernameText.value.substring(0, maxUser);
    }

    document.getElementById("characterLimit_username").textContent = `${currentLength}/20`;
})

// setting the username
function setUsername() {
    if (!document.getElementById("saveUsername").classList.contains("disabled")) {
        document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking whitespace...`;
        document.getElementById("saveUsername").classList.add("disabled");
        document.getElementById("errorTakingUsername").style.display = "none";

        const userValue = document.getElementById("username-text").value.trim();

        if (userValue === "") {
            document.getElementById("errorTakingUsername").textContent = "Your username cannot be empty."
            document.getElementById("errorTakingUsername").style.display = "block";
            document.getElementById("saveUsername").innerHTML = `Save`;
            document.getElementById("saveUsername").style.display = "none";
            document.getElementById("saveUsername").classList.remove("disabled");
            document.getElementById("usernameNotice").style.display = "none";
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.database().ref(`taken-usernames/${document.getElementById("username-text").value}`).once("value", (snapshot) => {
                        const usernameTaken = snapshot.exists();

                        if (usernameTaken === true) {
                            document.getElementById("errorTakingUsername").textContent = `This username is unavailable! Try another!`;
                            document.getElementById("errorTakingUsername").style.display = "block";
                            document.getElementById("saveUsername").innerHTML = `Save`;
                            document.getElementById("saveUsername").style.display = "none";
                            document.getElementById("saveUsername").classList.remove("disabled");
                            document.getElementById("usernameNotice").style.display = "none";
                        } else {
                            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                                const data = snapshot.val();

                                document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Removing old username...`;
                                firebase.database().ref(`taken-usernames/${data.username}`).update({
                                    user: null
                                }).then(() => {
                                    document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Reserving username...`;

                                    firebase.database().ref(`taken-usernames/${document.getElementById("username-text").value}`).update({
                                        user: user.uid
                                    }).then(() => {
                                        document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Setting publicly...`;

                                        firebase.database().ref(`users/${user.uid}`).update({
                                            username: document.getElementById("username-text").value
                                        }).then(() => {
                                            window.location.reload();
                                        })
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }
    }
}