const pageLoaderHTML = `
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
               Auride requires JavaScript to run
            </div>
         </noscript>
      </p>

      <div class="aurideLoadLong" id="aurideLoadLong">
         <p>Auride not loading?</p>
         <a href="https://twitter.com/transs_ocial" target="_blank" style="position: absolute; top: 100px; left: 30px; color: var(--main-color); text-decoration: none;"><i class="fa-brands fa-twitter" style="color: var(--main-color); margin-right: 3px;"></i> Let us know</a>
      </div>
   </div>
`;
document.body.innerHTML += pageLoaderHTML;
document.body.classList.add("loaderReady");

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
   "Auride has 31 cats facts just for the loading quote.",
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

            console.log(getTheme.theme);
            if (getTheme && getTheme.theme === "Dark" || getTheme && getTheme.theme === undefined) {
                setGlobalTheme("Dark", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Light") {
                setGlobalTheme("Light", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Mint (Light)") {
                setGlobalTheme("Mint (Light)", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Mint (Dark)") {
                setGlobalTheme("Mint (Dark)", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "High Contrast") {
                setGlobalTheme("High Contrast", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "TransSocial Classic") {
                setGlobalTheme("TransSocial Classic", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Midnight Purple") {
                setGlobalTheme("Midnight Purple", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Darker") {
                setGlobalTheme("Darker", getTheme.showPrideFlag);
            } else if (getTheme && getTheme.theme === "Custom") {
                setGlobalCustomTheme(getTheme.themeColors);
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
        var loadingWarning = document.getElementById("aurideLoadLong");
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