//@ts-check

// this contains the firebase config and initializes firebase
// before pushing to git, always make sure the firebase config doesn't expose your keys

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

if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;