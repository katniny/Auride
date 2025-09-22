const express = require("express");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const PORT = 10000;

// initialize env files
require("dotenv").config();

console.log(process.env.HOST_URL);
console.log(process.env.FIREBASE_DATABASE_URL);

// allow requests from the frontend
app.use(cors({
    origin: process.env.HOST_URL
}));

// initialize admin if not already
const serviceAccount = path.join(__dirname, "serviceAccount.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccount.json")),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}

const db = admin.database();

// run auride's private backend
const aurideRoutes = path.join(__dirname, "auride");
fs.readdirSync(aurideRoutes).forEach(file => {
    console.log(aurideRoutes);

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