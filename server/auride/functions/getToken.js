const admin = require("firebase-admin");
const { getSuspensionStatus } = require("./getSuspensionStatus");
const db = admin.database();

async function getTokenAndUid(authHeader) {
    // extract token
    const header = authHeader || "";
    let extractedToken = null;
    if (typeof header === "string") {
        const parts = header.split(" ");
        if (parts[0] === "Bearer" && parts[1])
            extractedToken = parts[1].trim();
    }
            
    // verify token
    if (extractedToken) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(extractedToken);

            // get suspension status
            const suspensionStatus = await getSuspensionStatus(decodedToken.uid);
            //console.log(suspensionStatus);

            // if suspended, get the notes to return to the client
            // this might slow the response slightly, but its okay, they're suspended anyway lol
            // TODO: make client accept this
            return {
                userIdFromRequest: decodedToken.uid,
                userToken: extractedToken,
                suspension: suspensionStatus
            };
        } catch (err) {
            console.error(`Invalid token: ${err}`);
            return null;
        }
    }

    return null;
}
module.exports = { getTokenAndUid };