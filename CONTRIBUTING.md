# Contributing to Auride
### Last Updated: September 4, 2026
---
Thank you for considering contributing to Auride! Here, we'll discuss our general "rules of thumb".

> [!INFO]
> First time contributing to Auride?** - a maintainer will need to run workflows for you.

> [!CAUTION]
> You're on the main Auride branch. Please note that at this time, the main branch is in "maintainance only" mode - we only fix critical bugs or vulernabilities. Please contribute to our [rewrite branch](https://github.com/katniny/Auride/tree/rewrite) instead!
>
> Once the rewrite is merged into the main branch, we will remove this warning!

## General Rules
Auride's mission is to provide a safe place for everyone, this includes our projects off-platform.

**Do not harass anyone** - everyone is unique! Whether that's race, sexuality, personality, or anything else - we encourage participation from everyone! Do not harass, bully, or discriminate based on any factors.

**Be respectful** - we're respectful of others, their positions, their coding skills, their commitments and their efforts and most importantly - we're respectful of the volunteer efforts. Everyone contributes because they want to, not because they have to. If you remember these guidelines, this should be easy for you.

**Be open to collaboration** - Auride is an open source project. At any time, anyone may critique, modify, or remove parts/all of your code. This is just the nature of a large project of Auride, there is never a part that "stays the same". If we ask you to do something like add a test or fix a spelling mistake, please don't get defensive - we do this to better Auride for everyone and make it easier for everyone to contribute to.

**Do not break the law** - we understand that you may have concerns about certain laws (e.g., Online Safety Act in the UK or age restrictions in Australia). We do too. Unfortunately, Auride is a commercial product handling user data, so we have to abide by these laws. PRs/issues opened about removing any restrictions, blocking users in certain countries or otherwise breaking the law (e.g., piracy) will be closed without warning. Depending on the severity, you may even be banned from the GitHub.

**Remember our community guidelines** - our community guidelines apply outside of Auride! Please review them at https://auride.xyz/policies/guidelines

## AI policies
Generative AI, including Large Languages Models (LLMs) such as Claude, ChatGPT, etc., should not be used when contributing to Auride.

We understand that you may think AI is a useful tool - however, our code is art and we want to interact with real human beings with a genuine passion for programming, not an AI.

## Getting the Code
> [!NOTE]
> We support development on anything that can run NodeJS and a modern browser, but we only have instructions for Windows, macOS, and Linux (in order of support).
>
> On macOS, we assume you have `brew`: https://brew.sh

You'll need `git`, `nodejs` with npm, and Docker:
- Windows: `winget install -e --id Git.Git OpenJS.NodeJS Docker.DockerDesktop`
- macOS: `brew install git node docker`
- Linux (Debian/Ubuntu): `apt install git nodejs` then follow the instructions here: https://docs.docker.com/engine/install/ubuntu/
   - Please refer to your distro's guides to get the correct command. There's too many distros to make a comprehensive list!

Once you have git installed, pull our repo: `git clone https://github.com/katniny/Auride` then `cd Auride`.

> [!INFO]
> If your terminal/IDE supports it, we recommend opening multiple tabs! It makes your life easier!

In the folders `src` and `server`, run `npm i` to install all the dependencies.

### src:
In `src`, go to /public/assets/js/firebase.js and paste your Firebase credentials from https://console.firebase.google.com. If you don't have Firebase credentials yet, create a project and enable Authentication and Realtime Database.

> [!CAUTION]
> Make sure to not commit those keys!

### server:
In `server`, copy `.env.example` and rename it to `.env`.
The HOST_URL can stay the same, but paste your Firebase Realtime Database key in `FIREBASE_DATABASE_URL`. If you want to use a token to test Issues, create a GitHub Token and make sure it can create issues in a repo (please do not flood our issues with test issues though, please!).

### Finalizing
Then once everything is okay, run `npm run dev` in `src` to host the frontend, then `npm start` in server to host the backend, finally run `docker compose up` in `storage` to run storage!

Now you should have your very own Auride running!