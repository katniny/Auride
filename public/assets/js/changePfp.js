// trigger input
function changePfp() {
    if (!document.getElementById("changePfp").classList.contains("disabled")) {
        document.getElementById("fileInput").click();
    }
}

// upload the file
document.getElementById("fileInput").addEventListener("change", function (event) {
    firebase.auth().onAuthStateChanged((user) => {
        const file = event.target.files[0];

        document.getElementById("changePfp").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Checking file...`;
        document.getElementById("changePfp").classList.add("disabled");

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
                        document.getElementById("changePfp").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Uploading image...`;
                        
                        const fileRef = storageRef(`images/pfp/${user.uid}/${file.name}`);
                        fileRef.put(file).then(function (snapshot) {
                            firebase.database().ref(`users/${user.uid}/pfp`).once("value", (snapshot) => {
                                const oldPfpName = snapshot.val();

                                firebase.database().ref(`users/${user.uid}`).update({
                                    pfp: file.name
                                })
                                    .then(() => {
                                        if (oldPfpName) {
                                            const oldFileRef = storageRef(`images/pfp/${user.uid}/${oldPfpName}`);
                                            return oldFileRef.delete().then(() => {
                                                document.getElementById("changePfp").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Checking...`;
                                            }).catch((error) => {
                                                document.getElementById("errorUploadingPfp").style.display = "block";
                                                document.getElementById("errorUploadingPfp").textContent = `Failed to upload profile picture: ${error.message}`;
                                            })
                                        }
                                    }).finally(() => {
                                        document.getElementById("changePfp").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Done!`;
                                        setTimeout(() => window.location.reload(), 500);
                                    })
                                })
                        }).catch(function (error) {
                            document.getElementById("errorUploadingPfp").style.display = "block";
                            document.getElementById("errorUploadingPfp").textContent = `Failed to upload profile picture: ${error.message}`;
                            document.getElementById("changePfp").classList.remove("disabled");
                        })
                    } else {
                        if (file.type === "image/gif") {
                            document.getElementById("errorUploadingPfp").style.display = "block";
                            document.getElementById("errorUploadingPfp").textContent = `You need a Katniny+ subscription to use a GIF as your profile picture!`;
                            document.getElementById("changePfp").classList.remove("disabled");
                        } else {
                            document.getElementById("errorUploadingPfp").style.display = "block";
                            document.getElementById("errorUploadingPfp").textContent = `Invalid image type. Please select a .png, .jpg (.jpeg), or .webp file.`;
                            document.getElementById("changePfp").classList.remove("disabled");
                        }
                    }
                } else {
                    document.getElementById("errorUploadingPfp").style.display = "block";
                    document.getElementById("errorUploadingPfp").textContent = `Image exceeds 5MB. Please choose a smaller image.`;
                }
            });
        }
    })
});
