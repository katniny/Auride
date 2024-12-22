// my lsp wont stfu about those
// deno-lint-ignore-file no-inner-declarations no-unused-vars

// katniny Firebase Configuration
// before pushing to git, always make sure the firebase config doesn't expose yours
const firebaseConfig = {
   apiKey: "REPLACE",
   authDomain: "REPLACE",
   databaseURL: "REPLACE",
   projectId: "REPLACE",
   storageBucket: "REPLACE",
   messagingSenderId: "REPLACE",
   appId: "REPLACE",
   measurementId: "REPLACE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();
const timestamp = firebase.database.ServerValue.TIMESTAMP

// Get the current URL. This is going to prevent functions that don't need to run on a page from running.
const currentURL = window.location.href;
const pageURL = new URL(currentURL);
const pathName = pageURL.pathname;
let isOnDesktopApp = null;

// TransSocial Version
let transsocialVersion = "v2024.12.20";
let transsocialUpdate = "v20241220-2";
let transsocialReleaseVersion = "pre-alpha";

const notices = document.getElementsByClassName("version-notice");
const loaderVersions = document.getElementsByClassName("loaderVersion");
for (let notice of notices) {
   notice.innerHTML = `TransSocial is currently in the pre-alpha stage (version ${transsocialVersion}). A lot of features are missing or are in development and will be added with updates. <a href="/indev">Learn more</a>.`;
}
for (let loader of loaderVersions) {
   loader.innerHTML = `TransSocial ${transsocialVersion}_${transsocialReleaseVersion}`;
}

// Quote renote ID
let renotingNote = null;

function quoteRenote(id) {
   renotingNote = id;
   createNotePopup();
}

// music id
let pickedMusic = null;

// Read cookies
if (localStorage.getItem("acceptedCookies") !== null) {
   if (pathName === "/home" || pathName === "/home.html") {
      document.getElementById("cookie-notice").style.display = "none";
   }
}

// subscription status
let isSubscribed = null;
let hasBeenNotifiedOfSubscriptionIssue = false;

// get browser and browser version
const userAgent = navigator.userAgent;
let browserName = "Unknown Browser";
let browserVersion = "Unknown version";

const meowserAgentSubstring = "meowser";
console.log(userAgent);
if (userAgent.indexOf(meowserAgentSubstring) > -1) {
   browserName = "Meowser";
   let versionMatch = userAgent.match(/meowser\/([\d.]+)/);
   browserVersion = versionMatch ? versionMatch[1] : "unknown version";
} else {
   if (userAgent.indexOf("Firefox") > -1) {
      browserName = "Mozilla Firefox";
      browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
   } else if (userAgent.indexOf("SamsungBrowser") > -1) {
      browserName = "Samsung Browser";
      browserVersion = userAgent.match(/SamsungBrowser\/([0-9.]+)/)[1];
   } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
      browserName = "Opera";
      browserVersion = userAgent.match(/(Opera|OPR)\/([0-9.]+)/)[2];
   } else if (userAgent.indexOf("Trident") > -1) {
      browserName = "Internet Explorer";
      browserVersion = userAgent.match(/rv:([0-9.]+)/)[1];
   } else if (userAgent.indexOf("Edge") > -1) {
      browserName = "Microsoft Edge";
      browserVersion = userAgent.match(/Edge\/([0-9.]+)/)[1];
   } else if (userAgent.indexOf("Chrome") > -1) {
      browserName = "Google Chrome";
      browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
   } else if (userAgent.indexOf("Safari") > -1) {
      browserName = "Apple Safari";
      browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
   }
}

if (document.getElementById("userBrowser")) { // environment settings
   document.getElementById("userBrowser").textContent = browserName;
   document.getElementById("userBrowserVer").textContent = browserVersion;
}

// if on outdated browser, dont let the user use transsocial
// dont bother with ie, dont even work at all
if (browserName === "Mozilla Firefox") {
   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Firefox version 98"
   }

   if (browserVersion < 98) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      } else {
         
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

if (browserName === "Samsung Browser") {
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Samsung Browser version 3.0"
   }

   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (browserVersion < 3.0) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

if (browserName === "Opera") {
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Opera version 24"
   }

   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (browserVersion < 24) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

if (browserName === "Microsoft Edge") {
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Edge version 79"
   }

   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (browserVersion < 79) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

if (browserName === "Google Chrome") {
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Chrome version 37"
   }

   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (browserVersion < 37) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

if (browserName === "Apple Safari") {
   if (document.getElementById("version_browser")) {
      document.getElementById("version_browser").textContent = "Safari version 15.4"
   }

   // when <dialog> (the latest web tech transsocial uses) started getting supported
   if (browserVersion < 15.4) {
      if (pathName !== "/unsupported") {
         window.location.replace("/unsupported");
      }
   } else {
      if (pathName === "/unsupported") {
         window.location.replace("/home");
      }
   }
}

// Implement character limit
const noteText = document.getElementById('noteContent-textarea');
const maxCharacters = 1250;

if (noteText) {
   noteText.addEventListener('input', () => {
      const currentLength = noteText.value.length;

      if (currentLength > maxCharacters) {
         noteText.value = noteText.value.substring(0, maxCharacters);
      }

      document.getElementById("characterLimit_note").textContent = `${currentLength}/1,250`;
   });
}

if (document.getElementById("editNoteContent")) {
   const newNoteContentText = document.getElementById("newTextContent");

   document.getElementById("editNoteContent").addEventListener("input", () => {
      const currentLength = newNoteContentText.value.length;

      if (currentLength > maxCharacters) {
         newNoteContentText.value = newNoteContentText.value.substring(0, maxCharacters);
      }

      document.getElementById("newTextContent-characterLimit").textContent = `${currentLength}/1,250`;
   })
}

if (document.getElementById("displayName-text")) {
   const displayNameText = document.getElementById("displayName-text");
   const maxDisplay = 25;

   displayNameText.addEventListener("input", () => {
      const currentLength = displayNameText.value.length;

      if (currentLength > maxDisplay) {
         displayNameText.value = displayNameText.value.substring(0, maxDisplay);
      }

      document.getElementById("characterLimit_display").textContent = `${currentLength}/25`;
   })
}

if (document.getElementById("username-text")) {
   const usernameText = document.getElementById("username-text");
   const maxUser = 20;

   usernameText.addEventListener("input", () => {
      const currentLength = usernameText.value.length;

      if (currentLength > maxUser) {
         usernameText.value = usernameText.value.substring(0, maxUser);
      }

      document.getElementById("characterLimit_username").textContent = `${currentLength}/20`;
   })
}

if (document.getElementById("pronouns-text")) {
   const pronounsText = document.getElementById("pronouns-text");
   const maxPronouns = 15;

   pronounsText.addEventListener("input", () => {
      const currentLength = pronounsText.value.length;

      if (currentLength > maxPronouns) {
         pronounsText.value = pronounsText.value.substring(0, maxPronouns);
      }

      document.getElementById("characterLimit_pronouns").textContent = `${currentLength}/15`;
   })
}

if (document.getElementById("bioText")) {
   const bioText = document.getElementById("bioText");
   const maxBio = 500;

   bioText.addEventListener("input", () => {
      const currentLength = bioText.value.length;

      if (currentLength > maxBio) {
         bioText.value = bioText.value.substring(0, maxBio);
      }

      document.getElementById("characterLimit_bio").textContent = `${currentLength}/500`;
   })
}

if (document.getElementById("themeName")) {
   const themeText = document.getElementById("themeName");
   const maxTheme = 30;

   themeText.addEventListener("input", () => {
      const currentLength = themeText.value.length;

      if (currentLength > maxTheme) {
         themeText.value = themeText.value.substring(0, maxTheme);
      }

      document.getElementById("characterLimit_Theme").textContent = `${currentLength}/30`;
   })
}

if (document.getElementById("themeTitle")) {
   const themeTitle = document.getElementById("themeTitle");
   const maxTheme = 30;

   themeTitle.addEventListener("input", () => {
      const currentLength = themeTitle.value.length;

      if (currentLength > maxTheme) {
         themeTitle.value = themeTitle.value.substring(0, maxTheme);
      }

      document.getElementById("characterLimit_ThemeTitle").textContent = `${currentLength}/30`;
   })
}

if (document.getElementById("themeDescription")) {
   const themeDesc = document.getElementById("themeDescription");
   const maxTheme = 250;

   themeDesc.addEventListener("input", () => {
      const currentLength = themeDesc.value.length;

      if (currentLength > maxTheme) {
         themeDesc.value = themeDesc.value.substring(0, maxTheme);
      }

      document.getElementById("characterLimit_ThemeDescription").textContent = `${currentLength}/250`;
   })
}

// Constantly check user's suspension status
if (pathName !== "/suspended.html" || pathName !== "/suspended") {
   firebase.auth().onAuthStateChanged((user) => {
      // Firstly, check if the user even exists. If they don't return.
      if (user) {
         const suspensionRef = firebase.database().ref("users/" + user.uid);
         suspensionRef.on("value", (snapshot) => {
            const data = snapshot.val();

            if (data && data.suspensionStatus === "suspended") {
               if (pathName !== "/suspended" && pathName !== "/suspended.html") {
                  window.location.replace("/suspended");
               }
            }
         })
      }
   });
};

if (pathName === "/suspended.html" || pathName === "/suspended") {
   firebase.auth().onAuthStateChanged((user) => {
      // Firstly, check if the user even exists. If they don't return.
      if (user) {
         const suspensionRef = firebase.database().ref("users/" + user.uid);
         suspensionRef.on("value", (snapshot) => {
            const data = snapshot.val();
            //console.log(data);

            if (data.suspensionStatus === "suspended") {
               document.getElementById("reasonForBeingSuspended").textContent = data.suspensionNotes.reason;
               document.getElementById("suspensionExpiration").textContent = data.suspensionNotes.expiration;
            } else 
               window.location.replace("/home");
         })
      } else {
         window.location.replace("/home");
      }
   });
}

// Get notifications
let unreadNotifications = null;

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      firebase.database().ref(`users/${user.uid}/notifications/unread`).on("value", (snapshot) => {
         unreadNotifications = snapshot.val();
         if (unreadNotifications !== null && unreadNotifications !== 0) {
            document.getElementById("notificationsCount").classList.add("show");
            document.getElementById("notificationsCount").innerHTML = `${unreadNotifications}`;
         } else {
            if (document.getElementById("notificationsCount")) {
               document.getElementById("notificationsCount").classList.remove("show");
            }
         }
      })
   }
})

// Check for updates
// let currentTransSocialVersion = "v0.0.3_indev";
// firebase.database().ref("DONOTMODIFY").on("value", (snapshot) => {
//     if (pathName !== "/update") {
//         let transsocialServerVersion = snapshot.val();

//         if (currentTransSocialVersion !== transsocialServerVersion.transsocial) {
//             window.location.replace("/update");
//         } 
//     }
// })

// TransSocial Update
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      firebase.database().ref(`users/${user.uid}/readUpdates/${transsocialUpdate}`).on("value", (snapshot) => {
         const hasDoneIt = snapshot.exists();

         if (!hasDoneIt) {
            if (document.getElementById("updatesBtn")) {
               document.getElementById("updatesBtn").innerHTML = `<i class="fa-solid fa-wrench"></i> Updates <span class="badge">New!</span>`;
            }
         }
      })
   } else {
      if (document.getElementById("updatesBtn") && pathName !== "/updates") {
         document.getElementById("updatesBtn").innerHTML = `<i class="fa-solid fa-wrench"></i> Updates <span class="badge">New!</span>`;
      }
   }
})

firebase.auth().onAuthStateChanged((user) => {
   if (pathName === "/updates") {
      if (user) {
         firebase.database().ref(`users/${user.uid}/readUpdates/${transsocialUpdate}`).update({
            read: true,
         })
      }
   }
})

// If the user is on the 404 page, change the page URL to be the page they are on.
if (document.getElementById("404page")) {
   document.getElementById("404page").textContent = `We were unable to find ${pathName}. The page does not exist, got moved, or got lost to time.`;

   const pageWithoutSlash = pathName.substring(1);
   document.getElementById("profile404").href = `/u/${pageWithoutSlash}`;
}

// If user is on the register page and is not signed in, redirect to /
if (pathName === "/auth/register" || pathName === "/auth/register.html") {
   const url = new URL(window.location.href);
   const urlParam = url.searchParams.get("return_to");

   if (urlParam && urlParam === "https://music.transs.social/") {
      document.getElementById("redirectNotice").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> You'll be returned to TransMusic after you create your account.`;
   } else if (urlParam && urlParam !== "https://music.transs.social/") {
      document.getElementById("redirectNotice").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> You'll be returned to ${urlParam} after you create your account.`;
   } else {
      document.getElementById("redirectNotice").remove();
   }

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         if (!urlParam) {
            window.location.replace("/auth/policies");
         } else {
            window.location.replace(`/auth/policies?return_to=${urlParam}`);
         }
      } else {
         // no need to do anything
      }
   })
}

if (pathName === "/auth/policies") {
   const url = new URL(window.location.href);
   const urlParam = url.searchParams.get("return_to");

   if (urlParam) {
      document.getElementById("continueBtn").href = `/auth/pfp?return_to=${urlParam}`;
   }
}

// If user is on /auth/pfp, make sure their email is saved
// We also add their profile picture here
if (pathName === "/auth/pfp") {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).update({
            email : user.email
         });

         firebase.database().ref(`users/${user.uid}/pfp`).once("value", (snapshot) => {
            if (snapshot.exists()) {
               const url = new URL(window.location.href);
               const urlParam = url.searchParams.get("return_to");
               
               if (!urlParam) {
                  window.location.replace("/auth/names");
               } else {
                  window.location.replace(`/auth/names?return_to=${urlParam}`);
               }
            }
         });
      } else {
         window.location.replace("/auth/register");
      }
   });
}

if (pathName === "/auth/pfp") {
   document.getElementById("pfpUploader").addEventListener("change", function(event) {
      const file = event.target.files[0];

      if (file) {
         // ensure file is 5mb or lower
         if (file.size > 5 * 1024 * 1024) { // 5mb
            document.getElementById("errorTxt").textContent = "Image must be under 5MB.";
            document.getElementById("errorTxt").style.display = "block";
            return;
         }

         // check file type
         const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
         if (!allowedTypes.includes(file.type)) {
            document.getElementById("errorTxt").textContent = "Image must be a JPG, PNG, or WEBP file.";
            document.getElementById("errorTxt").style.display = "block";
            return;
         }

         // get user uid
         firebase.auth().onAuthStateChanged((user) => {
            // create a reference to where you want to upload the file
            const fileRef = storageRef.child(`images/pfp/${user.uid}/${file.name}`);

            // upload the file
            const uploadTask = fileRef.put(file);

            uploadTask.on("state_changed",
               function(snapshot) {
                  // log progress
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  document.getElementById("errorTxt").textContent = `Uploading profile picture! ${progress}% done`;
                  document.getElementById("errorTxt").style.display = "block";
                  document.getElementById("errorTxt").style.color = "var(--success-color)";
               },
               function(error) {
                  document.getElementById("errorTxt").textContent = `${error.message}`;
                  document.getElementById("errorTxt").style.display = "block";
                  document.getElementById("errorTxt").style.color = "var(--error-text)";
               },
               function() {
                  // complete!
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                     firebase.database().ref(`users/${user.uid}`).update({
                        pfp : file.name
                     })
                     .then(() => {
                        const url = new URL(window.location.href);
                        const urlParam = url.searchParams.get("return_to");

                        if (!urlParam) {
                           window.location.replace("/auth/names");
                        } else {
                           window.location.replace(`/auth/names?return_to=${urlParam}`);
                        }
                     });
                  })
               }
            )
         })
      }
   })
}

// if user is on /auth/names, allow them to add a display name and username
if (pathName === "/auth/pfp") {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/username`).once("value", (snapshot) => {
            if (snapshot.exists()) {
               const url = new URL(window.location.href);
               const urlParam = url.searchParams.get("return_to");

               if (!urlParam) {
                  window.location.replace("/auth/done");
               } else {
                  window.location.replace(`/auth/done?return_to=${urlParam}`);
               }
            }
         });
      } else {
         window.location.replace("/auth/register");
      }
   });
}

function displayAndUsernameReserve() {
   document.getElementById("errorTxt").style.display = "none";
   document.getElementById("displayAndUsernameBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking display...`;
   document.getElementById("displayAndUsernameBtn").classList.add("disabled");

   // make sure display name isn't empty
   const displayName = document.getElementById("displayName-text").value.trim();

   // get username
   const username = document.getElementById("username-text").value;

   if (displayName === "") {
      document.getElementById("errorTxt").textContent = `Your display name can't be empty.`;
      document.getElementById("errorTxt").style.display = "block";
      document.getElementById("errorTxt").style.color = "var(--error-text)";
      document.getElementById("displayAndUsernameBtn").innerHTML = `Use Display Name & Check Username`;
      document.getElementById("displayAndUsernameBtn").classList.remove("disabled");
      return;
   } else {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               display : displayName
            })
            .then(() => {
               document.getElementById("displayAndUsernameBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking username...`;
      
               firebase.database().ref(`taken-usernames/${username}`).once("value", (snapshot) => {
                  if (snapshot.exists()) {
                     // we don't have to check if the username is blank because firebase reads the entire "taken-usernames/"
                     // database reference, so it assumes it's already taken.
                     // if you want it to say "Username cannot be empty", then you can add it (i doubt it'd be hard)
                     document.getElementById("errorTxt").textContent = `Username is unavailable! Try another.`;
                     document.getElementById("errorTxt").style.display = "block";
                     document.getElementById("displayAndUsernameBtn").innerHTML = `Use Display Name & Check Username`;
                     document.getElementById("displayAndUsernameBtn").classList.remove("disabled");
                     return;
                  } else {
                     firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                           document.getElementById("displayAndUsernameBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Applying username...`;
      
                           // reserve the name
                           firebase.database().ref(`taken-usernames/${username}`).update({
                              user : user.uid
                           })
                           .then(() => {
                              // then add username to account
                              firebase.database().ref(`users/${user.uid}`).update({
                                 username : username
                              })
                              .then(() => {
                                 const url = new URL(window.location.href);
                                 const urlParam = url.searchParams.get("return_to");
                                    
                                 if (!urlParam) {
                                    window.location.replace("/auth/done");
                                 } else {
                                    window.location.replace(`/auth/done?return_to=${urlParam}`);
                                 }
                              });
                           });
                        }
                     });
                  }
               });
            });
         }
      })
   }
}

// auth/done... not much to do, just check auth state
if (pathName === "/auth/done") {
   const url = new URL(window.location.href);
   const urlParam = url.searchParams.get("return_to");

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         if (urlParam) {
            window.location.replace(urlParam);
         }
      } else {
         window.location.replace("/auth/register");
      }
   });
}

// Register Function
function register() {
   if (pathName === "/auth/register.html" || pathName === "/auth/register") {
      document.getElementById("registerBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Registering...`;
      document.getElementById("registerBtn").classList.add("disabled");
      document.getElementById("errorTxt").style.display = "none";

      // get the email and password input fields
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
            document.getElementById("registerBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Starting...`;
            firebase.database().ref(`users/${userCredential.uid}`).update({
               email : email
            }).then(() => {
               const url = new URL(window.location.href);
               const urlParam = url.searchParams.get("return_to");
               
               if (urlParam) {
                  window.location.replace(`/auth/pfp?return_to=${urlParam}`);
               } else {
                  window.location.replace("/auth/pfp");
               }
            });
         })
         .catch((error) => {
            document.getElementById("errorTxt").textContent = error.message;
            document.getElementById("errorTxt").style.display = "block";
            document.getElementById("registerBtn").innerHTML = `Register`;
            document.getElementById("registerBtn").classList.remove("disabled");
         });
   }
}

// Login Function
function login() {
   document.getElementById("loginBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Logging in...`;
   document.getElementById("loginBtn").classList.add("disabled");
   document.getElementById("errorTxt").style.display = "none";

   if (pathName === "/auth/login.html" || pathName === "/auth/login") {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
         .then(() => {
            window.location.replace("/home");
         }).catch((error) => {
            document.getElementById("errorTxt").style.display = "block";
            document.getElementById("errorTxt").textContent = error.message;
            document.getElementById("loginBtn").innerHTML = `Login`;
            document.getElementById("loginBtn").classList.remove("disabled");
         });
   }
}

// Sign Out User
function signOut() {
   firebase.auth().signOut().then(() => {
      window.location.replace("/home");
   }).catch((error) => {
      alert("There was an unknown error signing out. Please refresh the page and try again.");
   })
}

// Validate Email Address
function validate_email(email) {
   expression = /^[^@]+@\w+(\.\w+)+\w$/
   if (expression.test(email) === true) {
      // Email is valid and can be used.
      return true;
   } else {
      // Email is invalid and cannot be used.
      return false;
   }
}

// Validate Password
function validate_password(password) {
   // Only accepts lengths greater than 6
   if (password < 6) {
      return false;
   } else {
      return true;
   }
}

// Validate Other Fields
function validate_field(field) {
   if (field == null) {
      return false;
   }

   if (field.length <= 0) {
      return false;
   } else {
      return true;
   }
}

// Hide error by default
function hideErrorByDefault() {
   const errorTxt = document.getElementById('errorTxt');
   if (errorTxt) {
      errorTxt.innerHTML = '';
   }
}

// Only allow user on page if they are signed in/signed out
function signedOutCheck() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         // ...
      } else {
         window.location.replace("/home");
      }
   })
}

function signedInCheck() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         window.location.replace('/home');
      } else {
         return;
      }
   })
}

// Check if the user is no longer part of the "legacy" account system
function isOnUsernames() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const ref = firebase.database().ref(`users/${uid}/preRegister_Step`);

         ref.once("value")
            .then(function (snapshot) {
               const step = snapshot.exists();

               if (step === false) {
                  return true;
               } else if (step === true) {
                  window.location.replace('/ts/prepare/pfp.html');
               }
            })
      } else {
         // Don't do anything, page will redirect to sign up page by default
         return;
      }
   })
}

function isOnPfps() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const ref = firebase.database().ref(`users/${uid}/preRegister_Step`);

         ref.once("value")
            .then(function (snapshot) {
               const step = snapshot.val();

               if (step === "pfp") {
                  return true;
               } else if (step !== "pfp") {
                  window.location.replace('/ts/prepare/pronouns.html');
               }
            })
      }
   })
}

function isOnPronouns() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const ref = firebase.database().ref(`users/${uid}/preRegister_Step`);

         ref.once("value")
            .then(function (snapshot) {
               const step = snapshot.val();

               if (step === "pronouns") {
                  return true;
               } else if (step !== "pronouns") {
                  window.location.replace('/ts/finished/final.html');
               }
            })
      }
   })
}

function isFinished() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const ref = firebase.database().ref(`users/${uid}/preRegister_Step`);

         ref.once("value")
            .then(function (snapshot) {
               const step = snapshot.val();

               if (step === "finished") {
                  return true;
               } else if (step !== "finished") {
                  window.location.replace('/ts/prepare/acc.html');
               }
            })
      }
   })
}

// Allow users to create a display and username
function usernames() {
   // Make sure to check for username availabilty first as display names can be anything
   // Get the username and display name inputs
   const insertedDisplay = document.getElementById('displayName').value;
   const insertedUsername = document.getElementById('username').value;
   // Read the database for the same username (if applicable)
   const ref = firebase.database().ref("taken-usernames/" + `${insertedUsername.toLowerCase()}`);
   // Get the error text
   const errorTxt = document.getElementById('errorTxt');

   ref.once("value")
      .then(function (snapshot) {
         // Creates a boolean based on a username exists or not
         const exists = snapshot.exists();
         // It exists...
         if (exists === true && insertedUsername !== '') {
            errorTxt.innerHTML = 'Aw, that username is taken! Try another!';
            errorTxt.style.color = 'rgb(255, 73, 73)';
            // It does not exist!
         } else if (exists === false && insertedUsername !== '') {
            // Get current user and assign them to a variable
            const user = firebase.auth().currentUser;
            // Write user data to the database
            firebase.database().ref('users/' + user.uid).set({
               display: insertedDisplay,
               username: insertedUsername,
               email: user.email,
               preRegister_Step: "pfp",
            })
            // Add username to unavailable list
            firebase.database().ref('taken-usernames/' + insertedUsername).set({
               taken: true
            })

            // Redirect user to next step 
            window.location.replace('/ts/prepare/pfp.html')
            // Input value is empty...
         } else if (insertedUsername === '') {
            errorTxt.innerHTML = 'Username cannot be empty.';
            errorTxt.style.color = 'rgb(255, 73, 73)';
            // An error occurred...
         } else {
            errorTxt.innerHTML = "An unknown error occurred.";
         }
      });
}

function usernameCharacters() {
   // Prevent characters "`~!@#$%^&*()-+=\|]}{[;:'",/?"
   event.target.value = event.target.value.replace(/[^a-z 1-9 . _]/g, '');
   // Prevent spaces
   event.target.value = event.target.value.replace(/[ ]/g, '');
}

// Preview Upload PFPs
function previewPfp() {
   const image = document.getElementById('previewImg');
   image.src = URL.createObjectURL(event.target.files[0]);
}

// Allow user to upload profile picture
function uploadPfp() {
   const storageRef = firebase.storage().ref();
   const uploadedImg = document.getElementById('pfpUploader').files[0];
   const reader = new FileReader();
   const error = document.getElementById('errorTxt');

   const metadata = {
      contentType: "image/pfp",
   };

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const imgRef = firebase.database().ref("users/" + uid)
         const storageRef = firebase.storage().ref();

         if (uploadedImg) {
            reader.readAsDataURL(uploadedImg);
            const uploadTask = storageRef.child(`images/pfp/${uid}/${uploadedImg.name}`).put(uploadedImg);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
               (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  errorTxt.style.display = 'block';
                  errorTxt.style.color = 'green';
                  errorTxt.innerHTML = 'Uploading...' + progress + '%';
                  switch (snapshot.state) {
                     case firebase.storage.TaskState.RUNNING: // or 'running'
                        //console.log('Upload is running.');
                        break;
                  }
               },
               (error) => {
                  switch (error.code) {
                     case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                     case 'storage/canceled':
                        // User canceled the upload
                        break;

                     // ...

                     case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                  }
               },
               () => {
                  // Upload completed successfully, now we can get the download URL
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                     firebase.database().ref('users/' + uid).update({
                        pfp: `${uploadedImg.name}`,
                        preRegister_Step: "pronouns",
                     });

                     window.location.replace('/ts/prepare/pronouns.html');
                  });
               }
            );
         } else {
            error.innerHTML = 'No image provided.';
            error.style.display = 'block';
            error.style.color = 'red';
            return false;
         }
      }
   })
}

// Upload pronouns
function pronouns() {
   // Get the pronoun input field
   const insertedPronouns = document.getElementById('pronouns').value;
   // Get the error text
   const errorTxt = document.getElementById('errorTxt');

   // Get current user and assign them to a variable
   const user = firebase.auth().currentUser;
   // Write user data to the database
   firebase.database().ref('users/' + user.uid).update({
      pronouns: insertedPronouns,
      preRegister_Step: "finished",
   });

   window.location.replace('/ts/finished/final.html');
}

// Finished Profile Card
function profileCard() {
   // PFP stuff
   const userPfp = document.getElementById('userPfp');
   // Display Name Stuff
   const userDisplay = document.getElementById('userDisplay');
   // Username Stuff
   const userUsername = document.getElementById('userUsername');
   // Pronouns Stuff
   const userPronouns = document.getElementById('userPronouns');

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;

         // Get the users PFP and set it as userPfp.src
         const pfpRef = firebase.database().ref(`users/${uid}/pfp`);

         pfpRef.once("value")
            .then(function (snapshot) {
               const step = snapshot.val();
               const imageRef = storageRef.child(`images/pfp/${uid}/${step}`)

               imageRef.getDownloadURL()
                  .then((url) => {
                     userPfp.src = url;
                  })
            })

         // Display user display name
         const displayRef = firebase.database().ref(`users/${uid}/display`);

         displayRef.once("value")
            .then(function (snapshot) {
               const display = snapshot.val();

               userDisplay.innerHTML = display;
            })


         // Display user username
         const usernameRef = firebase.database().ref(`users/${uid}/username`);

         usernameRef.once("value")
            .then(function (snapshot) {
               const username = snapshot.val();

               userUsername.innerHTML = `@${username}`;
            })

         // Display user pronouns
         const pronounRef = firebase.database().ref(`users/${uid}/pronouns`);

         pronounRef.once("value")
            .then(function (snapshot) {
               const pronouns = snapshot.val();

               userPronouns.innerHTML = pronouns;

               if (pronouns === '') {
                  userDisplay.style.marginTop = "8px";
               }
            })
      }
   })
}

// Get user's pfp
function getUserPfpSidebar() {
   // PFP stuff
   const userPfp = document.getElementById('userPfp-sidebar');

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;

         // Get the users PFP and set it as userPfp.src
         const pfpRef = firebase.database().ref(`users/${uid}/pfp`);

         pfpRef.once("value")
            .then(function (snapshot) {
               const step = snapshot.val();
               const imageRef = storageRef.child(`images/pfp/${uid}/${step}`)

               imageRef.getDownloadURL()
                  .then((url) => {
                     userPfp.src = url;
                  })
            })
      }
   })
}

function getUserInfoSidebar() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const displayNameSidebar = document.getElementById("displayName-sidebar");
         const usernameSidebar = document.getElementById("username-pronouns-sidebar");

         const displayNameRef = firebase.database().ref(`users/${uid}/display`);

         displayNameRef.once("value")
            .then(function (snapshot) {
               const display = snapshot.val();

               displayNameSidebar.textContent = display;
            })

         const usernameRef = firebase.database().ref(`users/${uid}/username`);

         usernameRef.once("value")
            .then(function (snapshot) {
               const username = snapshot.val();

               usernameSidebar.textContent = "@" + username;
            })
      }
   })
}

// Link Button to Account
function linkButtonToAcc() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         const button = document.getElementById('linkToAcc');

         // Username Ref
         const usernameRef = firebase.database().ref(`users/${uid}/username`);

         usernameRef.once("value")
            .then(function (snapshot) {
               const username = snapshot.val();

               button.href = `/u/${username}`;
            })
      }
   })
}

// If a user tries to do something that is locked behind being signed in, give them a prompt to do so.
function loginPrompt() {
   const loginModal = document.getElementById("signInPrompt");

   loginModal.showModal();
}

// Hyperlinking
function escapeHtml(str) {
   const div = document.createElement('div');
   div.textContent = str;
   return div.innerHTML;
}

function linkify(text) {
   const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
   const usernamePattern = /@(\w+)/g;

   let linkedText = text.replace(urlPattern, '<a href="javascript:void(0)" onclick="openLink(`$1`)">$1</a>');
   linkedText = linkedText.replace(usernamePattern, '<a href="/u/$1">@$1</a>');

   return linkedText;
}

function addNewlines(text) {
   let newText = text.replace(/(\r\n|\n|\r)/g, '<br>');
   return newText;
}

