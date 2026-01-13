const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const db = admin.database();

const fakePathsFile = path.join(__dirname, "fakePaths.json");

router.post("/api/auride/dev/routeMediaLink", async (req, res) => {
    if (req.method !== "POST")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

    try {
        // extract token
        const authHeader = req.headers.authorization || "";
        let token = null;
        if (typeof req.headers.authorization === "string") {
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1])
                token = parts[1].trim();
        }
        
        // verify token
        let userUidFromRequest = null;
        if (token) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                userUidFromRequest = decodedToken.uid;
            } catch (err) {
                console.error(`Invalid token: ${err}`);
            }
        }

        if (!token || !userUidFromRequest)
            return res.status(403).json({ error: "Must be authenticated." });

        // now that user is authenticated (assuming there is one), continue
        // get request type -- if it's "username", we'll need to get the users uid
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

        return res.status(200).json({ message: "Successfully added redirect." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fake link." });
    }
});

module.exports = router;