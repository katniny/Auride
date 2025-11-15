export async function sendGitHubIssue(bugName, browserEngine, operatingSystem, bugReportDesc, 
    stepsToRepro, properlyFilledOut, issueClosedIfImproper, reproInDevEnv, 
    resolveIssueSelf, searchedForSimilar, reportType) {
    // get token, if exists
    const user = firebase.auth().currentUser;
    let token = null;
    if (user) {
        try {
            token = await user.getIdToken();
        } catch (err) {
            console.error(`Failed to get Firebase token: ${err}`);
        }
    }

    if (!token)
        return "No token found";

    // tell the server to handle this lol
    // we should've already verified this
    const body = {
        bugName,
        browserEngine,
        operatingSystem,
        bugReportDesc,
        stepsToRepro,
        properlyFilledOut,
        issueClosedIfImproper,
        reproInDevEnv,
        resolveIssueSelf,
        searchedForSimilar,
        reportType
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auride/sendGithubIssue`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        console.error("Failed to send report: ", response.statusText);
        return `Failed to send report`;
    }

    // if all goes well, yippe!!
    return "Succeeded";
}