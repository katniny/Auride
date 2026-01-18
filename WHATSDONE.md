# What's Been Done on the Rewrite
## User Facing:
- SPA has been implemented (add to update blog)
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
- Redesigned user pages
- User pages will now show a users joined date
- Improved popup UI
- Fixed styling issue where the deceased user popup would keep their username white when the popup close button was hovered
- When following/unfollowing a user, the page will no longer refresh and the button will dynamically update
- When using markdown in a note, you can now preview markdown (add to update blog)
- Redesigned create note popup
- Depreciated pre-register steps, Auride will no longer load associated code, write values or tell the client anything about it
- Fixed issue where if you went above the character limit, it would display one extra character even though its not there (e.g., 1251/1,250)
- You can now upload .ogg audio files to Auride
- You can now press enter to search for music--no more having to move your mouse to click a button!
- When you select a song to add to your note, you can now preview it in the tab, as well as remove it if you change your mind (QoL, add to upload blog)
- Fixed bug where renoting then unrenoting your own note would cause it to disappear from your profile

## Dev Env:
- Pages are now .js files rather than .html, making it easier to add page-specific code without more scripts (though, you can still do this). (add to update blog)
- Standard .js files have been depreciated for modular .js files (please avoid using classic .js files unless NEEDED!) (add to update blog)
- ts_fas_acih.js, requiredScripts.js and scriptLoader.js have been depreciated
- Auride now uses .env files to safely store keys (add to update blog)
- You can now use the current users data by importing "currentUserData" from "users/current.js" (relative path)
- Modules from NPM can now be used in Auride (add to update blog)
- The entire app view is now the current width, no more janky viewports!
- You can now define what icon set to use with FontAwesome (e.g., "brands" or "solid")
- If a user navigates to a new page, you can add an event listener named "navigatedToNewPage" (useful for doing things such as cleaning up functions on navigation)
- If the server requests the same user, we now return their autoplay preference
- The following URLs are depreciated: /u?id={username}, /note?id={noteId} & /userstudio?theme=${themeId}. Please update any links to be correct, as these are an extremely old way to handle links and will no longer work!
- Unified code to fetch user data (can be called via getUserData(id, type) from "/methods/getUserData.js")
- Unified code to fetch a token for current user (can be called via getToken() from "/methods/getToken.js")
- Unified code to fetch a singular note for current user (can be called via getNoteData(id) from "/methods/getNoteData.js") (add to update blog)
- You can now call "timeAgo" with 2 arguments - the Firebase timestamp & "verbose" (add to update blog)
    - Verbose is a flag you can call to get a full string (e.g., "Dec 17, 2025 • 4:10 AM" instead of "2d"). Do not call a flag if you want the standard time.
- Unified functions for loving notes and renoting notes
- When closing a modal, you can now just call `yourModalElement.close()`, Auride will now handle deletion after 450ms rather than having you do it manually
- Added build flag to Auride to tell the client if its running in development or production mode (as well as the server) (add to update blog)
- When using `storageLink(path)`, it now has to use `await`
- Fixed issues with Auride's storage in an development environment, media will now load as expected regardless of prod or dev status (add to update blog)
- We can now upload files with `uploadMedia()` with the follow params: `file`, `path`, `typeToUse` and `noteId` (only required if uploading for a note). This will allow us to handle everything (e.g., checking file size, checking file extension, etc.) within one function to make file uploading seamless, no matter where you're uploading a new file from! (add to update blog)

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
- Update CONTRIBUTING.md updated date once Auride is ready for prod
- Document how to get a Spotify token
- Check `import.meta.env.VITE_BUILD_ENV` in the page loader and prevent invalid options from loading, as this will break Auride image-related functionality
- Document on how to use `uploadMedia()`
- When creating a note, check for @mentions to push a notification to
- When creating a note, check if it's a reply and push appropriately
- Add ability to add alt text to images/videos
- Add ability to unlock posting/replying achievements if appropriate

- Of course, check any // TODO: comments in code and make sure there isnt anything important for release