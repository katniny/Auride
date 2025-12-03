// TODO: figure out why this is not working
// and potentionally blocking other app functionality 

// const updateModal = `
//     <h2><i class="fa-solid fa-cloud-arrow-down"></i> App Update Available</h2>
//     <p>Please note that there are no auto-updates yet, Auride will not update for you! Auto-updates are a planned feature.</p>
//     <p>If you don't update, Auride will continue to load the website properly, but you'll miss out on new app features, security updates, and more.</p>

//     <br />

//     <a href="https://github.com/katniny/Auride/releases" target="_blank"><button>Download Update</button></a> <button onclick="closeUpdatePopup()">Dismiss</button>
// `;

// function showNewUpdateAvailablePopup() {
//     // append and put the content inside the modal
//     const updateAvailablePopup = document.createElement("dialog");
//     updateAvailablePopup.setAttribute("id", "updateAvailablePopup");
//     updateAvailablePopup.innerHTML = updateModal;
//     document.body.appendChild(updateAvailablePopup);

//     // then, finally show modal
//     updateAvailablePopup.showModal();
// }

// function closeUpdatePopup() {
//     const notePopup = document.getElementById("updateAvailablePopup");

//     notePopup.close();
//     setTimeout(() => {
//         notePopup.remove();
//     }, 500);
// }
