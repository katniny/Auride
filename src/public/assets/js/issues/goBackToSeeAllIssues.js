function goBackToSeeAllIssues() {
    const issuesBox = document.getElementById("issuesBox");
    const issueDetails = document.getElementById("issueDetails");
    const issueDetailsOutsideBox = document.querySelector(".issueDetailsOutsideBox");
    const githubEvents = document.querySelectorAll(".githubEvent");
    const joinDiscussion = document.querySelector(".githubJoinDiscussion");

    // open the main box
    issuesBox.style.display = "block";
    issueDetails.style.display = "none";

    // clear up details
    if (issueDetailsOutsideBox)
        issueDetailsOutsideBox.remove();
    issueDetails.innerHTML = `
        <p id="loadingIssues"><i class="fa-solid fa-circle-notch fa-spin"></i> We're fetching this issues data...</p>
    `;
    if (githubEvents) {
        githubEvents.forEach(event => {
            event.remove();
        });
    }
    if (joinDiscussion)
        joinDiscussion.remove();
}