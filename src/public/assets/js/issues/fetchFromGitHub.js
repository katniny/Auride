const issuesBox = document.getElementById("issuesBox");
const loadingIssues = document.getElementById("loadingIssues");

// track states
let alreadySearchingIssues = false;

// get all the valid issues from github
async function fetchIssuesFromGitHub(state, label) {
    if (alreadySearchingIssues) return; // dont search multiple times
    alreadySearchingIssues = true;
    const validTags = [
        "enhancement",
        "bug",
        "dependencies",
        "duplicate",
        "good first issue",
        "help wanted",
        "invalid",
        "javascript",
        "question",
        "wontfix"
    ];

    // create the server url
    let githubURL = `https://api.github.com/repos/katniny/Auride/issues?direction=asc`
    // check state for open or closed (otherwise ignore)
    if (state === "open" || state === "closed")
        githubURL += `&state=${state}`
    // check for label filter
    if (validTags.includes(label))
        githubURL += `&label=${label}`

    // send a fetch request to github to search for issues
    const response = await fetch(`${githubURL}`);
    if (!response.ok) {
        console.error("Failed to fetch GitHub Issues: ", response.statusText);
        alreadySearchingIssues = false;
        noteLoadingIndicator.remove();
        return;
    }
    const ghResponse = await response.json();
    issuesBox.innerHTML = "";
    
    // then, show
    ghResponse.forEach(issue => {
        // get timestamp 
        const formattedTimestamp = githubTimestamp(issue.updated_at);

        // get labels
        const labels = issue.labels;
        let fullLabelHTML = document.createElement("div");
        labels.forEach(label => {
            // create div
            const labelDiv = document.createElement("div");
            labelDiv.className = "label";
            labelDiv.style.background = `#${label.color}`;
            labelDiv.style.color = getTextColor(label.color);
            labelDiv.innerHTML = `
                ${label.name}
            `;
            fullLabelHTML.appendChild(labelDiv);
        });

        // then render the div
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `
            <h3 onclick="getGithubIssue('${issue.number}')"><span class="${issue.state}">${faIcon("circle-dot").outerHTML}</span> <a href="javascript:void(${issue.number});">${issue.title}</a></h3>
            <p class="additionalDetails">#${issue.number} • ${issue.user.login} opened ${formattedTimestamp} • ${faIcon("comment").outerHTML} ${issue.comments}</p>
        `;
        issueDiv.querySelector("h3").appendChild(fullLabelHTML);

        // then, append
        issuesBox.prepend(issueDiv);
        if (loadingIssues)
            loadingIssues.remove();
    });

    alreadySearchingIssues = false;
}

fetchIssuesFromGitHub("open", null);

