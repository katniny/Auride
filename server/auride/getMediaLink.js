const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const fakePathsFile = path.join(__dirname, "fakePaths.json");

router.get("/api/auride/dev/getMediaLink", async (req, res) => {
    if (req.method !== "GET")
        return res.status(403).json({ error: "This method can only be accessed via POST." });

    try {
        // get the path
        const fakePath = req.headers.path;

        // do userIdentifier and reqType exist?
        if (!fakePath)
            return res.status(400).json({ error: "Please provide a path to get." });
        console.log(fakePath);

        // get the path
        try {
            const rawData = fs.readFileSync(fakePathsFile, "utf8").trim();
            if (!rawData || rawData === "[]")
                return res.status(403).json({ error: "Path doesn't exist." });

            // parse the json
            const parsed = JSON.parse(rawData);
            const fakePathsData = Array.isArray(parsed) ? {} : parsed;

            return res.status(200).json({ returnedLink: fakePathsData[fakePath] || null });
        } catch (err) {
            res.status(400).json({ error: "Something went wrong." });
        }

        return res.status(200).json({ message: "Successfully added redirect." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to block user." });
    }
});

module.exports = router;