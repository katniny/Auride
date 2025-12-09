# What's Been Done on the Rewrite
## User Facing:
- SPA has been implemented
- / is no longer an individual page but now just goes straight to home with no additional code to run
- /u is no longer a valid path, please use /u/{username} instead

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

- NOTICE TO CONTRIBUTORS: If you have an old database for Auride, the following methods are now depreciated:
    - noteData.isDeleted - this is handled by the server. While notes are no longer deleted this way, the server can handle this to ensure it doesn't render. However, we do not do this anymore going forward.
    - noteData.isReplying - replies are now handled properly. Notes will no longer render if it has this value, please run `upgrading/updateReplies.js` with Node!

# TODO (based on what's been completed):
- Make a way to fetch a token without causing repetition in code
- Make a way to fetch server code without causing repetition in code
- Add documentation on adding new pages
- Make GitHub Workflow use .env files & document
- Obfuscate code in GitHub Workflow
- Document restrictions on appending to the app view vs body/head
- Document how to get FontAwesome ID