// get a singular issue
const issueDetails = document.getElementById("issueDetails");
const notesDiv = document.getElementById("notes");
async function getGithubIssue(id) {
    // return if already searching or id doesnt exist
    if (alreadySearchingIssues) return;
    if (!id) return;

    // swap between the issues box and issue details box
    issuesBox.style.display = "none";
    issueDetails.style.display = "block";

    // send a request to their server
    const response = await fetch(`https://api.github.com/repos/katniny/Auride/issues/${id}`);
    if (!response.ok) {
        console.error("Failed to fetch GitHub Issues: ", response.statusText);
        alreadySearchingIssues = false;
        return;
    }
    const ghIssueResponse = await response.json();

    // send another to get the events (e.g., comments)
    const timelinerResponse = await fetch(`https://api.github.com/repos/katniny/Auride/issues/${id}/timeline`);
    if (!timelinerResponse.ok) {
        console.error("Failed to fetch GitHub timeline: ", timelinerResponse.statusText);
        alreadySearchingIssues = false;
        return;
    }
    const timeline = await timelinerResponse.json();

    // create the html that gets prepended BEFORE the issueDetails box
    const detailsHTML = document.createElement("div");
    detailsHTML.className = "issueDetailsOutsideBox"
    const stateText = ghIssueResponse.state;
    const capitalizedState = stateText.charAt(0).toUpperCase() + stateText.slice(1);
    const successColor = getComputedStyle(document.documentElement).getPropertyValue("--success-color").trim();
    const stateTextColor = getTextColor(successColor);

    detailsHTML.innerHTML = `
        <h2><span onclick="goBackToSeeAllIssues()">${faIcon("arrow-left").outerHTML}</span> ${ghIssueResponse.title} <span class="issueNumber">#${ghIssueResponse.number}</span></h2>
        <div class="issueState ${stateText} ${stateTextColor}">${faIcon("circle-dot").outerHTML} ${capitalizedState}</div>
    `;
    issueDetails.parentNode.insertBefore(detailsHTML, issueDetails);

    // create the html to display issue details
    const issueDetailsInside = document.createElement("div");
    issueDetailsInside.className = "issueDetailsInside";
    const openedDate = await githubTimestamp(ghIssueResponse.updated_at);
    const formattedIssueBody = format(ghIssueResponse.body, ["html","markdown","emoji","link","newline","hashtag"], { allowImg: true });

    issueDetailsInside.innerHTML = `
        <p class="issueOpenedWhen">
            <img src="${ghIssueResponse.user.avatar_url}" draggable="false" alt="GitHub Profile Picture of ${ghIssueResponse.user.login}" class="githubPfp" /> 
            <a href="${ghIssueResponse.user.html_url}" target="_blank" class="githubProfileURL">${ghIssueResponse.user.login}</a><span class="darken">opened ${openedDate}</span>
        </p>

        <div class="issueDescription">
            ${formattedIssueBody}
        </div>
    `;
    issueDetails.innerHTML = "";

    issueDetails.appendChild(issueDetailsInside);

    // then, go through every event and append it appropriately
    timeline.forEach(event => {
        // valid github event types
        const validEventTypes = [
            "labeled",
            "renamed",
            "commented"
        ];

        // a type we dont support
        if (!validEventTypes.includes(event.event))
            return;

        // create html
        const eventHTML = document.createElement("div");
        eventHTML.className = "githubEvent";

        switch (event.event) {
            case "labeled":
                const labelBackgroundColor = `#${event.label.color}`;
                const labelTextColor = getTextColor(event.label.color);

                eventHTML.innerHTML = `
                    <p>
                        ${faIcon("tag").outerHTML}
                        <img src="${event.actor.avatar_url}" draggable="false" alt="GitHub Profile Picture of ${event.actor.login}" class="githubPfp" /> <a href="${event.actor.html_url}" target="_blank" class="githubProfileURL">${event.actor.login}</a> 
                        <span class="darken">added</span><div class="label ${labelTextColor}" style="background: ${labelBackgroundColor}">${event.label.name}</div> <span class="darken">${githubTimestamp(event.created_at)}</span>
                    </p>
                `;
                break;
            case "renamed":
                eventHTML.innerHTML = `
                    <p>
                        ${faIcon("pencil").outerHTML}
                        <img src="${event.actor.avatar_url}" draggable="false" alt="GitHub Profile Picture of ${event.actor.login}" class="githubPfp" /> <a href="${event.actor.html_url}" target="_blank" class="githubProfileURL">${event.actor.login}</a> 
                        <span class="darken">renamed</span> <s>${event.rename.from}</s> to <p>${event.rename.to}</p>
                        <span class="darken">${githubTimestamp(event.created_at)}</span>
                    </p>
                `;
                break;
            case "commented":
                eventHTML.classList.add("thread");
                eventHTML.innerHTML = `
                    <p>
                        <img src="${event.actor.avatar_url}" draggable="false" alt="GitHub Profile Picture of ${event.actor.login}" class="githubPfp" /> <a href="${event.actor.html_url}" target="_blank" class="githubProfileURL">${event.actor.login}</a> <span class="darken">${githubTimestamp(event.created_at)}</span>
                        <br />
                        <br />
                        <p>${format(event.body, ["html","markdown","emoji","link","newline","hashtag"], { allowImg: true })}</p>
                    </p>
                `;
                break;
            default:
                break;
        }

        // then append
        notesDiv.appendChild(eventHTML);
    });

    // add a commenting notice
    const commentingNotice = document.createElement("p");
    commentingNotice.className = "githubJoinDiscussion";
    commentingNotice.innerHTML = `
        Interested in joining in on the conversation? <a href="${ghIssueResponse.html_url}" target="_blank">Join the discussion on GitHub</a>.
    `;
    notesDiv.appendChild(commentingNotice);
}

// walk through all text nodes
function walkTextNodes(node, callback) {
    if (node.nodeType === Node.TEXT_NODE)
        callback(node);
    else
        node.childNodes.forEach(child => walkTextNodes(child, callback));
}