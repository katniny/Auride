# What's Been Done on the Rewrite
## User Facing:
- SPA has been implemented
- / is no longer an individual page but now just goes straight to home with no additional code to run
- /u is no longer a valid path, please use /u/{username} instead
- Improved "New Notes" button UI
- Improved link UI
- Improved Quick Note Send UI (no longer overflows)
- Improved greeting UI on the top of the home page
- Redesigned note view UI
- Made media in the note view bigger, making it easier to see
- Added the option to quote renote from the note view
- Improved divider used within UI

## Dev Env:
- Pages are now .js files rather than .html, making it easier to add page-specific code without more scripts (though, you can still do this).
- Standard .js files have been depreciated for modular .js files (please avoid using classic .js files unless NEEDED!)
- ts_fas_acih.js, requiredScripts.js and scriptLoader.js have been depreciated
- Auride now uses .env files to safely store keys
- You can now use the current users data by importing "currentUserData" from "users/current.js" (relative path)
- Modules from NPM can now be used in Auride
- The entire app view is now the current width, no more janky viewports!
- You can now define what icon set to use with FontAwesome (e.g., "brands" or "solid")
- If a user navigates to a new page, you can add an event listener named "navigatedToNewPage" (useful for doing things such as cleaning up functions on navigation)
- If the server requests the same user, we now return their autoplay preference
- The following URLs are depreciated: /u?id={username}, /note?id={noteId} & /userstudio?theme=${themeId}. Please update any links to be correct, as these are an extremely old way to handle links and will no longer work!
- Unified code to fetch user data (can be called via getUserData(id, type) from "/methods/getUserData.js")
- Unified code to fetch a token for current user (can be called via getToken() from "/methods/getToken.js")
- Unified code to fetch a singular note for current user (can be called via getNoteData(id) from "/methods/getNoteData.js")
- You can now call "timeAgo" with 2 arguments - the Firebase timestamp & "verbose"
    - Verbose is a flag you can call to get a full string (e.g., "Dec 17, 2025 • 4:10 AM" instead of "2d"). Do not call a flag if you want the standard time.
- Unified functions for loving notes and renoting notes

- NOTICE TO CONTRIBUTORS: If you have an old database for Auride, the following methods are now depreciated:
    - noteData.isDeleted - this is handled by the server. While notes are no longer deleted this way, the server can handle this to ensure it doesn't render. However, we do not do this anymore going forward.
    - noteData.isReplying - replies are now handled properly. Notes will no longer render if it has this value, please run `upgrading/updateReplies.js` with Node!

# TODO (based on what's been completed):
- Make a way to fetch server code without causing repetition in code (WIP)
- Add documentation on adding new pages
- Make GitHub Workflow use .env files & document
- Obfuscate code in GitHub Workflow
- Document restrictions on appending to the app view vs body/head
- Document how to get FontAwesome ID
- Document how to use "Methods" (getUserData, getNoteData, etc.)
- Make loveNote() and renoteNote() work on comments, as they currently assume loves and renotes are top-level notes
- Update CONTRIBUTING.md updated date once Auride is ready for prod

- Of course, check any // TODO: comments in code and make sure there isnt anything important for release