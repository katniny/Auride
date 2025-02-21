// Randomize quote
const quotes = [
   "Cats have five toes on their front paws but only four on their back paws.",
   "A cat's purring can reduce stress in humans.",
   "Cats can rotate their ears 180 degrees and hear ultrasonic sounds.",
   "Cats have a special collarbone that allows them to always land on their feet.",
   "Cats can make over 100 different sounds, while dogs can only make about 10.",
   "A cat's nose print is unique, like a human fingerprint.",
   "The average cat runs at 30 miles an hour! They're faster than most humans!",
   "Cats can make a special thrill sound that's often used to communicate with their kittens.",
   "Cats sweat through their paws. You might see little damp spots if they're nervous.",
   "A cat's sense of smell is 14 times stronger than a human's.",
   "The longest recorded cat jump is over 7 feet!",
   "Cats have more bones in their bodies than humans - 230 compared to our 206.",
   "The average cat sleeps for 12-16 hours a day.",
   "Cats have a special grooming tool called a 'barbed tongue' that helps them clean their fur and remove loose hair.",
   "The meow is a form of communication that cats only use with humans. They don't meow at each other!",
   "Cats can see in near-total darkness, thanks to their exceptional night vision.",
   "Cats have 32 muscles in each ear, allowing them to move their ears independently.",
   "Cats have five different types of vocalizations to communicate with their owners, including purrs, meows and thrills.",
   "A cat's whiskers are about as wide as their body, which helps them guage whether they can fit through spaces.",
   "When a cat purrs, it can produce a sound between 25 and 150 hertz, which is a frequency known to promote healing.",
   "Cats have a special reflective layer behind their retinas called the tapetum lucidum that enhances their night vision.",
   "A group of kittens is called a 'kindle'.",
   "Kittens are born with their eyes closed, and they first open them around 7 to 10 days old.",
   "Cats have a special 'love blink' where they slowly close their eyes to show affection. If a cat slow blinks at you, it means they trust you!",
   "Cats have a unique way of showing they're happy by kneading with their paws, a behavior they learn as kittens when nursing from their mother.",
   "Many cats will curl up in a ball or stretch out their paws when they're feeling cozy and safe.",
   "A cat's purring is a sign of contentment, but it can also be a self-soothing mechanism when they're stressed or in pain.",
   "Cats often bring their owners 'gifts' like toys or even caught prey, which is their way of showing love and sharing their bounty.",
   "Cats have a special 'kitty loaf' position where they tuck their paws underneath themselves. It's a sign of contentment and security.",
   "When cats follow you around the house, it's their way of showing affection and wanting to be close to you.",
   "Many cats enjoy playing with boxes and paper bags, finding them irresistible for their fun and cozy hideouts.",
   "TransSocial has 31 cats facts just for the loading quote.",
   "A cat was mayor of a town in Alaska for 20 years.",
   "The richest cat in the world had £7,000,000!",
   "In 1963, a cat went to space.",
   "The oldest cat in the world was 38 years old!",
   "A group of cats is called a clowder.",
   "Only 20% of orange cats are female.",
   "Cats have fewer taste buds than dogs or people.",
   "Cats don't get cavities.",
   "Many cats get the zoomies after using the litter box.",
   "Cats whiskers are as sensitive as human fingertips.",
   "Cats are nearsighted, but see great in the dark.",
   "Cats that scratch furniture are often marking their territory.",
   "30%-50% of cats lack the gene that makes them react to catnip.",
   "Cats can self-heal themselves by purring.",
   "There's a reason dogs look up to you, while cats see you as an equal.",
   "Cats don't see in black and white, though they are somewhat colorblind.",
   "Cats need to scratch on things.",
   "A 1-year-old kitten is developmentally equivalent to a 15-year-old human.",
   "(Most) cats are lactose intolerant.",
   "Cats' whiskers help with directional orientation and spatial awareness.",
   "The tabby cat isn't a breed, it's a pattern.",
   "Black cats as Halloween symbols is rooted in ancient tradition.",
   "Cats have a third eyelid.",
   "Cats are imitating snakes when they hiss.",
   "How long cats lives largely depends on their environment.",
   "Cats almost always land on their feet due to their impressive 'righting' reflex.",
   "Cats pee smells so bad because cats originated in the desert.",
   "Cats are more likely to kneed if they were seperated from their mothers as young kittens.",
   "Cats can hear better than humans and some dog breeds.",
   "Cats knock objects over and off edges to test for hidden prey.",
   "Cats like to eat grass because their wild ancestors did.",
   "Cats can't taste sweetness.",
   "Cats like to chase lasers because movement excites the prey drive.",
   "Cats dream."
];

