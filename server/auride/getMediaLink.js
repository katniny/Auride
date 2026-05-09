const auride = require("../core/auride.js");
const fs = require("fs");
const path = require("path");

const fakePathsFile = path.join(__dirname, "fakePaths.json");

auride.get("/api/auride/dev/getMediaLink", {
    requireActiveAccount: false,
    rateLimit: 2000
}, async (req, res, ctx) => {
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

        return res.status(200).json({ success: "Successfully added redirect." });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});