function markdownify(text) {
   // headers
   // ###, ## and #
   text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
   text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
   text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

   // bold, italics, strikethrough and monospace
   text = text.replace(/\*(.+?)\*/g, '<strong>$1</strong>'); //bold
   text = text.replace(/\_(.+?)\_/g, '<em>$1</em>'); // italics
   text = text.replace(/~(.+?)~/g, '<del>$1</del>'); // strikethrough
   text = text.replace(/`([^`]+)`/g, '<code>$1</code>'); // monospace
   text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>'); // multi-line monospace

   // lists
   text = text.replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>');

   // blockquotes
   text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

   // escape backslashes
   text = text.replace(/\\(.)/g, '$1');

   return text;
}

function sanitizeAndLinkify(text) {
   let escapedText = escapeHtml(text);
   escapedText = markdownify(escapedText);
   escapedText = linkify(escapedText);
   escapedText = addNewlines(escapedText);
   return escapedText;
}

// i think its safe to assume no one needs the old note rendering code from v0.0.1?

// Note Loading
let notesRef = firebase.database().ref('notes');
const notesDiv = document.getElementById("notes");
const batchSize = null;
let isLoading = false;
let lastNoteKey = null;
let loadedNotesId = [];

if (pathName === "/home" || pathName === "/home.html" || pathName === "/u" || pathName === "/u.html" || pathName === "/note" || pathName === "/note.html" || pathName === "/favorites" || pathName.startsWith("/u/") || pathName.startsWith("/note/")) {
   let userAutoplayPreference = null;

   // function to fetch and cache user's autoplay pref
   function fetchAutoplayPreference() {
      return new Promise((resolve, reject) => {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}/autoplayVideos`).once("value", (snapshot) => {
                  const evenExists = snapshot.exists();
                  const pref = snapshot.val();

                  if (evenExists === true) {
                     userAutoplayPreference = (pref === "true"); // this sets it to their preference
                  } else {
                     userAutoplayPreference = true;
                  }
                  resolve(userAutoplayPreference);
               }).catch(reject);
            } else {
               userAutoplayPreference = true;
               resolve(userAutoplayPreference);
            }
         });
      });
   }
   
   fetchAutoplayPreference(); // call on start

   // show notes without refreshing
   // revolutionary tech y'all
   function loadNotesFromButton() {
      // remove existing notes
      const notes = document.querySelectorAll(".note");
      notes.forEach(note => note.remove());

      // load the new notes
      loadInitalNotes();
   }

   // Note Rendering
   function createNoteDiv(noteContent) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.setAttribute("id", `${noteContent.id}`);
      return noteDiv;
   }

   // observer to only show images/videos/etc. when about to be visible for performance
   const mediaObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.style.visibility = "visible";
            entry.target.style.opacity = "1";
         } else {
            entry.target.style.visibility = "hidden";
            entry.target.style.opacity = "0";
         }
      });
   }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
   });

   function loadInitalNotes() {
      if (pathName !== "/note" && pathName !== "/u" && !pathName.startsWith("/u/") && !pathName.startsWith("/note/")) {
         notesRef.limitToLast(15).once("value").then(function (snapshot) {
            const notesArray = [];
            snapshot.forEach(function (childSnapshot) {
               const noteContent = childSnapshot.val();
               noteContent.key = childSnapshot.key;
               notesArray.push(noteContent);
            });

            notesArray.sort((a, b) => b.createdAt - a.createdAt);

            lastNoteKey = notesArray[notesArray.length - 1]?.key;

            renderNotes(notesArray);
         });
      } else if (pathName === "/note" || pathName.startsWith("/note/")) {
         const url = new URL(window.location.href);
         let noteParam = null;

         if (pathName.startsWith("/note/")) {
            const segments = pathName.split("/");
            noteParam = segments[2];

            console.log(noteParam);
         } else {
            noteParam = url.searchParams.get("id");
         }

         notesRef.once("value")
            .then(function(snapshot) {
               notesRef.limitToLast(snapshot.numChildren()).once("value").then(function (snapshot) {
                  const notesArray = [];
                  snapshot.forEach(function (childSnapshot) {
                     const noteContent = childSnapshot.val();
                     noteContent.key = childSnapshot.key;
                     notesArray.push(noteContent);
                  });
      
                  notesArray.sort((a, b) => b.createdAt - a.createdAt);
      
                  lastNoteKey = notesArray[notesArray.length - 1]?.key;

                  const filteredNotes = notesArray.filter((currentNote) => currentNote.replyingTo === noteParam);
      
                  if (filteredNotes.length > 0) {
                     renderNotes(filteredNotes);
                  } else {
                     renderNotes(notesArray);
                  }
               });
            })
         } else if (pathName === "/u" || pathName.startsWith("/u/")) {
            const url = new URL(window.location.href);
            let userParam = null;

            if (pathName.startsWith("/u/")) {
               const segments = pathName.split("/");
               userParam = segments[2];

               console.log(userParam);
            } else {
               userParam = url.searchParams.get("id");
            }
   
            firebase.database().ref(`taken-usernames/${userParam}`).once("value", (snapshot) => {
               const id = snapshot.val();
               
               firebase.database().ref(`users/${id.user}/posts`).once("value")
               .then(function(snapshot) {
                     notesRef.limitToLast(snapshot.numChildren()).once("value").then(function (snapshot) {
                        const notesArray = [];
                        snapshot.forEach(function (childSnapshot) {
                           const noteContent = childSnapshot.val();
                           noteContent.key = childSnapshot.key;
                           notesArray.push(noteContent);
                        });
               
                        notesArray.sort((a, b) => b.createdAt - a.createdAt);
               
                        lastNoteKey = notesArray[notesArray.length - 1]?.key;
         
                        const filteredNotes = notesArray.filter((currentNote) => currentNote.replyingTo === userParam);
               
                        if (filteredNotes.length > 0) {
                           renderNotes(filteredNotes.reverse()); // has to be reversed, or it goes all weird
                        } else {
                           renderNotes(notesArray.reverse());
                        }
                     });
                  })
            })
         }
      } 

   loadInitalNotes();

   // infinite loading
   window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
         loadMoreNotes();
      }
   });

   function loadMoreNotes() {
      if (!lastNoteKey) return;

      notesRef.orderByKey().endBefore(lastNoteKey).limitToLast(15).once('value').then(function (snapshot) {
         const notesArray = [];

         snapshot.forEach(function (childSnapshot) {
            const noteContent = childSnapshot.val();
            noteContent.key = childSnapshot.key;
            notesArray.push(noteContent);
         });

         if (notesArray.length > 0) {
            lastNoteKey = notesArray[0].key;

            renderNotes(notesArray.reverse());
         }
      });
   }

   // retrieve data from the "notes" node
   function renderNotes(notesArray) {
      const notesContainer = document.getElementById("notes");

      notesArray.forEach(noteContent => {
         const noteDiv = createNoteDiv(noteContent);

         if (document.getElementById("newNotesAvailable")) {
            document.getElementById("newNotesAvailable").style.display = "none";
         }

         if (noteContent.isNsfw === true) {
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                     const showNsfw = snapshot.val();

                     if (showNsfw.showNsfw === "Show") {
                        // No need to do anything. It'll do it as is.
                     } else if (showNsfw.showNsfw === "Blur") {
                        // The actual cover
                        const cover = document.createElement("div");
                        cover.classList.add("contentWarning");
                        cover.setAttribute("id", `${noteContent.id}-blur`);

                        // Warning Header
                        const warning = document.createElement("p");
                        warning.setAttribute("id", `${noteContent.id}-warning`);
                        warning.classList.add("warning");
                        warning.textContent = "Note may contain NSFW content.";

                        // Warning Info
                        const warningInfo = document.createElement("p");
                        warningInfo.classList.add("warningInfo");
                        warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                        warningInfo.textContent = "The creator of this note flagged their note as having NSFW content.";

                        // Close Warning Button
                        const closeButton = document.createElement("button");
                        closeButton.classList.add("closeWarning");
                        closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                        closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                        closeButton.textContent = "View";

                        // Show all children
                        noteDiv.appendChild(cover);
                        noteDiv.appendChild(warning);
                        noteDiv.appendChild(warningInfo);
                        noteDiv.appendChild(closeButton);
                     } else if (showNsfw.showNsfw === "Hide") {
                        // We remove the note so the user doesn't have to see it
                        noteDiv.remove();
                     }
                  })
               } else {
                  noteDiv.remove();
               }
            })
         } else if (noteContent.isSensitive === true) {
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                     const showNsfw = snapshot.val();

                     if (showNsfw.showSensitive === "Show") {
                        // No need to do anything. It'll do it as is.
                     } else if (showNsfw.showSensitive === "Blur") {
                        // The actual cover
                        const cover = document.createElement("div");
                        cover.classList.add("contentWarning");
                        cover.setAttribute("id", `${noteContent.id}-blur`);

                        // Warning Header
                        const warning = document.createElement("p");
                        warning.setAttribute("id", `${noteContent.id}-warning`);
                        warning.classList.add("warning");
                        warning.textContent = "Note may contain sensitive content.";

                        // Warning Info
                        const warningInfo = document.createElement("p");
                        warningInfo.classList.add("warningInfo");
                        warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                        warningInfo.textContent = "The creator of this note flagged their note as having sensitive content.";

                        // Close Warning Button
                        const closeButton = document.createElement("button");
                        closeButton.classList.add("closeWarning");
                        closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                        closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                        closeButton.textContent = "View";

                        // Show all children
                        noteDiv.appendChild(cover);
                        noteDiv.appendChild(warning);
                        noteDiv.appendChild(warningInfo);
                        noteDiv.appendChild(closeButton);
                     } else if (showNsfw.showSensitive === "Hide") {
                        // We remove the note so the user doesn't have to see it
                        noteDiv.remove();
                     }
                  })
               } else {
                  noteDiv.remove();
               }
            })
         } else if (noteContent.isPolitical === true) {
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                     const showNsfw = snapshot.val();

                     if (showNsfw.showPolitics === "Show") {
                        // No need to do anything. It'll do it as is.
                     } else if (showNsfw.showPolitics === "Blur") {
                        // The actual cover
                        const cover = document.createElement("div");
                        cover.classList.add("contentWarning");
                        cover.setAttribute("id", `${noteContent.id}-blur`);

                        // Warning Header
                        const warning = document.createElement("p");
                        warning.setAttribute("id", `${noteContent.id}-warning`);
                        warning.classList.add("warning");
                        warning.textContent = "Note may contain political content.";

                        // Warning Info
                        const warningInfo = document.createElement("p");
                        warningInfo.classList.add("warningInfo");
                        warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                        warningInfo.textContent = "This note may contain political content. This note does not reflect TransSocial's opinions. This note may not be political and may be incorrectly flagged.";

                        // Close Warning Button
                        const closeButton = document.createElement("button");
                        closeButton.classList.add("closeWarning");
                        closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                        closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                        closeButton.textContent = "View";
                        closeButton.style.marginTop = "25px";

                        // Show all children
                        noteDiv.appendChild(cover);
                        noteDiv.appendChild(warning);
                        noteDiv.appendChild(warningInfo);
                        noteDiv.appendChild(closeButton);
                     } else if (showNsfw.showPolitics === "Hide") {
                        // We remove the note so the user doesn't have to see it
                        noteDiv.remove();
                     }
                  })
               } else {
                  noteDiv.remove();
               }
            })
         }

         // Create the user's PFP
         const userPfp = document.createElement("img");
         userPfp.classList.add("notePfp");
         firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
            const fetchedUser = snapshot.val();
            userPfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteContent.whoSentIt}%2F${fetchedUser.pfp}?alt=media`;
            userPfp.setAttribute("draggable", "false");
            userPfp.setAttribute("loading", "lazy");
         });
         noteDiv.appendChild(userPfp);
         mediaObserver.observe(userPfp); // observe pfp

         // Create the user's display name
         // Also check for badges (verified, mod, Enchanted, etc.)
         const displayName = document.createElement("a");
         displayName.classList.add("noteDisplay");
         firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
            const fetchedUser = snapshot.val();
            displayName.textContent = fetchedUser.display;
            displayName.href = `/u/${fetchedUser.username}`;

            const badges = document.createElement("span");
            if (fetchedUser.isVerified === true) {
               badges.innerHTML = `<i class="fa-solid fa-circle-check fa-sm"></i>`;
            }
            if (fetchedUser.isSubscribed === true) {
               badges.innerHTML = `${badges.innerHTML}<i class="fa-solid fa-heart fa-sm"></i>`;
            }
            if (fetchedUser.activeContributor === true) {
               badges.innerHTML = `${badges.innerHTML}<i class="fa-solid fa-handshake-angle fa-sm"></i>`;
            }
            badges.classList.add("noteBadges");
            displayName.appendChild(badges);
         })
         noteDiv.appendChild(displayName);

         // Insert Breakpoint to Seperate Display Name and Username
         const breakpoint = document.createElement("br");
         noteDiv.appendChild(breakpoint);

         // Create the user's username
         const username = document.createElement("a");
         username.classList.add("noteUsername");
         firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
            const fetchedUser = snapshot.val();
            if (fetchedUser.pronouns !== undefined) {
               const displayDate = timeAgo(noteContent.createdAt);

               username.textContent = `@${fetchedUser.username} • ${fetchedUser.pronouns} • ${displayDate}`;
            } else {
               const displayDate = timeAgo(noteContent.createdAt);

               username.textContent = `@${fetchedUser.username} • ${displayDate}`;
            }
            username.href = `/u/${fetchedUser.username}`;
         })
         noteDiv.appendChild(username);

         // Create the note's text
         const text = document.createElement("p");
         text.innerHTML = sanitizeAndLinkify(noteContent.text)
         text.classList.add("noteText");
         if (noteContent.replyingTo === undefined) {
            text.setAttribute("onclick", `window.location.href="/note/${noteContent.id}"`);
         }
         text.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
               event.stopPropagation();
            });
         });
         twemoji.parse(text, {
            folder: 'svg',
            ext: '.svg'
         });
         noteDiv.appendChild(text);

         // If image has image/video, render a video/image
         if (noteContent.image !== undefined) {
            let imageFileName = noteContent.image;
            let imageExtension = imageFileName.split(".").pop();
            const url = imageExtension;
            const cleanUrl = url.split('?')[0];
         
            if (cleanUrl === "mp4") {
               const video = document.createElement("video");
               video.src = noteContent.image;
               video.classList.add("uploadedImg");
               video.controls = true;
               video.muted = true;
               video.loop = true;
               video.setAttribute("loading", "lazy");
               video.style.visibility = "hidden"; // Start hidden
               video.style.opacity = "0";
         
               video.autoplay = userAutoplayPreference;
         
               video.setAttribute("alt", `${noteContent.alt}`);
               noteDiv.appendChild(video);
         
               // observe image
               mediaObserver.observe(video);
            } else {
               const image = document.createElement("img");
               image.src = noteContent.image;
               image.draggable = "false";
               image.classList.add("uploadedImg");
               image.setAttribute("alt", `${noteContent.alt}`);
               image.setAttribute("loading", "lazy");
               image.style.visibility = "hidden"; // Start hidden
               image.style.opacity = "0";
         
               noteDiv.appendChild(image);
         
               // observe image
               mediaObserver.observe(image);
            }
         }

         // if the note has a song, embed it into the note
         if (noteContent.music) {
            const embed = document.createElement("iframe");
            embed.src = `https://open.spotify.com/embed/track/${noteContent.music}`;
            embed.width = "98%";
            embed.height = "100";
            embed.frameBorder = "0";
            embed.allowTransparency = "true";
            embed.allow = "encrypted-media";

            noteDiv.appendChild(embed);
         }

         // If quoting a note, display the note that the note is quoting
         if (noteContent.quoting) {
            const container = document.createElement("div");
            container.classList.add("quoteContainer");
            container.setAttribute("onclick", `window.location.replace("/note/${noteContent.quoting}")`);
            noteDiv.appendChild(container);

            firebase.database().ref(`notes/${noteContent.quoting}`).once("value", (snapshot) => {
               const quoteData = snapshot.val();

               if (quoteData.isDeleted !== true) {
                  firebase.database().ref(`users/${quoteData.whoSentIt}`).once("value", (snapshot) => {
                     const quoteUser = snapshot.val();

                     const quotePfp = document.createElement("img");
                     quotePfp.classList.add("quotePfp");
                     quotePfp.setAttribute("draggable", "false");
                     if (quoteUser.suspensionStatus !== "suspended") {
                        quotePfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${quoteData.whoSentIt}%2F${quoteUser.pfp}?alt=media`;
                     } else {
                        quotePfp.src = `/assets/imgs/defaultPfp.png`;
                     }
                     const quoteContent = document.createElement("div");
                     quoteContent.classList.add("quoteContent");

                     const quoteHeader = document.createElement("div");
                     quoteHeader.classList.add("quoteHeader");

                     const quoteDisplay = document.createElement("span");
                     quoteDisplay.classList.add("quoteDisplay");
                     if (quoteUser.suspensionStatus !== "suspended") {
                        quoteDisplay.textContent = quoteUser.display;
                     } else {
                        quoteDisplay.textContent = "User Unavailable";
                     }

                     const quoteUsername = document.createElement("span");
                     quoteUsername.classList.add("quoteUsername");
                     if (quoteUser.suspensionStatus !== "suspended") {
                        if (quoteUser.pronouns !== undefined && quoteUser.pronouns !== "") {
                           quoteUsername.textContent = `@${quoteUser.username} • ${quoteUser.pronouns}`;
                        } else {
                           quoteUsername.textContent = `@${quoteUser.username}`;
                        }
                     } else {
                        quoteUsername.textContent = `User Unavailable`;
                     }

                     const quoteText = document.createElement("span");
                     quoteText.classList.add("quoteText");
                     let content = sanitizeAndLinkify(quoteData.text);
                     if (content.length > 247) { // check length
                        content = content.substring(0, 247) + "...";
                     }
                     if (quoteUser.suspensionStatus !== "suspended") {
                        quoteText.innerHTML = content;
                     } else {
                        quoteText.textContent = `@${quoteUser.username} is suspended, and notes by this user cannot be viewed.`;
                     }

                     container.appendChild(quotePfp);
                     container.appendChild(quoteContent);
                     quoteHeader.appendChild(quoteDisplay);
                     quoteHeader.appendChild(quoteUsername);
                     quoteContent.appendChild(quoteHeader);
                     quoteContent.appendChild(quoteText);
                     twemoji.parse(quoteText, {
                        folder: 'svg',
                        ext: '.svg'
                     });
                  })
               } else {
                  const quotePfp = document.createElement("img");
                  quotePfp.classList.add("quotePfp");
                  quotePfp.setAttribute("draggable", "false");
                  quotePfp.src = `/assets/imgs/defaultPfp.png`;

                  const quoteContent = document.createElement("div");
                  quoteContent.classList.add("quoteContent");

                  const quoteHeader = document.createElement("div");
                  quoteHeader.classList.add("quoteHeader");

                  const quoteDisplay = document.createElement("span");
                  quoteDisplay.classList.add("quoteDisplay");
                  quoteDisplay.textContent = "Unknown User";

                  const quoteUsername = document.createElement("span");
                  quoteUsername.classList.add("quoteUsername");
                  quoteUsername.textContent = `@unknownuser`;
                  

                  const quoteText = document.createElement("span");
                  quoteText.classList.add("quoteText");
                  quoteText.textContent = "You do not have permission to view this note.";

                  container.appendChild(quotePfp);
                  container.appendChild(quoteContent);
                  quoteHeader.appendChild(quoteDisplay);
                  quoteHeader.appendChild(quoteUsername);
                  quoteContent.appendChild(quoteHeader);
                  quoteContent.appendChild(quoteText);
               }
            })
         }

         // If flagged, display that.
         if (noteContent.isNsfw === true) {
            const contentWarning = document.createElement("p");
            contentWarning.classList.add("contentWarning-showBelowText");
            contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as NSFW`;

            noteDiv.appendChild(contentWarning);
         } else if (noteContent.isSensitive === true) {
            const contentWarning = document.createElement("p");
            contentWarning.classList.add("contentWarning-showBelowText");
            contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as sensitive`;

            noteDiv.appendChild(contentWarning);
         } else if (noteContent.isPolitical === true) {
            const contentWarning = document.createElement("p");
            contentWarning.classList.add("contentWarning-showBelowText");
            contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as political`;

            noteDiv.appendChild(contentWarning);
         }


         const buttonRow = document.createElement("div");
         buttonRow.classList.add("buttonRow");
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${firebase.auth().currentUser.uid}/experiments`).once("value", (val) => {
                  if (val.val().noteButtonLayout) {
                     buttonRow.classList.add("buttonRowExperiment");
                  }
               })
            }
         });

         // Add love button
         const loveBtn = document.createElement("p");
         loveBtn.classList.add("likeBtn");
         if (noteContent.likes !== undefined) {
            loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> ${noteContent.likes}`;

            firebase.auth().onAuthStateChanged((user) => {
               if (noteContent.whoLiked && noteContent.whoLiked[user.uid]) {
                  loveBtn.classList.add("liked");
               }
            })
         } else {
            loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> 0`;
         }
         loveBtn.setAttribute("id", `like-${noteContent.id}`);
         buttonRow.appendChild(loveBtn);

         // Add renote button
         const renoteBtn = document.createElement("p");
         renoteBtn.classList.add("renoteBtn");
         if (noteContent.renotes !== undefined) {
            renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> ${noteContent.renotes}`;

            firebase.auth().onAuthStateChanged((user) => {
               if (noteContent.whoRenoted && noteContent.whoRenoted[user.uid]) {
                  renoteBtn.classList.add("renoted");
               }
            })
         } else {
            renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> 0`;
         }
         renoteBtn.setAttribute("id", `renote-${noteContent.id}`);
         buttonRow.appendChild(renoteBtn);

         // Add reply button
         const replyBtn = document.createElement("p");
         replyBtn.classList.add("replyBtn");
         if (noteContent.replies !== undefined) {
            replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> ${noteContent.replies}`;
         } else {
            replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> 0`;
         }
         if (pathName !== "/note" && !pathName.startsWith("/note/")) {
            replyBtn.setAttribute("onclick", `window.location.href="/note/${noteContent.id}";`);
         } else {
            replyBtn.setAttribute("onclick", "replyToNote(this);");
         }
         buttonRow.appendChild(replyBtn);

         // Add quote renote button
         const quoteRenote = document.createElement("p");
         quoteRenote.classList.add("quoteRenoteBtn");
         quoteRenote.innerHTML = `<i class="fa-solid fa-quote-left"></i>`;
         quoteRenote.setAttribute("onclick", `quoteRenote("${noteContent.id}")`);
         buttonRow.appendChild(quoteRenote);

         // Add favorite button
         const favorite = document.createElement("p");
         favorite.classList.add("quoteRenoteBtn"); // eh. just reuse a class tbh
         favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}"></i>`; // apply the id to the favorites button or it will not change colors
         favorite.setAttribute("onclick", `favorite("${noteContent.id}")`);
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}/favorites/${noteContent.id}`).once("value", (snapshot) => {
                  if (snapshot.exists()) {
                     // checked if the user has already favorited this. if they have, change the color to indicate that
                     favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}" style="color: var(--main-color);"></i>`;
                  }
               });
            }
         });
         buttonRow.appendChild(favorite);

         // If user created the note, allow them to edit/delete
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               if (user.uid === noteContent.whoSentIt) {
                  const more = document.createElement("p");
                  more.classList.add("more");
                  more.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
                  buttonRow.appendChild(more);
               }
            }
         })

         noteDiv.appendChild(buttonRow);

         // Render note
         // BUT check for certain things first (such as if user is suspended, if user is blocked, etc.)
         // Prevent suspended users notes from rendering
         firebase.database().ref(`users/${noteContent.whoSentIt}`).once("value", (snapshot) => {
            const isSuspended = snapshot.val();

            if (isSuspended.suspensionStatus === "suspended") {
               noteDiv.remove();
            }
         })

         // If all is okay, do it fine.
         if (pathName === "/home" || pathName === "/u" || pathName.startsWith("/u/")) {
            if (pathName === "/u" || pathName.startsWith("/u/")) {
               const url = new URL(window.location.href);
               let userParam = null;

               if (pathName.startsWith("/u/")) {
                  const segments = pathName.split("/");
                  userParam = segments[2];

                  console.log(userParam);
               } else {
                  userParam = url.searchParams.get("id");
               }
               
               firebase.database().ref(`taken-usernames/${userParam}`).once("value", (snapshot) => {
                  const sender = snapshot.val();

                  if (noteContent.whoSentIt === sender.user) {
                     if (noteContent.replyingTo === undefined) {
                        if (noteContent.isDeleted !== true) {
                           notesContainer.appendChild(noteDiv);
                        }
                     }
                  }
               })
            } else {
               if (noteContent.replyingTo === undefined) {
                  if (noteContent.isDeleted !== true) {
                     notesContainer.appendChild(noteDiv);
                  }
               }
            }
         }

         if (pathName === "/favorites") {
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}/favorites/${noteContent.id}`).once("value", (snapshot) => {
                     if (snapshot.exists()) {
                        // only show if the user has favorited this note
                        notesContainer.appendChild(noteDiv);
                     }
                  });
               }
            });
         }

         if (pathName === "/note" || pathName.startsWith("/note/")) {
            const url = new URL(window.location.href);
            let noteParam = null;

            if (pathName.startsWith("/note/")) {
               const segments = pathName.split("/");
               noteParam = segments[2];

               console.log(noteParam);
            } else {
               noteParam = url.searchParams.get("id");
            }

            if (noteContent.replyingTo === noteParam) {
               if (noteContent.isDeleted !== true) {
                  notesContainer.appendChild(noteDiv);
               }
            }
         }
      })
   }

   // notesRef.limitToLast(15).once('value')
   //    .then(function (snapshot) {
   //       const notesArray = [];
   //       snapshot.forEach(function (childSnapshot) {
   //          const noteContent = childSnapshot.val();
   //          notesArray.push(noteContent);
   //       });

   //       // sort notes by timestamp, newest first
   //       notesArray.sort((a, b) => b.createdAt - a.createdAt);

   //       // create and append divs for each note
   //       const notesContainer = document.getElementById('notes');
   //       notesArray.forEach(noteContent => {
   //          const noteDiv = createNoteDiv(noteContent);
   //          if (document.getElementById("newNotesAvailable")) {
   //             document.getElementById("newNotesAvailable").style.display = "none";
   //          }

   //          // Check if the note has NSFW/Sensitive content and users preferences
   //          // Do this immediately or bugs will arise (that I don't feel like fixing)
            
   //       });
   //    })
   //    .catch(function (error) {
   //       console.error("TransSocial encountered an error trying to load notes:", error);
   //       console.error("TransSocial encountered an error trying to load notes: " + error + " Please check your internet connection or report an issue on GitHub (https://github.com/katniny/transsocial-issues/issues).");
   //    });

   // When a new note is added, let the user know.
   firebase.database().ref("notes/").on("child_added", (snapshot) => {
      const isReply = snapshot.val();
      if (isReply.replyingTo === undefined) {
         if (pathName === "/home" || pathName === "/home.html") {
            document.getElementById("newNotesAvailable").style.display = "block";
         }
      }
   })

   firebase.database().ref("notes/").on("child_changed", (snapshot) => {
      const data = snapshot.val();
      //console.log(data);

      // Check if any specific field (child) is updated
      document.getElementById(`like-${data.id}`).innerHTML = `<i class="fa-solid fa-heart"></i> ${data.likes}`;
      document.getElementById(`renote-${data.id}`).innerHTML = `<i class="fa-solid fa-retweet"></i> ${data.renotes}`;
      //console.log('Likes:', data.likes, 'Renotes:', data.renotes, 'Replies:', data.replies);

      firebase.auth().onAuthStateChanged((user) => {
         const uid = user.uid;

         // If user loved the note, update the UI to display that.
         if (data.whoLiked && data.whoLiked[uid]) {
            document.getElementById(`like-${data.id}`).classList.add("liked");
         } else {
            document.getElementById(`like-${data.id}`).classList.remove("liked");
         }

         // If user renoted the note, update the UI to display that.
         if (data.whoRenoted && data.whoRenoted[uid]) {
            document.getElementById(`renote-${data.id}`).classList.add("renoted");
         } else {
            document.getElementById(`renote-${data.id}`).classList.remove("renoted");
         }
      })
   });

   document.addEventListener('click', function (event) {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            const uid = user.uid;

            if (event.target.classList.contains("likeBtn") || event.target.classList.contains("fa-solid" && "fa-heart")) {
               const likeButton = event.target;
               const noteId = findNoteId(likeButton);

               const loveCountRef = firebase.database().ref(`notes/${noteId}/likes`);
               loveCountRef.once("value", (snapshot) => {
                  const data = snapshot.val();
                  //console.log(data);

                  firebase.database().ref(`notes/${noteId}/whoLiked`).once("value", (snapshot) => {
                     const likedData = snapshot.val();
                     if (likedData && likedData[uid]) {
                        firebase.database().ref(`notes/${noteId}`).update({
                           likes: data - 1
                        });

                        firebase.database().ref(`notes/${noteId}/whoLiked/${uid}`).remove();
                     } else {
                        firebase.database().ref(`notes/${noteId}`).update({
                           likes: data + 1
                        });

                        firebase.database().ref(`notes/${noteId}/whoLiked/${uid}`).update({
                           uid: uid
                        });

                        loveCountRef.off();

                        firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                           const whoSentIt_note = snapshot.val();

                           if (user.uid !== whoSentIt_note.whoSentIt) {
                              firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                                 const getUser = snapshot.val();
                                 sendNotification(getUser.whoSentIt, {
                                    type: "Love",
                                    who: user.uid,
                                    postId: noteId,
                                 });
                              })
                           }
                        })
                     }
                  });

                  return;
               })
            }
         }
      })
   });

   function findNoteId(likeButton) {
      // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
      return likeButton.closest(".note").id;
   };

   document.addEventListener('click', function (event) {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            const uid = user.uid;

            if (event.target.classList.contains("renoteBtn") || event.target.classList.contains("fa-solid" && "fa-retweet")) {
               const renoteButton = event.target;
               const noteId = findNoteId(renoteButton);

               const renoteCountRef = firebase.database().ref(`notes/${noteId}/renotes`);
               renoteCountRef.once("value", (snapshot) => {
                  const data = snapshot.val();
                  //console.log(data);

                  firebase.database().ref(`notes/${noteId}/whoRenoted`).once("value", (snapshot) => {
                     const renotedData = snapshot.val();
                     if (renotedData && renotedData[uid]) {
                        firebase.database().ref(`notes/${noteId}`).update({
                           renotes: data - 1
                        });

                        firebase.database().ref(`notes/${noteId}/whoRenoted/${uid}`).remove();
                        firebase.database().ref(`users/${uid}/posts/${noteId}`).remove();
                     } else {
                        firebase.database().ref(`notes/${noteId}`).update({
                           renotes: data + 1
                        });

                        firebase.database().ref(`notes/${noteId}/whoRenoted/${uid}`).update({
                           uid: uid
                        });

                        firebase.database().ref(`users/${uid}/posts/${noteId}`).update({
                           isRenote: true,
                        })

                        unlockAchievement("Express Yourself");

                        renoteCountRef.off();

                        firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                           const whoSentIt_note = snapshot.val();

                           if (user.uid !== whoSentIt_note.whoSentIt) {
                              firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                                 const getUser = snapshot.val();
                                 sendNotification(getUser.whoSentIt, {
                                    type: "Renote",
                                    who: user.uid,
                                    postId: noteId,
                                 });
                              })
                           }
                        })
                     }
                  });

                  return;
               })
            }
         }
      })
   });

   function findNoteId(renoteButton) {
      // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
      return renoteButton.closest(".note").id;
   };
}

// Hide profile in the sidebar if not signed in
function hideProfileSidebar() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         // No need to do anything further
         const notSignedIn = document.getElementById("notSignedIn");
         notSignedIn.style.display = "none";
         return true;
      } else {
         document.getElementById("userPfp-sidebar").style.display = "none";
         document.getElementById("displayName-sidebar").style.display = "none";
         document.getElementById("username-pronouns-sidebar").style.display = "none";
      }
   })
}

// Hide sidebar buttons + login thing
function hideSidebarButtons() {
   const notifications = document.getElementById("notificationsSidebar");
   const messages = document.getElementById("messagesSidebar");
   const enchanted = document.getElementById("enchantedSidebar");
   const settings = document.getElementById("settingsSidebar");
   const profile = document.getElementById("linkToAcc");
   const loginThing = document.getElementById("notSignedIn-banner");
   const createNote = document.getElementById("createNote-sidebar");

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         loginThing.style.display = "none";
         return;
      } else {
         profile.style.display = "none";
         notifications.style.display = "none";
         messages.style.display = "none";
         enchanted.style.display = "none";
         settings.style.display = "none";
         createNote.style.display = "none";
      }
   })
}

// Close help prompt
function closeHelpPrompt() {
   const supportTransSocial = document.getElementById("pleaseDonate");

   supportTransSocial.style.display = "none";
}

// Create note
function createNotePopup() {
   const notePopup = document.getElementById("createNote-popup");

   document.getElementById("mainTab-noteCreation").classList.remove("hidden");
   document.querySelector(".settingsStuff").classList.add("hidden");
   notePopup.showModal();

   if (renotingNote === null) {
      document.getElementById("quotingNote").style.display = "none";
   } else {
      document.getElementById("quotingNote").style.display = "block";

      firebase.database().ref(`notes/${renotingNote}`).once("value", (snapshot) => {
         const noteData = snapshot.val();

         firebase.database().ref(`users/${noteData.whoSentIt}`).once("value", (snapshot) => {
            const userData = snapshot.val();

            document.getElementById("notePopupQuotePfp").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteData.whoSentIt}%2F${userData.pfp}?alt=media`;
            document.getElementById("notePopupQuoteDisplay").textContent = userData.display;
            document.getElementById("notePopupQuoteUsername").textContent = `@${userData.username}`;
            document.getElementById("notePopupQuoteText").textContent = noteData.text;
         })
      })
   }
}

