import { currentAurideVersion } from "../ui/versioning.js";

export default function versioningPage() {
    document.title = "Roadmap | Auride";
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Auride's Roadmap</h1>
        <p>
            Auride is currently under heavy development still -- features may be missing, incomplete, or buggy.
            Please expect issues. If you find any, you can use <a href="/issues">our built-in issue tracker</a> to report them!
        </p>

        <br />

        <p>
            Auride's development is expected to leave our beta and pre-release stages around late 2026 to early 2027. However, this isn't 
            final--it may take more or less time than expected.
        </p>

        <br />

        <h2>Version Tracking:</h2>
        <li class="success">Indev (DONE!)</li>
            <li class="indented">Auride's most primitive state. Auride WILL be buggy and missing lots of features.</li>
        <li class="success">Pre-Alpha (DONE!)</li>
            <li class="indented">Auride will be more feature-complete, but still buggy and missing features.</li>
        <li class="success">Alpha (DONE!)</li>
            <li class="indented">Auride will be less buggy and feature-complete, but may contain bugs and missing features.</li>
        <li class="warning">Beta (CURRENT)</li>
            <li class="indented">Auride is preparing to release--however, may contain bugs and incomplete/missing features.</li>
        <li class="caution">Pre-Release (Target: Mid-2026)</li>
            <li class="indented">Auride is nearly ready for release, but is undergoing final polish and bug fixing.</li>
        <li class="caution">Release (Target: Late-2026 to early 2027)</li>
            <li class="indented">
                Auride is feature complete and not too buggy. Features will continue to be added and bugs will still be fixed--this is
                considered the most polished and ready-to-use version of Auride.
            </li>

        <br />

        <p>Thank you,</p>
        <a href="/u/katniny">Katty (@katniny)</a>
    `;
    return el;
}