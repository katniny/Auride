async function getContributorsAndSponsors() {
    const contributorsDiv = document.getElementById("contributors");
    const sponsorsDiv = document.getElementById("sponsors");

    // create loading indicator
    createLoadingIndicator("sm", "contributors", "append");
    const loadingIndicator = document.getElementById("noteLoadingIndicator");
    loadingIndicator.innerHTML += "Finding contributors & sponsors...";

    // fetch file
    fetch(`/assets/contributors.json`)
        .then(async res => {
            if (!res.ok) {
                const err = await res.text();
                console.log(err);
                contributorsDiv.innerHTML = `
                    <h1>Something went wrong. :(</h1>
                    <p>Please refresh the page, check your internet connection, or try again later.</p>
                `;
            }
            return res.json();
        }).then(data => {
            const contributors = data.contributors;
            const sponsors = data.sponsors;

            contributorsDiv.innerHTML = `
                <h1>Contributors</h1>
                <p class="contributorsPageDesc">Everyone that contributed, or actively contributes, to Auride in some way.</p>
            `;

            sponsorsDiv.innerHTML = `
                <h1>Sponsors</h1>
                <p class="contributorsPageDesc">All of Auride's (awesome) sponsors. Please email <a href="mailto:katniny@proton.me">katniny@proton.me</a> if you're interested in sponsoring Auride.</p>
            `;

            // then, get contributors
            Object.values(contributors).forEach(contributor => {
                // if valid UID, get user data
                // else, they're not on auride and we fill in that data
                const contributorCard = document.createElement("div");
                contributorCard.className = "contributor";

                if (contributor.uid && contributor.uid !== "notOnAuride") {
                    firebase.database().ref(`users/${contributor.uid}`).once("value", snapshot => {
                        const data = snapshot.val();

                        // set html
                        contributorCard.innerHTML = `
                            <img src="${storageLink(`images/pfp/${contributor.uid}/${data.pfp}`)}" alt="${data.username}'s profile picture" class="profilePic" draggable="false">
                            <div class="contributorInfo">
                                <a href="/u/${data.username}" class="userLink">${data.display}</a>
                                <span>${contributor.contribution}</span>
                            </div>
                        `;
                    }).catch((err) => {
                        contributorCard.innerHTML = `
                            <h3>Something went wrong fetching this contributor.</h3>
                        `;
                    });
                } else {
                    contributorCard.innerHTML = `
                        <img src="${contributor.extras.offPlatformPfp}" alt="${contributor.extras.offPlatformDisplay}'s profile picture" class="profilePic" draggable="false">
                        <div class="contributorInfo">
                            <a href="${contributor.extras.offPlatformLink}" target="_blank" class="userLink">${contributor.extras.offPlatformDisplay}</a>
                            <span>${contributor.contribution}</span>
                        </div>
                    `;
                }

                contributorsDiv.appendChild(contributorCard);
            });

            // rinse and repeat for sponsors
            Object.values(sponsors).forEach(sponsor => {
                // if valid UID, get user data
                // else, they're not on auride and we fill in that data
                const sponsorCard = document.createElement("div");
                sponsorCard.className = "contributor";

                if (sponsor.uid && sponsor.uid !== "notOnAuride") {
                    firebase.database().ref(`users/${sponsor.uid}`).once("value", snapshot => {
                        const data = snapshot.val();

                        // set html
                        sponsorCard.innerHTML = `
                            <img src="${storageLink(`images/pfp/${sponsor.uid}/${data.pfp}`)}" alt="${data.username}'s profile picture" class="profilePic" draggable="false">
                            <div class="contributorInfo">
                                <a href="/u/${data.username}" class="userLink">${data.display}</a>
                                <span>${sponsor.contribution}</span>
                            </div>
                        `;
                    }).catch((err) => {
                        sponsorCard.innerHTML = `
                            <h3>Something went wrong fetching this sponsor.</h3>
                        `;
                    });
                } else {
                    sponsorCard.innerHTML = `
                        <img src="${sponsor.extras.offPlatformPfp}" alt="${sponsor.extras.offPlatformDisplay}'s profile picture" class="profilePic" draggable="false">
                        <div class="contributorInfo">
                            <a href="${sponsor.extras.offPlatformLink}" target="_blank" class="userLink">${sponsor.extras.offPlatformDisplay}</a>
                            <span>${sponsor.contribution}</span>
                        </div>
                    `;
                }

                sponsorsDiv.appendChild(sponsorCard);
            });
        }).catch(err => {
            console.error(err);
        });
}

getContributorsAndSponsors();