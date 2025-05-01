document.getElementById("pfpUploader").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        // ensure file is 5mb or lower
        if (file.size > 5 * 1024 * 1024) { // 5mb
            document.getElementById("errorTxt").textContent = "Image must be under 5MB.";
            document.getElementById("errorTxt").style.display = "block";
            return;
        }

        // check file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            document.getElementById("errorTxt").textContent = "Image must be a JPG, PNG, or WEBP file.";
            document.getElementById("errorTxt").style.display = "block";
            return;
        }

        // get user uid
        firebase.auth().onAuthStateChanged((user) => {
            // create a reference to where you want to upload the file
            const fileRef = storageRef.child(`images/pfp/${user.uid}/${file.name}`);

            // upload the file
            const uploadTask = fileRef.put(file);

            uploadTask.on("state_changed",
                function (snapshot) {
                    // log progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById("errorTxt").textContent = `Uploading profile picture! ${progress}% done`;
                    document.getElementById("errorTxt").style.display = "block";
                    document.getElementById("errorTxt").style.color = "var(--success-color)";
                },
                function (error) {
                    document.getElementById("errorTxt").textContent = `${error.message}`;
                    document.getElementById("errorTxt").style.display = "block";
                    document.getElementById("errorTxt").style.color = "var(--error-text)";
                },
                function () {
                    // complete!
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        firebase.database().ref(`users/${user.uid}`).update({
                            pfp: file.name
                        })
                            .then(() => {
                                const url = new URL(window.location.href);
                                const urlParam = url.searchParams.get("return_to");

                                if (!urlParam) {
                                    window.location.replace("/auth/names");
                                } else {
                                    window.location.replace(`/auth/names?return_to=${urlParam}`);
                                }
                            });
                    })
                }
            )
        })
    }
})