function closeCreateNotePopup() {
   const notePopup = document.getElementById("createNote-popup");

   document.getElementById("noteContent-textarea").value = "";
   document.getElementById("uploadingImage").style.display = "none";
   removeImage();
   document.getElementById("hasntBeenUploadedNotice").style.display = "none";
   if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
      document.getElementById("replyingOrCreating").innerText = "Create a Note!";
      isReplying_notehtml = false;
   }
   document.getElementById("isNsfw").checked = false;
   document.getElementById("isSensitive").checked = false;
   renotingNote = null;
   document.getElementById("spotifyPlayer").innerHTML = "";
   document.getElementById("songQuery").value = "";
   pickedMusic = null;

   notePopup.close();
}

// Swap Note Settings/Creation Tab
let currentTab = "note";

function swapNoteTab(tab) {
   if (tab === "note") {
      if (currentTab === "note") {
         document.getElementById("mainTab-noteCreation").classList.add("hidden");
         document.querySelector(".settingsStuff").classList.remove("hidden");
         document.getElementById("musicTab").classList.add("hidden");
         currentTab = "settings";
      } else {
         document.getElementById("mainTab-noteCreation").classList.remove("hidden");
         document.querySelector(".settingsStuff").classList.add("hidden");
         document.getElementById("musicTab").classList.add("hidden");
         currentTab = "note";
      }
   } else if (tab === "settings") {
      if (currentTab === "settings") {
         document.getElementById("mainTab-noteCreation").classList.remove("hidden");
         document.querySelector(".settingsStuff").classList.add("hidden");
         document.getElementById("musicTab").classList.add("hidden");
         currentTab = "settings";
      } else {
         document.getElementById("mainTab-noteCreation").classList.add("hidden");
         document.querySelector(".settingsStuff").classList.remove("hidden");
         document.getElementById("musicTab").classList.add("hidden");
         currentTab = "note";
      }
   } else if (tab === "music") {
      if (currentTab === "music") {
         document.getElementById("mainTab-noteCreation").classList.remove("hidden");
         document.querySelector(".settingsStuff").classList.add("hidden");
         document.getElementById("musicTab").classList.add("hidden");
         currentTab = "note";
      } else {
         document.getElementById("mainTab-noteCreation").classList.add("hidden");
         document.querySelector(".settingsStuff").classList.add("hidden");
         document.getElementById("musicTab").classList.remove("hidden");
         currentTab = "music";
      }
   }
}

// Load everything
function loadEverything() {
   getUserPfpSidebar();
   getUserInfoSidebar();
   linkButtonToAcc();
   hideProfileSidebar();
   hideSidebarButtons();
   Notification.requestPermission();
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/`).once("value", (snapshot) => {
            const isDMSEnabled = snapshot.val();

            if (isDMSEnabled.directMessagesExperiment === undefined) {
               document.getElementById("messagesSidebar").style.display = "none";
            } else {
               document.getElementById("messagesSidebar").style.display = "block";
            }
         })
      }
   })
}

// TransSocial account stuff
if (!pathName.startsWith("/auth/")) {
   database.ref("users/G6GaJr8vPpeVdvenAntjOFYlbwr2").once("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
         document.getElementById(`katninyPfp`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2FG6GaJr8vPpeVdvenAntjOFYlbwr2%2F${data.pfp}?alt=media`;
         document.getElementById(`katninyDisplay`).innerHTML = data.display + ` <i class="fa-solid fa-circle-check" style="color: var(--main-color);"></i> <i class="fa-solid fa-heart" style="color: var(--main-color);"></i>`;
         document.getElementById(`followBtn-1`).href = `/u/${data.username}`;
         document.getElementById(`katninyUser-pronouns`).textContent = `@${data.username}`;
      }
   });

   database.ref("users/80vDnNb0rJbSjCvbiTF9EtvqtXw1").once("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
         document.getElementById(`transsocialPfp`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F80vDnNb0rJbSjCvbiTF9EtvqtXw1%2F${data.pfp}?alt=media`;
         document.getElementById(`transsocialDisplay`).innerHTML = data.display + ` <i class="fa-solid fa-circle-check" style="color: var(--main-color);"></i>`;
         document.getElementById(`followBtn-2`).href = `/u/${data.username}`;
         document.getElementById(`transsocialUser-pronouns`).textContent = `@${data.username}`;
      }
   });

   database.ref("users/4luqDI8627asR5EV8hOqb0YrRQF3").once("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
         document.getElementById(`katninystudiosPfp`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F4luqDI8627asR5EV8hOqb0YrRQF3%2F${data.pfp}?alt=media`;
         document.getElementById(`katninystudiosDisplay`).innerHTML = data.display + ` <i class="fa-solid fa-circle-check" style="color: var(--main-color);"></i>`;
         document.getElementById(`followBtn-3`).href = `/u/${data.username}`;
         document.getElementById(`katninystudiosUser-pronouns`).textContent = `@${data.username}`;
      }
   });
}

// Get the user's information to display on the profile
if (pathName === "/u.html" || pathName === "/u" || pathName.startsWith("/u/")) {
   const url = new URL(window.location.href);
   let userParam = null;
   let profileExists = null;
   let profileData = null;

   if (pathName.startsWith("/u/")) {
      const segments = pathName.split("/");
      userParam = segments[2];

      console.log(userParam);
   } else {
      userParam = url.searchParams.get("id");
   }

   database.ref(`taken-usernames/${userParam.toLowerCase()}`).once("value", (snapshot) => {
      profileExists = snapshot.val();

      if (profileExists.user !== null) {
         document.getElementById("userNotFound").style.display = "none";
         database.ref(`users/${profileExists.user}`).once("value", (snapshot) => {
            profileData = snapshot.val();

            if (profileData.suspensionStatus !== "suspended") {
               document.title = `${profileData.display} (@${profileData.username}) | TransSocial`;
               document.getElementById(`melissa`).style.display = "block";
               document.getElementById(`userImage-profile`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${profileExists.user}%2F${profileData.pfp}?alt=media`;
               document.getElementById(`display-profile`).textContent = profileData.display;
               const verifiedBadge = document.createElement("span");
               if (profileData.isVerified) {
                  verifiedBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
                  verifiedBadge.style.marginLeft = "7px";
               }
               if (profileData.isSubscribed === true) {
                  verifiedBadge.innerHTML = `${verifiedBadge.innerHTML}<i class="fa-solid fa-heart" style="margin-left: 3px;"></i>`;
               }
               if (profileData.activeContributor === true) {
                  verifiedBadge.innerHTML = `${verifiedBadge.innerHTML}<i class="fa-solid fa-handshake-angle fa-sm"></i>`;
               }
               verifiedBadge.classList.add("noteBadges");
               document.getElementById(`display-profile`).appendChild(verifiedBadge);
               document.getElementById(`username-profile`).textContent = `@${profileData.username}`;

               if (profileData.banner) {
                  document.getElementById(`userImage-banner`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fbanner%2F${profileExists.user}%2F${profileData.banner}?alt=media`;
               }

               document.getElementById("interactingWithWho").textContent = `User Actions for @${profileData.username}`;

               firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                     if (user.uid === profileExists.user) {
                        document.getElementById("blockUser").style.display = "none";
                        document.getElementById("interactingWithWho_desc").textContent = "Would you like to do with your profile?";
                        document.getElementById("profileSidebar").classList.add("active");
                     } else {
                        document.getElementById("editProfile").remove();
                     }

                     firebase.database().ref(`users/${user.uid}/blocked/${profileExists.user}`).once("value", (snapshot) => {
                        const isBlocked = snapshot.val();

                        if (isBlocked === null) {
                           document.getElementById("ifUserBlocked_Current").style.display = "none";
                        } else if (isBlocked !== null) {
                           document.getElementById("ifUserBlocked_Current").style.display = "block";
                           document.getElementById("blockUser").style.display = "none";
                           document.getElementById("unblockUser").style.display = "block";
                           document.getElementById("whoIsBlocked").textContent = `@${profileData.username} is blocked`;
                           document.getElementById("whoIsBlocked_desc").textContent = `@${profileData.username} is blocked. Would you like to view their notes anyway or unblock them?`;
                           document.getElementById("followButton").remove();
                           document.getElementById("userActions").style.marginLeft = "15px";
                        }
                     })

                     firebase.database().ref(`users/${profileExists.user}/blocked/${user.uid}`).once("value", (snapshot) => {
                        const blocked = snapshot.val();

                        if (blocked === null) {
                           // Don't do anything, it's possible that this would hide the warning if the user visiting has blocked the other.
                        } else if (blocked !== null) {
                           document.getElementById("ifUserBlocked_Current").style.display = "block";
                           document.getElementById("blockUser").style.display = "none";
                           document.getElementById("unblockUser").style.display = "none";
                           document.getElementById("whoIsBlocked").textContent = `@${profileData.username} blocked you`;
                           document.getElementById("whoIsBlocked_desc").textContent = `@${profileData.username} blocked you. You may not see their notes.`;
                           // document.getElementById("followButton").remove();
                           document.getElementById("showNotesButton").remove();
                           document.getElementById("unblockUserButton").remove();
                        }
                     })
                  }
               })
            } else {
               document.getElementById(`melissa`).style.display = "none";
               document.getElementById("userNotFound").style.display = "block";

               document.getElementById("userNotFound").innerHTML = `
                  <h1>User is unavailable.</h1>
                  <p>This user is suspended from TransSocial, so you cannot view their profile. If they get unsuspended--if ever--their profile will be available to view again.</p>

                  <a href="/home"><button>Go Home</button></a>
               `
            }
            

            if (profileData.pronouns === undefined || profileData.pronouns === null || profileData.pronouns === "") {
               document.getElementById(`pronouns-profile`).remove();
            } else {
               document.getElementById(`pronouns-profile`).textContent = profileData.pronouns;
            }

            if (profileData.bio === undefined || profileData.bio === null || profileData.bio === "") {
               document.getElementById("bio-profile").textContent = "No user bio provided.";
            } else {
               document.getElementById("bio-profile").innerHTML = sanitizeAndLinkify(profileData.bio);
               twemoji.parse(document.getElementById("bio-profile"), {
                  folder: 'svg',
                  ext: '.svg'
               });
            }

            if (profileData.followers === undefined) {
               document.getElementById("followers").textContent = "0 ";
            } else {
               document.getElementById("followers").textContent = `${profileData.followers} `;
            }

            if (profileData.following === undefined) {
               document.getElementById("following").textContent = "0 ";
            } else {
               document.getElementById("following").textContent = `${profileData.following} `;
            }

            // If user profile and logged in user are the same
            firebase.auth().onAuthStateChanged((user) => {
               if (user.uid === profileExists.user) {
                  document.getElementById("followButton").textContent = "Edit Profile";
                  document.getElementById("followButton").setAttribute("onclick", 'window.location.href="/settings"');
               } else {
                  const currentUserUid = user.uid;
                  const profileUserUid = profileExists.user;
                  const currentUserFollowsRef = firebase.database().ref(`users/${profileUserUid}/whoFollows`);

                  currentUserFollowsRef.once('value', (snapshot) => {
                     const followersData = snapshot.val();

                     if (followersData && followersData[currentUserUid]) {
                        document.getElementById("followButton").textContent = "Following";
                     } else {
                        //...
                     }
                  });
               }
            })
         })
      }

      // Achievements
      firebase.database().ref(`users/${profileExists.user}/achievements/transsocial/firstSteps`).once("value", (snapshot) => {
         const unlocked = snapshot.exists();
         const data = snapshot.val();

         if (unlocked === true) {
            document.getElementById("firstStepsAchievement").classList.remove("locked");
            document.getElementById("unlockDescription_fs").textContent = "You've taken the plunge! Welcome to TransSocial! (Create a note)";
            document.getElementById("unlockDate_fs").textContent = `Unlocked ${data.unlockedWhen}`;
         } else {
            firebase.database().ref(`users/${profileExists.user}`).once("value", (snapshot) => {
               const user = snapshot.val();

               document.getElementById("unlockDescription_fs").textContent = `@${user.username} hasn't unlocked this achievement yet.`;
            })
         }
      })

      firebase.database().ref(`users/${profileExists.user}/achievements/transsocial/expressYourself`).once("value", (snapshot) => {
         const unlocked = snapshot.exists();
         const data = snapshot.val();

         if (unlocked === true) {
            document.getElementById("expressYourselfAchievement").classList.remove("locked");
            document.getElementById("unlockDescription_ey").textContent = "Unleash your inner rockstar! (Renote a note)";
            document.getElementById("unlockDate_ey").textContent = `Unlocked ${data.unlockedWhen}`;
         } else {
            firebase.database().ref(`users/${profileExists.user}`).once("value", (snapshot) => {
               const user = snapshot.val();

               document.getElementById("unlockDescription_ey").textContent = `@${user.username} hasn't unlocked this achievement yet.`;
            })
         }
      })

      firebase.database().ref(`users/${profileExists.user}/achievements/transsocial/theSocialButterfly`).once("value", (snapshot) => {
         const unlocked = snapshot.exists();
         const data = snapshot.val();

         if (unlocked === true) {
            document.getElementById("theSocialButterflyAchievement").classList.remove("locked");
            document.getElementById("unlockDescription_tsb").textContent = "Spread your wings and fly! (Follow another user on TransSocial)";
            document.getElementById("unlockDate_tsb").textContent = `Unlocked ${data.unlockedWhen}`;
         } else {
            firebase.database().ref(`users/${profileExists.user}`).once("value", (snapshot) => {
               const user = snapshot.val();

               document.getElementById("unlockDescription_tsb").textContent = `@${user.username} hasn't unlocked this achievement yet.`;
            })
         }
      })

      firebase.database().ref(`users/${profileExists.user}/achievements/transsocial/chatterbox`).once("value", (snapshot) => {
         const unlocked = snapshot.exists();
         const data = snapshot.val();

         if (unlocked === true) {
            document.getElementById("chatterboxAchievement").classList.remove("locked");
            document.getElementById("unlockDescription_cb").textContent = "Conversation starter! (Reply to a note)";
            document.getElementById("unlockDate_cb").textContent = `Unlocked ${data.unlockedWhen}`;
         } else {
            firebase.database().ref(`users/${profileExists.user}`).once("value", (snapshot) => {
               const user = snapshot.val();

               document.getElementById("unlockDescription_cb").textContent = `@${user.username} hasn't unlocked this achievement yet.`;
            })
         }
      })
   })

   function followUser() {
      firebase.auth().onAuthStateChanged((user) => {
         const currentUserUid = user.uid;
         const profileUserUid = profileExists.user;
         const currentUserFollowsRef = firebase.database().ref(`users/${profileUserUid}/whoFollows`);
         let isBlocked = null;

         currentUserFollowsRef.once('value', (snapshot) => {
            const followersData = snapshot.val();

            firebase.database().ref(`users/${profileUserUid}/blocked`).once("value", (snapshot) => {
               const getUser = snapshot.val();

               if (getUser && getUser[user.uid]) {
                  document.getElementById('youAreBlocked').showModal();
               } else {
                  if (followersData && followersData[currentUserUid]) {
                     firebase.database().ref().update({
                        [`users/${profileUserUid}/whoFollows/${currentUserUid}`]: null,
                        [`users/${profileUserUid}/followers`]: firebase.database.ServerValue.increment(-1),
                        [`users/${currentUserUid}/followingWho/${profileUserUid}`]: null,
                        [`users/${currentUserUid}/following`]: firebase.database.ServerValue.increment(-1)
                     }); // ENDS HERE.

                     unblockUser();
                     //window.location.reload();
                  } else {
                     firebase.auth().onAuthStateChanged((user) => {
                        if (user) { // Check if user is logged in 
                           const currentUserUid = user.uid;
                           const profileUserUid = profileExists.user; // Assuming you get this from elsewhere

                           // Use a database transaction
                           firebase.database().ref().update({
                              [`users/${profileUserUid}/whoFollows/${currentUserUid}`]: { uid: currentUserUid },
                              [`users/${profileUserUid}/followers`]: firebase.database.ServerValue.increment(1),
                              [`users/${currentUserUid}/followingWho/${profileUserUid}`]: { uid: profileUserUid },
                              [`users/${currentUserUid}/following`]: firebase.database.ServerValue.increment(1)
                           });

                           sendNotification(profileUserUid, {
                              type: "Follow",
                              who: currentUserUid,
                           });

                           unlockAchievement("The Social Butterfly");

                           window.location.reload();
                        }
                     });
                  }

               }
            })
         });
      })
   }

   // User Actions
   function userActions() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            document.getElementById("userActions-dialog").showModal();
         } else {
            loginModal();
         }
      })
   }

   function blockUser() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/blocked/${profileExists.user}`).update({
               user: profileExists.user
            })

            firebase.database().ref(`users/${user.uid}/followingWho/${profileExists.user}`).once("value", (snapshot) => {
               const exists = snapshot.val();

               if (exists === null) {
                  window.location.reload();
               } else {
                  followUser();
               }
            })
         } else {
            loginPrompt();
         }
      })
   }

   function unblockUser() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/blocked/${profileExists.user}`).update({
               user: null
            })

            window.location.reload();
         } else {
            loginPrompt();
         }
      })
   }

   // Filters
   function notesFilter() {
      document.getElementById("filterNotes").classList.add("active");
      document.getElementById("filterAchievements").classList.remove("active");

      document.getElementById("notes").style.display = "block";
      document.getElementById("achievementsContent").style.display = "none";
   }

   function achievementsFilter() {
      document.getElementById("filterNotes").classList.remove("active");
      document.getElementById("filterAchievements").classList.add("active");

      document.getElementById("notes").style.display = "none";
      document.getElementById("achievementsContent").style.display = "block";
   }
};

// Upload Notes with or without images
function uploadImage() {
   const imageUploadInput = document.getElementById("imageUploadInput");
   imageUploadInput.click();

   document.getElementById("imageUploadInput").addEventListener("change", () => {
      let fileName = document.getElementById("imageUploadInput").value;
      let extension = fileName.split(".").pop();

      if (extension !== "png" && extension !== "jpg" && extension !== "webp" && extension !== "jpeg" && extension !== "gif" && extension !== "mp4") {
         document.getElementById("uploadingImage").textContent = "Unsupported file type. Only .png, .jpg (.jpeg), .webp, .gif and .mp4 files are supported.";
         document.getElementById("uploadingImage").style.display = "block";
         document.getElementById("imageUploadInput").value = "";
         document.getElementById("uploadingImage").style.color = "var(--error-text)";
      } else {
         document.getElementById("uploadingImage").textContent = "";
         document.getElementById("uploadingImage").style.display = "none";

         let file = event.target.files[0];
         if (file) {
            let MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                     const hi = snapshot.val();

                     if (hi.isSubscribed === true) {
                        // if subscribed, make their limit 35MB as promised
                        MAX_FILE_SIZE_BYTES = 35 * 1024 * 1024;
                     }

                     if (file.size > MAX_FILE_SIZE_BYTES) {
                        if (MAX_FILE_SIZE_BYTES === 35 * 1024 * 1024) {
                           document.getElementById("uploadingImage").textContent = "File size is over the file size limit (35MB).";
                        } else {
                           document.getElementById("uploadingImage").textContent = "File size is over the file size limit (10MB). You can increase the file size limit with a Katniny+ subscription.";
                        }
                        document.getElementById("uploadingImage").style.display = "block";
                        document.getElementById("uploadingImage").style.color = "var(--error-text)";
                        document.getElementById("imageUploadInput").value = "";
                        document.getElementById("imgToBeUploaded").style.display = "none";
                     } else {
                        if (extension !== "mp4") {
                           const reader = new FileReader();
         
                           reader.addEventListener("load", (event) => {
                              document.getElementById("imgToBeUploaded").src = event.target.result;
                              document.getElementById("imgToBeUploaded").style.display = "block";
                              document.getElementById("hasntBeenUploadedNotice").style.display = "block";
                              document.getElementById("removeUploadedImage").style.display = "block";
                              document.getElementById("addAltTextToImage").style.display = "block";
                           });
         
                           reader.readAsDataURL(file);
                        } else {
                           const reader = new FileReader();
         
                           reader.addEventListener("load", (event) => {
                              document.getElementById("vidToBeUploaded").src = event.target.result;
                              document.getElementById("vidToBeUploaded").style.display = "block";
                              document.getElementById("vidToBeUploaded").style.display = "block";
                              document.getElementById("hasntBeenUploadedNotice").style.display = "block";
                              document.getElementById("removeUploadedImage").style.display = "block";
                              document.getElementById("addAltTextToImage").style.display = "block";
                           });
         
                           reader.readAsDataURL(file);
                        }
                     }
                  })
               }
            })
         }
      }
   })
}

function removeImage() {
   document.getElementById("imgToBeUploaded").src = "";
   document.getElementById("vidToBeUploaded").src = "";
   document.getElementById("vidToBeUploaded").style.display = "none";
   document.getElementById("imageUploadInput").value = "";
   document.getElementById("removeUploadedImage").style.display = "none";
   document.getElementById("hasntBeenUploadedNotice").style.display = "none";
   document.getElementById("addAltTextToImage").style.display = "none";
}

function isTextareaEmpty(text) {
   const trimmedValue = text.trim();
   return /^\s*$/.test(trimmedValue);
}

// Remove Sensitive Content Warning
function removeSensitive(buttonId) {
   // Remove "-closeWarning" from the ID to get the note's ID
   const noteId = buttonId.slice(0, -13);

   // Delete the warning, info about the warning, the button and the blur
   document.getElementById(`${noteId}-warning`).remove();
   document.getElementById(`${noteId}-warningInfo`).remove();
   document.getElementById(`${noteId}-closeWarning`).remove();
   document.getElementById(`${noteId}-blur`).remove();
}

// Remove NSFW Content Warning
function removeNsfw(buttonId) {
   // Remove "-closeWarning" from the ID to get the note's ID
   const noteId = buttonId.slice(0, -13);

   // Delete the warning, info about the warning, the button and the blur
   document.getElementById(`${noteId}-warning`).remove();
   document.getElementById(`${noteId}-closeWarning`).remove();
   document.getElementById(`${noteId}-warningInfo`).remove();
   document.getElementById(`${noteId}-blur`).remove();
}

// Get the note's information to display in the container
let uniNoteId_notehtml = null;
let isReplying_notehtml = false;

