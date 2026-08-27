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
            return {
                userIdFromRequest: decodedToken.uid,
                userToken: extractedToken,
                suspension: suspensionStatus,
                lastAuth: decodedToken.auth_time
            };
        } catch (err) {
            console.error(`Invalid token: ${err}`);
            return null;
        }
    }

    return null;
}
module.exports = { getTokenAndUid };