const auride = require("../core/auride.js");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = admin.database();

auride.post("/api/auride/registerUser", {
    rateLimit: 3
}, async (req, res, ctx) => {
    try {
        // get email & password
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;

        // does noteId exist?
        if (!reqEmail || !reqPassword)
            return res.status(400).json({ error: "You need an email and password to register!" });

        // attempt to create account with the correct credentials
        const newUser = await auth.createUser({
            email: reqEmail,
            password: reqPassword
        });

        // if successful, create token, write to db, and return
        const token = await auth.createCustomToken(newUser.uid);

        db.ref(`/users/${newUser.uid}`).update({
            email: reqEmail
        });

        return res.status(200).json({ success: token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});