if (pathName === "/note.html" || pathName === "/note" || pathName.startsWith("/u/") || pathName.startsWith("/note/")) {
   const url = new URL(window.location.href);
   let userParam = null;
   if (pathName.startsWith("/note/")) {
      const segments = pathName.split("/");
      userParam = segments[2];

      console.log(userParam);
   } else {
      userParam = url.searchParams.get("id");
   }
   isReplying_notehtml = false;

   database.ref(`notes/${userParam}`).once("value", (snapshot) => {
      const noteData = snapshot.val();

      
      uniNoteId_notehtml = noteData.id;
      

      if (noteData.isDeleted !== true) {
         if (noteData.user !== null && noteData.replyingTo === undefined) {
            document.getElementById("melissa").style.display = "block";
            document.getElementById("noteNotFound").style.display = "none";

            document.getElementById("quoteRenoteButton").setAttribute("onclick", `quoteRenote("${noteData.id}")`);
            if (noteData.quoting) {
               firebase.database().ref(`notes/${noteData.quoting}`).once("value", (snapshot) => {
                  const quoteData = snapshot.val();

                  if (quoteData.isDeleted !== true) {
                     firebase.database().ref(`users/${quoteData.whoSentIt}`).once("value", (snapshot) => {
                        const quoteUser = snapshot.val();

                        if (quoteUser.suspensionStatus !== "suspended") {
                           document.getElementById("noteQuotePfp").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${quoteData.whoSentIt}%2F${quoteUser.pfp}?alt=media`;
                           document.getElementById("noteQuoteDisplay").textContent = quoteUser.display;
                           document.getElementById("noteQuoteUsername").textContent = `@${quoteUser.username}`;
                           document.getElementById("noteQuoteText").innerHTML = sanitizeAndLinkify(quoteData.text);
                           let content = sanitizeAndLinkify(quoteData.text);
                              if (content.length > 247) { // check length
                                 content = content.substring(0, 247) + "...";
                              }
                              document.getElementById("noteQuoteText").innerHTML = content;
                           twemoji.parse(document.getElementById("noteQuoteText"), {
                              folder: 'svg',
                              ext: '.svg'
                           });
                        } else {
                           document.getElementById("noteQuotePfp").src = `/assets/imgs/defaultPfp.png`;
                           document.getElementById("noteQuoteDisplay").textContent = "User Unavailable";
                           document.getElementById("noteQuoteUsername").textContent = `User Unavailable`;
                           document.getElementById("noteQuoteText").innerHTML = sanitizeAndLinkify(quoteData.text);
                           document.getElementById("noteQuoteText").innerHTML = `@${quoteUser.username} is suspended, and notes by this user cannot be viewed.`;
                        }

                        document.getElementById("quotingNote_note").setAttribute("onclick", `window.location.href="/note/${quoteData.id}"`);
                     })
                  } else {
                     document.getElementById("noteQuotePfp").src = `/assets/imgs/defaultPfp.png`;
                     document.getElementById("noteQuoteDisplay").textContent = "Unknown User";
                     document.getElementById("noteQuoteUsername").textContent = `@unknownuser`;
                     document.getElementById("noteQuoteText").innerHTML = "You do not have permission to view this note.";
                  }
               })
            } else {
               document.getElementById("quotingNote_note").style.display = "none";
            }

            // check if music
            if (noteData.music) {
               document.getElementById("songEmbed").src = `https://open.spotify.com/embed/track/${noteData.music}`;
            } else {
               document.getElementById("songEmbed").remove();
            }

            // check for favorites
            // also make the favorite button do smth
            document.getElementById("favoriteButton").setAttribute("onclick", `favoriteNoteView("${noteData.id}")`);

            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`users/${user.uid}/favorites/${noteData.id}`).once("value", (snapshot) => {
                     if (snapshot.exists()) {
                        document.getElementById("favoriteButton_icon").style.color = "var(--main-color)";
                     }
                  });
               }
            });

            database.ref(`users/${noteData.whoSentIt}`).once("value", (snapshot) => {
               const profileData = snapshot.val();
               if (profileData.suspensionStatus !== "suspended") {
                  if (noteData.text !== "") {
                     document.title = `"${noteData.text}" / @${profileData.username} on TransSocial`;
                  } else {
                     document.title = `@${profileData.username} on TransSocial`;
                  }
                  document.getElementById(`melissa`).style.display = "block";
                  document.getElementById(`userImage-profile`).src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteData.whoSentIt}%2F${profileData.pfp}?alt=media`;
                  document.getElementById(`userImage-profile`).setAttribute("onclick", `window.location.href="/u/${profileData.username}"`);
                  document.getElementById(`display-profile`).textContent = profileData.display;
                  document.getElementById(`display-profile`).setAttribute("onclick", `window.location.href="/u/${profileData.username}"`);
                  const verifiedBadge = document.createElement("span");
                  if (profileData.isVerified === true) {
                     verifiedBadge.innerHTML = `<i class="fa-solid fa-circle-check fa-sm"></i>`;
                     verifiedBadge.classList.add("noteBadges");
                     verifiedBadge.style.marginLeft = "7px";
                  }
                  if (profileData.isSubscribed === true) {
                     verifiedBadge.innerHTML = `${verifiedBadge.innerHTML}<i class="fa-solid fa-heart fa-sm" style="margin-left: 3px;"></i>`
                  }
                  if (profileData.activeContributor === true) {
                     verifiedBadge.innerHTML = `${verifiedBadge.innerHTML}<i class="fa-solid fa-handshake-angle fa-sm" style="margin-left: 3px;"></i>`;
                  }
                  document.getElementById("display-profile").appendChild(verifiedBadge);
                  document.getElementById(`username-profile`).textContent = `@${profileData.username}`;
                  document.getElementById(`username-profile`).setAttribute("onclick", `window.location.href="/u/${profileData.username}"`);
                  if (profileData.pronouns === undefined || profileData.pronouns === null || profileData.pronouns === "") {
                     document.getElementById(`pronouns-profile`).remove();
                  } else {
                     document.getElementById(`pronouns-profile`).textContent = profileData.pronouns;
                     document.getElementById(`pronouns-profile`).setAttribute("onclick", `window.location.href="/u/${profileData.username}"`);
                  }

                  document.getElementById("noteContent").innerHTML = sanitizeAndLinkify(noteData.text);
                  twemoji.parse(document.getElementById("noteContent"), {
                     folder: 'svg',
                     ext: '.svg'
                  });
                  document.getElementById("likeButton").innerHTML = `<i class="fa-solid fa-heart"></i> ${noteData.likes}`;
                  document.getElementById("renoteButton").innerHTML = `<i class="fa-solid fa-retweet"></i> ${noteData.renotes}`;

                  if (noteData.image) {
                     let imageFileName = noteData.image;
                     let imageExtension = imageFileName.split(".").pop();
                     const url = imageExtension;
                     const cleanUrl = url.split('?')[0];

                     if (cleanUrl === "mp4") {
                        document.getElementById("uploadedVideo-main").src = noteData.image;
                        document.getElementById("uploadedVideo-main").setAttribute("alt", `${noteData.alt}`);
                        firebase.auth().onAuthStateChanged((user) => {
                           if (user) {
                              firebase.database().ref(`users/${user.uid}/autoplayVideos`).once("value", (snapshot) => {
                                 const evenExists = snapshot.exists();
                                 const pref = snapshot.val();

                                 if (evenExists === true) {
                                    if (pref === "true") {
                                       // :p
                                    } else if (pref === false) {
                                       document.getElementById("uploadedVideo-main").pause();
                                    } else {
                                       // :p
                                    }
                                 } else {
                                    // :p
                                 }
                              })
                           } else {
                              // :p
                           }
                        })
                        document.getElementById("uploadedImg-main").remove();
                     } else {
                        document.getElementById("uploadedImg-main").src = noteData.image;
                        document.getElementById("uploadedImg-main").setAttribute("alt", `${noteData.alt}`);
                        document.getElementById("uploadedVideo-main").remove();
                     }
                  } else {
                     document.getElementById("uploadedImg-main").remove();
                     document.getElementById("uploadedVideo-main").remove();
                  }

                  firebase.auth().onAuthStateChanged((user) => {
                     if (user) {
                        const uid = user.uid;

                        if (noteData.whoLiked && noteData.whoLiked[uid]) {
                           document.getElementById("likeButton").classList.add("liked");
                        } else {
                           document.getElementById("likeButton").classList.remove("liked");
                        }

                        if (noteData.whoRenoted && noteData.whoRenoted[uid]) {
                           document.getElementById("renoteButton").classList.add("renoted");
                        } else {
                           document.getElementById("renoteButton").classList.remove("renoted");
                        }
                     } else {
                        document.getElementById("likeButton").classList.remove("liked");
                     }
                  })
               } else {
                  document.getElementById("melissa").style.display = "none";
                  document.getElementById("noteNotFound").style.display = "block";

                  document.getElementById("noteNotFound").innerHTML = `
                     <h1>This note is unavailable</h1>
                     <p>TransSocial cannot show you this note because the creator is suspended from TransSocial. If this user gets unsuspended--if ever--this note will be available to view again.</p>

                     <a href="/home"><button>Go Home</button></a>
                  `;
               }
            })
         } else if (noteData === undefined) {
            document.getElementById("melissa").style.display = "none";
         } else if (noteData.replyingTo !== undefined) {
            window.location.replace(`/note/${noteData.replyingTo}`);
         } else {
            document.getElementById("melissa").style.display = "none";
         }

         if (userParam === "" || userParam === "undefined") {
            document.getElementById("melissa").style.display = "none";
            document.getElementById("noteNotFound").style.display = "block";
         }
      }
   })

   function likeNote() {
      database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
         const data = snapshot.val();

         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               if (data.whoLiked && data.whoLiked[user.uid]) {
                  firebase.database().ref(`notes/${data.id}/whoLiked/${user.uid}`).remove();

                  firebase.database().ref(`notes/${data.id}`).update({
                     likes: data.likes - 1
                  })

                  database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const newData = snapshot.val();

                     document.getElementById("likeButton").innerHTML = `<i class="fa-solid fa-heart"></i> ${newData.likes}`;
                     document.getElementById("likeButton").classList.remove("liked");
                  })
               } else {
                  firebase.database().ref(`notes/${data.id}/whoLiked/${user.uid}`).update({
                     uid: user.uid
                  })

                  firebase.database().ref(`notes/${data.id}`).update({
                     likes: data.likes + 1
                  })

                  database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const newData = snapshot.val();

                     document.getElementById("likeButton").innerHTML = `<i class="fa-solid fa-heart"></i> ${newData.likes}`;
                     document.getElementById("likeButton").classList.add("liked");
                  })

                  firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const whoSentIt_note = snapshot.val();

                     if (user.uid !== whoSentIt_note.whoSentIt) {
                        firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                           const getUser = snapshot.val();
                           sendNotification(getUser.whoSentIt, {
                              type: "Love",
                              who: user.uid,
                              postId: uniNoteId_notehtml,
                           });
                        })
                     }
                  })
               }
            }
         })
      })
   }

   function renoteNote() {
      database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
         const data = snapshot.val();

         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               if (data.whoRenoted && data.whoRenoted[user.uid]) {
                  firebase.database().ref(`notes/${data.id}/whoRenoted/${user.uid}`).remove();

                  firebase.database().ref(`notes/${data.id}`).update({
                     renotes: data.renotes - 1
                  })

                  firebase.database().ref(`users/${user.uid}/posts/${data.id}`).remove();

                  database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const newData = snapshot.val();

                     document.getElementById("renoteButton").innerHTML = `<i class="fa-solid fa-retweet"></i> ${newData.renotes}`;
                     document.getElementById("renoteButton").classList.remove("renoted");
                  })
               } else {
                  firebase.database().ref(`notes/${data.id}/whoRenoted/${user.uid}`).update({
                     uid: user.uid
                  })

                  firebase.database().ref(`notes/${data.id}`).update({
                     renotes: data.renotes + 1
                  })

                  firebase.database().ref(`users/${user.uid}/posts/${data.id}`).update({
                     isRenote: true
                  })

                  database.ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const newData = snapshot.val();

                     document.getElementById("renoteButton").innerHTML = `<i class="fa-solid fa-retweet"></i> ${newData.renotes}`;
                     document.getElementById("renoteButton").classList.add("renoted");
                  })

                  firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                     const whoSentIt_note = snapshot.val();

                     if (user.uid !== whoSentIt_note.whoSentIt) {
                        firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                           const getUser = snapshot.val();
                           sendNotification(getUser.whoSentIt, {
                              type: "Renote",
                              who: user.uid,
                              postId: uniNoteId_notehtml,
                           });
                        })
                     }
                  })

                  unlockAchievement("Express Yourself");
               }
            }
         })
      })
   }

   function replyToNote(element) {
      isReplying_notehtml = true;
      const noteContainer = element.closest('.note');

      if (noteContainer) {
         const usernameElement = noteContainer.querySelector('.noteUsername');
         const username = usernameElement.textContent;

         const fullUsernameText = usernameElement.textContent;
         const regex = /@(\w+)/; // Capture usernames with letters, numbers, or underscores
         const match = fullUsernameText.match(regex);

         if (match) {
            const username = match[1];
            replyingOrCreating.textContent = "Replying to @" + username;

            document.getElementById("noteContent-textarea").value = `@${username} `;
         }

         createNotePopup();
      } else {
         replyingOrCreating.textContent = "Replying to Note";
         createNotePopup();
      }
   }
};

// Upload Notes with or without images (cont.)
function addAltText() {
   document.getElementById("addAltText").showModal();
}

function addAltText_finish() {
   document.getElementById("addAltText").close();
}

async function publishNote() {
   firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
         document.getElementById("coverCreateANote").style.display = "block";

         const notesRef = firebase.database().ref("notes");
         const userNotes = firebase.database().ref(`users/${user.uid}/posts`);
         const newNoteKey = notesRef.push().key;
         let isNotFlaggedNsfwButShouldBe = null;

         // if (pathName === "/note" || pathName === "/note.html") {
         //     console.log(isReplying_notehtml);
         //     console.log(uniNoteId_notehtml);
         // }

         const noteContent = document.getElementById("noteContent-textarea").value;

         const imageUploadInput = document.getElementById("imageUploadInput");
         const file = imageUploadInput.files[0];

         if (isTextareaEmpty(noteContent) && !file) {
            document.getElementById("noteError").textContent = "You can't create notes without content! Try adding an image, text or both!";
            document.getElementById("coverCreateANote").style.display = "none";
            return;
         }

         try {
            const response = await fetch("/nsfw_words.json");
            if (!response.ok) {
               throw new Error("Network response not okay. User needs to check their connection. Let TransSocial handle the error later down, do not return.");
            }

            const nsfwWords = await response.json();

            const nsfwPattern = new RegExp(`\\b(${nsfwWords.join("|")})\\b`, "i"); 

            if (nsfwPattern.test(noteContent.toLowerCase()) && !document.getElementById("isNsfw").checked) {
               const bad = document.createElement("dialog");
               const h1 = document.createElement("h1");
               const info = document.createElement("p");
               const close = document.createElement("button");

               h1.textContent = "Unflagged NSFW Detected";
               info.innerHTML = "We detected NSFW content, but you have not flagged it. We allow NSFW as long as <br/>1) You aren't being a creep <br/>2) You flag it correctly<br/>To post this, please click the flag on the bottom of the note creation popup, check the NSFW checkbox, then try posting it again.<br/><br/>Attempting to circumvent this is a serious violation of our <a href='/policies/terms'>Terms of Service</a> and <a href='/policies/child-safety'>Child Safety</a> policies, and WILL get you permanently suspended without appeal.<br/><br/>If you believe this flag was an error, please let us know by creating a note.";
               close.textContent = "Okay";

               close.onclick = () => {
                  bad.close();

                  setTimeout(() => {
                     bad.delete();
                  }, 100);
               }

               bad.appendChild(h1);
               bad.appendChild(info);
               bad.appendChild(close);
               document.body.appendChild(bad);
               bad.showModal();

               document.getElementById("coverCreateANote").style.display = "none";
               return;
            }
         } catch (error) { 
            document.getElementById("noteError").textContent = error;
            document.getElementById("coverCreateANote").style.display = "none";
            return;
         }
         
         const renoteData = {
            isRenote: false,
         }

         const postData = {
            text: noteContent,
            whoSentIt: user.uid,
            id: newNoteKey,
            likes: 0,
            renotes: 0,
            replies: 0,
            isNsfw: document.getElementById("isNsfw").checked,
            isSensitive: document.getElementById("isSensitive").checked,
            isPolitical: document.getElementById("isPolitical").checked,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            alt: document.getElementById("altText_input").value
         }

         const usernameRegex = /@(\w+)/g;
         const matches = [...noteContent.matchAll(usernameRegex)];
         if (matches.length > 0) {
            const usernames = matches.map(match => match[1]);
            usernames.forEach(username => {
               const user = firebase.auth().currentUser;
               
               // check if it's a username
               firebase.database().ref(`taken-usernames/${username}`).once("value", (snapshot) => {
                  if (snapshot.exists()) {
                     const userId = snapshot.val();

                     sendNotification(userId.user, {
                        type: "Mention",
                        who: user.uid,
                        postId: newNoteKey,
                     });
                  }
               });
            });
         } else {
            
         }

         if (renotingNote !== null) {
            postData.quoting = renotingNote;
         }

         if (pickedMusic !== null) {
            postData.music = pickedMusic;
         }

         if (isReplying_notehtml === true) {
            unlockAchievement("Chatterbox");

            if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
               postData.replyingTo = uniNoteId_notehtml;

               firebase.database().ref(`notes/${uniNoteId_notehtml}`).once("value", (snapshot) => {
                  const replyData = snapshot.val();

                  if (user.uid !== replyData.whoSentIt)
                     sendNotification(replyData.whoSentIt, {
                        type: "Reply",
                        who: user.uid,
                        postId: uniNoteId_notehtml,
                     });

                  if (replyData.replies === undefined) {
                     firebase.database().ref(`notes/${uniNoteId_notehtml}`).update({
                        replies: 1
                     });
                  } else {
                     firebase.database().ref(`notes/${uniNoteId_notehtml}`).update({
                        replies: replyData.replies + 1
                     });

                     loveCountRef.off();
                  }
               });
            }
         } else {
            unlockAchievement("First Steps");
         }

         try {
            if (file) {
               const storageRef = firebase.storage().ref();
               const imageRef = storageRef.child(`images/notes/${user.uid}/${newNoteKey}-${file.name}`);
               const snapshot = await imageRef.put(file);

               const imageUrl = await snapshot.ref.getDownloadURL();
               postData.image = imageUrl;
            }

            await notesRef.child(newNoteKey).set(postData);
            await userNotes.child(newNoteKey).set(renoteData);

            const notePopup = document.getElementById("createNote-popup");

            document.getElementById("noteContent-textarea").value = "";
            document.getElementById("uploadingImage").style.display = "none";
            removeImage();
            document.getElementById("hasntBeenUploadedNotice").style.display = "none";
            if (pathName === "/note" || pathName === "/note.html" || pathName.startsWith("/note/")) {
               document.getElementById("replyingOrCreating").innerText = "Create a Note!";
               isReplying_notehtml = false;
            }
            document.getElementById("isNsfw").checked = false;
            document.getElementById("isSensitive").checked = false;

            document.getElementById("coverCreateANote").style.display = "none";
            document.getElementById("successfullySent").style.display = "block";
            renotingNote = null;
            document.getElementById("altText_input").value = "";
            document.getElementById("spotifyPlayer").innerHTML = "";
            document.getElementById("songQuery").value = "";
            pickedMusic = null;
            notePopup.close();

            setTimeout(function () {
               document.getElementById("successfullySent").style.display = "none";
            }, 3000);
         } catch (error) {
            document.getElementById("noteError").textContent = "Error publishing note: " + error.message;
            document.getElementById("coverCreateANote").style.display = "none";
         }
      } else {
         loginPrompt();
      }
   })
};

// Settings Page
if (pathName === "/settings" || pathName === "/settings.html") {
   // see if the browser url is trying to open a tab
   const url = new URL(window.location.href);
   const tabParm = url.searchParams.get("tab");

   if (tabParm) {
      switch (tabParm) {
         case "profile":
            profileTab();
            break;
         case "account":
            accountTab();
            break;
         case "personalization":
            personalizationTab();
            break;
         case "subscription":
            subscriptionTab();
            break;
         case "environment":
            environmentTab();
            break;
      }
   }

   // Swap tabs
   function profileTab() {
      // Set active tab & set others inactive
      document.getElementById("profileTab").classList.add("active");
      document.getElementById("accountTab").classList.remove("active");
      document.getElementById("personalizationTab").classList.remove("active");
      document.getElementById("subscriptionTab").classList.remove("active");
      document.getElementById("environmentTab").classList.remove("active");

      // Show section
      document.getElementById("profileTab-display").style.display = "block";
      document.getElementById("profileTab-account").style.display = "none";
      document.getElementById("profileTab-personalization").style.display = "none";
      document.getElementById("profileTab-subscription").style.display = "none";
      document.getElementById("profileTab-environment").style.display = "none";
   }

   function accountTab() {
      // Set active tab & set others inactive
      document.getElementById("profileTab").classList.remove("active");
      document.getElementById("accountTab").classList.add("active");
      document.getElementById("personalizationTab").classList.remove("active");
      document.getElementById("subscriptionTab").classList.remove("active");
      document.getElementById("environmentTab").classList.remove("active");

      // Show section
      document.getElementById("profileTab-display").style.display = "none";
      document.getElementById("profileTab-account").style.display = "block";
      document.getElementById("profileTab-personalization").style.display = "none";
      document.getElementById("profileTab-subscription").style.display = "none";
      document.getElementById("profileTab-environment").style.display = "none";
   }

   function personalizationTab() {
      // Set active tab & set others inactive
      document.getElementById("profileTab").classList.remove("active");
      document.getElementById("accountTab").classList.remove("active");
      document.getElementById("personalizationTab").classList.add("active");
      document.getElementById("subscriptionTab").classList.remove("active");
      document.getElementById("environmentTab").classList.remove("active");

      // Show section
      document.getElementById("profileTab-display").style.display = "none";
      document.getElementById("profileTab-account").style.display = "none";
      document.getElementById("profileTab-personalization").style.display = "block";
      document.getElementById("profileTab-subscription").style.display = "none";
      document.getElementById("profileTab-environment").style.display = "none";
   }

   function subscriptionTab() {
      // Set active tab & set others inactive
      document.getElementById("profileTab").classList.remove("active");
      document.getElementById("accountTab").classList.remove("active");
      document.getElementById("personalizationTab").classList.remove("active");
      document.getElementById("subscriptionTab").classList.add("active");
      document.getElementById("environmentTab").classList.remove("active");

      // Show section
      document.getElementById("profileTab-display").style.display = "none";
      document.getElementById("profileTab-account").style.display = "none";
      document.getElementById("profileTab-personalization").style.display = "none";
      document.getElementById("profileTab-subscription").style.display = "block";
      document.getElementById("profileTab-environment").style.display = "none";
   }

   function environmentTab() {
      document.getElementById("profileTab").classList.remove("active");
      document.getElementById("accountTab").classList.remove("active");
      document.getElementById("personalizationTab").classList.remove("active");
      document.getElementById("subscriptionTab").classList.remove("active");
      document.getElementById("environmentTab").classList.add("active");

      // Show section
      document.getElementById("profileTab-display").style.display = "none";
      document.getElementById("profileTab-account").style.display = "none";
      document.getElementById("profileTab-personalization").style.display = "none";
      document.getElementById("profileTab-subscription").style.display = "none";
      document.getElementById("profileTab-environment").style.display = "block";
   }

   // Set defaults
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const userData = snapshot.val();

            // Set user profile picture
            if (userData.pfp !== undefined) {
               document.getElementById("profilePicture_settings").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${user.uid}%2F${userData.pfp}?alt=media`;
            }

            if (userData.banner !== undefined) {
               document.getElementById("banner_settings").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fbanner%2F${user.uid}%2F${userData.banner}?alt=media`;
            }

            // Display name
            if (userData.display !== undefined) {
               document.getElementById("displayName-text").value = `${userData.display}`;
               document.getElementById("characterLimit_display").textContent = `${userData.display.length}/25`;
            }

            // Username
            if (userData.username !== undefined) {
               document.getElementById("username-text").value = `${userData.username}`;
               document.getElementById("characterLimit_username").textContent = `${userData.username.length}/20`;
            }

            // Pronouns
            if (userData.pronouns !== undefined) {
               document.getElementById("pronouns-text").value = `${userData.pronouns}`;
               document.getElementById("characterLimit_pronouns").textContent = `${userData.pronouns.length}/15`;
            }

            // Bio
            if (userData.bio) {
               document.getElementById("bioText").value = `${userData.bio}`;
               document.getElementById("characterLimit_bio").textContent = `${userData.bio.length}/500`;
            }

            // Email address
            document.getElementById("email-address").value = `${userData.email}`;

            // Get input and show "Save" button if different from current.
            document.addEventListener("input", () => {
               if (event.target === document.getElementById("displayName-text")) {
                  if (document.getElementById("displayName-text").value !== userData.display) {
                     document.getElementById("saveDisplay").style.display = "block";
                  } else {
                     document.getElementById("saveDisplay").style.display = "none";
                  }
               }
            })

            document.addEventListener("input", () => {
               if (event.target === document.getElementById("username-text")) {
                  if (document.getElementById("username-text").value !== userData.username) {
                     document.getElementById("saveUsername").style.display = "block";
                     document.getElementById("usernameNotice").style.display = "block";
                  } else {
                     document.getElementById("saveUsername").style.display = "none";
                     document.getElementById("usernameNotice").style.display = "none";
                  }
               }
            })

            document.addEventListener("input", () => {
               if (event.target === document.getElementById("pronouns-text")) {
                  if (document.getElementById("pronouns-text").value !== userData.pronouns) {
                     document.getElementById("savePronouns").style.display = "block";
                  } else {
                     document.getElementById("savePronouns").style.display = "none";
                  }
               }
            })

            document.addEventListener("input", () => {
               if (event.target === document.getElementById("bioText")) {
                  if (document.getElementById("bioText").value !== userData.bio) {
                     document.getElementById("saveBio").style.display = "block";
                  } else {
                     document.getElementById("saveBio").style.display = "none";
                  }
               }
            })

            document.addEventListener("input", () => {
               if (event.target === document.getElementById("email-address")) {
                  if (document.getElementById("email-address").value !== userData.email) {
                     document.getElementById("saveEmail").style.display = "block";
                  } else {
                     document.getElementById("saveEmail").style.display = "none";
                  }
               }
            })
         })
      } else {
         window.location.replace("/home");
      }
   })

   // Save display name
   function setDisplayName() {
      if (!document.getElementById("saveDisplay").classList.contains("disabled")) {
         document.getElementById("saveDisplay").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Setting Display...`;
         document.getElementById("saveDisplay").classList.add("disabled");
         document.getElementById("errorUsingDisplay").style.display = "none";

         const displayValue = document.getElementById("displayName-text").value.trim();

         if (displayValue === "") {
            document.getElementById("errorUsingDisplay").textContent = "Your display name cannot be empty."
            document.getElementById("errorUsingDisplay").style.display = "block";
            document.getElementById("saveDisplay").innerHTML = `Save`;
            document.getElementById("saveDisplay").style.display = "none";
            document.getElementById("saveDisplay").classList.remove("disabled");
         } else {
            firebase.auth().onAuthStateChanged((user) => {
               firebase.database().ref(`users/${user.uid}`).update({
                  display: document.getElementById("displayName-text").value
               })
                  .then(() => {
                     document.getElementById("errorUsingDisplay").textContent = `Saved successfully! This change will apply across TransSocial.`;
                     document.getElementById("errorUsingDisplay").style.display = "block";
                     document.getElementById("errorUsingDisplay").style.color = `var(--success-color)`;
                     document.getElementById("saveDisplay").innerHTML = `Save`;
                     document.getElementById("saveDisplay").style.display = "none";
                     document.getElementById("saveDisplay").classList.remove("disabled");
                  }).catch((error) => {
                     document.getElementById("errorUsingDisplay").textContent = `Error saving display name: ${error.message}`;
                     document.getElementById("errorUsingDisplay").style.display = "block";
                     document.getElementById("saveDisplay").innerHTML = `Save`;
                     document.getElementById("saveDisplay").style.display = "none";
                     document.getElementById("saveDisplay").classList.remove("disabled");
                  })
            })
         }
      }
   }

   // Set username
   function setUsername() {
      if (!document.getElementById("saveUsername").classList.contains("disabled")) {
         document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking whitespace...`;
         document.getElementById("saveUsername").classList.add("disabled");
         document.getElementById("errorTakingUsername").style.display = "none";

         const userValue = document.getElementById("username-text").value.trim();

         if (userValue === "") {
            document.getElementById("errorTakingUsername").textContent = "Your username cannot be empty."
            document.getElementById("errorTakingUsername").style.display = "block";
            document.getElementById("saveUsername").innerHTML = `Save`;
            document.getElementById("saveUsername").style.display = "none";
            document.getElementById("saveUsername").classList.remove("disabled");
            document.getElementById("usernameNotice").style.display = "none";
         } else {
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  firebase.database().ref(`taken-usernames/${document.getElementById("username-text").value}`).once("value", (snapshot) => {
                     const usernameTaken = snapshot.exists();

                     if (usernameTaken === true) {
                        document.getElementById("errorTakingUsername").textContent = `This username is unavailable! Try another!`;
                        document.getElementById("errorTakingUsername").style.display = "block";
                        document.getElementById("saveUsername").innerHTML = `Save`;
                        document.getElementById("saveUsername").style.display = "none";
                        document.getElementById("saveUsername").classList.remove("disabled");
                        document.getElementById("usernameNotice").style.display = "none";
                     } else {
                        firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                           const data = snapshot.val();

                           document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Removing old username...`;
                           firebase.database().ref(`taken-usernames/${data.username}`).update({
                              user: null
                           })
                              .then(() => {
                                 document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Reserving username...`;

                                 firebase.database().ref(`taken-usernames/${document.getElementById("username-text").value}`).update({
                                    user: user.uid
                                 })
                                    .then(() => {
                                       document.getElementById("saveUsername").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Setting publicly...`;

                                       firebase.database().ref(`users/${user.uid}`).update({
                                          username: document.getElementById("username-text").value
                                       })
                                          .then(() => {
                                             window.location.reload();
                                          })
                                    })
                              })
                        })
                     }
                  })
               }
            })
         }
      }
   }

   // Set pronouns
   function setPronouns() {
      if (!document.getElementById("savePronouns").classList.contains("disabled")) {
         if (!document.getElementById("savePronouns").classList.contains("disabled")) {
            document.getElementById("savePronouns").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Updating pronouns...`;
            document.getElementById("savePronouns").classList.add("disabled");

            firebase.auth().onAuthStateChanged((user) => {
               firebase.database().ref(`users/${user.uid}`).update({
                  pronouns: document.getElementById("pronouns-text").value
               })
                  .then(() => {
                     document.getElementById("savePronouns").innerHTML = `Save`;
                     document.getElementById("savePronouns").classList.remove("disabled");
                     document.getElementById("savePronouns").style.display = "none";
                  })
            })
         }
      }
   }

   // Set bio
   function setBio() {
      if (!document.getElementById("saveBio").classList.contains("disabled")) {
         document.getElementById("saveBio").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Updating bio...`;
         document.getElementById("saveBio").classList.add("disabled");

         firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`users/${user.uid}`).update({
               bio: document.getElementById("bioText").value
            })
               .then(() => {
                  document.getElementById("saveBio").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Updating bio...`;
                  document.getElementById("saveBio").classList.remove("disabled");
                  document.getElementById("saveBio").style.display = `none`;
               })
         })
      }
   }

   // Set new email
   function setEmail() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            document.getElementById("editEmail").showModal();
         }
      })
   }

   function changeEmail_reauth() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
               const stuff = snapshot.val();
               const currentUser = firebase.auth().currentUser; // renamed to avoid conflict
               const email = stuff.email;
               const passwordInput = document.getElementById("password_reauth_email");

               if (!passwordInput) {
                  console.error('Element with id "password_reauth_email" not found. This is a developer issue!');
                  return;
               }

               const password = passwordInput.value;

               if (!password) {
                  document.getElementById("errorWithReauthenticating_email").textContent = "Password cannot be empty.";
                  document.getElementById("errorWithReauthenticating_email").style.display = "block";
                  return;
               }

               const credential = firebase.auth.EmailAuthProvider.credential(email, password);

               currentUser.reauthenticateWithCredential(credential)
                  .then(() => {
                     document.getElementById("errorWithReauthenticating_email").textContent = "Successful! Changing email, please wait a moment...";
                     document.getElementById("errorWithReauthenticating_email").style.color = "var(--success-color)";
                     document.getElementById("errorWithReauthenticating_email").style.display = "block";

                     // set email
                     currentUser.updateEmail(`${document.getElementById("email-address").value}`).then(() => {
                        firebase.database().ref(`users/${currentUser.uid}`).update({
                           email: document.getElementById("email-address").value
                        })
                           .then(() => {
                              window.location.reload();
                           })
                     }).catch((error) => {
                        document.getElementById("errorWithReauthenticating_email").textContent = `An error occurred: ${error.message}`;
                        document.getElementById("errorWithReauthenticating_email").style.color = "var(--error-text)";
                        document.getElementById("errorWithReauthenticating_email").style.display = "block";
                     })
                  })
                  .catch((error) => {
                     document.getElementById("errorWithReauthenticating_email").textContent = `Failed to reauthenticate: ${error.message}`;
                     document.getElementById("errorWithReauthenticating_email").style.display = "block";
                  });
            });
         }
      });
   }

   // change password
   function sendPasswordResetEmail() {
      if (!document.getElementById("sendPasswordReset").classList.contains("disabled")) {
         document.getElementById("sendPasswordReset").classList.add("disabled")
         const email = document.getElementById("email-address").value;
         document.getElementById("sendPasswordReset").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Sending...`;

         firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
               document.getElementById("passwordResetSent").textContent = "Password reset email sent!";
               document.getElementById("passwordResetSent").style.color = "var(--success-color)";
               document.getElementById("passwordResetSent").style.display = "block";
               document.getElementById("sendPasswordReset").classList.remove("disabled");
               document.getElementById("sendPasswordReset").innerHTML = `Send Password Reset Email`;
            })
            .catch((error) => {
               document.getElementById("passwordResetSent").textContent = `Failed to send password reset: ${error.message}`;
               document.getElementById("passwordResetSent").style.display = "block";
               document.getElementById("passwordResetSent").style.color = "var(--error-text)";
               document.getElementById("sendPasswordReset").classList.remove("disabled")
               document.getElementById("sendPasswordReset").innerHTML = `Send Password Reset Email`;
            })
      }
   }

   // delete notes (properly)
   // dont call this function by itself, call deleteNoteWithReplies instead
   function deleteNoteReally(noteId) {
      const noteRef = firebase.database().ref(`notes/${noteId}`);

      noteRef.once('value').then((noteSnapshot) => {
         const note = noteSnapshot.val();
         if (!note) {
            console.error("Note not found");
            return;
         }

         const senderId = note.whoSentIt;

         // delete the image (if it exists)
         if (note.image) {
            firebase.storage().ref(`images/notes/${noteId}`).delete()
               .catch((err) => {
                  console.error("Error deleting image: ", err.message);
               });
         }

         // remove note ref from users who renoted it
         noteRef.child(`whoRenoted`).get()
            .then((snapshot) => {
               snapshot.forEach((snapshot) => {
                  const userId = snapshot.key;
                  firebase.database().ref(`users/${userId}/posts/${noteId}`).remove()
                     .catch((err) => {
                        console.error("Error removing note from user's posts: ", err.message);
                     });
               });
            })
            .catch((err) => {
               console.error("Error getting whoRenoted: ", err.message);
            });

         // remove note reference from sender
         firebase.database().ref(`users/${senderId}/posts/${noteId}`).remove()
            .catch((err) => {
               console.error("Error removing note from sender's posts: ", err.message);
            });

         // remove the note itself
         noteRef.remove()
            .catch((err) => {
               console.error("Error removing note: ", err.message);
            });
      }).catch((err) => {
         console.error("Error fetching note data: ", err.message);
      });
   }
   function deleteNoteWithReplies(noteId) {
      firebase.database().ref(`notes`).get()
         .then((notes) => {
            notes.forEach((note) => {
               if (note.val().replyingTo === noteId || 
                  note.val().quoting === noteId) {
                  deleteNoteWithReplies(note.key); // yeah sorry recursion
               };
            })
         })

      deleteNoteReally(noteId);
   }
   function deleteNotesPerUser(userId) {
      firebase.auth().onAuthStateChanged((user) => {
         firebase.database().ref(`users/${user.uid}/posts`).get().then((snapshot) => {
            // check if snapshot exists and has data
            if (snapshot.exists()) {
               const notes = snapshot.val();

               const deletePromises = Object.keys(notes).map((noteKey) => {
                  return firebase.database().ref(`notes/${noteKey}`).get()
                     .then((note) => {
                        if (note.exists() && note.val().whoSentIt === userId) {
                           return deleteNoteWithReplies(noteKey);
                        };
                     });
               });
               // wait for all delete promises to complete before continuing
               return Promise.all(deletePromises);
            }
         });
      })
   }

   // delete themes
   function deleteTheme(themeId) {
      // uninstalling themes is currently untested but should work
      firebase.database().ref(`users`).get()
         .then((users) => {
            users.forEach((user) => {
               if (user.child(`installedThemes/${themeId}`).exists()) {
                  user.child(`installedThemes/${themeId}`).remove();
               };
            });
         });
      firebase.database().ref(`themes/${themeId}`).remove();
   }
   function deleteThemesPerUser(userId) {
      firebase.database().ref(`themes`).get()
         .then((themes) => {
            themes.forEach((theme) => {
               if (theme.val().creator === userId) {
                  deleteTheme(theme.key);
               };
            });
         });
   }

   // delete account
   function deleteAccount() {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const userDbRef = firebase.database().ref(`users/${uid}`);

      function log(logMessage, isError = false) {
         const logElement = document.getElementById("deleteAccountLog");
         logElement.textContent = logMessage;
         if (isError) {
            logElement.style.color = "var(--error-text)";
         };

         if (isError) {
            console.error(logMessage);
         } else {
            console.log(logMessage);
         };
      }

      const email = user.email;
      const password = document.getElementById("deleteAccountPassword").value;
      if (!password) {
         log("No password provided", true);
         return;
      }
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);

      const yesPleaseDeleteMyAccount = document.getElementById("yesPleaseDeleteMyAccount").value;
      if (yesPleaseDeleteMyAccount !== "Yes, please delete my account") {
         log("Phrase \"Yes, please delete my account\" not entered", true);
         return;
      }

      log("Authenticating...");
      user.reauthenticateWithCredential(credential).then(() => {
         log("Starting data deletion, please do not close the tab");

         // get user data first
         return userDbRef.once('value').then((val) => {
            const userData = val.val();
            if (!userData) {
               throw new Error("User data not found");
            }

            // use Promise.all to wait for all async operations to complete
            return Promise.all([
               new Promise((resolve) => {
                  log("Deleting themes, please do not close the tab");
                  deleteThemesPerUser(uid);
                  resolve(); // ensure deleteThemesPerUser is synchronous
               }),
               new Promise((resolve) => {
                  log("Deleting notes, please do not close the tab");
                  deleteNotesPerUser(uid);
                  resolve(); // ensure deleteNotesPerUser is synchronous
               }),
               new Promise((resolve) => {
                  log("Deleting profile picture, please do not close the tab");
                  if (userData.pfp) {
                     firebase.storage().ref(`images/pfp/${uid}/${userData.pfp}`).delete()
                        .then(resolve)
                        .catch((err) => {
                           log("Error deleting profile picture: " + err.message, true);
                           resolve(); // ensure it continues even when failed
                        });
                  } else {
                     resolve(); // resolve immediately if no profile picture
                  }
               }),
               new Promise((resolve) => {
                  log("Freeing username, please do not close the tab");
                  firebase.database().ref(`taken-usernames/${userData.username}`).remove()
                     .then(resolve)
                     .catch((err) => {
                        log("Error freeing username: " + err.message, true);
                        resolve(); // ensure it continues even when failed
                     });
               }),
            ]).then(() => {
               log("Deleting user data, please do not close the tab");
               return userDbRef.remove()
                  .catch((err) => {
                     log("Error deleting user data: " + err.message, true);
                  });
            }).then(() => {
               log("Deleting authentication, please do not close the tab");
               return user.delete()
                  .then(() => { 
                     window.location.reload(); 
                  })
                  .catch((err) => {
                     log("Error deleting authentication: " + err.message, true);
                  });
            }).catch((err) => {
               log("Error in cleanup process: " + err.message, true);
            });
         }).catch((err) => {
            log("Error retrieving user data: " + err.message, true);
         });
      }).catch((err) => {
         log("Reauthentication failed: " + err.message, true);
      });
   }

   // theme selection
   function selectTheme() {
      document.getElementById("themeSelect").showModal();
   }

   function transsocialThemes() {
      document.getElementById("transsocialThemes").showModal();
      document.getElementById("themeSelect").close();
   }

   function userThemes() {
      // show modal
      document.getElementById("userThemes").showModal();
      document.getElementById("themeSelect").close();

      // get user themes
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/installedThemes`).once("value", (snapshot) => {
               // append themes
               const themesContainer = document.getElementById("themeSelection");
               themesContainer.innerHTML = "";

               const themes = snapshot.val();
               if (themes) {
                  Object.keys(themes).forEach(themeKey => {
                     const theme = themes[themeKey];

                     // create a button for each theme
                     const button = document.createElement("button");
                     firebase.database().ref(`themes/${themeKey}`).once("value", (snapshot) => {
                        const themeData = snapshot.val();
                        
                        console.log(`${themeData.title}: ${themeData.themeColors.mainColor}`);

                        button.innerText = themeData.title;
                        button.onclick = () => {
                           // apply the theme
                           firebase.database().ref(`users/${user.uid}`).update({
                              theme : "Custom"
                           }).then(() => {
                              if (themeData.themeColors.buttonText === undefined) {
                                 firebase.database().ref(`users/${user.uid}/themeColors`).update({
                                    background : themeData.themeColors.background,
                                    buttonTransparentHover : themeData.themeColors.buttonTransparentHover,
                                    error : themeData.themeColors.error,
                                    headerColor : themeData.themeColors.headerColor,
                                    liked : themeData.themeColors.liked,
                                    mainColor : themeData.themeColors.mainColor,
                                    mainColorDarker : themeData.themeColors.mainColorDarker,
                                    noteBackground : themeData.themeColors.noteBackground,
                                    noteSeperator : themeData.themeColors.noteSeperator,
                                    renoted : themeData.themeColors.renoted,
                                    replyBackground : themeData.themeColors.replyBackground,
                                    replyHoveredBackground : themeData.themeColors.replyHoveredBackground,
                                    sidebarButtonHover : themeData.themeColors.sidebarButtonHover,
                                    sidebarText : themeData.themeColors.sidebarText,
                                    success : themeData.themeColors.success,
                                    text : themeData.themeColors.text,
                                    textHalfTransparent : themeData.themeColors.textHalfTransparent,
                                    textSemiTransparent : themeData.themeColors.textSemiTransparent,
                                 }).then(() => {
                                    window.location.reload();
                                 });
                              } else {
                                 firebase.database().ref(`users/${user.uid}/themeColors`).update({
                                    background : themeData.themeColors.background,
                                    buttonTransparentHover : themeData.themeColors.buttonTransparentHover,
                                    error : themeData.themeColors.error,
                                    headerColor : themeData.themeColors.headerColor,
                                    liked : themeData.themeColors.liked,
                                    mainColor : themeData.themeColors.mainColor,
                                    mainColorDarker : themeData.themeColors.mainColorDarker,
                                    noteBackground : themeData.themeColors.noteBackground,
                                    noteSeperator : themeData.themeColors.noteSeperator,
                                    renoted : themeData.themeColors.renoted,
                                    replyBackground : themeData.themeColors.replyBackground,
                                    replyHoveredBackground : themeData.themeColors.replyHoveredBackground,
                                    sidebarButtonHover : themeData.themeColors.sidebarButtonHover,
                                    sidebarText : themeData.themeColors.sidebarText,
                                    success : themeData.themeColors.success,
                                    text : themeData.themeColors.text,
                                    textHalfTransparent : themeData.themeColors.textHalfTransparent,
                                    textSemiTransparent : themeData.themeColors.textSemiTransparent,
                                    buttonText : themeData.themeColors.buttonText,
                                    hoveredButtonText : themeData.themeColors.hoveredButtonText,
                                    createNoteButton : themeData.themeColors.createNoteButton,
                                    createNoteButtonHover : themeData.themeColors.createNoteButtonHover,
                                    buttonText : themeData.themeColors.buttonText,
                                    hoveredButtonText : themeData.themeColors.hoveredButtonText,
                                    createNoteButton : themeData.themeColors.createNoteButton,
                                    createNoteButtonHover : themeData.themeColors.createNoteButtonHover
                                 }).then(() => {
                                    window.location.reload();
                                 });
                              }
                           });
                        };
                        button.style.width = "100%";
                     });

                     // append
                     themesContainer.append(button);
                  });
               } else {
                  // the user has no themes installed
                  const p = document.createElement("p");

                  p.innerHTML = `You have no custom themes! You can get some at the <a href="/userstudio" style="color: var(--main-color);">TransSocial User Studio!</a>`;

                  document.getElementById("themeSelection").appendChild(p);
               }
            });
         }
      });
   }

   function themeDark() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Dark"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeMintDark() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Mint (Dark)"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeHighContrast() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "High Contrast"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeMidnightPurple() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Midnight Purple"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeDarker() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Darker"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeLight() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Light"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeMintLight() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "Mint (Light)"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   function themeClassic() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme: "TransSocial Classic"
            })
               .then(() => {
                  window.location.reload();
               })
         }
      })
   }

   // Change mature content preference
   function hideMatureContent() {
      document.getElementById("updatedMatureContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showNsfw: "Hide"
            })
               .then(() => {
                  document.getElementById("updatedMatureContentPref").textContent = "Updated preference to Hide successfully!";
                  document.getElementById("updatedMatureContentPref").style.display = "block";
               })
         }
      })
   }

   function blurMatureContent() {
      document.getElementById("updatedMatureContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showNsfw: "Blur"
            })
               .then(() => {
                  document.getElementById("updatedMatureContentPref").textContent = "Updated preference to Blur successfully!";
                  document.getElementById("updatedMatureContentPref").style.display = "block";
               })
         }
      })
   }

   function showMatureContent() {
      document.getElementById("updatedMatureContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showNsfw: "Show"
            })
               .then(() => {
                  document.getElementById("updatedMatureContentPref").textContent = "Updated preference to Show successfully!";
                  document.getElementById("updatedMatureContentPref").style.display = "block";
               })
         }
      })
   }

   // set sensitive content preference
   function hideSensitiveContent() {
      document.getElementById("updatedSensitiveContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showSensitive: "Hide"
            })
               .then(() => {
                  document.getElementById("updatedSensitiveContentPref").textContent = "Updated preference to Hide successfully!";
                  document.getElementById("updatedSensitiveContentPref").style.display = "block";
               })
         }
      })
   }

   function blurSensitiveContent() {
      document.getElementById("updatedSensitiveContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showSensitive: "Blur"
            })
               .then(() => {
                  document.getElementById("updatedSensitiveContentPref").textContent = "Updated preference to Blur successfully!";
                  document.getElementById("updatedSensitiveContentPref").style.display = "block";
               })
         }
      })
   }

   function showSensitiveContent() {
      document.getElementById("updatedSensitiveContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showSensitive: "Show"
            })
               .then(() => {
                  document.getElementById("updatedSensitiveContentPref").textContent = "Updated preference to Show successfully!";
                  document.getElementById("updatedSensitiveContentPref").style.display = "block";
               })
         }
      })
   }

   // political content preference
   function hidePoliticalContent() {
      document.getElementById("updatedPoliticalContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showPolitics: "Hide"
            })
               .then(() => {
                  document.getElementById("updatedPoliticalContentPref").textContent = "Updated preference to Hide successfully!";
                  document.getElementById("updatedPoliticalContentPref").style.display = "block";
               })
         }
      })
   }

   function blurPoliticalContent() {
      document.getElementById("updatedPoliticalContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showPolitics: "Blur"
            })
               .then(() => {
                  document.getElementById("updatedPoliticalContentPref").textContent = "Updated preference to Blur successfully!";
                  document.getElementById("updatedPoliticalContentPref").style.display = "block";
               })
         }
      })
   }

   function showPoliticalContent() {
      document.getElementById("updatedPoliticalContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showPolitics: "Show"
            })
               .then(() => {
                  document.getElementById("updatedPoliticalContentPref").textContent = "Updated preference to Show successfully!";
                  document.getElementById("updatedPoliticalContentPref").style.display = "block";
               })
         }
      })
   }

   // pride flag pref
   function hidePrideFlag() {
      document.getElementById("updatedPrideFlagContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showPrideFlag: "No"
            })
               .then(() => {
                  document.getElementById("updatedPrideFlagContentPref").textContent = "Updated preference to No successfully!";
                  document.getElementById("updatedPrideFlagContentPref").style.display = "block";
               })
         }
      })
   }

   function showPrideFlag() {
      document.getElementById("updatedPrideFlagContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               showPrideFlag: "Yes"
            })
               .then(() => {
                  document.getElementById("updatedPrideFlagContentPref").textContent = "Updated preference to Yes successfully!";
                  document.getElementById("updatedPrideFlagContentPref").style.display = "block";
               })
         }
      })
   }

   // font scale
   function normalFontScale() {
      document.getElementById("updatedFontScaleContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               fontSizePref: "normal"
            })
               .then(() => {
                  document.documentElement.style.setProperty('--zoom-level', '1');
                  document.getElementById("updatedFontScaleContentPref").style.display = "block";
                  document.getElementById("updatedFontScaleContentPref").textContent = "Updated preference to Normal successfully!";
               })
         }
      })
   }

   function largeFontScale() {
      document.getElementById("updatedFontScaleContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               fontSizePref: "large"
            })
               .then(() => {
                  document.documentElement.style.setProperty('--zoom-level', '1.07');
                  document.getElementById("updatedFontScaleContentPref").style.display = "block";
                  document.getElementById("updatedFontScaleContentPref").textContent = "Updated preference to Large successfully!";
               })
         }
      })
   }

   // autoplay videos
   function doAutoplay() {
      document.getElementById("updatedAutoplayContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               autoplayVideos: true
            })
               .then(() => {
                  document.getElementById("updatedAutoplayContentPref").style.display = "block";
                  document.getElementById("updatedAutoplayContentPref").textContent = "Updated preference to 'Autoplay On' successfully!";
               })
         }
      })
   }

   function doNotAutoplay() {
      document.getElementById("updatedAutoplayContentPref").style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               autoplayVideos: false
            })
               .then(() => {
                  document.getElementById("updatedAutoplayContentPref").style.display = "block";
                  document.getElementById("updatedAutoplayContentPref").textContent = "Updated preference to 'Autoplay Off' successfully!";
               })
         }
      })
   }

   // enable experiments
   function showExperiments() {
      document.getElementById("experimentSelect").showModal();
   }

   // change pfp
   function changePfp() {
      if (!document.getElementById("changePfp").classList.contains("disabled")) {
         document.getElementById("fileInput").click();
      }
   }

   document.getElementById("fileInput").addEventListener("change", function (event) {
      firebase.auth().onAuthStateChanged((user) => {
         const file = event.target.files[0];

         document.getElementById("changePfp").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking file...`;
         document.getElementById("changePfp").classList.add("disabled");

         if (file) {
            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
               const data = snapshot.val();

               let allowedTypes = [];
               if (data.isSubscribed === true) {
                  allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
               } else {
                  allowedTypes = ["image/png", "image/jpeg", "image/webp"];
               }

               if (file.size <= 5 * 1024 * 1024) {
                  if (allowedTypes.includes(file.type)) {
                     const storageRef = firebase.storage().ref();
                     const fileRef = storageRef.child(`images/pfp/${user.uid}/${file.name}`);

                     document.getElementById("changePfp").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Uploading image...`;
   
                     fileRef.put(file).then(function (snapshot) {
                        snapshot.ref.getDownloadURL().then(function (downloadURL) {
                           firebase.database().ref(`users/${user.uid}/pfp`).once("value", (snapshot) => {
                              firebase.database().ref(`users/${user.uid}/pfp`).once("value", (snapshot) => {
                                 const oldPfpName = snapshot.val();
   
                                 firebase.database().ref(`users/${user.uid}`).update({
                                    pfp: file.name
                                 })
                                    .then(() => {
                                       if (oldPfpName) {
                                          const oldFileRef = storageRef.child(`images/pfp/${user.uid}/${oldPfpName}`);
                                          oldFileRef.delete().then(() => {
                                             document.getElementById("changePfp").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking...`;
                                          }).catch((error) => {
                                             document.getElementById("errorUploadingPfp").style.display = "block";
                                             document.getElementById("errorUploadingPfp").textContent = `Failed to upload profile picture: ${error.message}`;
                                          })
                                       }
                                    })
                              })
                           });

                           document.getElementById("changePfp").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Done!`;
                           window.location.reload();
                        });
                     }).catch(function (error) {
                        document.getElementById("errorUploadingPfp").style.display = "block";
                        document.getElementById("errorUploadingPfp").textContent = `Failed to upload profile picture: ${error.message}`;
                        document.getElementById("changePfp").classList.remove("disabled");
                     })
                  } else {
                     if (file.type === "image/gif") {
                        document.getElementById("errorUploadingPfp").style.display = "block";
                        document.getElementById("errorUploadingPfp").textContent = `You need a Katniny+ subscription to use a GIF as your profile picture!`;
                        document.getElementById("changePfp").classList.remove("disabled");
                     } else {
                        document.getElementById("errorUploadingPfp").style.display = "block";
                        document.getElementById("errorUploadingPfp").textContent = `Invalid image type. Please select a .png, .jpg (.jpeg), or .webp file.`;
                        document.getElementById("changePfp").classList.remove("disabled");
                     }
                  }
               } else {
                  document.getElementById("errorUploadingPfp").style.display = "block";
                  document.getElementById("errorUploadingPfp").textContent = `Image exceeds 5MB. Please choose a smaller image.`;
               }
            });
         }
      })
   });

   // change banner
   function changeBanner() {
      if (!document.getElementById("changeBanner").classList.contains("disabled")) {
         document.getElementById("fileInput_banner").click();
      }
   }

   document.getElementById("fileInput_banner").addEventListener("change", function (event) {
      firebase.auth().onAuthStateChanged((user) => {
         const file = event.target.files[0];

         document.getElementById("changeBanner").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking file...`;
         document.getElementById("changeBanner").classList.add("disabled");

         if (file) {
            firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
               const data = snapshot.val();

               let allowedTypes = [];
               if (data.isSubscribed === true) {
                  allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
               } else {
                  allowedTypes = ["image/png", "image/jpeg", "image/webp"];
               }

               if (file.size <= 5 * 1024 * 1024) {
                  if (allowedTypes.includes(file.type)) {
                     const storageRef = firebase.storage().ref();
                     const fileRef = storageRef.child(`images/banner/${user.uid}/${file.name}`);

                     document.getElementById("changeBanner").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Uploading image...`;
   
                     fileRef.put(file).then(function (snapshot) {
                        snapshot.ref.getDownloadURL().then(function (downloadURL) {
                           firebase.database().ref(`users/${user.uid}/banner`).once("value", (snapshot) => {
                              firebase.database().ref(`users/${user.uid}/banner`).once("value", (snapshot) => {
                                 const oldPfpName = snapshot.val();
   
                                 firebase.database().ref(`users/${user.uid}`).update({
                                    banner: file.name
                                 })
                                    .then(() => {
                                       if (oldPfpName) {
                                          const oldFileRef = storageRef.child(`images/banner/${user.uid}/${oldPfpName}`);
                                          oldFileRef.delete().then(() => {
                                             document.getElementById("changeBanner").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Checking...`;
                                          }).catch((error) => {
                                             document.getElementById("errorUploadingBanner").style.display = "block";
                                             document.getElementById("errorUploadingBanner").textContent = `Failed to upload profile picture: ${error.message}`;
                                          })
                                       }
                                    })
                              })
                           });

                           document.getElementById("changeBanner").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Done!`;
                           window.location.reload();
                        });
                     }).catch(function (error) {
                        document.getElementById("errorUploadingBanner").style.display = "block";
                        document.getElementById("errorUploadingBanner").textContent = `Failed to upload profile picture: ${error.message}`;
                        document.getElementById("changeBanner").classList.remove("disabled");
                     })
                  } else {
                     if (file.type === "image/gif") {
                        document.getElementById("errorUploadingBanner").style.display = "block";
                        document.getElementById("errorUploadingBanner").textContent = `You need a Katniny+ subscription to use a GIF as your profile picture!`;
                        document.getElementById("changePfp").classList.remove("disabled");
                     } else {
                        document.getElementById("errorUploadingBanner").style.display = "block";
                        document.getElementById("errorUploadingBanner").textContent = `Invalid image type. Please select a .png, .jpg (.jpeg), or .webp file.`;
                        document.getElementById("changeBanner").classList.remove("disabled");
                     }
                  }
               } else {
                  document.getElementById("errorUploadingBanner").style.display = "block";
                  document.getElementById("errorUploadingBanner").textContent = `Image exceeds 5MB. Please choose a smaller image.`;
               }
            });
         }
      })
   });

   // Experiments

   // Direct Messages
   function toggleDMExperimentDetails() {
      if (document.getElementById("dm_details").style.display === "none") {
         document.getElementById("dm_details").style.display = "block";
      } else {
         document.getElementById("dm_details").style.display = "none";
      }
   }

   function toggleButtonExperimentDetails() {
      if (document.getElementById("button_details")) {
         document.getElementById("button_details").style.display = "block";
      } else {
         document.getElementById("button_details").style.display = "none";
      }
   }

   function enableDms() {
      document.getElementById("enableDms").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Enabling...`;
      document.getElementById("enableDms").classList.add("disabled");
      document.getElementById("disableDms").classList.add("disabled");

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               directMessagesExperiment: true
            }).then(() => {
               window.location.reload();
            });
         }
      })
   }

   function disableDms() {
      document.getElementById("disableDms").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Disabling...`;
      document.getElementById("enableDms").classList.add("disabled");
      document.getElementById("disableDms").classList.add("disabled");

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               directMessagesExperiment: null
            }).then(() => {
               window.location.reload();
            });
         }
      })
   }

   function enableButton() {
      document.getElementById("enableButton").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Enabling...`;
      document.getElementById("enableButton").classList.add("disabled");
      document.getElementById("disableButton").classList.add("disabled");

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/experiments`).update({
               noteButtonLayout: true
            }).then(() => {
               window.location.reload();
            });
         }
      })
   }

   function disableButton() {
      document.getElementById("disableButton").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Disabling...`;
      document.getElementById("enableButton").classList.add("disabled");
      document.getElementById("disableButton").classList.add("disabled");

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/experiments`).update({
               noteButtonLayout: false
            }).then(() => {
               window.location.reload();
            });
         }
      })
   }

   // environment tab
   // get user os
   function getOS() {
      const userAgent = navigator.userAgent;
      let os = "Unknown";
  
      if (userAgent.indexOf("Win") > -1) {
         os = "Microsoft Windows";
      } else if (userAgent.indexOf("Mac") > -1) {
         os = "Apple MacOS";
      } else if (userAgent.indexOf("X11") > -1 || userAgent.indexOf("Linux") > -1) {
         os = "Linux";
      } else if (userAgent.indexOf("Android") > -1) {
         os = "Android";
      } else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
         os = "Apple iOS";
      } else {
         os = "Unknown";
      }
  
      return os;
   }
  
   const userOS = getOS();
   document.getElementById("userOs").textContent = userOS;
}

// Accept cookies
function acceptCookies() {
   if (pathName === "/home" || pathName === "/home.html") {
      localStorage.setItem("acceptedCookies", "true");
      document.getElementById("cookie-notice").style.display = "none";
   }
}

// Notifications
if (pathName === "/notifications" || pathName === "/notifications.html") {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         // Clear notifications
         firebase.database().ref(`users/${user.uid}/notifications`).update({
            unread: 0
         })

         // Show notifications
         const notificationsRef = firebase.database().ref(`users/${user.uid}/notifications`);

         notificationsRef.once('value', (snapshot) => {
            const notifications = snapshot.val();

            // Clear any existing notifications
            const notificationsDiv = document.getElementById("notificationCenter");
            notificationsDiv.innerHTML = "";

            if (notifications) {
               Object.keys(notifications).forEach((notificationId) => {
                  const notification = notifications[notificationId];

                  const newNotificationDiv = document.createElement("div");
                  newNotificationDiv.classList.add("notification");

                  const fakeUserData = {
                     username: "Deleted User",
                  };

                  // Customize notification content based on 'type'
                  if (notification.type === "Follow") {
                     firebase.database().ref(`users/${notification.who}`).on("value", (snapshot) => {
                        const user = snapshot.exists() ? snapshot.val() : fakeUserData;

                        newNotificationDiv.innerHTML = `<i class="fa-solid fa-user-plus fa-lg" style="color: var(--main-color);"></i> <img class="notificationPfp" draggable=false src="https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${notification.who}%2F${user.pfp}?alt=media" /> @${user.username} followed you!`;
                        newNotificationDiv.setAttribute("onclick", `window.location.href="/u/${user.username}"`);
                     })
                  } else if (notification.type === "Reply") {
                     newNotificationDiv.setAttribute("onclick", `window.location.href="/note/${notification.postId}"`);

                     firebase.database().ref(`users/${notification.who}`).on("value", (snapshot) => {
                        const user = snapshot.exists() ? snapshot.val() : fakeUserData;

                        newNotificationDiv.innerHTML = `<i class="fa-solid fa-comment fa-lg" style="color: var(--main-color);"></i> <img class="notificationPfp" draggable=false src="https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${notification.who}%2F${user.pfp}?alt=media" /> @${user.username} replied to your note!`;
                     })
                  } else if (notification.type === "Love") {
                     newNotificationDiv.setAttribute("onclick", `window.location.href="/note/${notification.postId}"`);

                     firebase.database().ref(`users/${notification.who}`).on("value", (snapshot) => {
                        const user = snapshot.exists() ? snapshot.val() : fakeUserData;

                        newNotificationDiv.innerHTML = `<i class="fa-solid fa-heart fa-lg" style="color: var(--like-color);"></i> <img class="notificationPfp" draggable=false src="https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${notification.who}%2F${user.pfp}?alt=media" /> @${user.username} loved your note!`;
                     })
                  } else if (notification.type === "Renote") {
                     newNotificationDiv.setAttribute("onclick", `window.location.href="/note/${notification.postId}"`);

                     firebase.database().ref(`users/${notification.who}`).on("value", (snapshot) => {
                        const user = snapshot.exists() ? snapshot.val() : fakeUserData;

                        newNotificationDiv.innerHTML = `<i class="fa-solid fa-retweet fa-lg" style="color: var(--renote-color);"></i> <img class="notificationPfp" draggable=false src="https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${notification.who}%2F${user.pfp}?alt=media" /> @${user.username} renoted your note!`;
                     })
                  } else if (notification.type === "Mention") {
                     newNotificationDiv.setAttribute("onclick", `window.location.href="/note/${notification.postId}"`);

                     firebase.database().ref(`users/${notification.who}`).on("value", (snapshot) => {
                        const user = snapshot.exists() ? snapshot.val() : fakeUserData;

                        newNotificationDiv.innerHTML = `<i class="fa-solid fa-at fa-lg" style="color: var(--main-color);"></i> <img class="notificationPfp" draggable=false src="https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${notification.who}%2F${user.pfp}?alt=media" /> @${user.username} mentioned you!`;
                     })
                  } else {
                     // Handle other notification types...
                     newNotificationDiv.style.display = "none";
                  }

                  notificationsDiv.appendChild(newNotificationDiv);
               });
            } else {
               // Handle the case where there are no notifications
               const noNotificationsMessage = document.createElement("h1");
               noNotificationsMessage.innerHTML = `<i class="fa-solid fa-face-frown"></i> You have no notifications.`;
               notificationsDiv.appendChild(noNotificationsMessage);
            }
         });
      }
   });
}

// Report user
function reportUser() {
   document.getElementById("reportUser").showModal();
   if (pathName === "/u" || pathName === "/u.html") {
      document.getElementById("userActions-dialog").close();
   }
}

function reportType_harassmentBullying() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Harassment/Bullying",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_hateSpeech() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Hate Speech",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_spam() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Spam",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_harmfulImpersonation() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Harmful Impersonation",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_harassmentBullying() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Harassment/Bullying",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_childPornOrEndangerment() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Child Pornography/Endangerment",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;
   document.getElementById("changeBasedOnReportReason").textContent = "Thank you for being brave and reporting this. We understand how difficult it is to see content involving child pornography/endangerment, and we sincerely appreciate you bringing it to our attention. We'll investigate this urgently and take appropriate action. We'll keep you updated on our progress.";

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_privacyViolations() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Privacy Violations",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_scams() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Scam",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_copyrightInfringement() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: "Copyright Infringement",
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

function reportType_other() {
   document.getElementById("reportUser").close();
   document.getElementById("reportReason_other").showModal();
}

function reportType_other_finish() {
   const newReportRef = firebase.database().ref("reports").push();
   const reportId = newReportRef.key;
   const url = new URL(window.location.href);
   const userParam = url.searchParams.get("id");

   const reportData = {
      reportedUsername: userParam,
      reason: document.getElementById("reportReason_txt").value,
      timestamp: Date.now()
   }

   const updates = {};
   updates["/reports/" + reportId] = reportData;

   document.getElementById("reportUser").close();
   document.getElementById("reportReason_other").close();

   document.getElementById("reportReason").textContent = reportData.reason;
   document.getElementById("reportUsername").textContent = `@${reportData.reportedUsername}`;

   document.getElementById("reportReceived").showModal();
   return firebase.database().ref().update(updates);
}

// Edit/Deleting Notes
if (pathName === "/home" || pathName === "/home.html" || pathName === "/note" || pathName === "/note.html" || pathName === "/u" || pathName === "/u.html" || pathName.startsWith("/u/") || pathName.startsWith("/note/")) {
   let editingNote = null;

   // Getting the note and making sure it actually belongs to the user
   document.addEventListener('click', function (event) {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            const uid = user.uid;

            if (event.target.classList.contains("more") || event.target.classList.contains("fa-solid" && "fa-pen-to-square")) {
               const moreButton = event.target;
               const noteId = findNoteId(moreButton);

               firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                  const ensureItsUser = snapshot.val();

                  if (ensureItsUser.whoSentIt === user.uid) {
                     editingNote = noteId;
                     document.getElementById("editWhatPartofNote").showModal();
                  }
               })
            }
         }
      })
   });

   function findNoteId(moreButton) {
      // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
      return moreButton.closest(".note").id;
   };

   // Delete Note
   function deleteNote() {
      document.getElementById("checkIfNoteDeletion").showModal();
      document.getElementById("editWhatPartofNote").close();
   }

   function deleteNote_fully() {
      firebase.database().ref(`notes/${editingNote}`).update({
         isDeleted: true
      })

      document.getElementById("noteDeleted").showModal();
      document.getElementById("checkIfNoteDeletion").close();
   }

   function deleteNote_nevermind() {
      document.getElementById("editWhatPartofNote").showModal();
      document.getElementById("checkIfNoteDeletion").close();
   }

   // Edit Note
   function editNoteContent() {
      document.getElementById("editNoteContent").showModal();
      document.getElementById("editWhatPartofNote").close();
   }

   function applyEdits() {
      document.getElementById("coverUpdatingNote").style.display = "block";

      let oldText = null;

      firebase.database().ref(`notes/${editingNote}`).once("value", (snapshot) => {
         console.log("Accessed");
         const currentText = snapshot.val();

         oldText = currentText.text;
      })

      const updateKey = firebase.database().ref(`notes/${editingNote}/updates`).push().key;
      const updates = {};

      firebase.database().ref(`notes/${editingNote}`).update({
         text: document.getElementById("newTextContent").value,
      })

      firebase.database().ref(`notes/${editingNote}/updates/${updateKey}`).update({
         previousText: oldText,
      })

      document.getElementById("noteUpdated").showModal();
      document.getElementById("editNoteContent").close();

      // firebase.database().ref(`notes/${editingNote}`).update({
      //     text: document.getElementById("newTextContent").value
      // })

      // document.getElementById("noteUpdated").showModal();
      // document.getElementById("editNoteContent").close();
   }

   function dontApplyEdits() {
      document.getElementById("editNoteContent").close();
      document.getElementById("editWhatPartofNote").showModal();
   }
}

// Account Area
document.body.addEventListener('click', function (event) {
   if (document.getElementById("profile").contains(event.target) || document.querySelector(".profileContainer").contains(event.target)) {
      document.getElementById("profile").style.display = "block";
   } else {
      document.getElementById("profile").style.display = "none";
   }
});

// Direct Messages
if (pathName === "/messages") {
   const url = new URL(window.location.href);
   const dmParam = url.searchParams.get("id");

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         if (!dmParam) {
            firebase.database().ref(`users/${user.uid}/openDMs`).on("value", (snapshot) => {
               const openDMs = snapshot.val() || {}; // Handle the case where openDMs doesn't exist

               const dmContainer = document.getElementById("openChats");
               dmContainer.innerHTML = "";

               if (Object.keys(openDMs).length > 0) {
                  if (document.getElementById("noDMsOpen")) {
                     document.getElementById("noDMsOpen").remove();
                  }

                  // Create divs for each DM
                  for (const dmId in openDMs) {
                     const dmDiv = document.createElement("div");
                     dmDiv.id = dmId;
                     dmDiv.classList.add("person");
                     firebase.database().ref(`dms/${dmId}`).on("value", (snapshot) => {
                        const dmData = snapshot.val();

                        if (user.uid === dmData.user1) {
                           const otherPersonPfp = document.createElement("img");
                           const otherPersonDisplay = document.createElement("span");
                           const lastMessageSent = document.createElement("span");

                           firebase.database().ref(`users/${dmData.user2}`).once("value", (snapshot) => {
                              const otherPerson = snapshot.val();

                              // Get pfp
                              otherPersonPfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${dmData.user2}%2F${otherPerson.pfp}?alt=media`;
                              otherPersonPfp.setAttribute("draggable", "false");
                              otherPersonPfp.classList.add("pfp");
                              dmDiv.appendChild(otherPersonPfp);
                              dmContainer.appendChild(dmDiv);

                              // Get display
                              otherPersonDisplay.textContent = otherPerson.display;
                              otherPersonDisplay.classList.add("display");
                              dmDiv.appendChild(otherPersonDisplay);
                              dmContainer.appendChild(dmDiv);

                              // Get last message, if available
                              if (dmData.messages) {

                              } else {
                                 lastMessageSent.textContent = `You and ${otherPerson.username} haven't chatted yet!`;
                                 lastMessageSent.classList.add("lastMessageSent");
                                 dmDiv.appendChild(lastMessageSent);
                                 dmContainer.appendChild(dmDiv);
                              }
                           })
                        } else {
                           const otherPersonPfp = document.createElement("img");
                           const otherPersonDisplay = document.createElement("span");
                           const lastMessageSent = document.createElement("p");

                           firebase.database().ref(`users/${dmData.user1}`).once("value", (snapshot) => {
                              const otherPerson = snapshot.val();

                              // Get pfp
                              otherPersonPfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${dmData.user1}%2F${otherPerson.pfp}?alt=media`;
                              otherPersonPfp.setAttribute("draggable", "false");
                              otherPersonPfp.classList.add("pfp");
                              dmDiv.appendChild(otherPersonPfp);
                              dmContainer.appendChild(dmDiv);

                              // Get display
                              otherPersonDisplay.textContent = otherPerson.display;
                              otherPersonDisplay.classList.add("display");
                              dmDiv.appendChild(otherPersonDisplay);
                              dmContainer.appendChild(dmDiv);

                              // Get last message, if available
                              if (dmData.messages) {

                              } else {
                                 lastMessageSent.textContent = `You and ${otherPerson.username} haven't chatted yet!`;
                                 lastMessageSent.classList.add("lastMessageSent");
                                 dmDiv.appendChild(lastMessageSent);
                                 dmContainer.appendChild(dmDiv);
                              }
                           })
                        }
                     })
                  }
               } else {
                  document.getElementById("noDMsOpen").style.display = "block";
               }
            })
         } else {
            // hide open dms & show current
            document.getElementById("dmNotOpen").remove();
            document.getElementById("dms").style.display = "block";
         }
      }
   })

   // Create new DMs
   function startNewChat() {
      document.getElementById("peopleToDm").showModal();

      firebase.database().ref(`users`).once("value", (snapshot) => {
         const allUsers = snapshot.val();

         for (const userId in allUsers) {
            const directMessagesExperiment = allUsers[userId].directMessagesExperiment; // Assuming 'display' exists
            if (directMessagesExperiment) {
               if (!document.getElementById(userId)) {
                  firebase.database().ref(`users/${userId}`).once("value", (snapshot) => {
                     const data = snapshot.val();

                     // Create div to house everything in
                     const profileHolder = document.createElement("div");
                     profileHolder.setAttribute("id", userId);
                     profileHolder.setAttribute("onclick", "createDM(this)");
                     profileHolder.classList.add("selectUserToDm");

                     // Get user pfp
                     const userId_pfp = document.createElement("img");
                     userId_pfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${userId}%2F${data.pfp}?alt=media`;
                     userId_pfp.classList.add("selectUser-pfp");
                     userId_pfp.setAttribute("draggable", "false");
                     profileHolder.appendChild(userId_pfp);

                     // Get display name
                     const userId_display = document.createElement("span");
                     userId_display.textContent = data.display;
                     userId_display.classList.add("display");
                     profileHolder.appendChild(userId_display);

                     // Get username and pronouns (if applicable)
                     const userId_username = document.createElement("span");
                     if (data.pronouns !== "" && data.pronouns !== undefined) {
                        userId_username.textContent = `@${data.username} • ${data.pronouns}`;
                     } else {
                        userId_username.textContent = `@${data.username}`;
                     }
                     userId_username.classList.add("username");
                     profileHolder.appendChild(userId_username);

                     // Finally, show the profile
                     document.getElementById("peopleToDm-users").appendChild(profileHolder);
                  })
               }
            }
         }
      })
   }

   // Create DM
   function createDM(element) {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            const newDM = firebase.database().ref('dms').push();
            const generatedKey = newDM.key;

            firebase.database().ref(`users/${user.uid}/hasDMsWith/${element.id}`).once("value", (snapshot) => {
               const exists = snapshot.exists();

               if (exists === false) {
                  // Set DMs for logged in user
                  firebase.database().ref(`users/${user.uid}/openDMs/${generatedKey}`).update({
                     isOpen: true,
                  })
                  firebase.database().ref(`users/${user.uid}/hasDMsWith/${element.id}`).update({
                     true: true,
                  })

                  // Set DMs for other user
                  firebase.database().ref(`users/${element.id}/openDMs/${generatedKey}`).update({
                     isOpen: true,
                  })
                  firebase.database().ref(`users/${element.id}/hasDMsWith/${user.uid}`).update({
                     true: true,
                  })

                  // Create DM
                  firebase.database().ref(`dms/${generatedKey}`).update({
                     user1: user.uid,
                     user2: element.id,
                  })

                  document.getElementById("peopleToDm").close();
               }
            })
         }
      })
   }
}

// Greet user
if (document.getElementById("greetingTime")) {
   const now = new Date();
   let hours = now.getHours();

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const greetWho = snapshot.val();

            if (hours < 12) {
               document.getElementById("greetingTime").textContent = `Good morning, ${greetWho.username}!`;
            } else if (hours < 17) {
               document.getElementById("greetingTime").textContent = `Good afternoon, ${greetWho.username}!`;
            } else {
               document.getElementById("greetingTime").textContent = `Good evening, ${greetWho.username}!`;
            }
         })
      } else {
         if (hours < 12) {
            document.getElementById("greetingTime").textContent = "Good morning!";
         } else if (hours < 17) {
            document.getElementById("greetingTime").textContent = "Good afternoon!";
         } else {
            document.getElementById("greetingTime").textContent = "Good evening!";
         }
      }
   })
}

// Email Verification
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      const isEmailVerified = user.emailVerified;

      if (isEmailVerified === false) {
         if (document.getElementById("verifyEmail")) {
            document.getElementById("verifyEmail").showModal();
         }
      }
   }
})

function getVerificationEmail() {
   firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
         document.getElementById("verifyEmail").close();
         document.getElementById("emailSent_emailVer").showModal();
      })
}

// Show Notification when user receives one
// This function is broken and should not be uncommented under any circumstance by a user.

// let notificationTitle = "";
// let notificationBody = "";

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         firebase.database().ref(`users/${user.uid}/notifications`).once("child_added", (snapshot) => {
//             notificationTitle = 'New Notification';
//             notificationBody = 'You have a new notification.';

//             if (Notification.permission === 'granted') {
//                 console.log("Granted");
//                 showNotification();
//             }
//         })
//     }
// })

// function showNotification() {
//     const notification = new Notification(notificationTitle, {
//         body: notificationBody
//     });
// }

// Detect if user is on the desktop app
function isTauri() {
   return (
      typeof window !== "undefined" &&
      typeof window.__TAURI__ !== "undefined"
   );
}

if (isTauri()) {
   // if (document.getElementById("betaTestingApp")) {
   //    document.getElementById("betaTestingApp").remove();
   // }
}

// Detect user OS
if (pathName === "/download") {
   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

   // Windows/Windows Phone
   if (/windows phone/i.test(userAgent)) {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "Unavailable for Windows Phone.";
   } else if (/win/i.test(userAgent)) {
      document.getElementById("downloadButton").setAttribute("onclick", "window.location.href='/assets/releases/windows/ts_installer.msi'");
      document.getElementById("downloadButton").textContent = "Get TransSocial for Windows";
      document.getElementById("systemRequirement").textContent = "Requires Windows 8 or later.";
      // macOS    
   } else if (/macintosh|mac os x/i.test(userAgent)) {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "Unavailable for macOS at this time.";
      // iPad/iPhone/iPod
   } else if (/ipad|iphone|ipod/i.test(userAgent) && !window.MSStream) {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "Unavailable for iOS at this time.";
      // Android
   } else if (/android/i.test(userAgent)) {
      document.getElementById("downloadButton").setAttribute("onclick", "window.location.href='/assets/releases/android/app-release.apk'");
      document.getElementById("downloadButton").textContent = "Get TransSocial for Windows";
      document.getElementById("systemRequirement").textContent = "Requires Android 6 or later.";
      // Linux
   } else if (/linux/i.test(userAgent)) {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "Unavailable for Linux at this time.";
      // who knows?
   } else {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "You're using an unknown operating system.";
   }
}

// User pfp in header
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
         const data = snapshot.val();

         if (document.getElementById("userPfp-header")) {
            document.getElementById("userPfp-header").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${user.uid}%2F${data.pfp}?alt=media`;
         }
      })
   } else {
      if (document.getElementById("userPfp-header")) {
         document.getElementById("userPfp-header").src = `/assets/imgs/defaultPfp.png`;
      }
   }
})

// account manager (header) 
document.body.addEventListener('click', function (event) {
   if (document.getElementById("accountManager").contains(event.target) || document.getElementById("userPfp-header").contains(event.target)) {
      document.getElementById("accountManager").style.display = "block";
      document.getElementById("greetingManager").textContent = `Hello, ${document.getElementById("displayName-sidebar").textContent}!`;
   } else {
      document.getElementById("accountManager").style.display = "none";
   }
});

// determine date creation
function timeAgo(timestamp) {
   const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
   const seconds = now - Math.floor(timestamp / 1000); // Convert milliseconds to seconds

   if (seconds < 60) {
      return `${seconds}s`;
   }
   const minutes = Math.floor(seconds / 60);
   if (minutes < 60) {
      return `${minutes}m`;
   }
   const hours = Math.floor(minutes / 60);
   if (hours < 24) {
      return `${hours}h`;
   }
   const days = Math.floor(hours / 24);
   if (days < 30) {
      return `${days}d`;
   }

   // Convert timestamp to a Date object
   const date = new Date(timestamp);
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;

   return formattedDate;
}

// Check unlocked achievements on achievement page
if (pathName === "/achievements") {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/achievements/transsocial`).once("value", (snapshot) => {
            const achievement = snapshot.val();

            if (achievement) {
               if (achievement.firstSteps) {
                  document.getElementById("firstStepsAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_fs").textContent = "You've taken the plunge! Welcome to TransSocial! (Create a note)";
                  document.getElementById("unlockDate_fs").textContent = `Unlocked ${achievement.firstSteps.unlockedWhen}`;
               }

               if (achievement.expressYourself) {
                  document.getElementById("expressYourselfAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_ey").textContent = "Unleash your inner rockstar! (Renote a note)";
                  document.getElementById("unlockDate_ey").textContent = `Unlocked ${achievement.expressYourself.unlockedWhen}`;
               }

               if (achievement.theSocialButterfly) {
                  document.getElementById("theSocialButterflyAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_tsb").textContent = "Spread your wings and fly! (Follow another user on TransSocial)";
                  document.getElementById("unlockDate_tsb").textContent = `Unlocked ${achievement.theSocialButterfly.unlockedWhen}`;
               }

               if (achievement.chatterbox) {
                  document.getElementById("chatterboxAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_cb").textContent = "Conversation starter! (Reply to a note)";
                  document.getElementById("unlockDate_cb").textContent = `Unlocked ${achievement.chatterbox.unlockedWhen}`;
               }
            }
         })
      }
   })
}

// Unlock achievement
function unlockAchievement(achievement) {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         if (achievement === "First Steps") {
            firebase.database().ref(`users/${user.uid}/achievements/transsocial/firstSteps`).once("value", (snapshot) => {
               const hasAchievement = snapshot.exists();

               if (hasAchievement === false) {
                  // Play the sound and show the achievement
                  new Audio("/assets/audio/transsocial_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;

                  // unlock it
                  const date = new Date();
                  const formattedDate = date.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });

                  firebase.database().ref(`users/${user.uid}/achievements/transsocial/firstSteps`).update({
                     unlockedWhen: formattedDate,
                     unlocked: true
                  })
                     .then(() => {
                        setTimeout(function () {
                           document.getElementById("achievementUnlock").style.display = "none";
                        }, 3000);
                     })
               }
            })
         } else if (achievement === "Chatterbox") {
            firebase.database().ref(`users/${user.uid}/achievements/transsocial/chatterbox`).once("value", (snapshot) => {
               const hasAchievement = snapshot.exists();

               if (hasAchievement === false) {
                  // Play the sound and show the achievement
                  new Audio("/assets/audio/transsocial_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").innerHTML = `<i class="fa-solid fa-comments"></i>`;

                  // unlock it
                  const date = new Date();
                  const formattedDate = date.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });

                  firebase.database().ref(`users/${user.uid}/achievements/transsocial/chatterbox`).update({
                     unlockedWhen: formattedDate,
                     unlocked: true
                  })
                     .then(() => {
                        setTimeout(function () {
                           document.getElementById("achievementUnlock").style.display = "none";
                        }, 3000);
                     })
               }
            })
         } else if (achievement === "The Social Butterfly") {
            firebase.database().ref(`users/${user.uid}/achievements/transsocial/theSocialButterfly`).once("value", (snapshot) => {
               const hasAchievement = snapshot.exists();

               if (hasAchievement === false) {
                  // Play the sound and show the achievement
                  new Audio("/assets/audio/transsocial_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").innerHTML = `<i class="fa-solid fa-user-plus"></i>`;

                  // unlock it
                  const date = new Date();
                  const formattedDate = date.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });

                  firebase.database().ref(`users/${user.uid}/achievements/transsocial/theSocialButterfly`).update({
                     unlockedWhen: formattedDate,
                     unlocked: true
                  })
                     .then(() => {
                        setTimeout(function () {
                           document.getElementById("achievementUnlock").style.display = "none";
                        }, 3000);
                     })
               }
            })
         } else if (achievement === "Express Yourself") {
            firebase.database().ref(`users/${user.uid}/achievements/transsocial/expressYourself`).once("value", (snapshot) => {
               const hasAchievement = snapshot.exists();

               if (hasAchievement === false) {
                  // Play the sound and show the achievement
                  new Audio("/assets/audio/transsocial_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").innerHTML = `<i class="fa-solid fa-bullhorn"></i>`;

                  // unlock it
                  const date = new Date();
                  const formattedDate = date.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });

                  firebase.database().ref(`users/${user.uid}/achievements/transsocial/expressYourself`).update({
                     unlockedWhen: formattedDate,
                     unlocked: true
                  })
                     .then(() => {
                        setTimeout(function () {
                           document.getElementById("achievementUnlock").style.display = "none";
                        }, 3000);
                     })
               }
            })
         }
      }
   })
}

// Theme creation
if (pathName === "/create_theme") {
   // page specific variables
   let wantsToApplyTheme = false;
   let hasThemeBeenPublished = false;
   let appliedTheme = null;

   // Check for input, and if it's a valid color, change the color of the element.
   document.addEventListener("input", (event) => {
      const targetElement = event.target;
      const inputValue = targetElement.value;
      // this will check for hex
      const hexColorRegex = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
      // this will check for RGB (not RGBA)
      // this will also allow the user to use the formatting: "rgb(0, 0, 0)" or just "0, 0, 0"
      const rgbColorRegex = /^rgb\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*\)$/i;
      const simpleRgbColorRegex = /^([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])$/i;
      
      // update the correct CSS value 
      // background
      if (targetElement.id === "background") {
         if (hexColorRegex.test(inputValue)) {
            // this will check if it's formatted as #321321 or not. if it's not, add a # on the users behalf
            const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
            document.documentElement.style.setProperty("--background", hexValue);
         }
      // main color
      } else if (targetElement.id === "mainColor") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--main-color", hexValue);
      // main color (but darker!!)
      } else if (targetElement.id === "mainColorDarker") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--main-color-darker", hexValue);
      // header color
      } else if (targetElement.id === "headerColor") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--header-color", hexValue);
      // text color
      } else if (targetElement.id === "text") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--text", hexValue);
      // half transparent text
      } else if (targetElement.id === "textHalfTransparent") {
         // rgba has to be special so do some stuff because we cant use "rgba()" directly
         let match = rgbColorRegex.exec(inputValue);

         if (!match) {
            match = simpleRgbColorRegex.exec(inputValue);
            if (match) {
               const r = match[1];
               const g = match[2];
               const b = match[3];
               document.documentElement.style.setProperty("--text-half-transparent", `rgba(${r}, ${g}, ${b}, 0.5)`);
            }
         } else {
            const r = match[1];
            const g = match[2];
            const b = match[3];
            document.documentElement.style.setProperty("--text-half-transparent", `rgba(${r}, ${g}, ${b}, 0.5)`);
         }
      // semi transparent text
      } else if (targetElement.id === "textSemiTransparent") {
         // rgba has to be special so do some stuff because we cant use "rgba()" directly
         let match = rgbColorRegex.exec(inputValue);

         if (!match) {
            match = simpleRgbColorRegex.exec(inputValue);
            if (match) {
               const r = match[1];
               const g = match[2];
               const b = match[3];
               document.documentElement.style.setProperty("--text-semi-transparent", `rgba(${r}, ${g}, ${b}, 0.7)`);
            }
         } else {
            const r = match[1];
            const g = match[2];
            const b = match[3];
            document.documentElement.style.setProperty("--text-semi-transparent", `rgba(${r}, ${g}, ${b}, 0.7)`);
         }
      // sidebar button hovered
      } else if (targetElement.id === "sidebarButtonHover") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--sidebar-button-hover", hexValue);
      // button transparent hover
      } else if (targetElement.id === "buttonTransparentHover") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--button-transparent-hover", hexValue);
      // success color
      } else if (targetElement.id === "successColor") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--success-color", hexValue);
      // warning text
      } else if (targetElement.id === "warningText") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--warning-text", hexValue);
      // error text
      } else if (targetElement.id === "errorText") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--error-text", hexValue);
      // sidebar text
      } else if (targetElement.id === "sidebarText") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--sidebar-text", hexValue);
      // note seperator
      } else if (targetElement.id === "noteSeperator") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--note-seperator", hexValue);
      // like color
      } else if (targetElement.id === "likeColor") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--like-color", hexValue);
      // renote color
      } else if (targetElement.id === "renoteColor") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--renote-color", hexValue);
      // reply background
      } else if (targetElement.id === "replyBackground") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--reply-background", hexValue);
      // reply background (but hovered)
      } else if (targetElement.id === "replyBackgroundHovered") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--reply-hovered-background", hexValue);
      // note background
      } else if (targetElement.id === "noteBackground") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--note-background", hexValue);
      // button text
      } else if (targetElement.id === "buttonText") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--button-text", hexValue);
      // hovered button text
      } else if (targetElement.id === "buttonTextHovered") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--hovered-button-text", hexValue);
      // sidebar create note button
      } else if (targetElement.id === "sidebarCreateNoteButton") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--sidebar-create-note-button", hexValue);
      } else if (targetElement.id === "sidebarCreateNoteButtonHover") {
         const hexValue = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
         document.documentElement.style.setProperty("--sidebar-create-note-button-hover", hexValue);
      }
   });

   // save theme functions
   function saveTheme_Open() {
      document.getElementById("saveTheme").showModal();
   }

   function saveTheme() {
      if (!document.getElementById("saveThemeBtn").classList.contains("disabled")) {
         // this will prevent users from running functions they aren't supposed to while saving
         document.getElementById("saveThemeBtn").classList.add("disabled");
         document.getElementById("dontSaveThemeBtn").classList.add("disabled");
         document.getElementById("saveThemeBtn").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Saving...`;

         // check if the name already exists
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/savedThemes/${document.getElementById("themeName").value}`).once("value", (snapshot) => {
                  const trueValue = document.getElementById("themeName").value.trim();

                  // ensures that the name isn't empty
                  if (trueValue === "") {
                     document.getElementById("saveThemeBtn").classList.remove("disabled");
                     document.getElementById("dontSaveThemeBtn").classList.remove("disabled");
                     document.getElementById("saveThemeBtn").innerHTML = `Save Theme`;
                     document.getElementById("errorSavingTheme").textContent = "Your theme name cannot be empty.";
                     document.getElementById("errorSavingTheme").style.display = "block";
                  } else {
                     firebase.database().ref(`users/${user.uid}/savedThemes/${document.getElementById("themeName").value}`).update({
                        background : document.getElementById("background").value,
                        mainColor : document.getElementById("mainColor").value,
                        mainColorDarker : document.getElementById("mainColorDarker").value,
                        headerColor : document.getElementById("headerColor").value,
                        text : document.getElementById("text").value,
                        textSemiTransparent : document.getElementById("textSemiTransparent").value,
                        textHalfTransparent : document.getElementById("textHalfTransparent").value,
                        sidebarButtonHover : document.getElementById("sidebarButtonHover").value,
                        buttonTransparentHover : document.getElementById("buttonTransparentHover").value,
                        success : document.getElementById("successColor").value,
                        warning : document.getElementById("warningText").value,
                        error : document.getElementById("errorText").value,
                        sidebarText : document.getElementById("sidebarText").value,
                        noteSeperator : document.getElementById("noteSeperator").value,
                        liked : document.getElementById("likeColor").value,
                        renoted : document.getElementById("renoteColor").value,
                        replyBackground : document.getElementById("replyBackground").value,
                        replyHoveredBackground : document.getElementById("replyBackgroundHovered").value,
                        noteBackground : document.getElementById("noteBackground").value,
                        buttonText : document.getElementById("buttonText").value,
                        hoveredButtonText : document.getElementById("buttonTextHovered").value,
                        createNoteButton : document.getElementById("sidebarCreateNoteButton").value,
                        createNoteButtonHover : document.getElementById("sidebarCreateNoteButtonHover").value
                     }).then(() => {
                        // successfully saved
                        document.getElementById("saveThemeBtn").classList.remove("disabled");
                        document.getElementById("dontSaveThemeBtn").classList.remove("disabled");
                        document.getElementById("saveThemeBtn").innerHTML = `Save Theme`;
                        document.getElementById("saveTheme").close();

                        // if the user wants to apply the theme, close this modal and apply it
                        if (wantsToApplyTheme === true) {
                           document.getElementById("saveTheme").close();
                           document.getElementById("applyingTheme").showModal();

                           // apply the theme and prompt user where they want to go (stay on this page or go to another page)
                           const inputs = [
                              { id: "background", cssVar: "--background", saveAs: "background", type: "hex" },
                              { id: "mainColor", cssVar: "--main-color", saveAs: "mainColor", type: "hex" },
                              { id: "mainColorDarker", cssVar: "--main-color-darker", saveAs: "mainColorDarker", type: "hex" },
                              { id: "headerColor", cssVar: "--header-color", saveAs: "headerColor", type: "hex" },
                              { id: "text", cssVar: "--text", saveAs: "text", type: "hex" },
                              { id: "textHalfTransparent", cssVar: "--text-half-transparent", saveAs: "textHalfTransparent", type: "rgb" },
                              { id: "textSemiTransparent", cssVar: "--text-semi-transparent", saveAs: "textSemiTransparent", type: "rgb" },
                              { id: "sidebarButtonHover", cssVar: "--sidebar-button-hover", saveAs: "sidebarButtonHover", type: "hex" },
                              { id: "buttonTransparentHover", cssVar: "--button-transparent-hover", saveAs: "buttonTransparentHover", type: "hex" },
                              { id: "successColor", cssVar: "--success-color", saveAs: "success", type: "hex" },
                              { id: "warningText", cssVar: "--warning-text", saveAs: "warning", type: "hex" },
                              { id: "errorText", cssVar: "--error-text", saveAs: "error", type: "hex" },
                              { id: "sidebarText", cssVar: "--sidebar-text", saveAs: "sidebarText", type: "hex" },
                              { id: "noteSeperator", cssVar: "--note-seperator", saveAs: "noteSeperator", type: "hex" },
                              { id: "likeColor", cssVar: "--like-color", saveAs: "liked", type: "hex" },
                              { id: "renoteColor", cssVar: "--renote-color", saveAs: "renoted", type: "hex" },
                              { id: "replyBackground", cssVar: "--reply-background", saveAs: "replyBackground", type: "hex" },
                              { id: "replyBackgroundHovered", cssVar: "--reply-hovered-background", saveAs: "replyHoveredBackground", type: "hex" },
                              { id: "noteBackground", cssVar: "--note-background", saveAs: "noteBackground", type: "hex" },
                              { id: "buttonText", cssVar: "--button-text", saveAs: "buttonText", type: "hex" },
                              { id: "buttonTextHovered", cssVar: "--hovered-button-text", saveAs: "hoveredButtonText", type: "hex" },
                              { id: "sidebarCreateNoteButton", cssVar: "--sidebar-create-note-button", saveAs: "createNoteButton", type: "hex" },
                              { id: "sidebarCreateNoteButtonHover", cssVar: "--sidebar-create-note-button-hover", saveAs: "createNoteButtonHover", type: "hex" },
                           ];

                           inputs.forEach(input => {
                              const inputElement = document.getElementById(input.id);
                              let value = inputElement.value;

                              if (input.type === "hex") {
                                 // if missing "#", add it
                                 if (value.charAt(0) !== "#") {
                                    value = `#${value}`;
                                 }

                                 // update css variable
                                 document.documentElement.style.setProperty(input.cssVar, value);

                                 // update value in db
                                 firebase.database().ref(`users/${user.uid}/themeColors`).update({
                                    [input.saveAs]: value
                                 }).then(() => {
                                    firebase.database().ref(`users/${user.uid}`).update({
                                       theme : "Custom"
                                    });

                                    if (input.id === "noteBackground") {
                                       // let the user know its finished
                                       document.getElementById("applyingTheme_div").style.display = "none";
                                       document.getElementById("finishedApplyingTheme").style.display = "block";
                                       wantsToApplyTheme = false;
                                    }
                                 });
                              } else if (input.type === "rgb") {
                                 // handle rgb values
                                 if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value)) {
                                    // value is in "rgb(r, g, b)" format
                                    if (input.id === "textSemiTransparent") {
                                       value = value.replace(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, 'rgba($1, $2, $3, 0.7)');
                                    } else if (input.id === "textHalfTransparent") {
                                       value = value.replace(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, 'rgba($1, $2, $3, 0.5)');
                                    }
                                 } else if (/^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/.test(value)) {
                                    // value is in "r, g, b" format
                                    if (input.id === "textSemiTransparent") {
                                       value = `rgba(${value}, 0.7)`;
                                    } else if (input.id === "textHalfTransparent") {
                                       value = `rgba(${value}, 0.5)`;
                                    }
                                 }

                                 // update css variable
                                 document.documentElement.style.setProperty(input.cssVar, value);

                                 // update value in db
                                 firebase.database().ref(`users/${user.uid}/themeColors`).update({
                                    [input.saveAs]: value
                                 }).then(() => {
                                    firebase.database().ref(`users/${user.uid}`).update({
                                       theme : "Custom"
                                    });
                                 });
                              }
                           })
                        }
                     });
                  }
               });
            }
         });
      }
   }

   function dontSaveTheme() {
      if (!document.getElementById("dontSaveThemeBtn").classList.contains("disabled")) {
         document.getElementById("themeName").value = "";
         document.getElementById("saveTheme").close();
      }
   }

   // load theme functions
   function loadTheme() {
      // show the modal
      document.getElementById("loadTheme").showModal();

      // load themes
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/savedThemes`).get().then((snapshot) => {
               if (snapshot.exists()) {
                  const savedThemes = snapshot.val();

                  // clear the "savedThemes" innerHTML to avoid repeats
                  document.getElementById("savedThemes").innerHTML = "";
                  
                  // create a button for each theme
                  Object.keys(savedThemes).forEach((key) => {
                     const themeName = key;
                     const button = document.createElement("button");

                     // update the button text to the name of the theme, as well as style and add an event listener
                     button.textContent = themeName;
                     button.style.width = "100%";
                     button.addEventListener("click", () => {
                        // when clicked, we want the user to know their theme is being loaded
                        document.getElementById("savedThemes").style.display = "none"; // to ensure they aren't opening multiple
                        document.getElementById("fetchingThemes").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading ${themeName}...`;
                        document.getElementById("fetchingThemes").style.display = "block";

                        // actually load the theme
                        // tell the input that user input happened, so the colors will automatically update
                        firebase.database().ref(`users/${user.uid}/savedThemes/${themeName}`).once("value", (snapshot) => {
                           const themeData = snapshot.val();

                           // has theme been published?
                           if (themeData.published === undefined) {
                              hasThemeBeenPublished = false;
                           } else {
                              hasThemeBeenPublished = `${themeData.published}`;
                           }

                           // let transsocial know what theme is applied
                           appliedTheme = themeName;

                           // set background
                           if (themeData.background !== "") {
                              document.getElementById("background").value = themeData.background;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("background").dispatchEvent(event);
                           }

                           // set mainColor
                           if (themeData.mainColor !== "") {
                              document.getElementById("mainColor").value = themeData.mainColor;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("mainColor").dispatchEvent(event);
                           }

                           // set mainColorDarker
                           if (themeData.mainColorDarker !== "") {
                              document.getElementById("mainColorDarker").value = themeData.mainColorDarker;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("mainColorDarker").dispatchEvent(event);
                           }

                           // set headerColor
                           if (themeData.headerColor !== "") {
                              document.getElementById("headerColor").value = themeData.headerColor;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("headerColor").dispatchEvent(event);
                           }

                           // set text
                           if (themeData.text !== "") {
                              document.getElementById("text").value = themeData.text;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("text").dispatchEvent(event);
                           }

                           // set textHalfTransparent
                           if (themeData.textHalfTransparent !== "") {
                              document.getElementById("textHalfTransparent").value = themeData.textHalfTransparent;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("textHalfTransparent").dispatchEvent(event);
                           }

                           // set textSemiTransparent
                           if (themeData.textSemiTransparent !== "") {
                              document.getElementById("textSemiTransparent").value = themeData.textSemiTransparent;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("textSemiTransparent").dispatchEvent(event);
                           }

                           // set sidebarButtonHover
                           if (themeData.sidebarButtonHover !== "") {
                              document.getElementById("sidebarButtonHover").value = themeData.sidebarButtonHover;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("sidebarButtonHover").dispatchEvent(event);
                           }

                           // set buttonTransparentHover
                           if (themeData.buttonTransparentHover !== "") {
                              document.getElementById("buttonTransparentHover").value = themeData.buttonTransparentHover;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("buttonTransparentHover").dispatchEvent(event);
                           }

                           // set successColor
                           if (themeData.success !== "") {
                              document.getElementById("successColor").value = themeData.success;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("successColor").dispatchEvent(event);
                           }

                           // set warningText
                           if (themeData.warning !== "") {
                              document.getElementById("warningText").value = themeData.warning;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("warningText").dispatchEvent(event);
                           }

                           // set errorText
                           if (themeData.error !== "") {
                              document.getElementById("errorText").value = themeData.error;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("errorText").dispatchEvent(event);
                           }

                           // set sidebarText
                           if (themeData.sidebarText !== "") {
                              document.getElementById("sidebarText").value = themeData.sidebarText;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("sidebarText").dispatchEvent(event);
                           }

                           // set noteSeperator
                           if (themeData.noteSeperator !== "") {
                              document.getElementById("noteSeperator").value = themeData.noteSeperator;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("noteSeperator").dispatchEvent(event);
                           }

                           // set likeColor
                           if (themeData.liked !== "") {
                              document.getElementById("likeColor").value = themeData.liked;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("likeColor").dispatchEvent(event);
                           }

                           // set renoteColor
                           if (themeData.renoted !== "") {
                              document.getElementById("renoteColor").value = themeData.renoted;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("renoteColor").dispatchEvent(event);
                           }

                           // set replyBackground
                           if (themeData.replyBackground !== "") {
                              document.getElementById("replyBackground").value = themeData.replyBackground;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("replyBackground").dispatchEvent(event);
                           }

                           // set replyBackgroundHovered
                           if (themeData.replyHoveredBackground !== "") {
                              document.getElementById("replyBackgroundHovered").value = themeData.replyHoveredBackground;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("replyBackgroundHovered").dispatchEvent(event);
                           }

                           // set noteBackground
                           if (themeData.noteBackground !== "") {
                              document.getElementById("noteBackground").value = themeData.noteBackground;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("noteBackground").dispatchEvent(event);
                           }

                           // set buttonText
                           if (themeData.buttonText !== "" && themeData.buttonText) {
                              document.getElementById("buttonText").value = themeData.buttonText;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("buttonText").dispatchEvent(event);
                           }

                           // set buttonTextHovered
                           if (themeData.hoveredButtonText !== "" && themeData.hoveredButtonText) {
                              document.getElementById("buttonTextHovered").value = themeData.hoveredButtonText;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("buttonTextHovered").dispatchEvent(event);
                           }

                           // set sidebarCreateNoteButton
                           if (themeData.createNoteButton !== "" && themeData.createNoteButton) {
                              document.getElementById("sidebarCreateNoteButton").value = themeData.createNoteButton;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("sidebarCreateNoteButton").dispatchEvent(event);
                           }
                           
                           // set sidebarCreateNoteButtonHover
                           if (themeData.createNoteButtonHover !== "" && themeData.createNoteButtonHover) {
                              document.getElementById("sidebarCreateNoteButtonHover").value = themeData.createNoteButtonHover;
                              const event = new Event("input", {
                                 bubbles: true,
                                 cancelable: true,
                              });
                              document.getElementById("sidebarCreateNoteButtonHover").dispatchEvent(event);
                           }

                           // after setting everything, close the modal and show the "savedThemes" again (just in case)
                           document.getElementById("loadTheme").close();
                           document.getElementById("fetchingThemes").innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading themes...`;
                           document.getElementById("savedThemes").style.display = "block";
                        });
                     });

                     // update the button (and hide "Fetching themes..." if available)
                     document.getElementById("savedThemes").appendChild(button);
                     if (document.getElementById("fetchingThemes")) {
                        document.getElementById("fetchingThemes").style.display = "none";
                     }
                  })
               } else {
                  // the user has no themes
                  document.getElementById("fetchingThemes").innerHTML = `No saved themes found. Try creating one!`;
               }
            }).catch((error) => {
               // error occurred
               document.getElementById("fetchingThemes").innerHTML = `An error occurred while fetching themes: ${error.message}`;
            });
         }
      });
   }

   // apply theme
   function applyTheme() {
      // update this, as transsocial needs to know
      wantsToApplyTheme = true;

      // prompt the user to save the theme first
      saveTheme_Open();
   }

   // publish theme
   function publishTheme_Open() {
      document.getElementById("publishTheme").showModal();
   }

   function publishTheme() {
      document.getElementById("themeSuccessfullyPublished").style.display = "none";

      // make sure the title/description isn't empty
      if (document.getElementById("themeTitle").value !== "" && document.getElementById("themeDescription").value !== "") {
         // make sure none of the variables are empty
         // ik this is ineffective... but be quiet
         if (document.getElementById("background").value !== "" && 
            document.getElementById("mainColor").value !== "" && 
            document.getElementById("mainColorDarker").value !== "" && 
            document.getElementById("headerColor").value !== "" && 
            document.getElementById("text").value !== "" && 
            document.getElementById("textHalfTransparent").value !== "" && 
            document.getElementById("textSemiTransparent").value !== "" && 
            document.getElementById("sidebarButtonHover").value !== "" && 
            document.getElementById("buttonTransparentHover").value !== "" && 
            document.getElementById("successColor").value !== "" && 
            document.getElementById("warningText").value !== "" && 
            document.getElementById("errorText").value !== "" && 
            document.getElementById("sidebarText").value !== "" && 
            document.getElementById("likeColor").value !== "" && 
            document.getElementById("renoteColor").value !== "" && 
            document.getElementById("replyBackground").value !== "" && 
            document.getElementById("replyBackgroundHovered").value !== "" && 
            document.getElementById("noteBackground").value !== "" &&
            document.getElementById("buttonText").value !== "" &&
            document.getElementById("buttonTextHovered").value !== "" &&
            document.getElementById("sidebarCreateNoteButton").value !== "" &&
            document.getElementById("sidebarCreateNoteButtonHover").value !== "") {
            // add the theme to the database
            firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                  // generate a key for the theme. that way, multiple themes can have the same name without overriding an existing one
                  // if user has published this theme, just update the theme lol.
                  let newKey = null;

                  if (hasThemeBeenPublished === false) {
                     const themesRef = firebase.database().ref("themes/");
                     const newKeyRef = themesRef.push();
                     newKey = newKeyRef.key;
                  } else {
                     newKey = hasThemeBeenPublished;
                  }

                  // save all the values
                  // yes. this code is copy pasted. judge me.
                  const inputs = [
                     { id: "background", cssVar: "--background", saveAs: "background", type: "hex" },
                     { id: "mainColor", cssVar: "--main-color", saveAs: "mainColor", type: "hex" },
                     { id: "mainColorDarker", cssVar: "--main-color-darker", saveAs: "mainColorDarker", type: "hex" },
                     { id: "headerColor", cssVar: "--header-color", saveAs: "headerColor", type: "hex" },
                     { id: "text", cssVar: "--text", saveAs: "text", type: "hex" },
                     { id: "textHalfTransparent", cssVar: "--text-half-transparent", saveAs: "textHalfTransparent", type: "rgb" },
                     { id: "textSemiTransparent", cssVar: "--text-semi-transparent", saveAs: "textSemiTransparent", type: "rgb" },
                     { id: "sidebarButtonHover", cssVar: "--sidebar-button-hover", saveAs: "sidebarButtonHover", type: "hex" },
                     { id: "buttonTransparentHover", cssVar: "--button-transparent-hover", saveAs: "buttonTransparentHover", type: "hex" },
                     { id: "successColor", cssVar: "--success-color", saveAs: "success", type: "hex" },
                     { id: "warningText", cssVar: "--warning-text", saveAs: "warning", type: "hex" },
                     { id: "errorText", cssVar: "--error-text", saveAs: "error", type: "hex" },
                     { id: "sidebarText", cssVar: "--sidebar-text", saveAs: "sidebarText", type: "hex" },
                     { id: "noteSeperator", cssVar: "--note-seperator", saveAs: "noteSeperator", type: "hex" },
                     { id: "likeColor", cssVar: "--like-color", saveAs: "liked", type: "hex" },
                     { id: "renoteColor", cssVar: "--renote-color", saveAs: "renoted", type: "hex" },
                     { id: "replyBackground", cssVar: "--reply-background", saveAs: "replyBackground", type: "hex" },
                     { id: "replyBackgroundHovered", cssVar: "--reply-hovered-background", saveAs: "replyHoveredBackground", type: "hex" },
                     { id: "noteBackground", cssVar: "--note-background", saveAs: "noteBackground", type: "hex" },
                     { id: "buttonText", cssVar: "--button-text", saveAs: "buttonText", type: "hex" },
                     { id: "buttonTextHovered", cssVar: "--hovered-button-text", saveAs: "hoveredButtonText", type: "hex" },
                     { id: "sidebarCreateNoteButton", cssVar: "--sidebar-create-note-button", saveAs: "createNoteButton", type: "hex" },
                     { id: "sidebarCreateNoteButtonHover", cssVar: "--sidebar-create-note-button-hover", saveAs: "createNoteButtonHover", type: "hex" },
                  ];

                  inputs.forEach(input => {
                     const inputElement = document.getElementById(input.id);
                     let value = inputElement.value;

                     if (input.type === "hex") {
                        // if missing "#", add it
                        if (value.charAt(0) !== "#") {
                           value = `#${value}`;
                        }

                        // update css variable
                        document.documentElement.style.setProperty(input.cssVar, value);

                        // update value in db
                        firebase.database().ref(`themes/${newKey}`).update({
                           title : document.getElementById("themeTitle").value,
                           desc : document.getElementById("themeDescription").value,
                           creator : user.uid
                        });

                        firebase.database().ref(`themes/${newKey}/themeColors`).update({
                           [input.saveAs]: value
                        }).then(() => {
                           if (input.id === "background") {
                              // this only needs to be executed once at the beginning
                              if (hasThemeBeenPublished === false) {
                                 firebase.database().ref(`users/${user.uid}/savedThemes/${appliedTheme}`).update({
                                    published : newKey
                                 });

                                 hasThemeBeenPublished = `${newKey}`;
                              }
                           }

                           if (input.id === "noteBackground") {
                              // let the user know its finished
                              document.getElementById("themeSuccessfullyPublished").style.display = "block";
                              document.getElementById("themeSuccessfullyPublished").style.color = "var(--success-color)";
                              document.getElementById("themeSuccessfullyPublished").innerHTML = `Your theme has been successfully published! It is available on the TransSocial User Studio <a href="/userstudio/${newKey}" style="color: var(--main-color)">here.</a>`;
                           }
                        });
                     } else if (input.type === "rgb") {
                        // handle rgb values
                        if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value)) {
                           // value is in "rgb(r, g, b)" format
                           if (input.id === "textSemiTransparent") {
                              value = value.replace(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, 'rgba($1, $2, $3, 0.7)');
                           } else if (input.id === "textHalfTransparent") {
                              value = value.replace(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, 'rgba($1, $2, $3, 0.5)');
                           }
                        } else if (/^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/.test(value)) {
                           // value is in "r, g, b" format
                           if (input.id === "textSemiTransparent") {
                              value = `rgba(${value}, 0.7)`;
                           } else if (input.id === "textHalfTransparent") {
                              value = `rgba(${value}, 0.5)`;
                           }
                        }

                        // update css variable
                        document.documentElement.style.setProperty(input.cssVar, value);

                        // update value in db
                        firebase.database().ref(`themes/${newKey}`).update({
                           title : document.getElementById("themeTitle").value,
                           desc : document.getElementById("themeDescription").value,
                           creator : user.uid
                        });

                        firebase.database().ref(`themes/${newKey}/themeColors`).update({
                           [input.saveAs]: value
                        })
                     }
                  })
               }
            });
         } else {
            document.getElementById("themeSuccessfullyPublished").style.display = "block";
            document.getElementById("themeSuccessfullyPublished").style.color = "var(--error-text)";
            document.getElementById("themeSuccessfullyPublished").textContent = "You can't have an empty color.";
         }
      } else {
         document.getElementById("themeSuccessfullyPublished").style.display = "block";
         document.getElementById("themeSuccessfullyPublished").style.color = "var(--error-text)";
         document.getElementById("themeSuccessfullyPublished").textContent = "Your title and description cannot be empty.";
      }
   }

   function dontPublishTheme() {
      // clear text areas and close modal
      document.getElementById("themeTitle").value = "";
      document.getElementById("characterLimit_ThemeTitle").textContent = "0/30";
      document.getElementById("themeDescription").value = "";
      document.getElementById("characterLimit_ThemeDescription").textContent = "0/250";
      document.getElementById("publishTheme").close();
      document.getElementById("themeSuccessfullyPublished").style.display = "none";
   }
}

