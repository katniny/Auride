const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const { returnUserData } = require("./functions/returnUserData.js");

auride.get("/api/auride/getUserData", {
    requireActiveAccount: false,
    rateLimit: 2000
}, async (req, res, ctx) => {
    try {
        // get request type - if it's "username", we'll need to get the users uid
        const userIdentifier = req.headers.useridentifier;
        const reqType = req.headers.reqtype;

        const returnedUserData = await returnUserData(userIdentifier, reqType, ctx);

        return res.status(200).json({ success: returnedUserData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});