const quote = document.getElementById("loaderQuote");
const key = Math.floor(Math.random() * quotes.length);

quote.textContent = quotes[key];


const date = new Date();
const currentMonth = date.getMonth() + 1;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        const loader = document.querySelector('.loader');
        const emailVer = firebase.database().ref(`users/${uid}/email`);

        firebase.database().ref(`users/${uid}`).once("value", (snapshot) => {
            const getTheme = snapshot.val();

            // Set zoom level
            if (getTheme && getTheme.fontSizePref) {
                if (getTheme.fontSizePref === "normal") {
                    document.documentElement.style.setProperty('--zoom-level', '1');
                } else if (getTheme.fontSizePref === "large") {
                    document.documentElement.style.setProperty('--zoom-level', '1.07');
                }
            }

            // Set fomt
            if (getTheme && getTheme.useODFont) {
                if (getTheme.useODFont === true) {
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

                        .transsocialAccounts {
                            font-size: 0.85rem;
                        }

                        .policies {
                            margin-top: 425px;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            if (getTheme && getTheme.theme === "Dark" || getTheme && getTheme.theme === undefined) {
                // Dark theme by default
            } else if (getTheme && getTheme.theme === "Light") {
                document.documentElement.style.setProperty('--background', '#f5f5f5');
                document.documentElement.style.setProperty('--main-color', '#dd6075');
                document.documentElement.style.setProperty('--main-color-darker', '#b44d5d');
                document.documentElement.style.setProperty('--header-color', '#e0e0e0');
                document.documentElement.style.setProperty('--text', '#000');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(0, 0, 0, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(0, 0, 0, 0.7');
                document.documentElement.style.setProperty('--profile-picture-bg', '#fafafa');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#e5e5e5');
                document.documentElement.style.setProperty('--button-transparent-hover', '#f5f5f5');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#fff');
                document.documentElement.style.setProperty('--note-seperator', '#e0e0e0');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgb(255, 255, 255');
                document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
                document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
                document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
                document.documentElement.style.setProperty('--reply-background', '#fafafa');
                document.documentElement.style.setProperty('--reply-hovered-background', '#e5e5e5');
                document.documentElement.style.setProperty('--note-background', '#fff');
                document.documentElement.style.setProperty('--button-text', '#000');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                }
            } else if (getTheme && getTheme.theme === "Mint (Light)") {
                document.documentElement.style.setProperty('--background', '#f0f8ff');
                document.documentElement.style.setProperty('--main-color', '#9be7c4');
                document.documentElement.style.setProperty('--main-color-darker', '#62c198');
                document.documentElement.style.setProperty('--header-color', '#e5f1f8');
                document.documentElement.style.setProperty('--text', '#222');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(34, 34, 34, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(34, 34, 34, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#e7f2fa');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#d1e4ef');
                document.documentElement.style.setProperty('--button-transparent-hover', '#e5f1f8');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#ffffff');
                document.documentElement.style.setProperty('--note-seperator', '#e5f1f8');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgb(255, 255, 255)');
                document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
                document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
                document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
                document.documentElement.style.setProperty('--reply-background', '#e7f2fa');
                document.documentElement.style.setProperty('--reply-hovered-background', '#d1e4ef');
                document.documentElement.style.setProperty('--note-background', '#fff');
                document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
                document.documentElement.style.setProperty('--button-text', '#000');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MintLightThemeLogo.png";
                }
            } else if (getTheme && getTheme.theme === "Mint (Dark)") {
                document.documentElement.style.setProperty('--background', '#18282d');
                document.documentElement.style.setProperty('--main-color', '#add8d0');
                document.documentElement.style.setProperty('--main-color-darker', '#8cc0b2');
                document.documentElement.style.setProperty('--header-color', '#203338');
                document.documentElement.style.setProperty('--text', '#e0e0e0');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(224, 224, 224, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(224, 224, 224, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#28383e');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#25353a');
                document.documentElement.style.setProperty('--button-transparent-hover', '#203338');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#f0f0f0');
                document.documentElement.style.setProperty('--banner-button-bg', '#000');
                document.documentElement.style.setProperty('--note-seperator', '#203338');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgb(29, 29, 29)');
                document.documentElement.style.setProperty('--skeleton-start', '#404040');
                document.documentElement.style.setProperty('--skeleton-middle', '#303030');
                document.documentElement.style.setProperty('--skeleton-end', '#252525');
                document.documentElement.style.setProperty('--reply-background', '#28383e');
                document.documentElement.style.setProperty('--reply-hovered-background', '#25353a');
                document.documentElement.style.setProperty('--note-background', 'rgb(40, 40, 40)');
                document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MintDarkThemeLogo.png";
                }
            } else if (getTheme && getTheme.theme === "High Contrast") {
                document.documentElement.style.setProperty('--background', 'black');
                document.documentElement.style.setProperty('--main-color', 'yellow');
                document.documentElement.style.setProperty('--main-color-darker', '#cccc00');
                document.documentElement.style.setProperty('--header-color', '#333333');
                document.documentElement.style.setProperty('--text', 'white');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(255, 255, 255, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(255, 255, 255, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#555555');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#444444');
                document.documentElement.style.setProperty('--button-transparent-hover', '#444444');
                document.documentElement.style.setProperty('--success-color', 'limegreen');
                document.documentElement.style.setProperty('--warning-text', 'yellow');
                document.documentElement.style.setProperty('--error-text', 'red');
                document.documentElement.style.setProperty('--sidebar-text', 'white');
                document.documentElement.style.setProperty('--banner-button-bg', 'white');
                document.documentElement.style.setProperty('--note-seperator', '#444444');
                document.documentElement.style.setProperty('--sidebar-button-border', 'white');
                document.documentElement.style.setProperty('--modal-background', '#222222');
                document.documentElement.style.setProperty('--like-color', 'limegreen');
                document.documentElement.style.setProperty('--renote-color', 'yellow');
                document.documentElement.style.setProperty('--content-warning', 'rgb(0, 0, 0)');
                document.documentElement.style.setProperty('--skeleton-start', '#333333');
                document.documentElement.style.setProperty('--skeleton-middle', '#444444');
                document.documentElement.style.setProperty('--skeleton-end', '#555555');
                document.documentElement.style.setProperty('--reply-background', '#404040');
                document.documentElement.style.setProperty('--reply-hovered-background', '#505050');
                document.documentElement.style.setProperty('--note-background', '#333333');
                document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/HighContrastThemeLogo.png";
                }
            } else if (getTheme && getTheme.theme === "TransSocial Classic") {
                document.documentElement.style.setProperty('--background', '#ffb2a8');
                document.documentElement.style.setProperty('--main-color', '#ffb2a8');
                document.documentElement.style.setProperty('--main-color-darker', '#f0cfb6');
                document.documentElement.style.setProperty('--header-color', '#ffd9cb');
                document.documentElement.style.setProperty('--text', '#333');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(51, 51, 51, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(51, 51, 51, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#f0cfb6');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#ffe0d2');
                document.documentElement.style.setProperty('--button-transparent-hover', '#ffd9cb');
                document.documentElement.style.setProperty('--success-color', '#b3e8b3');
                document.documentElement.style.setProperty('--warning-text', '#e8b3b3');
                document.documentElement.style.setProperty('--error-text', '#e86d6d');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#333');
                document.documentElement.style.setProperty('--note-seperator', '#ffd9cb');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#ffb2a8');
                document.documentElement.style.setProperty('--like-color', '#e86d6d');
                document.documentElement.style.setProperty('--renote-color', '#b3e8b3');
                document.documentElement.style.setProperty('--content-warning', 'rgb(255, 178, 168)');
                document.documentElement.style.setProperty('--skeleton-start', '#ffe0d2');
                document.documentElement.style.setProperty('--skeleton-middle', '#ffd9cb');
                document.documentElement.style.setProperty('--skeleton-end', '#ffb2a8');
                document.documentElement.style.setProperty('--reply-background', '#ffe0d2');
                document.documentElement.style.setProperty('--reply-hovered-background', '#fff0e8');
                document.documentElement.style.setProperty('--note-background', '#ffd9cb');
                document.documentElement.style.setProperty('--button-text', '#000');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/TransSocialClassicThemeLogo.png";
                }
            } else if (getTheme && getTheme.theme === "Midnight Purple") {
                document.documentElement.style.setProperty('--background', '#221e2b');
                document.documentElement.style.setProperty('--main-color', '#957DAD');
                document.documentElement.style.setProperty('--main-color-darker', '#786491');
                document.documentElement.style.setProperty('--header-color', '#2c2738');
                document.documentElement.style.setProperty('--text', '#e2e2e2');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(226, 226, 226, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(226, 226, 226, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#3d384a');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#383246');
                document.documentElement.style.setProperty('--button-transparent-hover', '#2c2738');
                document.documentElement.style.setProperty('--success-color', '#5eb95e');
                document.documentElement.style.setProperty('--warning-text', '#f7e28c');
                document.documentElement.style.setProperty('--error-text', '#f0766a');
                document.documentElement.style.setProperty('--sidebar-text', '#ddd');
                document.documentElement.style.setProperty('--banner-button-bg', '#443f54');
                document.documentElement.style.setProperty('--note-seperator', '#383246');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#2a2535');
                document.documentElement.style.setProperty('--like-color', '#d362a4');
                document.documentElement.style.setProperty('--renote-color', '#41d4a5');
                document.documentElement.style.setProperty('--content-warning', 'rgb(34, 30, 43)');
                document.documentElement.style.setProperty('--skeleton-start', '#3d384a');
                document.documentElement.style.setProperty('--skeleton-middle', '#332e3e');
                document.documentElement.style.setProperty('--skeleton-end', '#282333');
                document.documentElement.style.setProperty('--reply-background', '#332e3e');
                document.documentElement.style.setProperty('--reply-hovered-background', '#3d384a');
                document.documentElement.style.setProperty('--note-background', '#2c2738');
                document.documentElement.style.setProperty("--hovered-button-text", "#fff");
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MidnightPurpleThemeLogo.png";
                }
            } else if (getTheme && getTheme.theme === "Darker") {
                document.documentElement.style.setProperty('--background', '#171717');
                document.documentElement.style.setProperty('--main-color', '#ff869a');
                document.documentElement.style.setProperty('--main-color-darker', '#e1788a');
                document.documentElement.style.setProperty('--header-color', '#202020');
                document.documentElement.style.setProperty('--text', '#f0f0f0');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(240, 240, 240, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(240, 240, 240, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#2d2d2d');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#303030');
                document.documentElement.style.setProperty('--button-transparent-hover', '#202020');
                document.documentElement.style.setProperty('--success-color', '#59f275');
                document.documentElement.style.setProperty('--warning-text', '#f2db59');
                document.documentElement.style.setProperty('--error-text', '#f27a7a');
                document.documentElement.style.setProperty('--sidebar-text', '#ddd');
                document.documentElement.style.setProperty('--banner-button-bg', '#333');
                document.documentElement.style.setProperty('--note-seperator', '#2d2d2d');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#1a1a1a');
                document.documentElement.style.setProperty('--like-color', '#ff6378');
                document.documentElement.style.setProperty('--renote-color', '#2ddbff');
                document.documentElement.style.setProperty('--content-warning', 'rgb(23, 23, 23)');
                document.documentElement.style.setProperty('--skeleton-start', '#333333');
                document.documentElement.style.setProperty('--skeleton-middle', '#282828');
                document.documentElement.style.setProperty('--skeleton-end', '#202020');
                document.documentElement.style.setProperty('--reply-background', '#282828');
                document.documentElement.style.setProperty('--reply-hovered-background', '#333333');
                document.documentElement.style.setProperty('--note-background', '#202020');
            } else if (getTheme && getTheme.theme === "Custom") {
                document.documentElement.style.setProperty('--background', getTheme.themeColors.background);
                document.documentElement.style.setProperty('--main-color', getTheme.themeColors.mainColor);
                document.documentElement.style.setProperty('--main-color-darker', getTheme.themeColors.mainColorDarker);
                document.documentElement.style.setProperty('--header-color', getTheme.themeColors.headerColor);
                document.documentElement.style.setProperty('--text', getTheme.themeColors.text);
                document.documentElement.style.setProperty('--text-half-transparent', getTheme.themeColors.textHalfTransparent);
                document.documentElement.style.setProperty('--text-semi-transparent', getTheme.themeColors.textSemiTransparent); // why were these wrong??
                document.documentElement.style.setProperty('--sidebar-button-hover', getTheme.themeColors.sidebarButtonHover);
                document.documentElement.style.setProperty('--button-transparent-hover', getTheme.themeColors.buttonTransparentHover);
                document.documentElement.style.setProperty('--success-color', getTheme.themeColors.success);
                document.documentElement.style.setProperty('--warning-text', getTheme.themeColors.warning);
                document.documentElement.style.setProperty('--error-text', getTheme.themeColors.error);
                document.documentElement.style.setProperty('--sidebar-text', getTheme.themeColors.sidebarText);
                document.documentElement.style.setProperty('--note-seperator', getTheme.themeColors.noteSeperator);
                document.documentElement.style.setProperty('--like-color', getTheme.themeColors.liked);
                document.documentElement.style.setProperty('--renote-color', getTheme.themeColors.renoted);
                document.documentElement.style.setProperty('--reply-background', getTheme.themeColors.replyBackground);
                document.documentElement.style.setProperty('--reply-hovered-background', getTheme.themeColors.replyHoveredBackground);
                document.documentElement.style.setProperty('--note-background', getTheme.themeColors.noteBackground);
                if (getTheme.themeColors.buttonText) {
                    document.documentElement.style.setProperty('--button-text', getTheme.themeColors.buttonText);
                } else {
                    document.documentElement.style.setProperty('--button-text', getTheme.themeColors.text);
                }
                document.documentElement.style.setProperty('--hovered-button-text', getTheme.themeColors.hoveredButtonText);
                document.documentElement.style.setProperty('--sidebar-create-note-button', getTheme.themeColors.createNoteButton);
                document.documentElement.style.setProperty('--sidebar-create-note-button-hover', getTheme.themeColors.createNoteButtonHover);
            }
        }).then(() => {
            loader.classList.add("loader-hidden");

            loader.addEventListener("transitioned", () => {
                document.body.removeChild("loader");
            })
        });
    } else {
      const loader = document.querySelector('.loader');

      loader.classList.add("loader-hidden");

      loader.addEventListener("transitioned", () => {
         document.body.removeChild("loader");
      })
    }
})


// Show warning
var timeLeft = 30;
const elem = document.getElementById('Timer');

const timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == 0) {
        clearTimeout(timerId);
        var loadingWarning = document.getElementById("transSocialLoadLong");
        loadingWarning.style.display = "block";
    } else {
        timeLeft--;
    }
} 

// if december, force christmas mode (merry christmas mfs)
// or happy holidays, whatever you celebrate :p
// if you celebrate, idk why im being technical as always in code comments no one will ever see lmaoo
if (currentMonth === 12) {
   const hat = document.createElement("img");
   hat.src = "/assets/imgs/xmas_hat.png";
   hat.draggable = false;
   hat.className = "xmasHat";
   hat.onclick = () => {
      if (isSidebarOpen === false) {
         isSidebarOpen = true;
      } else {
         isSidebarOpen = false;
      }
   }

   document.body.appendChild(hat);
}