// this will fetch user info that we can
// use in several ways!
// please dont use this if up-to-date information
// is VITAL and this script was loaded A WHILE AGO!

// also, dont use this in functions that need to be
// secure. this is meant to DISPLAY information, mainly!
import { storageLink } from "../storageLink";

export const userInfo = {
    display: "placeholder",
    username: "placeholder",
    pfpUrl: "https://cdn.auride.xyz/example.png",
    email: "auride@example.com",
    signedIn: false,
};

// then fetch the actual user data
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
            const data = snapshot.val();

            // set data
            userInfo.display = data.display;
            userInfo.username = data.username;
            userInfo.pfpUrl = storageLink(`images/pfp/${user.uid}/${data.pfp}`);
            userInfo.email = data.email;
            userInfo.signedIn = true;
        }).then(() => {
            // then, mark as done!
            document.dispatchEvent(new Event("userInfoReady"));
        }).catch((error) => {
            
        });
    }
});