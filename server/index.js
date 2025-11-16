const express = require("express");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const PORT = 10000;

// initialize env files
require("dotenv").config();

// allow requests from the frontend
app.use(cors({
    origin: process.env.HOST_URL
}));

// initialize admin if not already
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccount.json")),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}

// allow json parsing from the body
app.use(express.json());

const db = admin.database();

// CORS blocks requests from other urls, however, we can lock this down more
// by preventing direct requests!
app.use((req, res, next) => {
    const origin = req.headers.origin || "Unknown origin";
    const referer = req.headers.referer || "Unkown referer.";
    const ip = req.headers["x-forwarded-for"] || req.ip;

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`   Origin: ${origin}`);
    console.log(`   Referer: ${referer}`);
    console.log(`   IP: ${ip}`);

    // if trying to access a restricted api, prevent.
    // we can allow our host site to access the auride api, but not anyone else
    if (req.originalUrl.startsWith("/api/auride/") && origin !== process.env.HOST_URL)
        return res.status(403).json({ status: "You are attempting to access a restricted API. Please do not do this." });

    // otherwise, keep it going.
    next();
});

// run auride's private backend
const aurideRoutes = path.join(__dirname, "auride");
fs.readdirSync(aurideRoutes).forEach(file => {
    console.log(`Starting ${file}...`);
    if (file.endsWith(".js")) {
        const route = require(path.join(aurideRoutes, file));
        app.use(route);
    }
});

// if called the root...
app.get("/", (req, res) => {
    res.json({ message: "Hi! Thanks for your interest in using the Auride API. However, it is currently unavailable for public use. We'll let you know on our profile when it's ready @ https://auride.xyz/u/auride" })

    // TODO: make a public api
    //res.json({ message: "Hi! Please feel free to look at our docs to see how to use our API." });
});

// simple health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// then, run the app
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Auride's server is running successfully at port ${PORT}`);
});