import { aurideReleaseVersion, aurideVersion } from "../versioning";

// all the quotes
const quotes = [
    "if we had a dollar for every time someone refreshed, we'd probably still be broke",
    "sometimes i talk to myself, then we both laugh",
    "the cake is a lie",
    "if you see a penguin around here, don't ask questions. just say hi",
    "some days you're a unicorn, other days just a potato. today might be a potato day.",
    "one does not simply walk into a webpage without dancing",
    "if you can read this, you just unlocked the secret handshake",
    "sometimes i pretend my keyboard is a piano. very badly.",
    "in an alternate universe, you're a cat. just saying",
    "if you start hearing jazz music, that's just the internet serenading you",
    "the invisible unicorn is watching you. no pressure",
    "what if piegons are just government spies with feathers?",
    "pro tip: blinking counts as multitasking",
    "sometimes i whisper sweet nothings to my plants. they don't judge.",
    "i put the 'pro' in procrastination",
    "i'm not saying you're impatient... but even the pizza's getting nervous",
    "your internet history is safe with me... for now",
    "i tried to be an adult today. hard pass.",
    "flirting with the idea of productivity. so far, just flirting",
    "remember: naps are just horizontal life pauses",
    "it's okay to talk to yourself, sometimes you need better company",
    "the cookies here are mostly digital, but just as sweet",
    "the real secret is there is no secret. or is there?",
    "lowkey hoping your crush sees this too",
    "i'm just pretending to be busy. don't blow my cover.",
    "if you overhear me talking to myself, just know i'm practicing for a podcast",
    "my spirit animal is a potato... mostly because i like naps",
    "if you think these loading quotes are funny, you might need coffee... or help",
    "there's a squirrel somewhere plotting world domination... stay alert",
    "smile!",
    "my life motto: keep calm and pretend its on purpose",
    "if you're reading this, you owe yourself a cookie (or two)",
    "they say the best secrets are hidden in plain sight.",
    "what you seek is often seeking you, or so they say.",
    "if you think you're being watched, you're probably right.",
    "the truth is just a shadow waiting to be caught.",
    "the real magic happens between the lines.",
    "not all who wander are lost; some are just curious.",
    "if you listen closely, the silence speaks volumes.",
    "watch closely. the clues are everywhere.",
    "don't follow the path; create your own shadow.",
    "the unknown is just a story waiting to be told.",
    "what's hidden beneath might just surprise you.",
    "sometimes, you gotta ride into the sunset, even if you don't know what's waiting.",
    "remember: loyalty can be a heavy saddle to carry",
    "even legends have their ghosts chasing them",
    "a man's past is like the trails he leaves -- easy to follow, hard to erase.",
    "there's a fine line between a leader and a madman",
    "trust is like a gun -- quick to draw, slower to reload.",
    "in the end, it's not about how you ride, but how you fall.",
    "pro tip: pretending to know what you're doing counts as experience",
    "did you know? 99% of statistics are made up on the spot",
    "currently training for a marathon! on the couch...",
    "some people chase dreams, i chase my bed",
    "what if the hockey pokey really is what it's all about?",
    "i put the 'oh' and 'oops' in dysfunctional",
    "BLAME IT ON SOMEONE ELSE, IT WASNT ME",
    "see me? yeah? im the page loader, so wait."
];

// the page loader HTML
const pageLoaderHtml = `
    <div class="loader" id="loader">
        <p style="position: fixed; left: 0; top: 0; color: var(--text-semi-transparent); transform: translateY(0px);">&copy; Katniny Studios 2025</p>
        <p style="position: fixed; left: 0; top: 17px; color: var(--text-semi-transparent); transform: translateY(0px);">Katniny Online Services</p>
        <p style="position: fixed; left: 0; top: 35px; color: var(--text-semi-transparent); transform: translateY(0px);" class="loaderVersion">Auride ${aurideVersion}_${aurideReleaseVersion}</p>
        <img src="/assets/imgs/favicon.png" alt="Auride logo" draggable="false" />
        <p><strong>Did you know?</strong></p>
        <p id="loaderQuote" style="position: absolute; margin-top: 40px;">
            <!-- If someone tries to use Auride with JavaScript -->
            <noscript>
                <div class="noJavaScript">
                    Auride requires JavaScript! Please update your browser, or enable JavaScript.
                </div>
            </noscript>
        </p>

        <div class="aurideLoadLong" id="aurideLoadLong">
            <p>Auride not loading?</p>
            <a href="https://bsky.app/profile/auride.xyz" target="_blank" style="position: absolute; top: 100px; left: 30px; color: var(--main-color); text-decoration: none;"><i class="fa-brands fa-bluesky" style="color: var(--main-color); margin-right: 3px;"></i> Let us know</a>
        </div>
   </div>
`;

// append page loader
document.body.innerHTML += pageLoaderHtml;
document.body.classList.add("loaderReady");

// random quote and show it
const randomQuote = document.getElementById("loaderQuote");
const key = Math.floor(Math.random() * quotes.length);

randomQuote.textContent = quotes[key];

// get the user theme, zoom pref, font pref, and font size pref
// we can do this client-side, we're reading non-sensitive info,
// and not writing
firebase.auth().onAuthStateChanged((user) => {
    const loader = document.getElementById("loader");

    if (user) {
        // get data
        firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const data = snapshot.val();

            // set theme
            if (data && data.theme !== "Custom")
                setGlobalTheme(data.theme, data.showPrideFlag);
            else if (data && data.theme === "Custom")
                setGlobalCustomTheme(data.themeColors, data.showPrideFlag);
            

            // set zoom pref
            if (data && data.fontSizePref) {
                if (data.fontSizePref === "normal")
                    document.documentElement.style.setProperty("--zoom-level", "1");
                else if (data.fontSizePref === "large")
                    document.documentElement.style.setProperty("--zoom-level", "1.07");
            }

            // set font
            if (data && data.useODFont) {
                if (data.useODFont === true) {
                    const style = document.createElement("style");
                    style.id = "odFontStyle";
                    style.innerHTML = `
                        @font-face {
                            font-family: "OpenDyslexic";
                            src: url("/assets/fonts/OpenDyslexic.otf") format("opentype");
                        }

                        * {
                            font-family: "OpenDyslexic", sans-serif;
                        }

                        .aurideAccounts {
                            font-size: 0.85rem;
                        }

                        .policies {
                            margin-top: 425px;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            // then we're done!
            loader.classList.add("loader-hidden");
            loader.addEventListener("transitioned", () => {
                document.body.removeChild("loader");
            });
        });
    } else {
        // artifical timeout, so the signed out user isnt
        // exposed to elements popping in
        setTimeout(() => {
            loader.classList.add("loader-hidden");
            loader.addEventListener("transitioned", () => {
                document.body.removeChild("loader");
            });
        }, 750);
    }
});

// if running out of time, show warning because auride might
// be experiencing issues!
// (or they just have slow ass internet)
let timeLeft = 5;
const timerElement = document.getElementById("Timer");
const timerId = setInterval(countdown, 1000);
function countdown() {
    if (timeLeft === 0) {
        clearTimeout(timerId);
        document.getElementById("aurideLoadLong").style.display = "block";
    } else {
        timeLeft--;
    }
}

// if december, force christmas mode >:3
const date = new Date();
const currentMonth = date.getMonth() + 1;
if (currentMonth === 12) {
    document.getElementById("aurideHeaderLogo").src = "/assets/imgs/XMasLogo.png"; // om-geez, we have a whole logo now!! thanks wife :3
}