// User Studio
if (pathName === "/userstudio" || pathName.startsWith("/userstudio/")) {
   // see if user has a theme applied or not
   const url = new URL(window.location.href);
   let themeParam = null;

   if (pathName.startsWith("/userstudio/")) {
      const segments = pathName.split("/");
      themeParam = segments[2];

      console.log(themeParam);
   } else {
      themeParam = url.searchParams.get("id");
   }

   if (!themeParam) {
      firebase.database().ref("themes/").once("value", (snapshot) => {
         const themesContainer = document.getElementById("availableThemes");

         snapshot.forEach((childSnapshot) => {
            const themeKey = childSnapshot.key;
            const themeData = childSnapshot.val();

            // create a div for each theme
            const themeDiv = document.createElement("div");
            themeDiv.classList.add("theme");

            // add pic/title/desc/creator to div
            // if legacy, then add a warning
            if (themeData.legacy) {
               const warning = document.createElement("div");
               warning.className = "badge";
               warning.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Core`;
               themeDiv.appendChild(warning);
            }

            const thumbnail = document.createElement("img");
            if (themeData.hasThumbnail) {
               thumbnail.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fthemes%2F${themeKey}%2Fthumbnail.png?alt=media`;
            } else {
               thumbnail.src = `/assets/imgs/themeimgunavailable.png`;
            }

            const title = document.createElement("h3");
            title.textContent = themeData.title;

            const desc = document.createElement("p");
            desc.textContent = themeData.desc;

            const creator = document.createElement("h4");
            firebase.database().ref(`users/${themeData.creator}/username`).once("value", (snapshot) => {
               const user = snapshot.val();

               creator.textContent = `Created by @${user}`;
            })

            // append elements to the theme div
            themeDiv.appendChild(thumbnail);
            themeDiv.appendChild(title);
            themeDiv.appendChild(desc);
            themeDiv.appendChild(creator);
            themeDiv.setAttribute("onclick", `window.location.replace("/userstudio/${themeKey}")`);
            
            // append the theme to the entire page
            if (themeData.canAppearOnStore !== "false") {
               themesContainer.append(themeDiv);
            }
         });
      });
   } else {
      // hide the container for store front
      document.getElementById("noThemeSelected").style.display = "none";

      // get data for the stuff
      firebase.database().ref(`themes/${themeParam}`).once("value", (snapshot) => {
         const themeExists = snapshot.exists();
         const themeData = snapshot.val();
         const themeKey = snapshot.key;

         if (themeExists === false) {
            // 404 the user
            document.getElementById("themeNotFound").style.display = "block";
         } else {
            // show the user the theme
            document.getElementById("themeSelected").style.display = "block";
            console.log(themeData);
            if (themeData.hasThumbnail) {
               document.getElementById("themeImg").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fthemes%2F${themeKey}%2Fthumbnail.png?alt=media`;
            }
            if (!themeData.legacy) {
               document.getElementById("legacyTheme").remove();
            }
            document.getElementById("themeName_title").textContent = themeData.title;
            document.getElementById("themeDesc").textContent = themeData.desc;
            firebase.database().ref(`users/${themeData.creator}/username`).once("value", (snapshot) => {
               const user = snapshot.val();

               document.getElementById("themeCreator").setAttribute("href", `/u/${user}`);
               document.getElementById("themeCreator").textContent = `by @${user}`;
            });

            // allow the user to get the theme
            document.getElementById("installTheme").setAttribute("onclick", `installTheme("${snapshot.key}")`);
         }
      });
   }

   // install theme
   function installTheme(theme) {
      // get the user
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            // add it to the user's account
            firebase.database().ref(`users/${user.uid}/installedThemes/${theme}`).update({
               installed : true
            }).then(() => {
               // show modal letting them know it was successful
               document.getElementById("confirmAdding").showModal();
            });
         } else {
            loginPrompt();
         }
      })
   }
}

// check for fatal account creation errors
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      // make sure the user isn't trying to register
      if (!pathName.startsWith("/auth/")) {
         firebase.database().ref(`users/${user.uid}`).on("value", (snapshot) => {
            if (snapshot.exists()) {
               const checkInfo = snapshot.val();

               // check for any vital missing info (email, display, pfp or username (everything else is non-vital))
               if (pathName !== "/settings") {
                  if (checkInfo.email === undefined || checkInfo.display === undefined || checkInfo.username === undefined || checkInfo.pfp === undefined) {
                     // this means either their email, display name or username is missing
                     window.location.replace("/settings?fatal=true");
                  }
               } else if (pathName === "/settings") {
                  if (checkInfo.email === undefined || checkInfo.display === undefined || checkInfo.username === undefined || checkInfo.pfp === undefined) {
                     document.getElementById("fatalAccountError").showModal();
                     document.getElementById("createNote-sidebar").style.display = "none"; // prevent them from creating notes

                     // if email, just add it to the db lol
                     // "wait spongebob! we're not cavemen! we have technology!"
                     if (checkInfo.email === undefined) {
                        firebase.database().ref(`users/${user.uid}`).update({
                           email : user.email
                        })
                        .then(() => {
                           document.getElementById("email-address").value = user.email;

                           if (checkInfo.display !== undefined && checkInfo.username !== undefined && checkInfo.pfp !== undefined) {
                              // this means nothing else broke. we automatically fixed it
                              document.getElementById("fatalAccountError").close();
                              document.getElementById("fatalAccountError_AutomaticFix").showModal();
                              document.getElementById("createNote-sidebar").style.display = "block";
                           }
                        });
                     }
                  }
               }
            } else {
               // this means their account isn't in the db AT ALL
               if (pathName !== "/settings") {
                  // ensure their set in the db isn't empty as that causes SEVERAL issues
                  // (well, several issues besides the fact their account basically doesnt exist in transsocial's eyes)
                  firebase.database().ref(`users/${user.uid}`).update({
                     email : user.email
                  }).then(() => {
                     window.location.replace("/settings?fatal=true");
                  });
               } else {
                  document.getElementById("fatalAccountError").showModal();
               }
            }
         });
      }
   }
})

// prevent .close(); from closing a modal without an animation
// save the original close method ofc tho
const originalClose = HTMLDialogElement.prototype.close;

HTMLDialogElement.prototype.close = function() {
   const modal = this;

   // apply the animation
   modal.style.animation = "closePopup 0.5s ease";

   // wait for the animation to finish before actually closing the modal
   setTimeout(() => {
      // call the original close method
      originalClose.call(modal);

      // remove the animation
      modal.style.animation = "";
   }, 100);
};

// prevent modals from being closed with esc as it can break things (such as 
// letting the user use transsocial without verifying their email... oopsies)
// this is just default <dialog> behavior, not something i manually coded :p
document.addEventListener("keydown", function(event) {
   if (event.key === "Escape") {
      const openDialog = document.querySelector("dialog[open]");
      if (openDialog) {
         // this will prevent it
         event.preventDefault();
         event.stopPropagation(); 
      }
   }
});

// send notifications
function sendNotification(toWho, data) {
   const newNotiKey = firebase.database().ref("users/" + toWho + "notifications/").push().key;
   firebase.database().ref(`users/${toWho}/notifications/`).child(newNotiKey).set(data);
   firebase.database().ref().update({
      [`users/${toWho}/notifications/unread`]: firebase.database.ServerValue.increment(1)
   });
}

// allow users to favorite notes (yet again)
function favorite(note) {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/favorites/${note}`).once("value", (snapshot) => {
            if (snapshot.exists()) {
               // remove the note from their favorites
               firebase.database().ref(`users/${user.uid}/favorites/${note}`).update({
                  favorited : null // removes the favorite
               }).then(() => {
                  // find the favorite button
                  document.getElementById(`favorite-${note}`).style.color = "var(--text)";
               });
            } else {
               // add the note to their favorites
               firebase.database().ref(`users/${user.uid}/favorites/${note}`).update({
                  favorited : true // adds the favorite
               }).then(() => {
                  // find the favorite button and change color
                  document.getElementById(`favorite-${note}`).style.color = "var(--main-color)";
               });
            }
         });
      } else {
         loginPrompt(); // not logged in. prompt them to log in.
      }
   });
}

function favoriteNoteView(note) { // yes. this is the exact code but for the note view. i couldnt figure out issues so this was the only solution i could think of. dont judge me.
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/favorites/${note}`).once("value", (snapshot) => {
            if (snapshot.exists()) {
               // remove the note from their favorites
               firebase.database().ref(`users/${user.uid}/favorites/${note}`).update({
                  favorited : null // removes the favorite
               }).then(() => {
                  // find the favorite button
                  document.getElementById(`favoriteButton_icon`).style.color = "var(--text)";
               });
            } else {
               // add the note to their favorites
               firebase.database().ref(`users/${user.uid}/favorites/${note}`).update({
                  favorited : true // adds the favorite
               }).then(() => {
                  // find the favorite button and change color
                  document.getElementById(`favoriteButton_icon`).style.color = "var(--main-color)";
               });
            }
         });
      } else {
         loginPrompt(); // not logged in. prompt them to log in.
      }
   });
}

// allow users to filter through versions (indev, pre-alpha, etc.)
if (pathName === "/updates") {
   let filteredVersion = transsocialReleaseVersion; // by default, set it to what transsocial currently is

   // allow user to switch filters
   function filterInDev() {
      filteredVersion = "indev";
      document.getElementById("selectedFilter").textContent = "Indev Versions";

      // hide all the other versions and show current
      document.getElementById("indevVersions").style.display = "block";
      document.getElementById("prealphaVersions").style.display = "none";
      document.getElementById("alphaVersions").style.display = "none";
      document.getElementById("betaVersions").style.display = "none";
      document.getElementById("releaseVersions").style.display = "none";
   }

   function filterPreAlpha() {
      filteredVersion = "pre-alpha";
      document.getElementById("selectedFilter").textContent = "Pre-Alpha Versions";

      // hide all the other versions and show current
      document.getElementById("indevVersions").style.display = "none";
      document.getElementById("prealphaVersions").style.display = "block";
      document.getElementById("alphaVersions").style.display = "none";
      document.getElementById("betaVersions").style.display = "none";
      document.getElementById("releaseVersions").style.display = "none";
   }

   function filterAlpha() {
      filteredVersion = "alpha";
      document.getElementById("selectedFilter").textContent = "Alpha Versions";

      // hide all the other versions and show current
      document.getElementById("indevVersions").style.display = "none";
      document.getElementById("prealphaVersions").style.display = "none";
      document.getElementById("alphaVersions").style.display = "block";
      document.getElementById("betaVersions").style.display = "none";
      document.getElementById("releaseVersions").style.display = "none";
   }

   function filterBeta() {
      filteredVersion = "beta";
      document.getElementById("selectedFilter").textContent = "Beta Versions";

      // hide all the other versions and show current
      document.getElementById("indevVersions").style.display = "none";
      document.getElementById("prealphaVersions").style.display = "none";
      document.getElementById("alphaVersions").style.display = "none";
      document.getElementById("betaVersions").style.display = "block";
      document.getElementById("releaseVersions").style.display = "none";
   }

   function filterRelease() {
      filteredVersion = "release";
      document.getElementById("selectedFilter").textContent = "Release Versions";

      // hide all the other versions and show current
      document.getElementById("indevVersions").style.display = "none";
      document.getElementById("prealphaVersions").style.display = "none";
      document.getElementById("alphaVersions").style.display = "none";
      document.getElementById("betaVersions").style.display = "none";
      document.getElementById("releaseVersions").style.display = "block";
   }
}

// don't open external links without a warning
function openLink(link) {
   // get the domain and grey out https:// and subdomain (so the user knows the SITE they're visiting)
   let url = new URL(link);
   let protocol = url.protocol + "//";
   let hostname = url.hostname;
   let pathname = url.pathname;

   // handle subdomains
   let parts = hostname.split(".");
   if (parts.length > 2) {
      parts.shift();
   }
   let domain = parts.join(".");
   let greyedOutPart = hostname.replace(domain, "");

   if (domain !== "transs.social") {
      // display link with greyed out subdomain
      document.getElementById("linkyLink").innerHTML = `<span style="color: var(--text-half-transparent)">${protocol}${greyedOutPart}</span>${domain}<span style="color: var(--text-half-transparent)">${pathname}</span>`;

      // button :3
      document.getElementById("externalLink").href = link;
      
      // open the modal
      document.getElementById("openLink").showModal();
   } else {
      window.location.replace(link);
   }
}

// search (only took 4 months after release)
function search(executed) {
   // execute (kinda) different code based on page
   if (executed === "searchBar") {
      window.location.replace(`/search?q=${document.getElementById("searchBar").value}`);
   } else if (executed === "searchPage") {
      window.location.replace(`/search?q=${document.getElementById("searchTerm").value}`);
   } else if (executed === "queryPage") {
      window.location.replace(`/search?q=${document.getElementById("queryInput").value}`);
   }
}

if (pathName === "/search") {
   // get search term (if there is one)
   const url = new URL(window.location.href);
   const query = url.searchParams.get("q");

   if (query) {
      // make sure the query isn't empty
      if (query.trim() !== "") {
         // easter eggs
         // if you're here to cheat, boo on you >:(
         if (query.toLowerCase() === "nacht der untoten") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: World at War Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/gameover_nacht.mp3").play();
         } else if (query.toLowerCase() === "i have 950 points") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: Black Ops Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/mysterybox_rolling.mp3").play();
         } else if (query.toLowerCase() === "what happened to samanthas dog, fluffy?") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: Black Ops Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/samanthasdog.mp3").play();
         } else if (query.toLowerCase() === "reach for juggernog tonight") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: Black Ops Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/reachforjuggernogtonight.mp3").play();
         } else if (query.toLowerCase() === "speed cola speeds up your life") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: Black Ops Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/speedcolaspeedsupyourlife.mp3").play();
         } else if (query.toLowerCase() === "you need a little revive") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML += `<br/>All copyrighted material remains property of its respective owners. The inclusion of references of "Call of Duty: Black Ops Zombies" is not endorsed by Activision Publishing, Inc or Treyarch. These references are intended as homage and fan content in appreciation of the original game series.`;
            new Audio("/assets/audio/youneedalittlerevive.mp3").play();
         } else if (query.toLowerCase() === "easter egg") {
            document.getElementById("easterEggFound").style.display = "block";
            document.getElementById("easterEggFound").innerHTML = `Here's your easter egg. No sound, no nothing. Just me, some boring old text.`;
         } else if (query.toLowerCase() === "meow") {
            document.getElementById("easterEggFound").style.display = "block";
            new Audio("/assets/audio/meow.wav").play();
         }

         // hide "no term" and show "term"
         document.getElementById("noTerm").remove();
         document.getElementById("term").style.display = "block";

         // add feedback
         document.title = `"${query}" | TransSocial`;
         document.getElementById("queryInput").value = query;

         // first, show users
         firebase.database().ref("users").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
               const userData = childSnapshot.val();
               const uid = childSnapshot.key;

               const lowerQuery = query.toLowerCase();
               const display = userData.display ? userData.display.toString().toLowerCase() : '';
               const username = userData.username ? userData.username.toString().toLowerCase() : '';

               if (display.includes(lowerQuery) || username.includes(lowerQuery)) {
                  if (userData.suspensionStatus !== "suspended") {
                     // hide "no results"
                     document.getElementById("noResults").style.display = "none";
                     document.getElementById("hasResults").style.display = "block";

                     // hide "No users found"
                     document.getElementById("noUsersFound").style.display = "none";

                     // show them
                     const container = document.createElement("div");
                     container.classList.add("note"); // yep
                     container.setAttribute("onclick", `window.location.href="/u/${userData.username}"`);

                     const pfp = document.createElement("img");
                     pfp.classList.add("notePfp");
                     pfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${uid}%2F${userData.pfp}?alt=media`
                     pfp.setAttribute("draggable", "false");
                     pfp.setAttribute("loading", "lazy");
                     
                     const display = document.createElement("a");
                     display.href = `/u/${userData.username}`;
                     display.textContent = userData.display;
                     display.classList.add("noteDisplay");

                     const breakpoint = document.createElement("br");

                     const username = document.createElement("a");
                     username.href = `/u/${userData.username}`;
                     if (userData.pronouns !== undefined && userData.pronouns !== "") {
                        username.textContent = `@${userData.username} • ${userData.pronouns}`;
                     } else {
                        username.textContent = `@${userData.username}`;
                     }
                     username.classList.add("noteUsername");

                     document.getElementById("queriedUsers").appendChild(container);
                     container.appendChild(pfp);
                     container.appendChild(display);
                     container.appendChild(breakpoint);
                     container.appendChild(username);
                  }
               }
            });
         });

         // then, show notes
         // someone should really put note rendering into a function... cough... (i'll do it one day 😔)
         firebase.database().ref("notes").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
               const noteContent = childSnapshot.val();

               const lowerQuery = query.toLowerCase();
               const text = noteContent.text ? noteContent.text.toString().toLowerCase() : '';

               if (text.includes(lowerQuery)) {
                  // hide "no results"
                  document.getElementById("noResults").style.display = "none";
                  document.getElementById("hasResults").style.display = "block";

                  // hide "No users found"
                  document.getElementById("noNotesFound").style.display = "none";

                  // create note div 
                  const noteDiv = document.createElement("div");
                  noteDiv.classList.add("note");
                  noteDiv.setAttribute("onclick", `window.location.replace("/note/${noteContent.id}")`);
                  
                  // check nsfw/sensitive/political status
                  if (noteContent.isNsfw === true) {
                     firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                           firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                              const showNsfw = snapshot.val();

                              if (showNsfw.showNsfw === "Show") {
                                 // no need to do anything
                              } else if (showNsfw.showNsfw === "Blur") {
                                 // cover
                                 const cover = document.createElement("div");
                                 cover.classList.add("contentWarning");
                                 cover.setAttribute("id", `${noteData.id}-blur`);

                                 // warning header
                                 const warning = document.createElement("p");
                                 warning.setAttribute("id", `${noteData.id}-warning`);
                                 warning.classList.add("warning");
                                 warning.textContent = "Note may contain NSFW content.";

                                 // warning info
                                 const warningInfo = document.createElement("p");
                                 warningInfo.classList.add("warningInfo");
                                 warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                                 warningInfo.textContent = "The creator of this note flagged their note as having NSFW content.";

                                 // close warning button
                                 const closeButton = document.createElement("button");
                                 closeButton.classList.add("closeWarning");
                                 closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                                 closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                                 closeButton.textContent = "View";

                                 // Show all children
                                 noteDiv.appendChild(cover);
                                 noteDiv.appendChild(warning);
                                 noteDiv.appendChild(warningInfo);
                                 noteDiv.appendChild(closeButton);
                              }
                           });
                        }
                     })
                  } else if (noteContent.isSensitive === true) {
                     firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                           firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                              const showNsfw = snapshot.val();
      
                              if (showNsfw.showSensitive === "Show") {
                                 // No need to do anything. It'll do it as is.
                              } else if (showNsfw.showSensitive === "Blur") {
                                 // The actual cover
                                 const cover = document.createElement("div");
                                 cover.classList.add("contentWarning");
                                 cover.setAttribute("id", `${noteContent.id}-blur`);
      
                                 // Warning Header
                                 const warning = document.createElement("p");
                                 warning.setAttribute("id", `${noteContent.id}-warning`);
                                 warning.classList.add("warning");
                                 warning.textContent = "Note may contain sensitive content.";
      
                                 // Warning Info
                                 const warningInfo = document.createElement("p");
                                 warningInfo.classList.add("warningInfo");
                                 warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                                 warningInfo.textContent = "The creator of this note flagged their note as having sensitive content.";
      
                                 // Close Warning Button
                                 const closeButton = document.createElement("button");
                                 closeButton.classList.add("closeWarning");
                                 closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                                 closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                                 closeButton.textContent = "View";
      
                                 // Show all children
                                 noteDiv.appendChild(cover);
                                 noteDiv.appendChild(warning);
                                 noteDiv.appendChild(warningInfo);
                                 noteDiv.appendChild(closeButton);
                              } else if (showNsfw.showSensitive === "Hide") {
                                 // We remove the note so the user doesn't have to see it
                                 noteDiv.remove();
                              }
                           })
                        } else {
                           noteDiv.remove();
                        }
                     })
                  } else if (noteContent.isPolitical === true) {
                     firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                           firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                              const showNsfw = snapshot.val();
      
                              if (showNsfw.showPolitics === "Show") {
                                 // No need to do anything. It'll do it as is.
                              } else if (showNsfw.showPolitics === "Blur") {
                                 // The actual cover
                                 const cover = document.createElement("div");
                                 cover.classList.add("contentWarning");
                                 cover.setAttribute("id", `${noteContent.id}-blur`);
      
                                 // Warning Header
                                 const warning = document.createElement("p");
                                 warning.setAttribute("id", `${noteContent.id}-warning`);
                                 warning.classList.add("warning");
                                 warning.textContent = "Note may contain political content.";
      
                                 // Warning Info
                                 const warningInfo = document.createElement("p");
                                 warningInfo.classList.add("warningInfo");
                                 warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                                 warningInfo.textContent = "This note may contain political content. This note does not reflect TransSocial's opinions. This note may not be political and may be incorrectly flagged.";
      
                                 // Close Warning Button
                                 const closeButton = document.createElement("button");
                                 closeButton.classList.add("closeWarning");
                                 closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                                 closeButton.setAttribute("onclick", "removeNsfw(this.id);");
                                 closeButton.textContent = "View";
                                 closeButton.style.marginTop = "25px";
      
                                 // Show all children
                                 noteDiv.appendChild(cover);
                                 noteDiv.appendChild(warning);
                                 noteDiv.appendChild(warningInfo);
                                 noteDiv.appendChild(closeButton);
                              } else if (showNsfw.showPolitics === "Hide") {
                                 // We remove the note so the user doesn't have to see it
                                 noteDiv.remove();
                              }
                           })
                        } else {
                           noteDiv.remove();
                        }
                     })
                  }

                  // create the user's pfp
                  const userPfp = document.createElement("img");
                  userPfp.classList.add("notePfp");
                  firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
                     const fetchedUser = snapshot.val();
                     userPfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteContent.whoSentIt}%2F${fetchedUser.pfp}?alt=media`;
                     userPfp.setAttribute("draggable", "false");
                     userPfp.setAttribute("loading", "lazy");
                  });
                  noteDiv.appendChild(userPfp);

                  // Create the user's display name
                  // Also check for badges (verified, mod, Enchanted, etc.)
                  const displayName = document.createElement("a");
                  displayName.classList.add("noteDisplay");
                  firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
                     const fetchedUser = snapshot.val();
                     displayName.textContent = fetchedUser.display;
                     displayName.href = `/u/${fetchedUser.username}`;

                     const badges = document.createElement("span");
                     if (fetchedUser.isVerified === true) {
                        badges.innerHTML = `<i class="fa-solid fa-circle-check fa-sm"></i>`;
                        badges.classList.add("noteBadges");
                     }
                     if (fetchedUser.isSubscribed === true) {
                        badges.innerHTML = `${badges.innerHTML}<i class="fa-solid fa-heart fa-sm"></i>`;
                     }
                     if (fetchedUser.activeContributor === true) {
                        badges.innerHTML = `${verifiedBadge.innerHTML}<i class="fa-solid fa-handshake-angle fa-sm"></i>`;
                     }
                     displayName.appendChild(badges);
                  })
                  noteDiv.appendChild(displayName);

                  // Insert Breakpoint to Seperate Display Name and Username
                  const breakpoint = document.createElement("br");
                  noteDiv.appendChild(breakpoint);

                  // Create the user's username
                  const username = document.createElement("a");
                  username.classList.add("noteUsername");
                  firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
                     const fetchedUser = snapshot.val();
                     if (fetchedUser.pronouns !== undefined) {
                        const displayDate = timeAgo(noteContent.createdAt);

                        username.textContent = `@${fetchedUser.username} • ${fetchedUser.pronouns} • ${displayDate}`;
                     } else {
                        const displayDate = timeAgo(noteContent.createdAt);

                        username.textContent = `@${fetchedUser.username} • ${displayDate}`;
                     }
                     username.href = `/u/${fetchedUser.username}`;
                  })
                  noteDiv.appendChild(username);

                  // Create the note's text
                  const text = document.createElement("p");
                  text.innerHTML = sanitizeAndLinkify(noteContent.text)
                  text.classList.add("noteText");
                  if (noteContent.replyingTo === undefined) {
                     text.setAttribute("onclick", `window.location.href="/note/${noteContent.id}"`);
                  }
                  text.querySelectorAll('a').forEach(link => {
                     link.addEventListener('click', (event) => {
                        event.stopPropagation();
                     });
                  });
                  twemoji.parse(text, {
                     folder: 'svg',
                     ext: '.svg'
                  });
                  noteDiv.appendChild(text);

                  // If image has image/video, render a video/image
                  if (noteContent.image !== undefined) {
                     let imageFileName = noteContent.image;
                     let imageExtension = imageFileName.split(".").pop();
                     const url = imageExtension;
                     const cleanUrl = url.split('?')[0];
                  
                     if (cleanUrl === "mp4") {
                        const video = document.createElement("video");
                        video.src = noteContent.image;
                        video.classList.add("uploadedImg");
                        video.controls = true;
                        video.muted = true;
                        video.loop = true;
                        video.setAttribute("loading", "lazy");
                        video.style.visibility = "hidden"; // Start hidden
                        video.style.opacity = "0";
                  
                        video.autoplay = userAutoplayPreference;
                  
                        video.setAttribute("alt", `${noteContent.alt}`);
                        noteDiv.appendChild(video);
                  
                        // observe image
                        mediaObserver.observe(video);
                     } else {
                        const image = document.createElement("img");
                        image.src = noteContent.image;
                        image.draggable = "false";
                        image.classList.add("uploadedImg");
                        image.setAttribute("alt", `${noteContent.alt}`);
                        image.setAttribute("loading", "lazy");
                        image.style.visibility = "hidden"; // Start hidden
                        image.style.opacity = "0";
                  
                        noteDiv.appendChild(image);
                  
                        // observe image
                        mediaObserver.observe(image);
                     }
                  }

                  // if the note has a song, embed it into the note
                  if (noteContent.music) {
                     const embed = document.createElement("iframe");
                     embed.src = `https://open.spotify.com/embed/track/${noteContent.music}`;
                     embed.width = "98%";
                     embed.height = "100";
                     embed.frameBorder = "0";
                     embed.allowTransparency = "true";
                     embed.allow = "encrypted-media";

                     noteDiv.appendChild(embed);
                  }

                  // If quoting a note, display the note that the note is quoting
                  if (noteContent.quoting) {
                     const container = document.createElement("div");
                     container.classList.add("quoteContainer");
                     container.setAttribute("onclick", `window.location.replace("/note/${noteContent.quoting}")`);
                     noteDiv.appendChild(container);
      
                     firebase.database().ref(`notes/${noteContent.quoting}`).once("value", (snapshot) => {
                        const quoteData = snapshot.val();
      
                        if (quoteData.isDeleted !== true) {
                           firebase.database().ref(`users/${quoteData.whoSentIt}`).once("value", (snapshot) => {
                              const quoteUser = snapshot.val();
      
                              const quotePfp = document.createElement("img");
                              quotePfp.classList.add("quotePfp");
                              quotePfp.setAttribute("draggable", "false");
                              if (quoteUser.suspensionStatus !== "suspended") {
                                 quotePfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${quoteData.whoSentIt}%2F${quoteUser.pfp}?alt=media`;
                              } else {
                                 quotePfp.src = `/assets/imgs/defaultPfp.png`;
                              };
      
                              const quoteContent = document.createElement("div");
                              quoteContent.classList.add("quoteContent");
      
                              const quoteHeader = document.createElement("div");
                              quoteHeader.classList.add("quoteHeader");
      
                              const quoteDisplay = document.createElement("span");
                              quoteDisplay.classList.add("quoteDisplay");
                              if (quoteUser.suspensionStatus !== "suspended") {
                                 quoteDisplay.textContent = quoteUser.display;
                              } else {
                                 quoteDisplay.textContent = "User Unavailable";
                              }
      
                              const quoteUsername = document.createElement("span");
                              quoteUsername.classList.add("quoteUsername");
                              if (quoteUser.suspensionStatus !== "suspended") {
                                 if (quoteUser.pronouns !== undefined && quoteUser.pronouns !== "") {
                                    quoteUsername.textContent = `@${quoteUser.username} • ${quoteUser.pronouns}`;
                                 } else {
                                    quoteUsername.textContent = `@${quoteUser.username}`;
                                 }
                              } else {
                                 quoteUsername.textContent = `User Unavailable`;
                              }
      
                              const quoteText = document.createElement("span");
                              quoteText.classList.add("quoteText");
                              let content = sanitizeAndLinkify(quoteData.text);
                              if (content.length > 247) { // check length
                                 content = content.substring(0, 247) + "...";
                              }
                              if (quoteUser.suspensionStatus !== "suspended") {
                                 quoteText.innerHTML = content;
                              } else {
                                 quoteText.textContent = `@${quoteUser.username} is suspended, and notes by this user cannot be viewed.`;
                              }
      
                              container.appendChild(quotePfp);
                              container.appendChild(quoteContent);
                              quoteHeader.appendChild(quoteDisplay);
                              quoteHeader.appendChild(quoteUsername);
                              quoteContent.appendChild(quoteHeader);
                              quoteContent.appendChild(quoteText);
                              twemoji.parse(quoteText, {
                                 folder: 'svg',
                                 ext: '.svg'
                              });
                           })
                        } else {
                           const quotePfp = document.createElement("img");
                           quotePfp.classList.add("quotePfp");
                           quotePfp.setAttribute("draggable", "false");
                           quotePfp.src = `/assets/imgs/defaultPfp.png`;
      
                           const quoteContent = document.createElement("div");
                           quoteContent.classList.add("quoteContent");
      
                           const quoteHeader = document.createElement("div");
                           quoteHeader.classList.add("quoteHeader");
      
                           const quoteDisplay = document.createElement("span");
                           quoteDisplay.classList.add("quoteDisplay");
                           quoteDisplay.textContent = "Unknown User";
      
                           const quoteUsername = document.createElement("span");
                           quoteUsername.classList.add("quoteUsername");
                           quoteUsername.textContent = `@unknownuser`;
                           
      
                           const quoteText = document.createElement("span");
                           quoteText.classList.add("quoteText");
                           quoteText.textContent = "You do not have permission to view this note.";
      
                           container.appendChild(quotePfp);
                           container.appendChild(quoteContent);
                           quoteHeader.appendChild(quoteDisplay);
                           quoteHeader.appendChild(quoteUsername);
                           quoteContent.appendChild(quoteHeader);
                           quoteContent.appendChild(quoteText);
                        }
                     })
                  }

                  // If flagged, display that.
                  if (noteContent.isNsfw === true) {
                     const contentWarning = document.createElement("p");
                     contentWarning.classList.add("contentWarning-showBelowText");
                     contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as NSFW`;

                     noteDiv.appendChild(contentWarning);
                  } else if (noteContent.isSensitive === true) {
                     const contentWarning = document.createElement("p");
                     contentWarning.classList.add("contentWarning-showBelowText");
                     contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as sensitive`;

                     noteDiv.appendChild(contentWarning);
                  } else if (noteContent.isPolitical === true) {
                     const contentWarning = document.createElement("p");
                     contentWarning.classList.add("contentWarning-showBelowText");
                     contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as political`;

                     noteDiv.appendChild(contentWarning);
                  }

                  const buttonRow = document.createElement("div");
                  buttonRow.classList.add("buttonRow");
                  firebase.database().ref(`users/${firebase.auth().currentUser.uid}/experiments`).once("value", (val) => {
                     if (val.val().noteButtonLayout) {
                        buttonRow.classList.add("buttonRowExperiment");
                     }
                  })
                  
                  // Add love button
                  const loveBtn = document.createElement("p");
                  loveBtn.classList.add("likeBtn");
                  if (noteContent.likes !== undefined) {
                     loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> ${noteContent.likes}`;

                     firebase.auth().onAuthStateChanged((user) => {
                        if (noteContent.whoLiked && noteContent.whoLiked[user.uid]) {
                           loveBtn.classList.add("liked");
                        }
                     })
                  } else {
                     loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> 0`;
                  }
                  loveBtn.setAttribute("id", `like-${noteContent.id}`);
                  buttonRow.appendChild(loveBtn);

                  // Add renote button
                  const renoteBtn = document.createElement("p");
                  renoteBtn.classList.add("renoteBtn");
                  if (noteContent.renotes !== undefined) {
                     renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> ${noteContent.renotes}`;

                     firebase.auth().onAuthStateChanged((user) => {
                        if (noteContent.whoRenoted && noteContent.whoRenoted[user.uid]) {
                           renoteBtn.classList.add("renoted");
                        }
                     })
                  } else {
                     renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> 0`;
                  }
                  renoteBtn.setAttribute("id", `renote-${noteContent.id}`);
                  buttonRow.appendChild(renoteBtn);

                  // Add reply button
                  const replyBtn = document.createElement("p");
                  replyBtn.classList.add("replyBtn");
                  if (noteContent.replies !== undefined) {
                     replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> ${noteContent.replies}`;
                  } else {
                     replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> 0`;
                  }
                  if (pathName !== "/note" && !pathName.startsWith("/note/")) {
                     replyBtn.setAttribute("onclick", `window.location.href="/note/${noteContent.id}";`);
                  } else {
                     replyBtn.setAttribute("onclick", "replyToNote(this);");
                  }
                  buttonRow.appendChild(replyBtn);

                  // Add quote renote button
                  const quoteRenote = document.createElement("p");
                  quoteRenote.classList.add("quoteRenoteBtn");
                  quoteRenote.innerHTML = `<i class="fa-solid fa-quote-left"></i>`;
                  quoteRenote.setAttribute("onclick", `quoteRenote("${noteContent.id}")`);
                  buttonRow.appendChild(quoteRenote);

                  // Add favorite button
                  const favorite = document.createElement("p");
                  favorite.classList.add("quoteRenoteBtn"); // eh. just reuse a class tbh
                  favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}"></i>`; // apply the id to the favorites button or it will not change colors
                  favorite.setAttribute("onclick", `favorite("${noteContent.id}")`);
                  firebase.auth().onAuthStateChanged((user) => {
                     if (user) {
                        firebase.database().ref(`users/${user.uid}/favorites/${noteContent.id}`).once("value", (snapshot) => {
                           if (snapshot.exists()) {
                              // checked if the user has already favorited this. if they have, change the color to indicate that
                              favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}" style="color: var(--main-color);"></i>`;
                           }
                        });
                     }
                  });
                  buttonRow.appendChild(favorite);

                  // If user created the note, allow them to edit/delete
                  firebase.auth().onAuthStateChanged((user) => {
                     if (user) {
                        if (user.uid === noteContent.whoSentIt) {
                           const more = document.createElement("p");
                           more.classList.add("more");
                           more.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
                           buttonRow.appendChild(more);
                        }
                     }
                  })

                  noteDiv.appendChild(buttonRow);

                  // Render note
                  // BUT check for certain things first (such as if user is suspended, if user is blocked, etc.)
                  // Prevent suspended users notes from rendering
                  firebase.database().ref(`users/${noteContent.whoSentIt}`).once("value", (snapshot) => {
                     const isSuspended = snapshot.val();

                     if (isSuspended.suspensionStatus === "suspended") {
                        noteDiv.remove();
                     }
                  })

                  // If all is okay, do it fine.
                  if (noteContent.isDeleted !== true) {
                     document.getElementById("queriedNotes").appendChild(noteDiv);
                  }
               }
            });
         });
      } 
   }
}

