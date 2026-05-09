const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const db = admin.database();
const fs = require("fs");
const path = require("path");

const fakePathsFile = path.join(__dirname, "fakePaths.json");

auride.post("/api/auride/dev/routeMediaLink", {
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get request type - if it's "username", we'll need to get the users uid
        const tusId = req.headers.tusid;
        const fakePath = req.headers.fakepath;

        // do userIdentifier and reqType exist?
        if (!tusId)
            return res.status(400).json({ error: "Please provide a TUS media ID." });
        if (!fakePath)
            return res.status(400).json({ error: "Please provide a path to redirect to." });

        // read current fakePaths.json
        let fakePathsData = [];
        if (fs.existsSync(fakePathsFile)) {
            const rawData = fs.readFileSync(fakePathsFile, "utf8");
            if (rawData.length === 0 || rawData === "[]") {
                // file is empty or wrongly an array, fix it
                fakePathsData = {};
            } else {
                try {
                    const parsed = JSON.parse(rawData);
                    fakePathsData = Array.isArray(parsed) ? {} : parsed;
                } catch (err) {
                    console.error("Failed to parse fakePaths.json, starting fresh.");
                    fakePathsData = {};
                }
            }
        } else {
            // file doesnt exist, create it
            fakePathsData = {};
        }
        
        // add or update the mapping
        fakePathsData[fakePath] = tusId;

        // write it back
        fs.writeFileSync(fakePathsFile, JSON.stringify(fakePathsData, null, 4), "utf8");

        return res.status(200).json({ success: "Successfully added redirect." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});