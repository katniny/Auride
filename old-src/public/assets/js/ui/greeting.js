const hours = new Date().getHours();
const getGreeting = h =>
    h >= 5 && h < 8 ? "Good early morning" :
    h >= 8 && h < 12 ? "Good morning" :
    h >= 12 && h < 17 ? "Good afternoon" :
    h >= 17 && h < 20 ? "Good evening" :
    h >= 21 && h < 24 ? "Good late night" :
    "Have a good night";

firebase.auth().onAuthStateChanged(async user => {
    let username;
    if (user) {
        const snapshot = await firebase.database().ref(`users/${user.uid}`).once("value");
        username = snapshot.val()?.username;
    }
    document.getElementById("greetingTime").textContent = username ? `${getGreeting(hours)}, ${username}!` : `${getGreeting(hours)}!`;
});