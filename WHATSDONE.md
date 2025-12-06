# What's Been Done on the Rewrite
## User Facing:
- SPA has been implemented
- / is no longer an individual page but now just goes straight to home with no additional code to run
- /u is no longer a valid path, please use /u/{username} instead

## Dev Env:
- Pages are now .js files rather than .html, making it easier to add page-specific code without more scripts (though, you can still do this).
- Standard .js files have been depreciated for modular .js files (please avoid using classic .js files unless NEEDED!)
- ts_fas_acih.js has been depreciated
- Auride now uses .env files to safely store keys
- You can now use the current users data by importing "currentUserData" from "users/current.js" (relative path)
- Modules from NPM can now be used in Auride
- The entire app view is now the current width, no more janky viewports!
- You no longer have to call faIcon with .outerHTML, as Auride now handles it
- You can now define what icon set to use with FontAwesome (e.g., "brands" or "solid")

# TODO (based on what's been completed):
- Add documentation on adding new pages
- Make GitHub Workflow use .env files & document
- Obfuscate code in GitHub Workflow
- Document restrictions on appending to the app view vs body/head
- Document how to get FontAwesome ID