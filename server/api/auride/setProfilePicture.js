import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import { getStorage } from "firebase-admin/storage";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
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
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const rawBody = await getRawBody(req);
        const body = JSON.parse(rawBody);
        const { uploadedPfp } = body;

        const decoded = await getAuth().verifyIdToken(token);
        const uid = decoded.uid;
        const userRef = getDatabase().ref(`/users/${uid}`);

        // validate and decode image
        const matches = uploadedPfp.match(/^data:(image\/(png|jpeg|webp));base64,/);
        if (!matches) return res.status(400).json({ error: "Invalid image data." });

        const mimeType = matches[1];
        const extension = mimeType.split("/")[1];
        const base64Data = uploadedPfp.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // check file extensions
        if (extension !== "png"
            && extension !== "jpg"
            && extension !== "jpeg"
            && extension !== "webp")
            return res.status(401).json({ error: "Only JPEG (JPG), PNG, or WebP images can be uploaded." });
        
        // check file size
        const MAX_SIZE = 5 * 1024 * 1024;
        if (buffer.length > MAX_SIZE)
            return res.status(401).json({ error: "Your profile picture cannot be above 5MB." });
    
        // remove the users old pfp
        const userSnap = await userRef.once("value");
        const previousData = userSnap.val();
        const previousPfp = previousData?.pfp;

        if (previousPfp) {
            try {
                const oldFile = getStorage().bucket().file(`images/pfp/${uid}/${previousPfp}`);
                await oldFile.delete();
            } catch (error) {
                return res.status(403).json({ error: "Failed to delete previous profile picture." });
            }
        }

        // generate file name and upload
        const fileName = `${uuidv4()}.${extension}`;
        const filePath = `images/pfp/${uid}/${fileName}`;
        const bucket = getStorage().bucket();
        const file = bucket.file(filePath);

        await file.save(buffer, {
            metadata: {
                contentType: mimeType
            }
        });

        // then finally, update the users pfp
        await userRef.update({
            pfp: fileName
        });

        return res.status(200).json({ message: "Successfully set the users profile picture." });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized request." });
    }
}