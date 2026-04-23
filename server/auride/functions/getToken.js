const admin = require("firebase-admin");

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
            return {
                userIdFromRequest: decodedToken.uid,
                userToken: extractedToken
            };
        } catch (err) {
            console.error(`Invalid token: ${err}`);
            return null;
        }
    }

    return null;
}
module.exports = { getTokenAndUid };