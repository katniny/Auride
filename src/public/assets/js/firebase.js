//@ts-check

// this contains the firebase config and initializes firebase
// before pushing to git, always make sure the firebase config doesn't expose your keys
// TO:DO finish https://github.com/katniny/Auride/tree/module-upgrade then move this to a .env file!

/** @satisfies {import("firebase/app").FirebaseOptions} */
const firebaseConfig = {
    apiKey: "REPLACE",
    authDomain: "REPLACE",
    databaseURL: "REPLACE",
    projectId: "REPLACE",
    storageBucket: "REPLACE",
    messagingSenderId: "REPLACE",
    appId: "REPLACE",
    measurementId: "REPLACE",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const timestamp = firebase.database.ServerValue.TIMESTAMP;