import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const hostUrl = process.env.HOST_URL;

// keep track of rate limit
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 1 * 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 1; // max 1 requests

// init admin
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}

// read body
async function getRawBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => {
            resolve(data);
        });
        req.on("error", err => {
            reject(err);
        });
    });
}

// handler
export default async function handler(req, res) {
    const origin = req.headers.origin;

    // handle rate limit
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - userData.startTime < RATE_LIMIT_WINDOW) {
        if (userData.count >= RATE_LIMIT_MAX) {
            return res.status(429).json({ error: "Too many requests. Please slow down." });
        } else {
            userData.count += 1;
        }
    } else {
        // reset window
        userData.count = 1;
        userData.startTime = now;
    }

    rateLimitMap.set(ip, userData);

    // handle preflight
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        return res.status(204).end();
    }

    // allow only our frontend to access 
    if (origin !== hostUrl) {
        return res.status(403).json({ error: "Forbidden request." });
    }
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

    // validate auth & data
    const authHeader = req.headers.authorization || "";
    let decoded = null;
    let token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    try {
        if (typeof token === "string" && token.trim() !== "") {
            try {
                decoded = await getAuth().verifyIdToken(token);
            } catch (err) {
                decoded = null;
            }
        }
        
        const rawBody = await getRawBody(req);
        const body = JSON.parse(rawBody);
        const { newDisplay } = body;
        
        const uid = decoded.uid;
        const userRef = getDatabase().ref(`/users/${uid}`);

        // make sure their display name isnt blank or
        // above the character limit
        if (newDisplay.length > 25)
            return res.status(403).json({ error: "Your display name is above the character limit of 25 characters." });
    
        if (newDisplay.trim() === "")
            return res.status(403).json({ error: "Display name cannot be empty." });

        // then, write their new display name
        await userRef.update({
            display: newDisplay
        });

        return res.status(200).json({ message: "Successfully set the users display name." });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized request." });
    }
}