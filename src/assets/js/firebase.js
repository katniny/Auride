//@ts-check

// this contains the firebase config and initializes firebase
// before pushing to git, always make sure the firebase config doesn't expose your keys
// TODO finish https://github.com/katniny/Auride/tree/module-upgrade then move this to a .env file!

/** @satisfies {import("firebase/app").FirebaseOptions} */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// initialize firebase
if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const timestamp = firebase.database.ServerValue.TIMESTAMP;