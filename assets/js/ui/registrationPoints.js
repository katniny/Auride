let isButtonUsed = false;
let currentStep = null;

// this makes registration fancy
// anims, etc., etc.
// also always us to not have several pages for
// each regisration step
export function usernameStep() {
    // start with the animation
    // the auride logo coming up, getting bigger,
    // having the yellow outline run across the logo, then
    // falling into place
    currentStep = "usernames";
    const formBox = document.querySelector(`div[class="formBox"]`);
    formBox.setAttribute("style", `
        transition: all 1s ease;
        opacity: 0;
    `);

    // create the logo that'll be used
    const logo = document.createElement("img");
    logo.src = "/assets/imgs/favicon.png";
    logo.classList.add("welcomeLogo");
    logo.classList.add("goToTop");
    logo.draggable = false;
    document.body.appendChild(logo);

    // then, make it slightly bigger, and do the
    // outline effect
    setTimeout(() => {
        logo.classList.remove("goToTop");
        logo.classList.add("sizeIncrease");
    }, 1350);

    // then, show the formbox again and have the
    // logo slam into it
    setTimeout(() => {
        // set the new innerHTML
        formBox.innerHTML = `
            <img class="formBoxLogo" id="formBoxLogo" draggable="false" src="/assets/imgs/favicon.png" style="opacity: 0;" />
            <h1>Welcome to Auride!</h1>
            <p>We hope you enjoy your time here! Let's start personalizing your account! Starting simple with your display name and username.</p>

            <br />

            <input id="displayName" placeholder="Set your display name" />
            <p id="displayNameLimit" style="text-align: left; color: var(--text-semi-transparent);">0/25</p>

            <br />

            <input id="username" placeholder="Set your username" oninput="usernameCharacters()" />
            <p id="usernameLimit" style="text-align: left; color: var(--text-semi-transparent);">0/20</p>
            <p id="errorTxt" class="infoCaution" style="display: none; margin-top: 5px;">No error to display.</p>

            <br />
            <br />

            <button onclick="setDisplayAndUsername()" id="formBtn">Set Display Name and Username</button>
        `;

        // add character limits
        const displayNameText = document.getElementById("displayName");
        const maxDisplay = 25;
        displayNameText.addEventListener("input", () => {
            const currentLength = displayNameText.value.length;

            if (currentLength > maxDisplay) {
                displayNameText.value = displayNameText.value.substring(0, maxDisplay);
            }

            if (currentLength > maxDisplay)
                document.getElementById("displayNameLimit").textContent = `25/25`;
            else
                document.getElementById("displayNameLimit").textContent = `${currentLength}/25`;
        });

        const usernameText = document.getElementById("username");
        const maxUsername = 20;
        usernameText.addEventListener("input", () => {
            const currentLength = usernameText.value.length;

            if (currentLength > maxUsername) {
                usernameText.value = usernameText.value.substring(0, maxUsername);
            }

            if (currentLength > maxUsername)
                document.getElementById("usernameLimit").textContent = `20/20`;
            else
                document.getElementById("usernameLimit").textContent = `${currentLength}/20`;
        });

        // then, show the formbox again with new class
        formBox.setAttribute("style", `
            transition: all 0.5s ease;
            opacity: 0;
        `);
        formBox.classList.add("center");

        // and animation :p
        logo.classList.remove("sizeIncrease");
        logo.classList.add("slam");
    }, 2850);

    // finish
    setTimeout(() => {
        formBox.style.opacity = "0.5";
        logo.setAttribute("style", `
            transform: translate(-50%, -300%) scale(1);   
        `);

        formBox.classList.add("impactShake");
        logo.remove();
        document.getElementById("formBoxLogo").style.opacity = "1";
        formBox.style.opacity = "1";
        setTimeout(() => {
            formBox.classList.remove("impactShake");
        }, 500);
    }, 4140);
} 

// profile picture step
// just responsible for letting the user
// chose their starting pfp!
function profilePictureStep() {
    moveOnToNewStep();
}

// moving onto next step
function moveOnToNewStep() {
    const formBox = document.querySelector(`div[class="formBox center"]`);
    formBox.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin fa-2xl"></i>

        <br />
        <br />

        <p>We're preparing our magic! ✨</p>
        <br />
        <p style="color: var(--text-semi-transparent); font-size: smaller;">We'll put you into the next step within a second or two. If it doesn't happen within a few seconds, please check your internet connection or refresh the page.</p>
    `;
}

// show & update the button ui
export function getIsButtonUsed() {
    return isButtonUsed;
}

export function setIsButtonUsed(value, moveOntoNextStep) {
    isButtonUsed = value;
    updateButton();
    // if we should go to the next step,
    // then lets do that!
    if (moveOntoNextStep) {
        switch (currentStep) {
            case "usernames":
                currentStep = "profile_picture";
                profilePictureStep();
                break;
        
            default:
                currentStep = "???";
                break;
        }
    }
}

function updateButton() {
    const formBtn = document.getElementById("formBtn");

    // if in use
    if (isButtonUsed) {
        // let user know that its working
        formBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Working our magic...`;
        formBtn.style.opacity = "0.5";
        formBtn.style.cursor = "not-allowed";
    } else {
        // let user know its usable
        switch (currentStep) {
            case "usernames":
                formBtn.innerHTML = `Set Display Name and Username`;
                break;
        
            default:
                break;
        }
        
        formBtn.style.opacity = "1";
        formBtn.style.cursor = "pointer";
    }
}

// define all the functions
window.usernameStep = usernameStep;
window.getIsButtonUsed = getIsButtonUsed;
window.setIsButtonUsed = setIsButtonUsed;