if (document.getElementById("searchBar")) {
   document.getElementById("searchBar").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
         window.location.replace(`/search?q=${document.getElementById("searchBar").value}`);
      }
   });
}

// init stripe & allow users to create a subscription
// also yes. this key is safe to have out. this wasn't an accident lol. (wait, you cant do that, it would violate our license)
// "pk_live" = "published_key_live(environment)"
const stripe = Stripe("pk_live_51Pkc30J2LcM1skRbKkfR1gcdbky4xCquhxca1TGOC30SfJmWfYuoACaMyeK2EJXRWRzfSv8i6uU8dVz4epMoKeRI00l2gmgIUU");
const elements = stripe.elements();

if (document.getElementById("subscription-form")) {
   // this styles the forms
   const style = {
      base: {
         color: "#fff",
         fontFamily: '"Gabarito", sans-serif',
         fontSize: '15px',
         '::placeholder': {
            color: '#b7b7b7'
         }
      },
      invalid: {
         color: '#ff0000',
         iconColor: '#ff0000'
      }
   };

   const card = elements.create("card", { style });
   card.mount("#card-element");

   const form = document.getElementById("subscription-form");

   // this creates a subscription
   firebase.auth().onAuthStateChanged((user) => {
      form.addEventListener("submit", async (event) => {
         if (document.getElementById("submitSubBtn").classList.contains("disabled")) {
            return; // already running.
         }

         document.getElementById("submitSubBtn").innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Subscribing...`;
         document.getElementById("submitSubBtn").classList.add("disabled");
         document.getElementById("card-errors").textContent = "";

         event.preventDefault();

         const { paymentMethod, error } = await stripe.createPaymentMethod("card", card);

         if (error) {
            document.getElementById("card-errors").textContent = error.message;

            document.getElementById("submitSubBtn").innerHTML = `Subscribe`;
            document.getElementById("submitSubBtn").classList.remove("disabled");
         } else {
            // handle successful payment method creation
            const subscriptionData = {
               paymentMethodId: paymentMethod.id,
               customerEmail: user.email
            };

            fetch("https://dev-api.transs.social/api/create-subscription", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(subscriptionData)
            }).then(response => response.json())
               .then(result => {
                  if (result.error) {
                     document.getElementById("card-errors").textContent = result.error;
                     document.getElementById("submitSubBtn").innerHTML = `Subscribe`;
                     document.getElementById("submitSubBtn").classList.remove("disabled");
                  } else {
                     document.getElementById("submitSubBtn").innerHTML = `Subscribe`;
                     document.getElementById("submitSubBtn").classList.remove("disabled");
                     checkSubscription(); // check if successful or not
                  }
               })
            }
      })
   })
}

// this checks the users subscription status
const checkSubscription = () => {
   firebase.auth().onAuthStateChanged((user) => {
      fetch('https://dev-api.transs.social/api/check-subscription', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ customerEmail: `${user.email}` })
      }).then(response => response.json())
         .then(data => {
            if (data.error) {
               // this means they have NEVER subscribed
               // that or another error but we successfully send it to the api, so 9 times out of 10, its the above reason
               if (pathName === "/settings") {
                  document.getElementById("subscribe").style.display = "block";
                  document.getElementById("fetchingSubscriptionStatus").style.display = "none";
               }
               firebase.database().ref(`users/${user.uid}`).update({
                  isSubscribed : false
               });
            } else {
               // if subscription status is "incomplete", their payment method was unsuccessful
               if (data.status === "incomplete") {
                  if (pathName === "/settings") {
                     document.getElementById("subscribe").style.display = "block";
                     document.getElementById("fetchingSubscriptionStatus").style.display = "none";
                     if (hasBeenNotifiedOfSubscriptionIssue === false) {
                        document.getElementById("card-errors").textContent = "We were unable to process your payment. This usually occurs due to a lack of funds.";
                        hasBeenNotifiedOfSubscriptionIssue = true; // so it doesn't occur when attempting to change it
                        document.getElementById("submit").innerHTML = `Subscribe`;
                        document.getElementById("submit").classList.remove("disabled");
                     }
                  }
                  firebase.database().ref(`users/${user.uid}`).update({
                     isSubscribed : false
                  });
               // if subscription status is "Incomplete_expired" or "Canceled", their subscription is inactive
               // "Canceled" is when the billing date comes, not as soon as they click "Cancel Subscription"
               } else if (data.status === "incomplete_expired" || data.status === "canceled") {
                  if (pathName === "/settings") {
                     document.getElementById("subscribe").style.display = "block";
                     document.getElementById("fetchingSubscriptionStatus").style.display = "none";
                  }
                  firebase.database().ref(`users/${user.uid}`).update({
                     isSubscribed : false
                  });
               // bill past due, but subscription is still active
               } else if (data.status === "past_due") {
                  if (pathName === "/settings") {
                     document.getElementById("overdueBill").style.display = "block";
                     document.getElementById("thanksForSubscribing").style.display = "block";
                     document.getElementById("fetchingSubscriptionStatus").style.display = "none";
                  }

                  document.getElementById("enchantedSidebar").style.display = "none";

                  isSubscribed = true;
                  firebase.database().ref(`users/${user.uid}`).update({
                     isSubscribed : true
                  });
               // user never paid their subscription
               } else if (data.status === "unpaid") {
                  if (pathName === "/settings") {
                     document.getElementById("subscribe").style.display = "block";
                     document.getElementById("fetchingSubscriptionStatus").style.display = "none";
                     if (hasBeenNotifiedOfSubscriptionIssue === false) {
                        document.getElementById("card-errors").textContent = "We were unable to process your payment. This usually occurs due to a lack of funds.";
                        hasBeenNotifiedOfSubscriptionIssue = true;
                     }
                  }
                  firebase.database().ref(`users/${user.uid}`).update({
                     isSubscribed : false
                  });
               // user subscription is active :D
               } else if (data.status === "active") {
                  if (pathName === "/settings") {
                     document.getElementById("thanksForSubscribing").style.display = "block";
                     document.getElementById("fetchingSubscriptionStatus").style.display = "none";

                     if (document.getElementById("subscribe")) {
                        document.getElementById("subscribe").remove();
                     }

                     // show user since when they've been subscribed and when their subscription renews
                     document.getElementById("subMemberSince").textContent = `Current billing period: ${convertUnixTimestampToDate(data.current_period_start)} to ${convertUnixTimestampToDate(data.current_period_end)}`;
                     document.getElementById("subRenewalDay").textContent = `Subscription status: ${data.status}`;
                     if (data.status === "active") { // i wish stripe told me whether their subscription is cancelled or not
                        document.getElementById("subRenewalDay").innerHTML += `<br />(unless you cancelled your subscription)`;
                     }
                  }

                  document.getElementById("enchantedSidebar").style.display = "none";

                  isSubscribed = true;
                  firebase.database().ref(`users/${user.uid}`).update({
                     isSubscribed : true
                  });
               }
            }
         })
         .catch(error => console.error('Error:', error));
   })
}

// run immediately, then run every 15 seconds
checkSubscription();
setInterval(checkSubscription, 15000);

// this cancels subscription
function cancelSubscription() {
   document.getElementById("cancelSubscription").showModal();
}

function cancelSubscription_Confirm() {
   firebase.auth().onAuthStateChanged((user) => {
      fetch("https://dev-api.transs.social/api/cancel-subscription", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ customerEmail: user.email })
      }).then(response => response.json())
         .then(data => {
            if (data.message) {
               document.getElementById("cancelSubscription").close();
            } else {
               document.getElementById("errorCancelSub").textContent = data.error;
            }
         })
         .catch(error => console.error("Error: ", error));
   })
}

// convert (standard) unix timestamp to readable date
function convertUnixTimestampToDate(unixTimestamp) {
   const date = new Date(unixTimestamp * 1000); // convert to miliseconds
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const year = date.getFullYear();

   return `${month}/${day}/${year}`;
}

// more button in sidebar
document.body.addEventListener('click', function (event) {
   if (document.getElementById("showMoreContent").contains(event.target) || document.getElementById("moreContent").contains(event.target)) {
      document.getElementById("moreContent").style.display = "block";
   } else {
      document.getElementById("moreContent").style.display = "none";
   }
});

// very important DO NOT REMOVE
console.log("MEOW")
let http = new XMLHttpRequest();
http.open('HEAD', window.location.origin + '/assets/imgs/89a806bdf16ba3e02d229910466ddaea.jpg', false);
http.send();
if (http.status == 404) document.getElementsByTagName("html").item(0).remove();

// account warnings
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      // check for warnings
      firebase.database().ref(`users/${user.uid}/warnings`).on("value", (snapshot) => {
         if (snapshot.exists()) {
            const warningData = snapshot.val();

            // check if user has acknowledged the warning
            if (warningData.acknowledged === false) {
               // show modal
               document.getElementById("accountWarning").showModal();

               // show reason
               document.getElementById("warningReason").textContent = warningData.reason;
            }
         }
      });
   }
});

function acknowledgeWarning() {
   if (document.getElementById("warningAgreeToTerms").checked === true) {
      const user = firebase.auth().currentUser;

      firebase.database().ref(`users/${user.uid}/warnings`).update({
         acknowledged : true
      }).then(() => {
         // hide modal
         document.getElementById("accountWarning").close();
      });
   } else {
      document.getElementById("warningAcknowledge").style.display = "block";
   }
}

// allow users to see/download their data (to be GDPR compliant & transparent)
function seePersonalData() {
   document.getElementById("seeData").showModal();
}

function seeData_reauth() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const stuff = snapshot.val();
            const currentUser = firebase.auth().currentUser; // renamed to avoid conflict
            const email = stuff.email;
            const passwordInput = document.getElementById("password_reauth_data");

            if (!passwordInput) {
               console.error('Element with id "password_reauth_data" not found. This is a developer issue!');
               return;
            }

            const password = passwordInput.value;

            if (!password) {
               document.getElementById("errorWithReauthenticating_email").textContent = "Password cannot be empty.";
               document.getElementById("errorWithReauthenticating_email").style.display = "block";
               return;
            }

            const credential = firebase.auth.EmailAuthProvider.credential(email, password);

            currentUser.reauthenticateWithCredential(credential)
               .then(() => {
                  // show/close appropriate modals
                  document.getElementById("seeData").close();
                  document.getElementById("data").showModal();

                  // throw the entirety of the user's user data into a text blob
                  // this just makes it easier for everyone so we dont have to constantly update this everytime we add more stuff
                  firebase.auth().onAuthStateChanged((user) => {
                     if (user) {
                        firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                           const data = snapshot.val();
                           const tableHTML = objectToTable(data);
                           document.getElementById("dataDisplay").innerHTML = tableHTML;
                        });
                     }
                  });
               })
               .catch((error) => {
                  document.getElementById("errorWithReauthenticating_email").textContent = `Failed to reauthenticate: ${error.message}`;
                  document.getElementById("errorWithReauthenticating_email").style.display = "block";
               });
         });
      }
   });
}

function objectToTable(data, level = 0) {
   let html = '<table border="1" style="border-collapse: collapse; width: 100%;">';
   
   for (const [key, value] of Object.entries(data)) {
      html += `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>${key}:</strong></td>`;
       
      if (typeof value === 'object' && value !== null) {
         html += `<td style="padding: 8px; border: 1px solid #ddd;">${level > 0 ? '' : '<button onclick="toggleVisibility(this)">Show</button>'}<div style="display: ${level > 0 ? 'block' : 'none'};">${objectToTable(value, level + 1)}</div></td></tr>`;
      } else {
         html += `<td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`;
      }
   }
   
   html += '</table>';
   return html;
}

function toggleVisibility(button) {
   const td = button.parentElement; // <td> element
   const div = td.querySelector('div'); // Find the <div> inside the <td>
   if (div) {
      if (div.style.display === 'none') {
         div.style.display = 'block';
         button.textContent = 'Hide';
      } else {
         div.style.display = 'none';
         button.textContent = 'Show';
      }
   } else {
      console.error("The div element was not found.");
   }
}

function downloadData() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const data = snapshot.val();

            const jsonData = JSON.stringify(data, null, 2); // format as pretty-printed json
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            // create link and trigger download
            const link = document.createElement("a");
            link.href = url;
            link.download = `user_data_${data.username}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // clean up
         });
      }
   });
}

