<img src="https://transs.social/assets/imgs/All_transparent.png" />
🌎 <a href="https://transs.social/" target="_blank">TransSocial</a> is an open source social media platform built from the ground up with Firebase! 🚀

--- 

## 🚀 Features
- Privacy-Focused\
TransSocial is 100% privacy focused! TransSocial does not track you across the web, force an algorithm on you, just pure TransSocial.
- Experiments\
Try TransSocial features before they're fully released! Go to your Settings > Personalization then "Experiments"!
- Themes\
Try multiple themes! Such as the classic Dark and Light modes, but also Midnight Purple, Mint, and more! You can even create your own themes! 🎨
### and much more to come!

<br />

## How to Install/Use
This needs to be rewritten as we've upgraded and changed our hosting provider to Firebase Hosting. Please bear with me.
But until I decide to do that, please note:
- To contribute to server-side code, you need a Firebase project with the Blaze Plan as Firebase Functions are unavailable otherwise. Otherwise, a Spark Plan project should suffice (but I haven't tested, please let me know if I'm wrong).
- You need the Firebase CLI installed and connected to a project. You can install it with `npm i -g firebase-tools` (please don't replace our firebase.json, we use it to host!)
- To test locally, run `firebase emulators:start`. The Firebase Functions will start as well testing hosting. This will ensure things run as you would see on our site. If you don't do this and attempt to visit a page (e.g. /u/katniny) and it doesn't work, don't complain about it to me. If you do that and it doesn't work, then I'll help. 
 - NOTE: When making changes to the client, you must MANUALLY refresh the page for your changes to take effect! When changing hosting settings or server-side code, you must Ctrl + C out and run `firebase emulators:start` again.
 - `firebase serve` might work too, but that's not what I use.

<br />

## License
TransSocial uses the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> license. Please note you are bound to this license.

<br />

## Thank you to everyone that's contributed to TransSocial
(This list can also be found at https://transs.social/contributors)
* katniny (The main developer of TransSocial)
* miku4k (<a href="https://github.com/katniny/transsocial/commits?author=miku4k">See her commits</a>)
* Mok Swagger (Helped test TransSocial before an update released)
* cryssyboo_ (Created the pride logo)
