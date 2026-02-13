// TODO: this can probably just be a dropdown
function userActions(currentUser, otherUser, isBlocked) {
    // html
    const modalHTML = `
        <h2 id="interactingWithWho"></h2>
        <p id="interactingWithWho_desc"></p>

        <br />

        <div id="interactions">

        </div>

        <br />
        <br />

        <button onclick="userActionsClose()">Nevermind</button> 
    `;

    // create modal
    const modal = document.createElement("dialog");
    modal.id = "userActionsDialog";
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
    
    // if user same as self?
    const interactingWithWho = document.getElementById("interactingWithWho");
    const interactingWithWho_desc = document.getElementById("interactingWithWho_desc");
    const interactions = document.getElementById("interactions");
    interactingWithWho.textContent = `Interacting with ${format(otherUser.display, ["html", "emoji"])}`;
    if (currentUser.uid === otherUser.uid) {
        interactingWithWho_desc.textContent = "What would you like to do to your account?"
        interactions.innerHTML = `
            <a href="/settings"><button>${faIcon("user-pen").outerHTML} Edit Profile</button></a>
        `;
    } else {
        interactingWithWho_desc.textContent = "How would you like to interact?"
        if (otherUser.memorialAccount?.isDeceased)
            interactions.innerHTML = `
                <p>
                    ${format(otherUser.display, ["html", "emoji"])} is a memorial account.
                    You cannot follow, block, report, or interact with a memorial account.
                    <a href="/blog/memorialized-accounts">Learn more about memorial accounts.</a>
                </p>
            `;
        else {
            let blockedString;
            if (isBlocked)
                blockedString = "Unblock User";
            else
                blockedString = "Block User";

            interactions.innerHTML = `
                <button id="blockButton" onclick="blockUser('${otherUser.uid}', 'uid')">${faIcon("ban").outerHTML} ${blockedString}</a>
                <button onclick="reportUser()">${faIcon("flag").outerHTML} Report User</button>
            `;
        }
    }

    // then show
    modal.showModal();
}

// close popup
function userActionsClose() {
    const userActionsDialog = document.getElementById("userActionsDialog");
    userActionsDialog.close();
    setTimeout(() => {
        userActionsDialog.remove();
    }, 500);
}