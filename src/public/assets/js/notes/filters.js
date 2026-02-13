const allNotesButton = document.getElementById("allNotesButton");
const followingNotesButton = document.getElementById("followingNotesButton");
const notes = document.getElementById("notes");
// loadOnlyFollowingNotesOnly is defined in /assets/js/notes/notes.js!

function filterNotes(type = "all") {
    const isFollowing = type === "following";
    const activeButton = isFollowing ? followingNotesButton : allNotesButton;
    const inactiveButton = isFollowing ? allNotesButton : followingNotesButton;
    const user = firebase.auth().currentUser || null;
    const cannotUseFollowingFilter = document.getElementById("cannotUseFollowingFilter");

    // skip if already active
    if (activeButton.classList.contains("active")) return;

    // if cannot use following filter message, remove it
    if (cannotUseFollowingFilter) cannotUseFollowingFilter.remove();

    // remove existing notes
    document.querySelectorAll(".note").forEach(note => note.remove());

    // toggle active classes
    activeButton.classList.add("active");
    inactiveButton.classList.remove("active");

    // set flag
    loadOnlyFollowingNotesOnly = isFollowing;

    // if no user but tried to access following,
    // give them a message that they cant
    if (isFollowing && !user) {
        // get the loading indicator
        const loadingIndicator = document.getElementById("noteLoadingIndicator");
        if (loadingIndicator) loadingIndicator.remove();

        // create text
        const cannotUseThis = document.createElement("div");
        cannotUseThis.innerHTML = `
            <h3>Join Auride and start following people to use this tab!</h3>
            <p>You can go back to the "All Notes" filter for now.</p>
        `;
        cannotUseThis.id = "cannotUseFollowingFilter";
        cannotUseThis.className = "cannotUseFilter";
        notes.appendChild(cannotUseThis);
        
        return;
    }

    // load initial notes
    loadInitalNotes(isFollowing);
}