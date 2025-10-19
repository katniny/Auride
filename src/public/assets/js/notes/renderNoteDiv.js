// todo: rewrite this or clean it up severely...
// this is unoptimized, calls the database 12 times (should be 2 MAX), and hard to read
function renderNote(noteData) {
    function renderUsername(username, pronouns, time) {
        const displayDate = timeAgo(time);
        if (pronouns) {
            return `@${username} • ${pronouns} • ${displayDate}`;
        } else {
            return `@${username} • ${displayDate}`;
        }
    }

    if (noteData.id === undefined) return;

    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.id = noteData.id;

    if (noteData.isNsfw === true || noteData.isSensitive === true || noteData.isPolitical === true) {
        if (firebase.auth().currentUser) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value", (snapshot) => {
                const userData = snapshot.val();

                if (noteData.isNsfw === true) {
                    console.log("hi");
                    if (userData.showNsfw === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = "This note contains NSFW content. However, it uses our legacy flagging system, so we can't tell you what kind of NSFW it contains. Proceed with caution.";
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as NSFW (legacy)`;
                        noteDiv.appendChild(contentWarning);
                    } else if (userData.showNsfw === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === true) {
                    if (userData.showSensitive === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = "This note contains sensitive content. However, it uses our legacy flagging system, so we can't tell you what kind of sensitive content it contains. Proceed with caution.";
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Sensitive (legacy)`;
                        noteDiv.appendChild(contentWarning);
                    } else if (userData.showSensitive === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isPolitical === true) {
                    if (userData.showPolitics === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = "This note contains political content. However, it uses our legacy flagging system, so we can't tell you what kind of political content it contains. Proceed with caution.";
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Political (legacy)`;
                        noteDiv.appendChild(contentWarning);
                    } else if (userData.showPolitics === "Hide") {
                        noteDiv.remove();
                    }
                }
            });
        } else {
            // we're in a callback so we cant directly return out of the outer function
            // we're checking this value later
            noteDiv.TO_BE_REMOVED = true;
            return;
        }
    } else if (noteData.isNsfw !== "noNsfwContent") {
        if (firebase.auth().currentUser) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value", (snapshot) => {
                const userData = snapshot.val();

                if (noteData.isNsfw === "adultContent") {
                    if (userData.flagPrefs?.adultContent === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = adultContentDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Adult Content`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.adultContent || userData.flagPrefs.adultContent === "Hide") {
                        noteDiv.TO_BE_REMOVED = true;
                        return;
                    }
                } else if (noteData.isNsfw === "sexuallySuggestive") {
                    if (userData.flagPrefs?.sexuallySuggestive === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = sexuallySuggestiveDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Sexually Suggestive`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.sexuallySuggestive || userData.flagPrefs.sexuallySuggestive === "Hide") {
                        noteDiv.TO_BE_REMOVED = true;
                        return;
                    }
                } else if (noteData.isNsfw === "fetishContent") {
                    if (userData.flagPrefs?.fetishContent === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = fetishContentDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Fetish Content`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.fetishContent || userData.flagPrefs.fetishContent === "Hide") {
                        noteDiv.TO_BE_REMOVED = true;
                        return;
                    }
                } else if (noteData.isNsfw === "nonSexualNudity") {
                    if (userData.flagPrefs?.nonSexualNudity === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = nonSexualNudityDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Non-Sexual Nudity`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.nonSexualNudity || userData.flagPrefs.nonSexualNudity === "Hide") {
                        noteDiv.TO_BE_REMOVED = true;
                        return;
                    }
                } else if (noteData.isNsfw === "erotica") {
                    if (userData.flagPrefs?.erotica === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = eroticWritingsDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Erotic Writing`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.erotica || userData.flagPrefs.erotica === "Hide") {
                        noteDiv.TO_BE_REMOVED = true;
                        return;
                    }
                }
            });
        } else {
            // we're in a callback so we cant directly return out of the outer function
            // we're checking this value later
            noteDiv.TO_BE_REMOVED = true;
            return;
        }
    } else if (noteData.isSensitive !== "noSensitiveContent") {
        if (firebase.auth().currentUser) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value", (snapshot) => {
                const userData = snapshot.val();

                if (noteData.isSensitive === "graphicViolence") {
                    if (userData.flagPrefs?.graphicViolence === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = graphicViolenceDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Graphic Violence`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.graphicViolence || userData.flagPrefs.graphicViolence === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === "horrorImagery") {
                    if (userData.flagPrefs?.horrorImagery === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = horrorImageryDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Horror Imagery`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.horrorImagery || userData.flagPrefs.horrorImagery === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === "abuseTraumaMentions") {
                    if (userData.flagPrefs?.abuseTraumaMentions === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = abuseTraumaMentionsDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Abuse/Trauma Mentions`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.abuseTraumaMentions || userData.flagPrefs.abuseTraumaMentions === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === "selfHarmSuicideMentions") {
                    if (userData.flagPrefs?.selfHarmSuicideMentions === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = selfHarmSuicideMentionsDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Self-Harm/Suicide Mentions`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.selfHarmSuicideMentions || userData.flagPrefs.selfHarmSuicideMentions === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === "drugUse") {
                    if (userData.flagPrefs?.drugUse === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = drugUseDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Drug Use`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.drugUse || userData.flagPrefs.drugUse === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isSensitive === "flashSeizureRisk") {
                    if (userData.flagPrefs?.flashSeizureRisk === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = flashSeizureDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Flash/Seizure Risk`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.flashSeizureRisk || userData.flagPrefs.flashSeizureRisk === "Hide") {
                        noteDiv.remove();
                    }
                }
            });
        } else {
            // we're in a callback so we cant directly return out of the outer function
            // we're checking this value later
            noteDiv.TO_BE_REMOVED = true;
            return;
        }
    } else if (noteData.isPolitical !== "noPoliticalContent") {
        if (firebase.auth().currentUser) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value", (snapshot) => {
                const userData = snapshot.val();

                if (noteData.isPolitical === "politicalDiscussion") {
                    if (userData.flagPrefs?.politicalDiscussion === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = politicalDiscussionDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Political Discussion`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.politicalDiscussion || userData.flagPrefs.politicalDiscussion === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isPolitical === "warNConflict") {
                    if (userData.flagPrefs?.warNConflict === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = warAndConflictDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as War and Conflict`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.warNConflict || userData.flagPrefs.warNConflict === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isPolitical === "identityDebates") {
                    if (userData.flagPrefs?.identityDebates === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = identityDebatesDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Identity Debates`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.identityDebates || userData.flagPrefs.identityDebates === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isPolitical === "conspiracyTheories") {
                    if (userData.flagPrefs?.conspiracyTheories === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = conspiracyTheoriesDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as Conspiracy Theories`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.conspiracyTheories || userData.flagPrefs.conspiracyTheories === "Hide") {
                        noteDiv.remove();
                    }
                } else if (noteData.isPolitical === "newsMedia") {
                    if (userData.flagPrefs?.newsMedia === "Blur") {
                        // create the cover, which is the actual warning itself
                        const cover = document.createElement("div");
                        cover.className = "contentWarning";
                        cover.id = `${noteData.id}-blur`;
                        noteDiv.appendChild(cover);

                        const warning = document.createElement("p");
                        warning.id = `${noteData.id}-warningInfo`;
                        warning.className = "warningInfo";
                        warning.textContent = newsMediaDescription;
                        cover.appendChild(warning);

                        const closeButton = document.createElement("button");
                        closeButton.className = "closeWarning";
                        closeButton.id = `${noteData.id}-closeWarning`;
                        closeButton.textContent = "View";
                        closeButton.addEventListener("click", function () { removeNsfw(`${noteData.id}-closeWarning`); });
                        cover.appendChild(closeButton);

                        // then, do the flag
                        const contentWarning = document.createElement("p");
                        contentWarning.className = "contentWarning-showBelowText";
                        // TODO: im unsure how to append text nodes
                        contentWarning.innerHTML = `${faIcon("flag").outerHTML} Flagged as News Media`;
                        setTimeout(() => {
                            noteDiv.appendChild(contentWarning);
                        }, 250);
                    } else if (!userData.flagPrefs?.newsMedia || userData.flagPrefs.newsMedia === "Hide") {
                        noteDiv.remove();
                    }
                }
            });
        } else {
            // we're in a callback so we cant directly return out of the outer function
            // we're checking this value later
            noteDiv.TO_BE_REMOVED = true;
            return;
        }
    }

    // if renote, show that
    if (pathName.startsWith("/u/")) {
        const getUsername = pathName.split("/")[2];
        // get their uid
        firebase.database().ref(`/taken-usernames/${getUsername}`).once("value", (snapshot) => {
            const uid = snapshot.val().user;
            
            if (noteData.whoSentIt !== uid) {
                const formattedUsername = format(getUsername, ["html", "emoji"]);

                // create text
                const renotedText = document.createElement("p");
                renotedText.classList.add("userRenoted");
                renotedText.innerHTML = `${faIcon("retweet").outerHTML} ${formattedUsername} renoted`;
                noteDiv.insertBefore(renotedText, userPfp);
            }
        });
    }

    // TODO: default user data
    const userPfp = document.createElement("img");
    userPfp.className = "notePfp";
    firebase.database().ref("users/" + noteData.whoSentIt).get().then(function (snapshot) {
        const userData = snapshot.val();
        userPfp.src = storageLink(`images/pfp/${noteData.whoSentIt}/${userData.pfp}`);
    });
    userPfp.draggable = false;
    userPfp.loading = "lazy";
    noteDiv.appendChild(userPfp);
    mediaObserver.observe(userPfp);

    const displayName = document.createElement("a");
    displayName.className = "noteDisplay";
    firebase.database().ref("users/" + noteData.whoSentIt).get().then(function (snapshot) {
        const userData = snapshot.val();
        displayName.innerHTML = format(userData.display, ["html", "emoji"]);
        displayName.href = `/u/${userData.username}`;

        const badges = document.createElement("span");
        badges.className = "noteBadges";
        if (userData.isVerified) badges.appendChild(faIcon("circle-check", size = "sm"));
        if (userData.isSubscribed) badges.appendChild(faIcon("heart", size = "sm"));
        if (userData.activeContributor) badges.appendChild(faIcon("handshake-angle", size = "sm"));

        // only append badges if there actually are any
        if (badges.innerHTML) displayName.appendChild(badges);
    })
    noteDiv.appendChild(displayName);

    // TODO: we should not need a line break to Seperate Display Name and Username
    noteDiv.appendChild(document.createElement("br"));

    const username = document.createElement("a");
    username.classList.add("noteUsername");
    firebase.database().ref("users/" + noteData.whoSentIt).get().then(function (snapshot) {
        const userData = snapshot.val();
        username.textContent = renderUsername(userData.username, userData.pronouns, noteData.createdAt)
        username.href = `/u/${userData.username}`;
    })
    noteDiv.appendChild(username);

    const text = document.createElement("p");
    text.innerHTML = format(noteData.text);
    text.className = "noteText";
    if (!noteData.replyingTo) {
        text.addEventListener("click", function () { window.location.href = `/note/${noteData.id}`; });
    }
    // what does this even achieve?
    text.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (event) { event.stopPropagation(); });
    });
    noteDiv.appendChild(text);

    if (noteData.image) {
        let ext = noteData.image.split(".").pop();
        const isVideo = ext.split("?")[0] === "mp4";
        const isAudio = ext.split("?")[0] === "mp3";

        const media = document.createElement(isVideo ? "video" : (isAudio ? "audio" : "img"));
        media.className = "uploadedImg";
        media.src = noteData.image;
        media.alt = noteData.alt;
        media.loading = "lazy";

        media.style.visibility = "hidden";
        media.style.opacity = "0";

        if (isVideo || isAudio) {
            media.controls = true;
            media.muted = true;
            media.loop = true;
            media.autoplay = userAutoplayPreference;
        } else {
            media.draggable = false;
            media.onclick = () => {
                // create modal elements
                const modal = document.createElement("div");
                const modalImg = document.createElement("img");

                // style modal
                Object.assign(modal.style, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    cursor: "zoom-out"
                });

                Object.assign(modalImg.style, {
                    maxWidth: "90%",
                    maxHeight: "90%",
                    borderRadius: "8px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)"
                });

                modalImg.src = media.src;

                // close modal on click
                modal.onclick = () => {
                    document.body.removeChild(modal);
                };

                modal.appendChild(modalImg);
                document.body.appendChild(modal);
            };
        }

        noteDiv.appendChild(media);
        mediaObserver.observe(media);
    }

    if (noteData.music) {
        const embed = document.createElement("iframe");
        embed.src = `https://open.spotify.com/embed/track/${noteData.music}`;
        embed.width = "98%";
        embed.height = "100";
        embed.allow = "encrypted-media";
        embed.allowTransparency = true;
        // .frameBorder is deprecated
        embed.style.border = 0;

        noteDiv.appendChild(embed);
    }

    if (noteData.quoting) {
        const container = document.createElement("div");
        container.className = "quoteContainer";
        container.addEventListener("click", function () { window.location.href = `/note/${noteData.quoting}`; });

        // i feel you can dedup more code here
        firebase.database().ref(`notes/${noteData.quoting}`).get().then(function (snapshot) {
            const quoteData = snapshot.val();

            if (quoteData.isDeleted) {
                const quotePfp = document.createElement("img");
                quotePfp.className = "quotePfp";
                quotePfp.draggable = false;
                quotePfp.src = "/assets/imgs/defaultPfp.png";
                container.appendChild(quotePfp);

                const quoteHeader = document.createElement("div");
                quoteHeader.className = "quoteHeader";

                const quoteDisplay = document.createElement("span");
                quoteDisplay.className = "quoteDisplay";
                quoteDisplay.textContent = "Unknown User";
                quoteHeader.appendChild(quoteDisplay);

                const quoteUsername = document.createElement("span");
                quoteUsername.className = "quoteUsername";
                quoteUsername.textContent = "@unknownuser";
                quoteHeader.appendChild(quoteUsername);

                const quoteContent = document.createElement("div");
                quoteContent.className = "quoteContent";
                quoteContent.appendChild(quoteHeader);

                const quoteText = document.createElement("span");
                quoteText.className = "quoteText";
                // not like theres a permission system that would allow someone to see deleted notes
                quoteText.textContent = "This note has been deleted";
                quoteContent.appendChild(quoteText);
                container.appendChild(quoteContent);

                return;
            }

            firebase.database().ref(`users/${quoteData.whoSentIt}`).get().then(function (snapshot) {
                const quoteUser = snapshot.val();
                const isSuspended = quoteUser.suspensionStatus === "suspended";

                const quotePfp = document.createElement("img");
                quotePfp.className = "quotePfp";
                quotePfp.draggable = false;
                if (isSuspended) {
                    quotePfp.src = "/assets/imgs/defaultPfp.png";
                } else {
                    quotePfp.src = storageLink(`images/pfp/${quoteData.whoSentIt}/${quoteUser.pfp}`);
                }
                container.appendChild(quotePfp);

                const quoteHeader = document.createElement("div");
                quoteHeader.className = "quoteHeader";

                const quoteDisplay = document.createElement("span");
                quoteDisplay.className = "quoteDisplay";
                if (isSuspended) {
                    quoteDisplay.textContent = "Suspended User";
                } else {
                    quoteDisplay.textContent = quoteUser.display;
                }
                quoteHeader.appendChild(quoteDisplay);

                const quoteUsername = document.createElement("span");
                quoteUsername.className = "quoteUsername";
                if (isSuspended) {
                    quoteUsername.textContent = "suspended";
                } else {
                    quoteUsername.textContent = renderUsername(quoteUser.username, quoteUser.pronouns, quoteData.createdAt);
                }
                quoteHeader.appendChild(quoteUsername);

                const quoteContent = document.createElement("div");
                quoteContent.className = "quoteContent";
                quoteContent.appendChild(quoteHeader);

                const quoteText = document.createElement("span");
                quoteText.className = "quoteText";
                if (isSuspended) {
                    // dont leak their username
                    quoteText.textContent = "Note by suspended user cannot be viewed";
                } else {
                    let content = format(quoteData.text);
                    if (content.length > 247) {
                        content = content.substring(0, 247) + "...";
                    }
                    quoteText.innerHTML = content;
                }
                quoteContent.appendChild(quoteText);

                container.appendChild(quoteContent);
            })
        })
        noteDiv.appendChild(container);
    }

    const buttonRow = document.createElement("div");
    buttonRow.classList.add("buttonRow");
    if (firebase.auth().currentUser) {
        firebase.database().ref(`users/${auth.currentUser.uid}/experiments/noteButtonLayout`).get().then(function (snapshot) {
            if (snapshot.val()) {
                buttonRow.classList.add("buttonRowExperiment");
            }
        });
    }

    // TODO: figure out what to do about this duplication
    const loveBtn = document.createElement("p");
    loveBtn.className = "likeBtn";
    loveBtn.id = `like-${noteData.id}`;
    if (noteData.likes) {
        loveBtn.innerHTML = `${faIcon("heart").outerHTML} ${noteData.likes}`;

        if (firebase.auth().currentUser && noteData.whoLiked && noteData.whoLiked[auth.currentUser.uid]) {
            loveBtn.classList.add("liked");
        }
    } else {
        loveBtn.innerHTML = `${faIcon("heart").outerHTML} 0`;
    }
    buttonRow.appendChild(loveBtn);

    const renoteBtn = document.createElement("p");
    renoteBtn.classList.add("renoteBtn");
    renoteBtn.id = `renote-${noteData.id}`;
    if (noteData.renotes) {
        renoteBtn.innerHTML = `${faIcon("retweet").outerHTML} ${noteData.renotes}`;

        if (auth.currentUser && noteData.whoRenoted && noteData.whoRenoted[auth.currentUser.uid]) {
            renoteBtn.classList.add("renoted");
        }
    } else {
        renoteBtn.innerHTML = `${faIcon("retweet").outerHTML} 0`;
    }
    buttonRow.appendChild(renoteBtn);

    const replyBtn = document.createElement("p");
    replyBtn.className = "replyBtn";
    if (noteData.replies) {
        replyBtn.innerHTML = `${faIcon("comment").outerHTML} ${noteData.replies}`;
    } else {
        replyBtn.innerHTML = `${faIcon("comment").outerHTML} 0`;
    }
    if (!pathName.startsWith("/note")) {
        replyBtn.addEventListener("click", function () { window.location.href = `/note/${noteData.id}` });
    } else {
        replyBtn.addEventListener("click", function () { replyToNote(replyBtn) });
    }
    buttonRow.appendChild(replyBtn);

    const quoteBtn = document.createElement("p");
    quoteBtn.className = "quoteRenoteBtn";
    quoteBtn.appendChild(faIcon("quote-left"));
    quoteBtn.addEventListener("click", function () { quoteRenote(noteData.id); });
    buttonRow.appendChild(quoteBtn);

    const favoriteBtn = document.createElement("p");
    favoriteBtn.classList.add("favoriteBtn");
    const favIcon = faIcon("bookmark", size = "xs");
    // apply the id to the favorites button or it will not change colors <-- im low key scared to look into the css
    favIcon.id = `favorite-${noteData.id}`;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref(`users/${user.uid}/favorites/${noteData.id}`).get().then(function (snapshot) {
                if (snapshot.exists()) {
                    favIcon.style.color = "var(--main-color)";
                }
            });
        }
    });
    favoriteBtn.appendChild(favIcon);
    favoriteBtn.addEventListener("click", function () { favorite(noteData.id); });
    buttonRow.appendChild(favoriteBtn);

    noteDiv.appendChild(buttonRow);

    // the more menu is now by the display name!
    const moreMenu = document.createElement("div");
    moreMenu.appendChild(faIcon("ellipsis"));
    moreMenu.classList.add("noteMoreMenu");
    username.parentNode.insertBefore(moreMenu, username);

    // create the submenu to show when "more" is clicked
    const moreSubMenu = document.createElement("div");
    if (firebase.auth().currentUser && firebase.auth().currentUser.uid === noteData.whoSentIt) {
        moreSubMenu.innerHTML = `
            <button onclick="createEditNoteUI('${noteData.id}');">${faIcon("pen-to-square").outerHTML} Edit Note</button>
            <button class="danger" onclick="createDeleteNoteUI('${noteData.id}')">${faIcon("trash").outerHTML} Delete Note</button>
        `;
    } else {
        moreSubMenu.innerHTML = `
            ${faIcon("circle-info").outerHTML} No interactions are currently available.
        `;
    }
    moreSubMenu.classList.add("noteMoreSubMenu");
    noteDiv.appendChild(moreSubMenu);

    moreSubMenu.tabIndex = -1;
    moreMenu.onclick = () => {
        if (moreSubMenu.classList.contains("open")) {
            moreSubMenu.classList.remove("open");
        } else {
            moreSubMenu.classList.add("open");
            moreSubMenu.focus();
        }
    };

    moreSubMenu.addEventListener("focusout", (e) => {
        // check if focus went outside the submenu
        if (!moreSubMenu.contains(e.relatedTarget))
            moreSubMenu.classList.remove("open");
    });

    return noteDiv;
}