Last updated: May 21, 2025
# 👋 Welcome to the TransSocial contributing guide!
Thank you for your interest in contributing to TransSocial! We try to make TransSocial as easy as possible to contribute to.

## 📃 Rules
- Please do not use political ideology
   - We try to accept all PRs but we will always do so regardless of race, gender, sexual orientation, etc., so please do not open a PR adding things such as racist language, language to bring down a group or individual, or anything that would be deemed as rude, targeted, or other such things as it'll be seen as a troll and closed, as we avoid using such language.
- Please be professional
   - You don't have to be corporate level of professional, but please do not use overly NSFW wording, the occasional "shit" or "piss", low level swearing (e.g. "this shit is pissing me off"), is fine, but please do not be like, "FUCK, this REALLY FUCKING PISSED me OFF. WHO THE FUCK WROTE THIS?".
- Please be respectful
   - No one is paid to work on TransSocial and contributors use their own *free time* to review your issues and pull requests, they are not paid an hourly wage to do so.
- Please don't argue about requested changes
   - If someone requests a change, please change it. If you feel strongly that your original way is better, calmly explain way but do not argue about it.
      - Please note that grammar corrections are not arguable or something to be discussed. Discussing about phrasing is okay, but if we ask you to change something small (e.g "were" to "we're"), please do.
      - e.g. "please make this comment easier to read" should not be argued nor discussed about. An implementation can be discussed.
- When contributing, please update `/assets/js/versioning.js` and `updates.html`
   - Please note that this is required.
   - Format for versioning.js:
   ```js
      let transsocialVersion = "vYEAR.MONTH.DAY"; // e.g. v2025.1.1
      let transsocialUpdate = "vYEARMONTHDAY-UPDATEFORTHEDAY"; // e.g. v202551-5
      let hasUpdateNotes = true; // this should be set to true if you have update notes in updates.html, otherwise false
   ```
   - Format for update.html:
   ```html
      <div class="update">
         <h2>v2025.5.6_pre-alpha</h2>
         <h3 style="color: var(--text-semi-transparent);">Released: MONTH DAY, YEAR</h3> <!-- e.g. May 1, 2025 -->
            <li>Change 1 that should be understandable to the user</li>
            <li>(Dev Env) Change 2 that should be understandable to the user, but ONLY applies to the codebase rather than the end-user</li>
      </div>

      <br />
   ```
- Follow our code indentation
   - While we don't have a specific one like Prettier and our current code base is pretty mixed on spacing on whatnot (for now), we generally use an indentation that is equivalent to 4 spaces.
   An example of this is:

   ```js 
   function test() {
       console.log("This is a test");
   }
   ```

   As previously mentioned, this is pretty mixed in the current codebase so please try to stick with the general indentation of that file. However, this will be required when we get around to intending all the pages correctly, as we will strictly be merging and coding with 4 spaces-equivalent indentation.

- No AI code or speech.
   - While AI is okay to use as an assistant to help guide you if you are truly stuck on a problem, please do not use it to create your speech or entire code blocks.

## 👩‍💻 Recommendations
These are just recommendations, but they will help aid you while contributing to TransSocial.
- HTML/CSS/JavaScript experience (Node experience is also recommended)
   - Moderate experience in JavaScript at minimum, as we rely heavily on JavaScript, but this also depends on *what* you're contributing.
- Experience with Firebase tools (any version before 9, but version 9+ should be okay as well but please note we use 8.6.8, so it is slightly different from versions 9 and up)
   - This is less necessary, as Firebase has documentation at https://firebase.google.com/docs/. We use authentication, realtime database, storage, and functions, just as a reference point.

## ✨ Required
We only have **two** requirements for contributing to TransSocial (dependencies), as we build most things ourselves.
- NodeJS
- A way to localhost or 127.0.0.1 to test, rather than opening the file directory in your browser

## 🛠 Getting Started
1. Visit the [TransSocial GitHub repo](https://github.com/katniny/transsocial)
2. Click the "Fork" button in the top right, so you can work on TransSocial and make seperate commits
3. Clone your fork into an empty folder:
```bash
   git clone https://github.com/YOUR_USERNAME/transsocial
   cd transsocial
```
4. Add the upstream remote:
```bash
   git remote add upstream https://github.com/katniny/transsocial
```
5. Go to /assets/js/firebase.js and replace the default firebaseConfig with your own. If you do not have one, please get one from the [Firebase Console](https://console.firebase.google.com/). **Make sure you do not commit these keys!**
6. If your Firebase project does not have the Blaze plan, please upgrade it to the Blaze plan. The reason is stated below.
7. You're ready!

## ❓ Why do I need the Firebase Blaze plan?
We use Firebase Storage. To access the Storage at all, it is required that you have the Blaze plan.

Unfortunately, this is not a decision on our part, but a decision on Firebase.

## 📝 Please note
TransSocial is being worked on to make the codebase nice to work with. Right now, there are several repeated elements (and as a consequence, a change to one will require you to do it on ALL pages it appears on) and indentation that does not match our requirements.

We're working on making TransSocial's codebase nice to work with, but temporarily, please keep this mind.

## 📔 License
By contributing to TransSocial, you agree that your contributions will be licensed under [TransSocial's license](https://github.com/katniny/transsocial/blob/main/LICENSE). Once merged, your contributions may be kept, modified, or removed by the project maintainers -- even if you later choose to leave or revoke your involvement.