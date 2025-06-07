// trigger input
function changeBanner() {
    if (!document.getElementById("changeBanner").classList.contains("disabled")) {
        document.getElementById("fileInput_banner").click();
    }
}

// upload banner
document.getElementById("fileInput_banner").addEventListener("change", function (event) {
    firebase.auth().onAuthStateChanged((user) => {
        const file = event.target.files[0];

        document.getElementById("changeBanner").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Checking file...`;
        document.getElementById("changeBanner").classList.add("disabled");

        if (file) {
            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                const data = snapshot.val();

                let allowedTypes = [];
                if (data.isSubscribed === true) {
                    allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
                } else {
                    allowedTypes = ["image/png", "image/jpeg", "image/webp"];
                }

                if (file.size <= 5 * 1024 * 1024) {
                    if (allowedTypes.includes(file.type)) {
                        const storageRef = firebase.storage().ref();
                        const fileRef = storageRef.child(`images/banner/${user.uid}/${file.name}`);

                        document.getElementById("changeBanner").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Uploading image...`;

                        fileRef.put(file).then(function (snapshot) {
                            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                firebase.database().ref(`users/${user.uid}/banner`).once("value", (snapshot) => {
                                    firebase.database().ref(`users/${user.uid}/banner`).once("value", (snapshot) => {
                                        const oldPfpName = snapshot.val();

                                        firebase.database().ref(`users/${user.uid}`).update({
                                            banner: file.name
                                        })
                                            .then(() => {
                                                if (oldPfpName) {
                                                    const oldFileRef = storageRef.child(`images/banner/${user.uid}/${oldPfpName}`);
                                                    oldFileRef.delete().then(() => {
                                                        document.getElementById("changeBanner").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Checking...`;
                                                    }).catch((error) => {
                                                        document.getElementById("errorUploadingBanner").style.display = "block";
                                                        document.getElementById("errorUploadingBanner").textContent = `Failed to upload profile picture: ${error.message}`;
                                                    })
                                                }
                                            })
                                    })
                                });

                                document.getElementById("changeBanner").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Done!`;
                                window.location.reload();
                            });
                        }).catch(function (error) {
                            document.getElementById("errorUploadingBanner").style.display = "block";
                            document.getElementById("errorUploadingBanner").textContent = `Failed to upload profile picture: ${error.message}`;
                            document.getElementById("changeBanner").classList.remove("disabled");
                        })
                    } else {
                        if (file.type === "image/gif") {
                            document.getElementById("errorUploadingBanner").style.display = "block";
                            document.getElementById("errorUploadingBanner").textContent = `You need a Katniny+ subscription to use a GIF as your profile picture!`;
                            document.getElementById("changePfp").classList.remove("disabled");
                        } else {
                            document.getElementById("errorUploadingBanner").style.display = "block";
                            document.getElementById("errorUploadingBanner").textContent = `Invalid image type. Please select a .png, .jpg (.jpeg), or .webp file.`;
                            document.getElementById("changeBanner").classList.remove("disabled");
                        }
                    }
                } else {
                    document.getElementById("errorUploadingBanner").style.display = "block";
                    document.getElementById("errorUploadingBanner").textContent = `Image exceeds 5MB. Please choose a smaller image.`;
                }
            });
        }
    })
});
