// if you need to use this on another page,
// please change and move to /js/users! this is only built to run
// on the registration page.
export async function setDisplayAndUsername() {
    if (getIsButtonUsed() === true) return;
    setIsButtonUsed(true);

    const errorTxt = document.getElementById("errorTxt");
    const display = document.getElementById("displayName").value;
    const username = document.getElementById("username").value;

    errorTxt.style.display = "none";

    // try to set both the display and username
    const [displayResult, usernameResult] = await Promise.all([
        setNewDisplayName(display),
        setNewUsername(username)
    ]);

    // something failed :(
    if (!displayResult.success || !usernameResult.success) {
        errorTxt.textContent = (displayResult.error ?? usernameResult.error) ?? "An unknown error occurred.";
        errorTxt.style.display = "inline-block";
        setIsButtonUsed(false);
        return false;
    }

    setIsButtonUsed(false, true);
    console.log("Both username and display name set!");
    return true;
}

window.setDisplayAndUsername = setDisplayAndUsername;