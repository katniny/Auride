import express from "express";
import path from "path";

const app = express();
const DIST = path.join(process.cwd(), "../src/dist");

// serve static files
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.path}`);
    next();
});
app.use(express.static(DIST, {
    extensions: ['html'],
}));

// dynamic MPA routes
const dynamicRoutes = [
    { route: "/u/:username", file: "u.html" },
    { route: "/note/:id", file: "note.html" },
    { route: "/userstudio/:id", file: "userstudio.html" }
];

dynamicRoutes.forEach(r => {
    app.get(r.route, (req, res) => {
        console.log(`Hit ${r.route} ->`, req.params);
        res.sendFile(path.join(DIST, r.file));
    });
});

// root
app.get("/", (req, res) => {
    res.sendFile(path.join(DIST, "index.html"));
});

// try to serve *.html automatically without extension
app.use((req, res, next) => {
    console.log(`Trying extensionless HTML: ${req.path}`);
    const filePath = path.join(DIST, req.path + ".html");
    res.sendFile(filePath, err => {
        if (err) {
            next();
        }
    });
});

// fallback to 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(DIST, "404.html"));
});

const PORT = process.env.PORT || 4021;
app.listen(PORT, () => console.log(`Auride running on http://localhost:${PORT}`));