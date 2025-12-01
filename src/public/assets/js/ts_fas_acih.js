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

if (userAgent.indexOf("meowser") > -1) {
   browserName = "Meowser";
   let versionMatch = userAgent.match(/meowser\/([\d.]+)/);
   browserVersion = versionMatch ? versionMatch[1] : "unknown version";
} else if (userAgent.indexOf("Firefox") > -1) {
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

if (document.getElementById("userBrowser")) { // environment settings
   document.getElementById("userBrowser").textContent = browserName;
   document.getElementById("userBrowserVer").textContent = browserVersion;
}

// if on outdated browser, dont let the user use auride
// dont bother with ie, dont even work at all
const outdatedBrowsers = [
   ["Mozilla Firefox", 98  ],
   ["Samsung Browser", 3.0 ],
   ["Opera",           24  ],
   ["Microsoft Edge",  79  ],
   ["Google Chrome",   37  ],
   ["Apple Safari",    15.4],
];

for (const [browser, version] of outdatedBrowsers) {
   if (browserName === browser) {
      // when <dialog> (the latest web tech auride uses) started getting supported
      if (document.getElementById("version_browser")) {
         document.getElementById("version_browser").textContent = `${browser} version ${version}`;
      }

      if (browserVersion < version) {
         if (pathName !== "/unsupported") {
            window.location.replace("/unsupported");
         }
      } else {
         if (pathName === "/unsupported") {
            window.location.replace("/home");
         }
      }
   }
}

// Implement character limit
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

// Auride Update
if (hasUpdateNotes) {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}/readUpdates/${aurideUpdate}`).on("value", (snapshot) => {
            const hasDoneIt = snapshot.exists();

            if (!hasDoneIt) {
               if (document.getElementById("updatesButtonSidebar")) {
                  document.getElementById("updatesButtonSidebar").innerHTML = `${faIcon("wrench").outerHTML} Updates <span class="badge">New!</span>`;
               }
            }
         })
      } else {
         if (document.getElementById("updatesButtonSidebar") && pathName !== "/updates") {
            document.getElementById("updatesButtonSidebar").innerHTML = `${faIcon("wrench").outerHTML} Updates <span class="badge">New!</span>`;
         }
      }
   })

   firebase.auth().onAuthStateChanged((user) => {
      if (pathName === "/updates") {
         if (user) {
            firebase.database().ref(`users/${user.uid}/readUpdates/${aurideUpdate}`).update({
               read: true,
            })
         }
      }
   })
}

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

   if (urlParam && urlParam === "https://music.auride.xyz/") {
      document.getElementById("redirectNotice").innerHTML = `${faIcon("triangle-exclamation").outerHTML} You'll be returned to TransMusic after you create your account.`;
   } else if (urlParam && urlParam !== "https://music.auride.xyz/") {
      document.getElementById("redirectNotice").innerHTML = `${faIcon("triangle-exclamation").outerHTML} You'll be returned to ${urlParam} after you create your account.`;
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
   document.getElementById("displayAndUsernameBtn").innerHTML = `${faIcon("spinner", animatian = "spin-pulse").outerHTML} Checking display...`;
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
               document.getElementById("displayAndUsernameBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Checking username...`;

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
                           document.getElementById("displayAndUsernameBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Applying username...`;

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
      document.getElementById("registerBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Registering...`;
      document.getElementById("registerBtn").classList.add("disabled");
      document.getElementById("errorTxt").style.display = "none";

      // get the email and password input fields
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
            document.getElementById("registerBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Starting...`;
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
   document.getElementById("loginBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Logging in...`;
   document.getElementById("loginBtn").classList.add("disabled");
   document.getElementById("errorTxt").style.display = "none";

   if (pathName === "/auth/login.html" || pathName === "/auth/login") {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
         .then(() => {
            window.location.replace("/home");
         }).catch((error) => {
            let err = null;
            if (error.message.startsWith(`{"error"`)) // theres a better way to do this.
               err = "You need a Firebase configuration! If you're on the main Auride site and are seeing this, please report this on our GitHub.";
            else
               err = error.message;

            document.getElementById("errorTxt").style.display = "block";
            document.getElementById("errorTxt").textContent = err;
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
      alert("Error signing out. Please refresh the page and try again.\n" + error);
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
      if (!user) {
         window.location.replace("/home");
      }
   })
}

function signedInCheck() {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         window.location.replace('/home');
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
               } else {
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
               } else {
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
   event.target.value = event.target.value.replace(/[^a-z 0-9 . _]/g, '');
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
   const uploadedImg = document.getElementById('pfpUploader').files[0];
   const reader = new FileReader();
   const error = document.getElementById('errorTxt');

   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;
         if (uploadedImg) {
            reader.readAsDataURL(uploadedImg);
            const uploadTask = storageRef(`images/pfp/${uid}/${uploadedImg.name}`);

            uploadTask.onUploadProgress((snapshot) => {
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               errorTxt.style.display = "block";
               errorTxt.style.color = "green";
               errorTxt.innerHTML = "Uploading..." + progress + "%";
            });

            uploadTask.put(uploadedImg).then(() => {
               firebase
                  .database()
                  .ref("users/" + uid)
                  .update({
                        pfp: `${uploadedImg.name}`,
                        preRegister_Step: "pronouns",
                  });

               window.location.replace("/ts/prepare/pronouns.html");
            });
         } else {
            error.innerHTML = "No image provided.";
            error.style.display = "block";
            error.style.color = "red";
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
               userPfp.src = storageLink(`images/pfp/${uid}/${step}`);
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

               userUsername.textContent = `@${username}`;
            })

         // Display user pronouns
         const pronounRef = firebase.database().ref(`users/${uid}/pronouns`);

         pronounRef.once("value")
            .then(function (snapshot) {
               const pronouns = snapshot.val();

               userPronouns.textContent = pronouns;

               if (pronouns === '') {
                  userDisplay.style.marginTop = "8px";
               }
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
function escapeHtml(text, allowImg = false) {
   if (allowImg) {
      // temporarily replace img tags so we don't escape them
      const imgMatches = [];
      text = text.replace(/<img[^>]*>/gi, match => {
         imgMatches.push(match);
         return `___IMG_PLACEHOLDER_${imgMatches.length - 1}___`;
      });

      // then escape the rest
      const div = document.createElement('div');
      div.textContent = text;
      text = div.innerHTML;

      // restore img tags
      text = text.replace(/___IMG_PLACEHOLDER_(\d+)___/g, (_, index) => imgMatches[index]);

      return text;
   } else {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
   }
}

function linkify(text) {
   const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
   const usernamePattern = /@(\w+)/g;

   // split on <img ...> tags
   return text.split(/(<img[^>]*>)/i).map(part => {
      if (part.startsWith('<img')) {
         return part; // leave img tags alone
      }
      // replace URLs
      part = part.replace(urlPattern, '<a href="javascript:void(0)" onclick="openLink(`$1`)">$1</a>');
      // replace usernames
      part = part.replace(usernamePattern, '<a href="/u/$1">@$1</a>');
      return part;
   }).join('');
}

function addNewlines(text) {
   return text.replace(/(\r\n|\n\r|\n|\r)/g, '<br>');
}

function markdownify(text) {
   // headers
   // ###, ## and #
   text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
   text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
   text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

   // bold, italics, strikethrough and monospace
   text = text.replace(/(?<!\\)\*(.+?)(?<!\\)\*/g, '<strong>$1</strong>'); //bold
   text = text.replace(/(?<!\\)_(.+?)(?<!\\)_/g, '<em>$1</em>'); // italics
   text = text.replace(/(?<!\\)~(.+?)(?<!\\)~/g, '<del>$1</del>'); // strikethrough
   text = text.replace(/(?<!\\)```([^`]+)```/g, '<pre><code>$1</code></pre>'); // multi-line monospace
   text = text.replace(/(?<!\\)`([^`]+)(?<!\\)`/g, '<code>$1</code>'); // monospace

   // lists
   text = text.replace(/^(?<!\\)- (.+)$/gm, '<li>$1</li>');
   text = text.replace(/(<li>.*?<\/li>\n)+/g, match => {
      return '<ul>' + match.replace(/\n/g, '') + '</ul>';
   });

   // blockquotes
   text = text.replace(/^(?<!\\)> (.+)$/gm, '<blockquote-line>$1</blockquote-line>');
   text = text.replace(/(<blockquote-line>.*?<\/blockquote-line>\n?)+/g, match => {
      const content = match.replace(/<\/?blockquote-line>/g, '').replace(/\n/g, '<br>');
      return '<blockquote>' + content + '</blockquote>';
   });

   // Remove ALL newlines after headers and lists (not just extras)
   text = text.replace(/(<\/h[1-6]>)\n/g, '$1');
   text = text.replace(/(<\/ul>)\n/g, '$1');
   text = text.replace(/(<\/blockquote>)\n/g, '$1');

   // escape backslashes
   text = text.replace(/\\(.)/g, '$1');

   return text;
}

function emojify(text) {
   const emojiMap = {
      "concerned": "/assets/mascot/concerned.png",
      "excited": "/assets/mascot/excited.png",
      "love": "/assets/mascot/love.png",
      "peace": "/assets/mascot/peace.png",
      "smug": "/assets/mascot/smug.png",
      "tired": "/assets/mascot/tired.png",
      "violence": "/assets/mascot/violence.png",
      "yelling": "/assets/mascot/yelling.png",
   };

   for (const [phrase, imageUrl] of Object.entries(emojiMap)) {
      const regex = new RegExp(`\\[${phrase}\\]`, "g");
      text = text.replace(regex, `<img src="${imageUrl}" alt=${phrase} class="emoji aurora" draggable="false" />`);
   }
   return text;
}

function hashtagify(text) {
   return text.replace(/(^|\s|>)#([\w-]+)/g, (match, prefix, tag) => {
      const link = `<a href="/search?q=#${tag.toLowerCase()}">#${tag}</a>`;
      return prefix + link;
   });
}

// the order is important
function format(text, formats = ["html", "markdown", "emoji", "link", "newline", "hashtag"], options = {}) {
   // map names to functions to avoid huge switch statement
   const formatMap = {
      html: t => escapeHtml(t, options.allowImg),
      markdown: markdownify,
      emoji: emojify,
      link: linkify,
      newline: addNewlines,
      hashtag: hashtagify
   };

   for (const format of formats) {
      text = (formatMap[format])(text);
   }

   return text;
}

// Note Loading
if (pathName.startsWith("/home") ||
   pathName == "/u" || pathName.startsWith("/u/") ||
   pathName.startsWith("/note") ||
   pathName == "/favorites" ||
   pathName == "/search") {
   
}

// Close help prompt
function closeHelpPrompt() {
   const supportAuride = document.getElementById("pleaseDonate");

   supportAuride.style.display = "none";
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

// request notification permission
// TODO does not work on firefox (unsure about webkit), move this into settings
Notification.requestPermission();

// Upload Notes with or without images
function uploadImage() {
   const imageUploadInput = document.getElementById("imageUploadInput");
   imageUploadInput.click();
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
// TODO: just accept the noteId
function removeNsfw(buttonId) {
   // Remove "-closeWarning" from the ID to get the note's ID
   const noteId = buttonId.slice(0, -13);

   // Delete the warning, info about the warning, the button and the blur
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

      if (noteData && noteData?.id)
         uniNoteId_notehtml = noteData.id;
      else
         // doesnt exist
         return;

      if (noteData.isDeleted !== true) {
         if (noteData.user !== null && noteData.replyingTo === undefined) {
            document.getElementById("melissa").style.display = "block";
            document.getElementById("noteNotFound").style.display = "none";

            document.getElementById("quoteRenoteButton").addEventListener("click", () => quoteRenote(`${noteData.id}`));
            if (noteData.quoting) {
               firebase.database().ref(`notes/${noteData.quoting}`).once("value", (snapshot) => {
                  const quoteData = snapshot.val();

                  if (quoteData.isDeleted !== true) {
                     firebase.database().ref(`users/${quoteData.whoSentIt}`).once("value", (snapshot) => {
                        const quoteUser = snapshot.val();

                        if (quoteUser.suspensionStatus !== "suspended") {
                           document.getElementById("noteQuotePfp").src = storageLink(`images/pfp/${quoteData.whoSentIt}/${quoteUser.pfp}`);
                           document.getElementById("noteQuoteDisplay").textContent = quoteUser.display;
                           document.getElementById("noteQuoteUsername").textContent = `@${quoteUser.username}`;
                           document.getElementById("noteQuoteText").innerHTML = format(quoteData.text);
                           let content = format(quoteData.text);
                              if (content.length > 247) { // check length
                                 content = content.substring(0, 247) + "...";
                              }
                              document.getElementById("noteQuoteText").innerHTML = content;
                        } else {
                           document.getElementById("noteQuotePfp").src = `/assets/imgs/defaultPfp.png`;
                           document.getElementById("noteQuoteDisplay").textContent = "User Unavailable";
                           document.getElementById("noteQuoteUsername").textContent = `User Unavailable`;
                           document.getElementById("noteQuoteText").innerHTML = format(quoteData.text);
                           document.getElementById("noteQuoteText").textContent = `@${quoteUser.username} is suspended, and notes by this user cannot be viewed.`;
                        }

                        document.getElementById("quotingNote_note").addEventListener("click", () => window.location.href = `/note/${quoteData.id}`);
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
            document.getElementById("favoriteButton").addEventListener("click", () => favoriteNoteView(`${noteData.id}`));

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
                     document.title = `"${noteData.text}" / @${profileData.username} on Auride`;
                  } else {
                     document.title = `@${profileData.username} on Auride`;
                  }
                  document.getElementById(`melissa`).style.display = "block";
                  document.getElementById(`userImage-profile`).src = storageLink(`images/pfp/${noteData.whoSentIt}/${profileData.pfp}`);
                  document.getElementById(`userImage-profile`).addEventListener("click", () => window.location.href = `/u/${profileData.username}`);
                  document.getElementById(`display-profile`).innerHTML = format(profileData.display, [ "html", "emoji" ]);
                  document.getElementById(`display-profile`).addEventListener("click", () => window.location.href = `/u/${profileData.username}`);
                  const badges = document.createElement("span");
                  if (profileData.isVerified) {
                     badges.appendChild(faIcon("circle-check", size = "sm"));
                     badges.style.marginLeft = "7px";
                  }
                  if (profileData.isSubscribed) {
                     badges.appendChild(faIcon("heart", size = "sm", marginLeft = "3px"));
                  }
                  if (profileData.activeContributor) {
                     badges.appendChild(faIcon("handshake-angle", size = "sm", marginLeft = "3px"));
                  }
                  badges.classList.add("noteBadges");
                  document.getElementById("display-profile").appendChild(badges);
                  document.getElementById(`username-profile`).textContent = `@${profileData.username}`;
                  document.getElementById(`username-profile`).addEventListener("click", () => window.location.href = `/u/${profileData.username}`);
                  if (profileData.pronouns === undefined || profileData.pronouns === null || profileData.pronouns === "") {
                     document.getElementById(`pronouns-profile`).remove();
                  } else {
                     document.getElementById(`pronouns-profile`).textContent = profileData.pronouns;
                     document.getElementById(`pronouns-profile`).addEventListener("click", () => window.location.href = `/u/${profileData.username}`);
                  }

                  document.getElementById("noteContent").innerHTML = format(noteData.text);
                  document.getElementById("likeButton").innerHTML = `${faIcon("heart").outerHTML} ${noteData.likes}`;
                  document.getElementById("renoteButton").innerHTML = `${faIcon("retweet").outerHTML} ${noteData.renotes}`;

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

                                 if (evenExists === true && pref === false) {
                                    document.getElementById("uploadedVideo-main").pause();
                                 }
                              })
                           }
                        })
                        document.getElementById("uploadedImg-main").remove();
                        document.getElementById("uploadedAudio-main").remove();
                     } else if (cleanUrl === "mp3") {
                        document.getElementById("uploadedAudio-main").src = noteData.image;
                        firebase.auth().onAuthStateChanged((user) => {
                           if (user) {
                              firebase.database().ref(`users/${user.uid}/autoplayVideos`).once("value", (snapshot) => {
                                 const evenExists = snapshot.exists();
                                 const pref = snapshot.val();

                                 if (evenExists === true && pref === false) {
                                    document.getElementById("uploadedAudio-main").pause();
                                 }
                              })
                           }
                        })
                        document.getElementById("uploadedImg-main").remove();
                        document.getElementById("uploadedVideo-main").remove();
                     } else {
                        document.getElementById("uploadedImg-main").src = noteData.image;
                        document.getElementById("uploadedImg-main").setAttribute("alt", `${noteData.alt}`);
                        document.getElementById("uploadedVideo-main").remove();
                        document.getElementById("uploadedAudio-main").remove();
                     }
                  } else {
                     document.getElementById("uploadedImg-main").remove();
                     document.getElementById("uploadedVideo-main").remove();
                     document.getElementById("uploadedAudio-main").remove();
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
                     <p>Auride cannot show you this note because the creator is suspended from Auride. If this user gets unsuspended--if ever--this note will be available to view again.</p>

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

                     document.getElementById("likeButton").innerHTML = `${faIcon("heart").outerHTML} ${newData.likes}`;
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

                     document.getElementById("likeButton").innerHTML = `${faIcon("heart").outerHTML} ${newData.likes}`;
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

                     document.getElementById("renoteButton").innerHTML = `${faIcon("retweet").outerHTML} ${newData.renotes}`;
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

                     document.getElementById("renoteButton").innerHTML = `${faIcon("retweet").outerHTML} ${newData.renotes}`;
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

         createNotePopup();

         if (match) {
            const username = match[1];

            document.getElementById("noteContent-textarea").value = `@${username} `;
         }
      } else {
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
      const coverCreateANote = document.getElementById("coverCreateANote");
   
      // make sure ones not actively sending
      if (coverCreateANote.style.display !== "none") return;

      if (user) {
         coverCreateANote.style.display = "block";

         const notesRef = firebase.database().ref("notes");
         const userNotes = firebase.database().ref(`users/${user.uid}/posts`);
         const newNoteKey = notesRef.push().key;
         let isNotFlaggedNsfwButShouldBe = null;

         const noteContent = document.getElementById("noteContent-textarea").value;

         const imageUploadInput = document.getElementById("imageUploadInput");
         const file = imageUploadInput.files[0];

         if (isTextareaEmpty(noteContent) && !file) {
            document.getElementById("noteError").textContent = "You can't create notes without content! Try adding an image, text or both!";
            coverCreateANote.style.display = "none";
            return;
         }

         try {
            const response = await fetch("/nsfw_words.json");
            if (!response.ok) {
               throw new Error("Network response not okay. Please check your internet connection.");
            }

            const nsfwWords = await response.json();

            const nsfwPattern = new RegExp(`\\b(${nsfwWords.join("|")})\\b`, "i"); 

            if (nsfwPattern.test(noteContent.toLowerCase()) && document.getElementById("nsfwDropdown").value === "noNsfwContent") {
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

               coverCreateANote.style.display = "none";
               return;
            }
         } catch (error) { 
            document.getElementById("noteError").textContent = error;
            coverCreateANote.style.display = "none";
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
            isNsfw: document.getElementById("nsfwDropdown").value,
            isSensitive: document.getElementById("sensitiveDropdown").value,
            isPolitical: document.getElementById("politicalDropdown").value,
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
                     let pathToGiveNotifTo = null;
                     
                     // redirect note?
                     if (pathName.startsWith("/note/")) {
                        const pathSplitUp = pathName.split("/");
                        pathToGiveNotifTo = `${pathSplitUp[2]}#${newNoteKey}`;
                     } else {
                        pathToGiveNotifTo = newNoteKey;
                     }

                     sendNotification(userId.user, {
                        type: "Mention",
                        who: user.uid,
                        postId: pathToGiveNotifTo,
                     });
                  }
               });
            });
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
               // send notification
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

               // then, make note div
               const newNote = document.createElement("div");
               newNote.innerHTML = `
                  <img class="notePfp" draggable="false" loading="lazy" style="visibility: visible; opacity: 1;" src="${document.getElementById("userPfp-sidebar").src}"><a class="noteDisplay" href="/u/${document.getElementById("displayName-sidebar").textContent}">${document.getElementById("displayName-sidebar").textContent}</a>
                  <br><a class="noteUsername" href="/u/${document.getElementById("username-pronouns-sidebar")}">${document.getElementById("username-pronouns-sidebar").textContent} • 1s</a><p class="noteText">${postData.text}</p><div class="buttonRow"><p class="likeBtn" id="like-${postData.id}"><i class="fa-solid fa-heart" aria-hidden="true"></i> 0</p><p class="renoteBtn" id="renote-${postData.id}"><i class="fa-solid fa-retweet" aria-hidden="true"></i> 0</p></div>
                  <p class="noteIsBeingPreviewed"><i class="fa-solid fa-eye"></i> Your note was successfully sent, but this is a preview. To edit, favorite, or quote renote it, please refresh the page. <a href="/blog/note-previews.html">Learn more</a>.</p>
               `
               newNote.classList.add("note");
               newNote.id = postData.id;
               document.getElementById("notes").prepend(newNote);
            }
         } else {
            unlockAchievement("First Steps");
         }

         try {
            if (file) {
               const imageRef = storageRef(`images/notes/${user.uid}/${newNoteKey}-${file.name}`);
               const snapshot = await imageRef.put(file);
               postData.image = imageRef.getDownloadUrl();
            }

            if (pathName.startsWith("/note/"))
               await firebase.database().ref(`/notes/${uniNoteId_notehtml}/notesReplying`).child(newNoteKey).set(postData);
            else
               await notesRef.child(newNoteKey).set(postData);
            await userNotes.child(newNoteKey).set(renoteData);

            closeCreateNotePopup();

            setTimeout(function () {
               document.getElementById("successfullySent").style.display = "none";
            }, 3000);
         } catch (error) {
            document.getElementById("noteError").textContent = "Error publishing note: " + error.message;
            console.error(error);
            coverCreateANote.style.display = "none";
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

   const tabs = [ "profile", "account", "personalization", "subscription", "environment" ];

   // Swap tabs
   function switchTab(toTab) {
      for (const tab of tabs) {
         if (tab === toTab) {
            document.getElementById(tab + "Tab").classList.add("active");
            document.getElementById("profileTab-" + tab).style.display = "block";
         } else {
            document.getElementById(tab + "Tab").classList.remove("active");
            document.getElementById("profileTab-" + tab).style.display = "none";
         }
      }
   }

   if (tabs.includes(tabParm)) {
      switchTab(toParm);
   }

   // Set defaults
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const userData = snapshot.val();

            // Set user profile picture
            if (userData.pfp) {
               document.getElementById("profilePicture_settings").src = storageLink(`images/pfp/${user.uid}/${userData.pfp}`);
            }

            if (userData.banner) {
               document.getElementById("banner_settings").src = storageLink(`images/banner/${user.uid}/${userData.banner}`);
            }

            // Display name
            if (userData.display) {
               document.getElementById("displayName-text").value = `${userData.display}`;
               document.getElementById("characterLimit_display").textContent = `${userData.display.length}/25`;
            }

            // Username
            if (userData.username) {
               document.getElementById("username-text").value = `${userData.username}`;
               document.getElementById("characterLimit_username").textContent = `${userData.username.length}/20`;
            }

            // Pronouns
            if (userData.pronouns) {
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

               currentUser.reauthenticateWithCredential(credential).then(() => {
                  document.getElementById("errorWithReauthenticating_email").textContent = "Successful! Changing email, please wait a moment...";
                  document.getElementById("errorWithReauthenticating_email").style.color = "var(--success-color)";
                  document.getElementById("errorWithReauthenticating_email").style.display = "block";

                  // set email
                  currentUser.updateEmail(`${document.getElementById("email-address").value}`).then(() => {
                     firebase.database().ref(`users/${currentUser.uid}`).update({
                        email: document.getElementById("email-address").value
                     }).then(function () { window.location.reload(); });
                  }).catch((error) => {
                     document.getElementById("errorWithReauthenticating_email").textContent = `An error occurred: ${error.message}`;
                     document.getElementById("errorWithReauthenticating_email").style.color = "var(--error-text)";
                     document.getElementById("errorWithReauthenticating_email").style.display = "block";
                  })
               }).catch((error) => {
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
         document.getElementById("sendPasswordReset").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Sending...`;

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
            storageRef(`images/notes/${noteId}`).delete()
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

   // this code is hideous tbh
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
                     storageRef(`images/pfp/${uid}/${userData.pfp}`).delete()
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

   function aurideThemes() {
      document.getElementById("aurideThemes").showModal();
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
                              firebase.database().ref(`users/${user.uid}/themeColors`)
                                 .update(themeData.themeColors)
                                 .then(function () { setGlobalCustomTheme(themeData.themeColors) });
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

                  p.innerHTML = `You have no custom themes! You can get some at the <a href="/userstudio" style="color: var(--main-color);">Auride User Studio!</a>`;

                  document.getElementById("themeSelection").appendChild(p);
               }
            });
         }
      });
   }

   function setTheme(theme) {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               theme
            }).then(function () { setGlobalTheme(theme) });
         }
      })
   }

   function _setPreference(logElemId, pref, val) {
      const logElem = document.getElementById(logElemId);
      logElem.style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               [pref]: val
            }).then(() => {
               logElem.textContent = `Updated preference to ${val} successfully!`;
               logElem.style.display = "block";
            })
         }
      })
   }

   function setMatureContent(val) {
      _setPreference("updatedMatureContentPref", "showNsfw", val)
   }

   function setSensitiveContent(val) {
      _setPreference("updatedSensitiveContentPref", "showSensitive", val)
   }

   function setPoliticalContent(val) {
      _setPreference("updatedPoliticalContentPref", "showPolitics", val)
   }

   function setPrideFlag(val) {
      _setPreference("updatedPrideFlagContentPref", "showPrideFlag", val ? "Yes" : "No")
   }

   function setAutoplay(val) {
      _setPreference("updatedAutoplayContentPref", "autoplayVideos", val)
   }

   // font scale
   function setFontScale(scale) {
      _setPreference("updatedFontScaleContentPref", "fontSizePref", scale)

      switch (scale) {
         case "normal": 
            document.documentElement.style.setProperty('--zoom-level', '1');
            break;
         case "large":
            document.documentElement.style.setProperty('--zoom-level', '1.07');
            break;
      }
   }

   function setInteractionScale(scale) {
      _setPreference("updatedNoteSizePref", "experiments/noteButtonLayout", scale === "large")
   }

   // enable OpenDyslexic font
   function setOpenDyslexia(useODFont) {
      const logElem = document.getElementById("updatedOpenDysContentPref");
      logElem.style.display = "none";

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
               useODFont
            }).then(() => {
               logElem.textContent = "Updated preference to " + useODFont ? "enabled" : "disabled" + " successfully!";
               logElem.style.display = "block";

               if (useODFont) {
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
               } else {
                  if (document.getElementById("odFontStyle")) {
                     document.getElementById("odFontStyle").remove();
                  }
               }
            })
         }
      })
   }

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
      document.getElementById("enableDms").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Enabling...`;
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
      document.getElementById("disableDms").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Disabling...`;
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
}

// Accept cookies
function acceptCookies() {
   if (pathName === "/home" || pathName === "/home.html") {
      localStorage.setItem("acceptedCookies", "true");
      document.getElementById("cookie-notice").style.display = "none";
   }
}

// Notifications
let lastNotifKey = null;
const loadedNotifIds = new Set();
let currentlyLoadingNotifs = false;
let scrollTimeout = null;

// function to load notifications
function loadNotifications(limit, append = false) {
   const user = firebase.auth().currentUser;
   if (!user) return; // they should get kicked from the page automatically

   let query = firebase.database().ref(`users/${user.uid}/notifications`).orderByKey();

   // if theres a last key, fetch older ones
   if (lastNotifKey)
      query = query.endBefore(lastNotifKey);

   query.limitToLast(limit).once("value", (snapshot) => {
      const notifications = snapshot.val();
      if (!notifications) {
         currentlyLoadingNotifs = false;
         return;
      }; // no notifications :(

      // get keys and store the oldest one for the next load
      const notifKeys = Object.keys(notifications).sort();
      lastNotifKey = notifKeys[0];

      renderNotifications(notifications, append);
      currentlyLoadingNotifs = false;
   });
}

// render notifications appropriately
function renderNotifications(notifications, append = false) {
   const notificationsDiv = document.getElementById("notificationCenter");
   if (!append) notificationsDiv.innerHTML = "";

   // sort the notification entries
   const notifEntries = Object.entries(notifications).reverse();

   // then, seperate entries
   const notifPromises = notifEntries.map(([id, notification]) => {
      // get user data (from who sent the notification)
      return firebase.database().ref(`users/${notification.who}`).once("value").then(snapshot => {
         const notificationSentUser = snapshot.val() || {};
         const notiSentUserData = {
            username: notificationSentUser.username || "deleteduser",
            pfp: notificationSentUser.pfp || "null"
         };

         // then, render the note based on type
         const div = document.createElement("div");
         div.classList.add("notification");

         if (!notification.type) return null; // not a valid notification

         switch (notification.type) {
            case "Love":
               // then set inner html   
               div.innerHTML = `${faIcon("heart", "lg", "var(--like-color)").outerHTML} <img class="notificationPfp" draggable=false src="${storageLink(`images/pfp/${notification.who}/${notiSentUserData.pfp}`)}" /> @${notiSentUserData.username} loved your note!`;
               div.classList.add("loved");

               // when clicked, send to note
               div.onclick = () => { window.location.href = `/note/${notification.postId}`; }
               break;
            case "Renote":
               // then set inner html   
               div.innerHTML = `${faIcon("retweet", "lg", "var(--renote-color)").outerHTML} <img class="notificationPfp" draggable=false src="${storageLink(`images/pfp/${notification.who}/${notiSentUserData.pfp}`)}" /> @${notiSentUserData.username} renoted your note!`;
               div.classList.add("renoted");

               // when clicked, send to note
               div.onclick = () => { window.location.href = `/note/${notification.postId}`; }
               break;
            case "Mention":
               // then set inner html   
               div.innerHTML = `${faIcon("at", "lg", "var(--main-color)").outerHTML} <img class="notificationPfp" draggable=false src="${storageLink(`images/pfp/${notification.who}/${notiSentUserData.pfp}`)}" /> @${notiSentUserData.username} mentioned you!`;
               div.classList.add("mentioned");

               // when clicked, send to note
               div.onclick = () => { window.location.href = `/note/${notification.postId}`; }
               break;
            case "Reply":
               // then set inner html   
               div.innerHTML = `${faIcon("comment", "lg", "var(--main-color)").outerHTML} <img class="notificationPfp" draggable=false src="${storageLink(`images/pfp/${notification.who}/${notiSentUserData.pfp}`)}" /> @${notiSentUserData.username} replied to your note!`;
               div.classList.add("replied");

               // when clicked, send to note
               div.onclick = () => { window.location.href = `/note/${notification.postId}`; }
               break;
            case "Follow":
               // then set inner html   
               div.innerHTML = `${faIcon("user-plus", "lg", "var(--main-color)").outerHTML} <img class="notificationPfp" draggable=false src="${storageLink(`images/pfp/${notification.who}/${notiSentUserData.pfp}`)}" /> @${notiSentUserData.username} followed you!`;
               div.classList.add("followed");

               // when clicked, send to user
               div.onclick = () => { window.location.href = `/u/${notificationSentUser.username}`; }
               break;
            default:
               break;
         }

         return div;
      });
   });

   // make sure to render them correctly
   Promise.all(notifPromises).then(divs => {
      divs.filter(Boolean).forEach((div, i) => {
         const notifId = notifEntries[i][0]; // key of this notification
         if (loadedNotifIds.has(notifId)) return; // skip dups
         loadedNotifIds.add(notifId);

         // if everything else passes, prepend!
         // not append.. we reverse the html!
         const loadIndicator = document.getElementById("noteLoadingIndicator");
         notificationsDiv.prepend(div);
         if (loadIndicator)
            loadIndicator.remove();
      });
   });
}

if (pathName === "/notifications" || pathName === "/notifications.html") {
   // TODO: move this to a separate script, instead of relying on a timeout
   setTimeout(() => {
      createLoadingIndicator("lg", "notificationCenter", "prepend");
      loadNotifications(15, false);
   }, 750);
   
   // listen to scroll events to load more notifications
   window.addEventListener("scroll", () => {
      // clear any pending trigger
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
         if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            if (currentlyLoadingNotifs) return;
            currentlyLoadingNotifs = true;
            loadNotifications(15, true);

            // create the loading indicator
            createLoadingIndicator("lg", "notificationCenter", "prepend");
         }
      }, 150); // wait 150ms
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

   // this function is defined 3 times
   function findNoteId(moreButton) {
      // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
      return moreButton.closest(".note").id;
   };

   // Edit Note

   // TODO: move to server
   function applyEdits(noteId) {
      document.getElementById("coverUpdatingNote").style.display = "block";

      let oldText = null;

      firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
         console.log("Accessed");
         const currentText = snapshot.val();

         oldText = currentText.text;
      })

      const updateKey = firebase.database().ref(`notes/${noteId}/updates`).push().key;
      const updates = {};

      firebase.database().ref(`notes/${noteId}`).update({
         text: document.getElementById("newTextContent").value,
      })

      firebase.database().ref(`notes/${noteId}/updates/${updateKey}`).update({
         previousText: oldText,
      })

      document.getElementById("noteUpdated").showModal();
      document.getElementById("editNoteContent").close();
   }

   function dontApplyEdits() {
      closeEditNotePopup();
   }
}

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
                              otherPersonPfp.src = storageLink(`images/pfp/${dmData.user2}/${otherPerson.pfp}`);
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
                              if (!dmData.messages) {
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
                              otherPersonPfp.src = storageLink(`images/pfp/${dmData.user}/${otherPerson.pfp}`);
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
                              if (!dmData.messages) {
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
                     userId_pfp.src = storageLink(`images/pfp/${userId}/${data.pfp}`);
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
                     if (data.pronouns) {
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

// Detect user OS
if (pathName === "/download") {
   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

   // Windows/Windows Phone
   if (/windows phone/i.test(userAgent)) {
      document.getElementById("downloadButton").style.display = "none";
      document.getElementById("systemRequirement").textContent = "Unavailable for Windows Phone.";
   } else if (/win/i.test(userAgent)) {
      document.getElementById("downloadButton").addEventListener("click", () => window.location.href='/assets/releases/windows/ts_installer.msi');
      document.getElementById("downloadButton").textContent = "Get Auride for Windows";
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
      document.getElementById("downloadButton").addEventListener("click", () => window.location.href = '/assets/releases/android/app-release.apk');
      document.getElementById("downloadButton").textContent = "Get Auride for Windows";
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

// determine date creation
function timeAgo(timestamp) {
   const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
   const seconds = now - Math.floor(timestamp / 1000); // Convert milliseconds to seconds

   // if seconds...
   if (seconds < 60) {
      return `${seconds}s`;
   }
   // minutes...
   const minutes = Math.floor(seconds / 60);
   if (minutes < 60) {
      return `${minutes}m`;
   }
   // hours...
   const hours = Math.floor(minutes / 60);
   if (hours < 24) {
      return `${hours}h`;
   }
   // days...
   const days = Math.floor(hours / 24);
   if (days < 30) {
      return `${days}d`;
   }

   // get the month
   const date = new Date(timestamp);
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   // get current year
   const currentYear = new Date().getFullYear();
   const postYear = date.getFullYear();

   // return with year, if current year is not the same as note date
   if (postYear !== currentYear)
      return `${months[date.getMonth()]} ${date.getDate()}, ${postYear}`;
   // or, if it is the same, return without year
   else
      return `${months[date.getMonth()]} ${date.getDate()}`;
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
                  document.getElementById("unlockDescription_fs").textContent = "Every journey begins with a single step... or in this case, a single note.";
                  document.getElementById("unlockDate_fs").textContent = `Unlocked ${achievement.firstSteps.unlockedWhen}`;
               }

               if (achievement.expressYourself) {
                  document.getElementById("expressYourselfAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_ey").textContent = "Sharing is caring, and you just shared your first note!";
                  document.getElementById("unlockDate_ey").textContent = `Unlocked ${achievement.expressYourself.unlockedWhen}`;
               }

               if (achievement.theSocialButterfly) {
                  document.getElementById("theSocialButterflyAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_tsb").textContent = "You've spread your wings! Your first follow is in the books!";
                  document.getElementById("unlockDate_tsb").textContent = `Unlocked ${achievement.theSocialButterfly.unlockedWhen}`;
               }

               if (achievement.chatterbox) {
                  document.getElementById("chatterboxAchievement").classList.remove("locked");
                  document.getElementById("unlockDescription_cb").textContent = "From silence to words. Your first reply has been made!";
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
                  new Audio("/assets/audio/auride_achievement_chime.wav").play();
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
                  new Audio("/assets/audio/auride_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").appendChild(faIcon("comments"));

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
                  new Audio("/assets/audio/auride_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").appendChild(faIcon("user-plus"));

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
                  new Audio("/assets/audio/auride_achievement_chime.wav").play();
                  document.getElementById("achievementUnlock").style.display = "block";
                  document.getElementById("achievementName").textContent = achievement;
                  document.getElementById("achievementIcon").appendChild(faIcon("bullhorn"));

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
   function saveTheme() {
      if (!document.getElementById("saveThemeBtn").classList.contains("disabled")) {
         // this will prevent users from running functions they aren't supposed to while saving
         document.getElementById("saveThemeBtn").classList.add("disabled");
         document.getElementById("dontSaveThemeBtn").classList.add("disabled");
         document.getElementById("saveThemeBtn").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Saving...`;

         // check if the name already exists
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               let themeName = document.getElementById("themeName");
               firebase.database().ref(`users/savedThemes/${themeName.value}`).once("value", (snapshot) => {
                  // ensures that the name isn't empty
                  if (themeName.value.trim() === "") {
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
                        document.getElementById("fetchingThemes").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Loading ${themeName}...`;
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

                           // let auride know what theme is applied
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
                           document.getElementById("fetchingThemes").innerHTML = `${faIcon("spinner", anim = "spin-pulse").outerHTML} Loading themes...`;
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
      // update this, as auride needs to know
      wantsToApplyTheme = true;

      // prompt the user to save the theme first
      saveTheme_Open();
   }

   // publish theme
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
                              document.getElementById("themeSuccessfullyPublished").innerHTML = `Your theme has been successfully published! It is available on the Auride User Studio <a href="/userstudio/${newKey}" style="color: var(--main-color)">here.</a>`;
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
               warning.innerHTML = `${faIcon("triangle-exclamation").outerHTML} Core`;
               themeDiv.appendChild(warning);
            }

            const thumbnail = document.createElement("img");
            if (themeData.hasThumbnail) {
               thumbnail.src = storageLink(`images/themes/${themeKey}/thumbnail.png`);
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
            themeDiv.addEventListener("click", () => window.location.replace(`/userstudio/${themeKey}`));

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
               document.getElementById("themeImg").src = storageLink(`images/themes/${themeKey}/thumbnail.png`);
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
            document.getElementById("installTheme").addEventListener("click", () => installTheme(`${snapshot.key}`));
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
                  // (well, several issues besides the fact their account basically doesnt exist in auride's eyes)
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
// letting the user use auride without verifying their email... oopsies)
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
   const notifRef = firebase.database().ref(`users/${toWho}/notifications`);
   const newNotiKey = notifRef.push().key;
   notifRef.child(newNotiKey).set(data);
   notifRef.update({
      unread: firebase.database.ServerValue.increment(1)
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
   let filteredVersion = aurideReleaseVersion; // by default, set it to what auride currently is

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

   if (domain !== "auride.xyz") {
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

   if (query && query.trim()) {
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
      document.title = `"${query}" | Auride`;
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
                  container.addEventListener("click", () => window.location.href = `/u/${userData.username}`);

                  const pfp = document.createElement("img");
                  pfp.classList.add("notePfp");
                  pfp.src = storageLink(`images/pfp/${uid}/${userData.pfp}`);
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
               let noteDiv = renderNote(noteContent);

               if (noteDiv === null) return;

               // hide "no results"
               document.getElementById("noResults").style.display = "none";
               document.getElementById("hasResults").style.display = "block";

               // hide "No users found"
               document.getElementById("noNotesFound").style.display = "none";

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
               if (document.getElementById(`note-${noteContent.id}`)) {
                  noteDiv.remove();
               }

               if (noteContent.isDeleted !== true) {
                  document.getElementById("queriedNotes").appendChild(noteDiv);
               }
            }
         });
      });
   }
}

// convert (standard) unix timestamp to readable date
// UNUSED
function convertUnixTimestampToDate(unixTimestamp) {
   const date = new Date(unixTimestamp * 1000); // convert to miliseconds
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const year = date.getFullYear();

   // i think this is the one everyone can read
   return `${year}-${month}-${day}`;
}

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
                           const table = objectToTable(data);
                           document.getElementById("dataDisplay").appendChild(table);
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
   let table = document.createElement("table");

   for (const [key, value] of Object.entries(data)) {
      let row = document.createElement("tr");

      let cell = document.createElement("td");
      cell.style = "padding: 8px; border: 1px solid #ddd;";

      let name = document.createElement("strong");
      name.textContent = key;
      cell.appendChild(name);

      row.appendChild(cell);

      let data = document.createElement("td");
      data.style = "padding: 8px; border: 1px solid #ddd;";

      if (typeof value === 'object' && value !== null) {
         if (level <= 0) {
            let button = document.createElement("button");
            button.addEventListener("click", () => toggleVisibility(button));
            button.textContent = "Show";
            data.appendChild(button);
         }

         let div = document.createElement("div");
         div.style.display = level > 0 ? "block" : "none";
         div.appendChild(objectToTable(value, level + 1));
         data.appendChild(div);
      } else {
         data.textContent = value;
      }

      row.appendChild(data);
      table.appendChild(row);
   }

   return table;
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
   }).catch((err) => {
      const spotifyPlayerDiv = document.getElementById("spotifyPlayer");
      spotifyPlayerDiv.innerHTML = `
         <p style="color: var(--error-text)">Unable to fetch results from Spotify. 
         You may have a browser extension (e.g., uBlock Origin or Privacy Badger) blocking access to accounts.spotify.com, which is required for us to use our Spotify access token. 
         Please allow Auride to access these links to attach music to your note.
         
         <br />
         <br />
         
         We take appropriate measures to protect your privacy. See our <a href="/policies/privacy">Privacy Policy</a>.
         </p>
      `;
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
         addToNote.addEventListener("click", () => setNoteMusic(`${track.id}`));//

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
               <p style="margin-top: 5px;">Welcome Aurora, the newest member of the Auride family! Born December 24, 2024, she's now here and usable in your notes, bio and display name in the form of her own emojis!</p>
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

// check if near the bottom, if user is,
// hide the login/signup prompt
window.addEventListener("scroll", () => {
   let loginPrompt = document.getElementById("notSignedIn-banner");
   let nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

   if (nearBottom) {
      loginPrompt.style.opacity = "0";
   } else {
      loginPrompt.style.opacity = "1";
   }
});
