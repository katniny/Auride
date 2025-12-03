let followingUser = false;
async function followUser(userIdentifer, reqType) {
    if (followingUser) return;
    followingUser = true;

    // if follow button, update it
    const followButton = document.getElementById("followButton");
    followButton.innerHTML = `${faIcon("circle-notch", "spin").outerHTML} Working...`;
    followButton.style.opacity = "0.5";

    // get token, if exists
    let user = firebase.auth().currentUser;
    let token = null;
    
    // wait a bit if firebase is still initializing
    if (!user) {
        await new Promise(res => setTimeout(res, 100));
        user = firebase.auth().currentUser;
    }

    // if no user, no token. likely not signed in
    if (!user) console.error("No token found.");

    // attempt to get a token
    try {
        token = await user.getIdToken();
    } catch (err) {
        console.error(`Failed to get Firebase token: ${err}`);
    }

    if (!token)
        console.error("No token found.");

    // request deletion from server
    const response = await fetch(`${serverUrl}/api/auride/followUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(userIdentifer ? { "userIdentifier": userIdentifer } : {}),
            ...(reqType ? { "reqType": reqType } : {})
        }
    });
    if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Failed to follow/unfollow user: ", errorMessage.error);
        followingUser = false;
        followButton.innerHTML = `${faIcon("user-plus").outerHTML} Follow User`;
        followButton.style.opacity = "1";

        return;
    }

    const responseJSON = await response.json();
    console.log(responseJSON);

    // then, refresh
    // TODO: do this in a cleaner way
    followingUser = false;
    followButton.innerHTML = `${faIcon("user-plus").outerHTML} Follow User`;
    followButton.style.opacity = "1";
    window.location.reload();
}