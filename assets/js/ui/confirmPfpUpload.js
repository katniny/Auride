let isUploadingPfp = false;

// allow auride to let the user confirm if
// they want the pfp they are uploading
export function openPfpConfirm(img) {
    // create the dialog element
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <h2><i class="fa-solid fa-circle-check"></i> Confirm Profile Picture?</h2>
        <p style="color: var(--text-semi-transparent); font-size: smaller;">Confirm that this is the profile picture you would like to use across Auride?</p>

        <br />

        <img src="${img}" draggable="false" style="width: 100px; border-radius: 50%;" />

        <br />
        <br />

        <button onclick="closePfpConfirm('upload', '${img}')" id="confirmTruePfp">Yes, this is what I want</button> <button onclick="closePfpConfirm('cancel')" id="confirmFalsePfp">Nevermind</button>
    `;
    dialog.id = "confirmPfpUpload";

    // then, append it to the body
    // and open it
    document.body.appendChild(dialog);
    dialog.showModal();
}

// confirm (or decline)
export async function closePfpConfirm(accepted, pfp) {
    if (isUploadingPfp) return; // dont run twice

    const dialog = document.getElementById("confirmPfpUpload");
    const errorTxt = document.getElementById("errorTxt");

    errorTxt.style.display = "none";

    if (accepted === "cancel") {
        // user didnt want their pfp
        dialog.close();
        setTimeout(() => {
            dialog.remove();
        }, 500);
    } else if (accepted === "upload") {
        const auth = firebase.auth();
        const user = auth.currentUser;

        // user wanted their pfp so upload it to the server
        isUploadingPfp = true;
        uploadBtns();

        // call the server and upload profile picture
        try {
            const token = await user.getIdToken();

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auride/setProfilePicture`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uploadedPfp: pfp
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.log("Error from server:", error);

                // close the modal and display the error elsewhere
                isUploadingPfp = false;
                closePfpConfirm("cancel");
                errorTxt.textContent = error;
                errorTxt.style.display = "inline-block";

                return;
            }

            // to:do
            // add final "step", which is the finished part

            isUploadingPfp = false;
            closePfpConfirm("cancel");
            setIsButtonUsed(false, true);
        } catch (error) {
            // close the modal and display the error elsewhere
            isUploadingPfp = false;
            closePfpConfirm("cancel");

            errorTxt.textContent = error;
            errorTxt.style.display = "inline-block";

            console.error("Error occurred uploading profile picture: ", error);
        }
    }
}

function uploadBtns() {
    const uploadTrue = document.getElementById("confirmTruePfp");
    const uploadFalse = document.getElementById("confirmFalsePfp");

    if (isUploadingPfp) {
        uploadTrue.style.opacity = "0.5";
        uploadTrue.style.cursor = "not-allowed";
        uploadTrue.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Uploading your profile picture...`;

        uploadFalse.style.opacity = "0.5";
        uploadFalse.style.cursor = "not-allowed";
        uploadFalse.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Cannot cancel at this time...`;
    }
}

// define functions
window.openPfpConfirm = openPfpConfirm;
window.closePfpConfirm = closePfpConfirm;