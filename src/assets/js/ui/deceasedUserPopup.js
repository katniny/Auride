const deceasedModal = `
    <h2><i class="fa-solid fa-dove"></i> Remembering <span id="userDeceasedH2">[user]</span></h2>
    <p>This account has been memorialized. <a href="/blog/memorialized-accounts">Memorialized accounts</a> are a way to honor and remember someone's life after they've passed away, keeping their memory alive within our community.</p>

    <br />

    <p>If you're struggling, please know you're not alone. You matter, and there are people who care about you. <a href="/resources/suicide-prevention">Click here for suicide prevention resources</a> and support, or reach out to someone you trust.</p>

    <br />

    <button onclick="closeDeceasedUserPopup()">May <span id="userDeceasedBtnConfirm">[user]</span> Rest in Peace</button>
`;

function openDeceasedUserPopup(user) {
    // append and put the content inside the modal
    const deceasedUserPopup = document.createElement("dialog");
    deceasedUserPopup.setAttribute("id", "deceasedUserPopup");
    deceasedUserPopup.innerHTML = deceasedModal;
    document.body.appendChild(deceasedUserPopup);

    // change [user] texts to the username
    document.getElementById("userDeceasedH2").textContent = `@${user}`;
    document.getElementById("userDeceasedBtnConfirm").textContent = `@${user}`;

    // then, finally show modal
    deceasedUserPopup.showModal();
}

function closeDeceasedUserPopup() {
    const notePopup = document.getElementById("deceasedUserPopup");

    notePopup.close();
    setTimeout(() => {
        notePopup.remove();
    }, 100);
}