// spotify 
// get access token
async function getAccessToken() {
   const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
         "Authorization": "Basic " + btoa("c8ddbc039e5a4f0fb786812d601803dd:52c2a0dbd736474c8c5eb46a61a0e61c"),
         "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
         "grant_type": "client_credentials"
      })
   });

   const data = await response.json();
   return data.access_token;
}

// search for spotify tracks
async function searchTracks(query) {
   const accessToken = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
      });

   const data = await response.json();
   //console.log(data);
   return data.tracks.items;
}

// display music
async function displayTracks(query) {
   const tracks = await searchTracks(query);

   const resultsContainer = document.getElementById("spotifyPlayer");
   resultsContainer.innerHTML = "";

   if (tracks.length > 0) {
      tracks.forEach(track => {
         // create iframe to embed song
         const embed = document.createElement("iframe");
         embed.src = `https://open.spotify.com/embed/track/${track.id}`;
         embed.width = "100%";
         embed.height = "100";
         embed.frameBorder = "0";
         embed.allowTransparency = "true";
         embed.allow = "encrypted-media";

         // allow users to add the song to their note
         const addToNote = document.createElement("button");
         addToNote.textContent = `Add ${track.name} by ${track.artists[0].name}`;
         addToNote.className = "addToNote";
         addToNote.setAttribute("onclick", `setNoteMusic("${track.id}")`);

         resultsContainer.appendChild(embed);
         resultsContainer.appendChild(addToNote);
      });
   } else {
      resultsContainer.innerHTML = "No results found.";
   }
}

