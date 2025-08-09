// this will fetch user info that we can
// use in several ways!
// dont use this in functions that need to be
// secure. this is meant to DISPLAY information, mainly!
import { storageLink } from "../storageLink";

export const userInfo = {
    display: "placeholder",
    username: "placeholder",
    pfpUrl: "https://cdn.auride.xyz/example.png",
    email: "auride@example.com",
    signedIn: false,
    flagPrefs: {
        nsfw: {
            classic: null,
            adultContent: null,
            erotica: null,
            fetishContent: null,
            nonSexualNudity: null,
            sexuallySuggestive: null,
        },
        sensitive: {
            classic: null,
            abuseTraumaMentions: null,
            drugUse: null,
            flashSeizureRisk: null,
            graphicViolence: null,
            horrorImagery: null,
            selfHarmSuicideMentions: null,
        },
        political: {
            classic: null,
            conspiracyTheories: null,
            identityDebates: null,
            newsMedia: null,
            politicalDiscussion: null,
            warNConflict: null,
        }
    }
};

// then fetch the actual user data
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.database().ref(`users/${user.uid}`).on("value", (snapshot) => {
            const data = snapshot.val();

            // set base data
            userInfo.display = data.display || null;
            userInfo.username = data.username || null;
            userInfo.pfpUrl = storageLink(`images/pfp/${user.uid}/${data.pfp}`) || null;
            userInfo.email = data.email || null;
            userInfo.signedIn = true;

            // set nsfw flags data
            userInfo.flagPrefs.nsfw.classic = data.showNsfw || null;
            userInfo.flagPrefs.nsfw.adultContent = data.flagPrefs.adultContent || null;
            userInfo.flagPrefs.nsfw.erotica = data.flagPrefs.erotica || null;
            userInfo.flagPrefs.nsfw.fetishContent = data.flagPrefs.fetishContent || null;
            userInfo.flagPrefs.nsfw.nonSexualNudity = data.flagPrefs.nonSexualNudity || null;
            userInfo.flagPrefs.nsfw.sexuallySuggestive = data.flagPrefs.sexuallySuggestive || null;

            // set sensitive flags data
            userInfo.flagPrefs.sensitive.classic = data.showSensitive || null;
            userInfo.flagPrefs.sensitive.abuseTraumaMentions = data.flagPrefs.abuseTraumaMentions || null;
            userInfo.flagPrefs.sensitive.drugUse = data.flagPrefs.drugUse || null;
            userInfo.flagPrefs.sensitive.flashSeizureRisk = data.flagPrefs.flashSeizureRisk || null;
            userInfo.flagPrefs.sensitive.graphicViolence = data.flagPrefs.graphicViolence || null;
            userInfo.flagPrefs.sensitive.horrorImagery = data.flagPrefs.horrorImagery || null;
            userInfo.flagPrefs.sensitive.selfHarmSuicideMentions = data.flagPrefs.selfHarmSuicideMentions || null;

            // set political flags data
            userInfo.flagPrefs.political.classic = data.showPolitics || null;
            userInfo.flagPrefs.political.conspiracyTheories = data.flagPrefs.conspiracyTheories || null;
            userInfo.flagPrefs.political.identityDebates = data.flagPrefs.identityDebates || null;
            userInfo.flagPrefs.political.newsMedia = data.flagPrefs.newsMedia || null;
            userInfo.flagPrefs.political.politicalDiscussion = data.flagPrefs.politicalDiscussion || null;
            userInfo.flagPrefs.political.warNConflict = data.flagPrefs.warNConflict || null;

            // then, mark as done!
            document.dispatchEvent(new Event("userInfoReady"));
            console.log(userInfo);
        })
    } else {
        document.dispatchEvent(new Event("userInfoReady"));
    }
});