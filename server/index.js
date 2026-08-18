const express = require("express");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const readline = require("node:readline");
const { styleText } = require("node:util");
const os = require("node:os");

const app = express();
const PORT = 10000;

// initialize env files
require("dotenv").config();

// initialize admin if not already
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccount.json")),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}

// load this after initializing firebase or checking user data
// on the fly wont work
const auride = require("./core/auride.js");

// allow requests from the frontend
app.use(cors({
    origin: process.env.HOST_URL
}));

// allow json parsing from the body
app.use(express.json());

// allow routes to register themselves into aurides router
app.use(auride.router);

const db = admin.database();

// broadcast websocket on new notes
const notesRef = db.ref("notes");
notesRef.on("child_added", (snapshot) => {
    // get id
    const newNoteId = snapshot.key;

    // then, broadcast
    const payload = JSON.stringify({
        type: "new_note",
        noteId: newNoteId
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN)
            client.send(payload);
    });
});

// CORS blocks requests from other urls, however, we can lock this down more
// by preventing direct requests!
app.use((req, res, next) => {
    const origin = req.headers.origin || "Unknown origin";
    const referrer = req.headers.referer || "Unknown referrer.";
    const ip = req.headers["x-forwarded-for"] || req.ip;

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`   Origin: ${origin}`);
    console.log(`   Referrer: ${referrer}`);
    console.log(`   IP: ${ip}`);

    // if trying to access a restricted api, prevent.
    // we can allow our host site to access the auride api, but not anyone else
    // TODO: we need a better way to do this.
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
        require(path.join(aurideRoutes, file));
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

// create http server
const server = http.createServer(app);

// then, run the app
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Auride's server & WebSockets are running successfully at port ${PORT}`);
});

// attach websocket
const wss = new WebSocket.Server({ noServer: true });

// check ws connection for host url
server.on("upgrade", (req, socket, head) => {
    const origin = req.headers.origin || "Unknown origin.";
    const ip = req.socket.remoteAddress || "Unknown IP.";

    // if not host url, deny connection
    if (origin !== process.env.HOST_URL) {
        console.log(`> Denied WS connection from ${origin} with IP ${ip}`);
        socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
        socket.destroy();
        return;
    }

    // else, accept connection
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
    });
});

// track connected clients
wss.on("connection", (socket) => {
    console.log("> Client connected to WS.");

    socket.on("close", () => {
        console.log("> Client disconnected.");
    });
});

// allow executing commands
const colors = {
    normal: (text) => styleText("white", text),
    success: (text) => styleText("green", text),
    warning: (text) => styleText("yellow", text),
    error: (text) => styleText("red", text)
};

setTimeout(() => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Auride> "
    });

    const commands = {
        help: async() => {
            console.log("Available commands:");
            console.log("~ help - view available commands");
            console.log("~ status - view Auride server status and uptime");
            console.log("~ exit - stop the server");
        },
        status: async() => {
            console.log("Auride's backend is running.");
            console.log(colors.success(`Uptime: ${Math.floor(process.uptime())} seconds.`));
        },
        ram_usage: async() => {
            // get total memory
            const memory = process.memoryUsage();

            // get system memory
            const systemTotal = os.totalmem();
            const systemUsed = systemTotal - os.freemem();

            const processUsed = memory.rss;

            // log
            console.log(`System RAM: ${(systemUsed / 1024 / 1024 / 1024).toFixed(2)}GB / ${(systemTotal / 1024 / 1024 / 1024).toFixed(2)}GB (across all applications)`);
            console.log(`Auride: ${(processUsed / 1024 / 1024).toFixed(2)}MB (specifically Auride usage)`);
        },
        exit: async() => {
            console.log(colors.warning("Stopping..."));
            rl.close();
            process.exit(0);
        }
    }

    rl.prompt();

    rl.on("line", async (line) => {
        const input = line.trim();

        if (!input) {
            rl.prompt();
            return;
        }

        const parts = input.split(/\s+/);
        const command = parts.shift().toLowerCase();
        const args = parts;

        if (!commands[command]) {
            console.log(colors.error(`Unknown command: ${command}`));
            rl.prompt();
            return;
        }

        try {
            await commands[command](args);
        } catch (error) {
            console.error("Command failed:", error);
        }

        rl.prompt();
    });
}, 500);