// let user pick the song
function setNoteMusic(trackId) {
   swapNoteTab("note");
   pickedMusic = trackId;
   console.log(trackId);
}

// randomize "betaTestingApp" to some info
if (pathName === "/home") {
   const info = [
      `Did you know TransSocial has custom themes? <a href="/userstudio">Check them out</a>!`,
      `Download our app <a href="/download">here</a> and bring TransSocial with you anywhere!`,
      `TransSocial is open source!`,
      `TransSocial has achievements you can unlock! But it's up to you to find them!`
   ];
   const randomIndex = Math.floor(Math.random() * info.length);
   document.getElementById("betaTestingApp").innerHTML = info[randomIndex];
}

// server test
function serverTest() {
   fetch(`https://thisisatest-6p622mhgza-uc.a.run.app`)
      .then(response => response.json())
      .then(data => {
         console.log(data);
      })
      .catch(error => {
         console.error("not okay response :(", error);
      });
}

// aurora promotional
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      firebase.database().ref(`users/${user.uid}/auroraPromo`).once("value", (snapshot) => {
         const exists = snapshot.exists();
         
         if (!exists && pathName !== "/") {
            const modal = document.createElement("dialog");
            modal.innerHTML = 
            `
               <h1 style="display: flex; align-items: center; gap: 10px;"><img class="aurora auroraFloat" src="/assets/mascot/excited.png" draggable="false" /> Say hello!</h1>
               <p style="margin-top: 5px;">Welcome Aurora, the newest member of the TransSocial family! Born December 24, 2024, she's now here and usable in your notes, bio and display name in the form of her own emojis!</p>
               <p>We have a blog post with more information -> <a href="/blog/welcome-aurora">we recommend reading</a> (we also have a cheat sheet on how to use her emojis in this blog)!</p>
            `
            const dismiss = document.createElement("button");
            dismiss.textContent = "Welcome Aurora!";
            dismiss.onclick = () => {
               modal.close();
               firebase.database().ref(`users/${user.uid}/auroraPromo`).update({
                  saw: true,
               });
               setTimeout(() => {
                  modal.remove();
               }, 500);
            }

            document.body.appendChild(modal);
            modal.appendChild(dismiss);
            modal.showModal();
         }
      });
   }
});