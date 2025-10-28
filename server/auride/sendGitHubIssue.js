const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.database();

router.post("/api/auride/sendGithubIssue", async (req, res) => {
    if (req.method !== "POST")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

        // verify token (if there is one)
        let userUidFromRequest = null;
        let username = null;
        if (token) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            userUidFromRequest = decodedToken.uid;

            // get uid
            if (!userUidFromRequest)
                return res.status(403).json({ error: "No user UID with this token found." });

            // get username
            const getUsername = await db.ref(`users/${userUidFromRequest}/username`).once("value");
            username = getUsername.val();
        } else {
            return res.status(403).json({ error: "No token found. Must be logged in to use this!" });
        }

        // now parse the body
        const body = req.body;
        let githubMarkdown = "";

        githubMarkdown += `[Created by @${username} on Auride]\n\n`;

        if (body.browserEngine)
            githubMarkdown += `### Browser\n${body.browserEngine}\n\n`;

        if (body.operatingSystem)
            githubMarkdown += `### Operating System\n${body.operatingSystem}\n\n`;

        if (body.bugReportDesc)
            githubMarkdown += `### Description\n${body.bugReportDesc}\n\n`;

        if (body.stepsToRepro && body.reportType === "bug")
            githubMarkdown += `### Steps to reproduce\n${body.stepsToRepro}\n\n`;
        else if (body.stepsToRepro && body.reportType === "enhancement")
            githubMarkdown += `### How would your feature improve Auride?\n${body.stepsToRepro}\n\n`
        
        if (body.properlyFilledOut)
            githubMarkdown += `- [x] I agree that I properly filled out the items listed above.\n`;
        else
            return res.status(403).json({ error: "Please agree to having properly filled out the bug report." });

        if (body.properlyFilledOut)
            githubMarkdown += `- [x] I understand an issue may be closed if process is properly followed.\n`;
        else
            return res.status(403).json({ error: "Please agree to understanding that an issue may be closed if improperly filled out." });

        if (body.reproInDevEnv)
            githubMarkdown += `- [x] I could replicate this issue in a local development environment\n`;
        else if (!body.reproInDevEnv && body.reportType === "bug")
            githubMarkdown += `- [ ] I could replicate this issue in a local development environment\n`;
        else if (body.reproInDevEnv && body.reportType === "enhancement")
            githubMarkdown += `- [x] I will implement this feature myself\n`;
        else if (!body.reproInDevEnv && body.reportType === "enhancement")
            githubMarkdown += `- [ ] I will implement this feature myself\n`;

        if (body.resolveIssueSelf)
            githubMarkdown += `- [x] I will resolve this issue myself\n`
        else if (!body.resolveIssueSelf && body.reportType === "bug")
            githubMarkdown += `- [ ] I will resolve this issue myself\n`

        if (body.searchedForSimilar)
            githubMarkdown += `- [x] I have searched for similar issues`
        else
            return res.status(403).json({ error: "Please agree to have searched for similar issues." });

        // then, send issue to github
        const ghToken = process.env.GITHUB_BOT_TOKEN;
        const issueData = {
            title: body.bugName,
            body: githubMarkdown,
            labels: [body.reportType]
        };

        fetch(`https://api.github.com/repos/katniny/Auride/issues`, {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${ghToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "Auride-Issue-Bot"
            },
            body: JSON.stringify(issueData)
        }).then(async res => {
            if (!res.ok) {
                const err = await res.text();
                console.log(err);
                res.status(500).json({ error: `GitHub response was not OK with error: ${err}` });
            }
            return res.json();
        }).then(data => {
            return res.status(200).json({ message: "Issue created successfully!" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: `An error occurred: ${err}` });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send issue to GitHub." });
    }
});

module.exports = router;