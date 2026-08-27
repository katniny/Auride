import { currentUserData } from "../users/current.js";
import { storageLink } from "../utils/storageLink.js";
import { faIcon } from "../utils/faIcon.js";
import { navigate } from "../router.js";
import { setDisplayName } from "../methods/setDisplayName.js";
import { setUsername } from "../methods/setUsername.js";
import { setPronouns } from "../methods/setPronouns.js";
import { setBio } from "../methods/setBio.js";
import { checkAndUploadPfp } from "../ui/modals/uploadPfp.js";
import { checkAndUploadBanner } from "../ui/modals/uploadBanner.js";
import { reauthPopup } from "../ui/modals/reauthenticate.js";
import { setEmail } from "../methods/changeEmail.js";
import { showResetPasswordPopup } from "../ui/modals/resetPassword.js";
import { downloadUserData } from "../methods/downloadUserData.js";
import { deleteAccount } from "../methods/deleteAccount.js";
import { changeThemePopup } from "../ui/modals/changeTheme.js";

export default async function settingsPage() {
    // get users data
    const userData = await currentUserData();
    if (!userData) {
        navigate("/home");
        return;
    }

    const el = document.createElement("div");

    // get pfp and banner links
    const pfpLink = await storageLink(`images/pfp/${userData.uid}/${userData.pfp}`);
    let bannerUrl;
    if (userData.banner)
        bannerUrl = await storageLink(`images/banner/${userData.uid}/${userData.banner}`);
    else
        bannerUrl = "/assets/imgs/Transparency.png";

    el.innerHTML = `
        <div class="settingsPage">
            <h1 class="mainHeader">Settings</h1>
            <div class="tabs">
                <a class="profile active">Profile</a>
                <a class="account">Account</a>
                <a class="personalization">Personalization</a>
                <a class="accessibility">Accessibility</a>
            </div>
            <div class="settingsContainer">
                <div class="tab profile active">
                    <h2>Profile Information</h2>
                    <p class="description">How you'll appear across Auride and other Katniny products.</p>
                    <div class="section noMargin">
                        <p>Profile Picture & Banner</p>
                        <img src="${bannerUrl}" class="userBanner" draggable="false" />
                        <img src="${pfpLink}" class="userPfp" draggable="false" />
                        <button class="changePfp">Change Picture</button>
                        <button class="changeBanner">Change Banner</button>
                        <p class="errorTxt pfpBanner"></p>
                        <input type="file" accept="image/png, image/jpeg" id="pfpFileInput" style="display: none;" />
                        <input type="file" accept="image/png, image/jpeg" id="bannerFileInput" style="display: none;" />
                    </div>
                    <div class="section">
                        <p>Display Name</p>
                        <input type="text" id="displayNameInput" value="${userData.display}" />
                        <br />
                        <p class="description charLimit" id="displayNameCharLimit">${userData.display.length}/25</p>
                        <p class="errorTxt displayName"></p>
                        <button class="saveBtn display">Save</button>
                    </div>
                    <div class="section">
                        <p>Username</p>
                        <input type="text" id="usernameInput" value=${userData.username} />
                        <br />
                        <p class="description charLimit" id="usernameCharLimit">${userData.username.length}/20</p>
                        <p class="errorTxt username"></p>
                        <button class="saveBtn username">Save</button>
                    </div>
                    <div class="section">
                        <p>Pronouns</p>
                        <input type="text" id="pronounsInput" value="${userData.pronouns || ""}" />
                        <br />
                        <p class="description charLimit" id="pronounsCharLimit">${userData.pronouns?.length || 0}/15</p>
                        <p class="errorTxt pronouns"></p>
                        <button class="saveBtn pronouns">Save</button>
                    </div>
                    <div class="section">
                        <p>Bio</p>
                        <textarea id="bioInput">${userData.bio || ""}</textarea>
                        <br />
                        <p class="description charLimit" id="bioCharLimit">${userData.bio?.length || 0}/500</p>
                        <p class="errorTxt bio"></p>
                        <button class="saveBtn bio">Save</button>
                    </div>
                </div>
                <div class="tab account">
                    <h2>Personal Info</h2>
                    <p class="description">Your personal information for Katniny Services.</p>
                    <br />
                    <br />
                    <div class="section">
                        <p>Email Address</p>
                        <input type="text" id="emailInput" />
                        <p class="errorTxt email"></p>
                        <button class="saveBtn email">Save</button>
                    </div>
                    <div class="section">
                        <p>Password</p>
                        <button class="sendPasswordReset">Send Password Reset Email</button>
                        <p class="errorTxt password"></p>
                    </div>
                    <div class="section">
                        <p>Data & Privacy</p>
                        <button class="dataNPrivacyBtn">Download my Data</button>
                        <p class="errorTxt dataNPrivacy"></p>
                    </div>
                    <div class="section">
                        <p class="caution">Delete Account</p>
                        <button class="deleteAccountBtn">Delete Account</button>
                        <p class="errorTxt deleteAccount"></p>
                    </div>
                </div>
                <div class="tab personalization">
                    <h2>Personalization</h2>
                    <p class="description">Personalize your Auride experience. Transfers between web, mobile and desktop.</p>
                    <br />
                    <br />
                    <div class="section">
                        <p>Theme</p>
                        <button class="selectTheme">Select Theme</button>
                        <!-- TODO: bring these back
                        <a href="/create_theme"><button>Create Theme</button></a>
                        <a href="/userstudio"><button class="selectTheme">Get Themes</button></a> -->
                    </div>
                    <div class="section">
                        <p>Show Mature Content (NSFW Content)</p>
                        <p class="description">Learn what each NSFW flag means. <a href="/blog/nsfw-flags">Learn more</a>.</p>
                        <button class="changeNsfwPrefs">Change Preferences</button>
                    </div>
                    <div class="section">
                        <p>Show Sensitive Content</p>
                        <p class="description">Learn what each sensitive flag means. <a href="/blog/sensitive-flags">Learn more</a>.</p>
                        <button class="changeSensitiveFlags">Change Preferences</button>
                    </div>
                    <div class="section">
                        <p>Show Political Content</p>
                        <p class="description">Learn what each political flag means. <a href="/blog/political-flags">Learn more</a>.</p>
                        <button class="changePoliticalFlags">Change Preferences</button>
                    </div>
                    <div class="section">
                        <p>Show Pride Logo During Pride Month</p>
                        <button class="prideMonthUseThemeLogo">Use Theme Logo</button>
                        <button class="prideMonthUsePrideLogo">Use Pride Logo</button>
                    </div>
                    <div class="section">
                        <p>Autoplay Videos</p>
                        <button class="autoplayVideos">Enable Autoplay</button>
                        <button class="dontAutoplayVideos">Disable Autoplay</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // set title
    document.title = `Settings | Auride`;

    // allow tab swapping
    const tabs = el.querySelectorAll(".tabs > a");
    const tabPages = el.querySelectorAll(".settingsContainer > .tab");

    tabs.forEach(tab => {
        tab.onclick = () => {
            // remove active from every navigation tab
            tabs.forEach(otherTab => {
                otherTab.classList.remove("active");
            });

            // remove active from every tab page
            tabPages.forEach(tabPage => {
                tabPage.classList.remove("active");
            });

            // activate the clicked nav tab
            tab.classList.add("active");

            // find the corresponding tab page
            const tabName = [...tab.classList].find(className => {
                return className !== "active";
            });

            const tabPage = el.querySelector(`.settingsContainer .tab.${tabName}`);

            // activate it
            tabPage?.classList.add("active");
        };
    });

    // allow changing pfp
    const changePfpBtn = el.querySelector(".changePfp");
    const pfpFileInput = el.querySelector("#pfpFileInput");
    const pfpBannerErrorTxt = el.querySelector(".errorTxt.pfpBanner");
    changePfpBtn.onclick = async () => {
        pfpFileInput.click();
    };
    pfpFileInput.addEventListener("change", async () => {
        if (pfpFileInput.files.length > 0) {
            pfpBannerErrorTxt.style.display = "none";
            try {
                const result = await checkAndUploadPfp(pfpFileInput.files[0]);
                if (result) {
                    const pagePfp = el.querySelector(".userPfp");
                    const headerPfp = document.querySelector("#headerUserPfp");
                    const pfpUrl = URL.createObjectURL(pfpFileInput.files[0]);
                    pagePfp.src = pfpUrl;
                    headerPfp.src = pfpUrl;
                }
            } catch (error) {
                pfpBannerErrorTxt.style.display = "block";
                pfpBannerErrorTxt.textContent = error.message;
            }
        }
    });

    // allow changing banner
    const changeBannerBtn = el.querySelector(".changeBanner");
    const bannerFileInput = el.querySelector("#bannerFileInput");
    changeBannerBtn.onclick = async () => {
        bannerFileInput.click();
    };
    bannerFileInput.addEventListener("change", async () => {
        if (bannerFileInput.files.length > 0) {
            bannerFileInput.style.display = "none";
            try {
                const result = await checkAndUploadBanner(bannerFileInput.files[0]);
                if (result) {
                    const pageBanner = el.querySelector(".userBanner");
                    const bannerUrl = URL.createObjectURL(bannerFileInput.files[0]);
                    pageBanner.src = bannerUrl;
                }
            } catch (error) {
                pfpBannerErrorTxt.style.display = "block";
                pfpBannerErrorTxt.textContent = error.message;
            }
        }
    });

    // definitions for fields
    const inputDefinitions = {
        displayNameInput: {
            maxLength: 25,
            charLimitDisplay: "#displayNameCharLimit",
            errorTxtDisplay: ".errorTxt.displayName",
            saveBtnDisplay: ".saveBtn.display",
            userDataValue: "display",
            savingText: "Setting display name...",
            save: setDisplayName
        },
        usernameInput: {
            maxLength: 20,
            charLimitDisplay: "#usernameCharLimit",
            errorTxtDisplay: ".errorTxt.username",
            saveBtnDisplay: ".saveBtn.username",
            userDataValue: "username",
            savingText: "Setting username...",
            save: setUsername
        },
        pronounsInput: {
            maxLength: 15,
            charLimitDisplay: "#pronounsCharLimit",
            errorTxtDisplay: ".errorTxt.pronouns",
            saveBtnDisplay: ".saveBtn.pronouns",
            userDataValue: "pronouns",
            savingText: "Setting pronouns...",
            save: setPronouns
        },
        bioInput: {
            maxLength: 500,
            charLimitDisplay: "#bioCharLimit",
            errorTxtDisplay: ".errorTxt.bio",
            saveBtnDisplay: ".saveBtn.bio",
            userDataValue: "bio",
            savingText: "Setting bio...",
            save: setBio
        },
        emailInput: {
            maxLength: 9999,
            charLimitDisplay: null,
            errorTxtDisplay: ".errorTxt.email",
            saveBtnDisplay: ".saveBtn.email",
            savingText: "Requesting email change...",
            save: reauthPopup
        }
    }

    // listen to inputs on the page
    document.addEventListener("input", (event) => {
        // does it the input have a definition?
        const target = event.target;
        const definition = inputDefinitions[target.id];
        if (!definition)
            return;

        // if so, show elements appropriately
        // show character limit
        const charLimitEl = document.querySelector(definition.charLimitDisplay);
        const targetLength = target.value.length;
        if (charLimitEl)
            charLimitEl.textContent = `${targetLength}/${definition.maxLength}`;

        // make sure length doesnt exceed max
        if (targetLength > definition.maxLength) {
            target.value = target.value.slice(0, definition.maxLength);
            charLimitEl.textContent = `${definition.maxLength}/${definition.maxLength}`;
        }

        // show save button if value isnt currently the same
        const saveBtn = document.querySelector(definition.saveBtnDisplay);
        if (target.value.trim() !== "" && target.value.trim() !== userData?.[definition.userDataValue])
            saveBtn.style.display = "block";
        else
            saveBtn.style.display = "none";
    });

    // change appropriate values
    for (const [inputId, definition] of Object.entries(inputDefinitions)) {
        const input = el.querySelector(`#${inputId}`);
        const saveBtn = el.querySelector(definition.saveBtnDisplay);
        const errorTxt = el.querySelector(definition.errorTxtDisplay);

        let saving = false;

        saveBtn.onclick = async () => {
            if (saving)
                return;

            try {
                saving = true;
                saveBtn.classList.add("working");
                errorTxt.textContent = "";
                errorTxt.classList.remove("success");
                saveBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} ${definition.savingText}`;
                const save = await definition.save(input.value);
                if (save && inputId === "emailInput") {
                    await setEmail(input.value);
                    errorTxt.textContent = "Email changed successfully!";
                    errorTxt.classList.add("success");
                }
            } catch (error) {
                errorTxt.textContent = error.message;
            } finally {
                saving = false;
                saveBtn.classList.remove("working");
                saveBtn.innerHTML = "Save";
                saveBtn.style.display = "none";
            }
        };
    }

    // allow requesting password reset
    const resetPasswordBtn = el.querySelector(".sendPasswordReset");
    const resetPasswordErrorTxt = el.querySelector(".errorTxt.password");
    let workingOnSendingPsReset = false;
    resetPasswordBtn.onclick = async () => {
        if (workingOnSendingPsReset)
            return;
        workingOnSendingPsReset = true;
        resetPasswordErrorTxt.textContent = "";

        try {
            // update button
            resetPasswordBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;

            // open popup
            showResetPasswordPopup();
        } catch (error) {
            resetPasswordErrorTxt.textContent = error.message;
        } finally {
            resetPasswordBtn.innerHTML = `Send Password Reset Email`;
            workingOnSendingPsReset = false;
        }
    };

    // allow downloading data
    const dataNPrivacyBtn = el.querySelector(".dataNPrivacyBtn");
    const dataNPrivacyErrTxt = el.querySelector(".errorTxt.dataNPrivacy");
    let requestingData = false;
    dataNPrivacyBtn.onclick = async () => {
        if (requestingData)
            return;
        requestingData = true;
        dataNPrivacyErrTxt.textContent = "";

        try {
            const reauth = await reauthPopup();
            if (reauth) {
                const successful = await downloadUserData();
                if (successful) {
                    // if we got user data successfully, we can just download it
                    const json = JSON.stringify(successful, null, 4);
                    const blob = new Blob([json], {
                        type: "application/json"
                    });

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");

                    link.href = url;
                    link.download = "auride-data.json";
                    link.click();

                    URL.revokeObjectURL(url);
                }
            }
        } catch (error) {
            dataNPrivacyErrTxt.textContent = error.message;
        }
    };

    // allow account deletion
    const deleteAccountBtn = el.querySelector(".deleteAccountBtn");
    const deleteAccountErrTxt = el.querySelector(".errorTxt.deleteAccount");
    let workingOnAccDeletion = false;
    deleteAccountBtn.onclick = async () => {
        if (workingOnAccDeletion)
            return;
        workingOnAccDeletion = true;

        // open reauth popup
        // FIXME: we should really confirm the user wants to,
        // im just rushing this :P
        const reauth = await reauthPopup();
        if (reauth) {
            // request server to delete account
            await deleteAccount();
            window.location.replace("/home"); // refresh
        }
    };

    // select theme
    const selectThemeBtn = el.querySelector(".selectTheme");
    selectThemeBtn.onclick = async () => {
        changeThemePopup();
    };

    return el;
}