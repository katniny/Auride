import{_ as e,a as t,d as n,h as r,l as i,m as a,o,p as s,t as c,u as l,v as u}from"./main-DTcKo8qw.js";import{t as d}from"./resetPassword-BRw8zI-Q.js";import{n as f,t as p}from"./setUsername-BNVzXuPR.js";import{t as m}from"./uploadPfp-iaepK_8m.js";async function h(e){let t=await o();if(!t)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let n=await c(`http://localhost:10000/api/auride/setPronouns`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${t}`},body:JSON.stringify({pronouns:e})});if(!n.ok){let e=await n.json();throw Error(e.error||`Failed to set pronouns with status code ${n.status}.`)}return a.pronouns=e,await(await n.json())?.success}async function g(e){let t=await o();if(!t)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let n=await c(`http://localhost:10000/api/auride/setBio`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${t}`},body:JSON.stringify({bio:e})});if(!n.ok){let e=await n.json();throw Error(e.error||`Failed to set bio with status code ${n.status}.`)}return a.bio=e,await(await n.json())?.success}async function _(e){if(!e)throw Error(`No banner given.`);let n=await i(e);if(!n||n!==`img`)throw Error(`Auride only accepts images as banners!`);let r=document.createElement(`dialog`);r.innerHTML=`
        <!-- TODO: add image cropping -->
        <h2>
            ${u(`solid`,`images`).outerHTML} Upload Banner 
        </h2>
        <p class="description">
            Does this look okay to you? If so, we'll upload it and make it your banner.
        </p>
        <p class="description">Note: You can't crop images yet, but it is a planned feature for the very near future.</p>

        <br />

        <img src="${URL.createObjectURL(e)}" class="accurateAurideBanner" draggable="false" />
        <p class="errorText caution"></p>

        <br />

        <button class="setAsBanner">Set as Banner</button>
        <button class="closePopup">Nevermind</button>
    `,r.className=`changeBannerPopup`,document.getElementById(`app`).appendChild(r);function o(e){console.log(d),e===`working`?(d.innerHTML=`${u(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(d)):d.innerHTML=`Set as Banner`}let s=`caution`;function c(e,t){let n=r.querySelector(`.errorText`);n.textContent=e,n.classList.remove(s),n.classList.add(t),s=t}r.showModal();let l=!1,d=r.querySelector(`.setAsBanner`);return new Promise((n,s)=>{d.onclick=async()=>{if(!l){l=!0,o(`working`),c(``,`caution`);try{let r=await i(e);if(!r||r!==`img`)throw Error(`Auride only accepts images as banners!`);t(e,`banner`,`uid`),v(),a.banner=e.name,n(!0)}catch(e){c(e.message,`caution`),l=!1,o(`notWorking`)}}};let u=r.querySelector(`.closePopup`);u.onclick=()=>{l||(v(),n(!1))}})}function v(){let e=document.getElementById(`app`).querySelector(`.changeBannerPopup`);e&&e.close()}function y(){return new Promise((t,n)=>{let i=document.createElement(`dialog`);i.innerHTML=`
            <h2>
                ${u(`solid`,`unlock`).outerHTML} Reauthenticate 
            </h2>
            <p class="description">
                You're performing a sensitive action, please confirm your identity.
            </p>

            <br />

            <input type="email" id="emailReauth" placeholder="Enter your email address" />
            <input type="password" id="passwordReauth" placeholder="Enter your password">
            <p class="errorText caution"></p>
            <button class="showHidePassword">${u(`solid`,`eye`).outerHTML} Show Password</button>

            <br />

            <button class="reauthUser">Reauthenticate</button>
            <button class="closePopup">Nevermind</button>
        `,i.className=`reauthPopup`,document.getElementById(`app`).appendChild(i);let a=`hidden`,o=i.querySelector(`.showHidePassword`),s=i.querySelector(`#passwordReauth`);o.onclick=()=>{a===`hidden`?(s.type=`text`,a=`shown`,o.innerHTML=`${u(`solid`,`eye-slash`).outerHTML} Hide Password`):(s.type=`password`,a=`hidden`,o.innerHTML=`${u(`solid`,`eye`).outerHTML} Show Password`)};function c(e){console.log(d),e===`working`?(d.innerHTML=`${u(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(d)):d.innerHTML=`Reauthenticate`}let l=!1,d=i.querySelector(`.reauthUser`);d.onclick=async()=>{if(!l){l=!0,c(`working`),p(``,`caution`);try{let n=r.currentUser,a=i.querySelector(`#emailReauth`),o=i.querySelector(`#passwordReauth`),s=e.auth.EmailAuthProvider.credential(a.value,o.value);await n.reauthenticateWithCredential(s),h(),t(!0)}catch(e){l=!1,c(`notWorking`),p(e.message,`caution`)}}};let f=`caution`;function p(e,t){let n=i.querySelector(`.errorText`);n.textContent=e,n.classList.remove(f),n.classList.add(t),f=t}let m=i.querySelector(`.closePopup`);m.onclick=()=>{l||(h(),t(!1))};function h(){let e=document.getElementById(`app`).querySelector(`.reauthPopup`);e&&e.close()}i.showModal()})}async function b(e){let t=await o();if(!t)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let n=await c(`http://localhost:10000/api/auride/changeEmail`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${t}`},body:JSON.stringify({email:e})});if(!n.ok){let e=await n.json();throw Error(e.error||`Failed to set email with status code ${n.status}.`)}return await(await n.json())?.success}async function x(){let e=await c(`http://localhost:10000/api/auride/downloadUserData`,{method:`GET`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${await o()}`}});if(!e.ok)throw Error(`Failed to download user data: ${e.status}`);return await(await e.json())?.success}async function S(){let e=await c(`http://localhost:10000/api/auride/deleteAccount`,{method:`DELETE`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${await o()}`}});if(!e.ok)throw Error(`Failed to download user data: ${e.status}`);return await(await e.json())?.success}function C(){return new Promise((e,t)=>{let n=document.createElement(`dialog`);n.innerHTML=`
            <h2>
                ${u(`solid`,`palette`).outerHTML} Change Theme 
            </h2>
            <button class="closePopup" style="margin-top: 5px;">Nevermind</button>

            <br />

            <div class="theme" data-theme-associated="Dark">
                <img src="/assets/imgs/ThemeDark.png" draggable="false" />
                <div class="info">
                    <h2>Dark</h2>
                    <p class="description">The default theme.</p>
                </div>
            </div>
            <div class="theme" data-theme-associated="Light">
                <img src="/assets/imgs/ThemeLight.png" draggable="false" />
                <div class="info">
                    <h2>Light</h2>
                    <p class="description">The default theme in light mode.</p>
                </div>
            </div>

            <br />
        `,n.className=`changeThemePopup`,document.getElementById(`app`).appendChild(n);let r=n.querySelector(`.closePopup`);r.onclick=()=>{i(),e(!1)};function i(){let e=document.getElementById(`app`).querySelector(`.changeThemePopup`);e&&e.close()}n.showModal()})}async function w(){let e=await s();if(!e){n(`/home`);return}let t=document.createElement(`div`),r=await l(`images/pfp/${e.uid}/${e.pfp}`),i;i=e.banner?await l(`images/banner/${e.uid}/${e.banner}`):`/assets/imgs/Transparency.png`,t.innerHTML=`
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
                        <img src="${i}" class="userBanner" draggable="false" />
                        <img src="${r}" class="userPfp" draggable="false" />
                        <button class="changePfp">Change Picture</button>
                        <button class="changeBanner">Change Banner</button>
                        <p class="errorTxt pfpBanner"></p>
                        <input type="file" accept="image/png, image/jpeg" id="pfpFileInput" style="display: none;" />
                        <input type="file" accept="image/png, image/jpeg" id="bannerFileInput" style="display: none;" />
                    </div>
                    <div class="section">
                        <p>Display Name</p>
                        <input type="text" id="displayNameInput" value="${e.display}" />
                        <br />
                        <p class="description charLimit" id="displayNameCharLimit">${e.display.length}/25</p>
                        <p class="errorTxt displayName"></p>
                        <button class="saveBtn display">Save</button>
                    </div>
                    <div class="section">
                        <p>Username</p>
                        <input type="text" id="usernameInput" value=${e.username} />
                        <br />
                        <p class="description charLimit" id="usernameCharLimit">${e.username.length}/20</p>
                        <p class="errorTxt username"></p>
                        <button class="saveBtn username">Save</button>
                    </div>
                    <div class="section">
                        <p>Pronouns</p>
                        <input type="text" id="pronounsInput" value="${e.pronouns||``}" />
                        <br />
                        <p class="description charLimit" id="pronounsCharLimit">${e.pronouns?.length||0}/15</p>
                        <p class="errorTxt pronouns"></p>
                        <button class="saveBtn pronouns">Save</button>
                    </div>
                    <div class="section">
                        <p>Bio</p>
                        <textarea id="bioInput">${e.bio||``}</textarea>
                        <br />
                        <p class="description charLimit" id="bioCharLimit">${e.bio?.length||0}/500</p>
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
    `,document.title=`Settings | Auride`;let a=t.querySelectorAll(`.tabs > a`),o=t.querySelectorAll(`.settingsContainer > .tab`);a.forEach(e=>{e.onclick=()=>{a.forEach(e=>{e.classList.remove(`active`)}),o.forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`);let n=[...e.classList].find(e=>e!==`active`);t.querySelector(`.settingsContainer .tab.${n}`)?.classList.add(`active`)}});let c=t.querySelector(`.changePfp`),v=t.querySelector(`#pfpFileInput`),w=t.querySelector(`.errorTxt.pfpBanner`);c.onclick=async()=>{v.click()},v.addEventListener(`change`,async()=>{if(v.files.length>0){w.style.display=`none`;try{if(await m(v.files[0])){let e=t.querySelector(`.userPfp`),n=document.querySelector(`#headerUserPfp`),r=URL.createObjectURL(v.files[0]);e.src=r,n.src=r}}catch(e){w.style.display=`block`,w.textContent=e.message}}});let T=t.querySelector(`.changeBanner`),E=t.querySelector(`#bannerFileInput`);T.onclick=async()=>{E.click()},E.addEventListener(`change`,async()=>{if(E.files.length>0){E.style.display=`none`;try{if(await _(E.files[0])){let e=t.querySelector(`.userBanner`);e.src=URL.createObjectURL(E.files[0])}}catch(e){w.style.display=`block`,w.textContent=e.message}}});let D={displayNameInput:{maxLength:25,charLimitDisplay:`#displayNameCharLimit`,errorTxtDisplay:`.errorTxt.displayName`,saveBtnDisplay:`.saveBtn.display`,userDataValue:`display`,savingText:`Setting display name...`,save:f},usernameInput:{maxLength:20,charLimitDisplay:`#usernameCharLimit`,errorTxtDisplay:`.errorTxt.username`,saveBtnDisplay:`.saveBtn.username`,userDataValue:`username`,savingText:`Setting username...`,save:p},pronounsInput:{maxLength:15,charLimitDisplay:`#pronounsCharLimit`,errorTxtDisplay:`.errorTxt.pronouns`,saveBtnDisplay:`.saveBtn.pronouns`,userDataValue:`pronouns`,savingText:`Setting pronouns...`,save:h},bioInput:{maxLength:500,charLimitDisplay:`#bioCharLimit`,errorTxtDisplay:`.errorTxt.bio`,saveBtnDisplay:`.saveBtn.bio`,userDataValue:`bio`,savingText:`Setting bio...`,save:g},emailInput:{maxLength:9999,charLimitDisplay:null,errorTxtDisplay:`.errorTxt.email`,saveBtnDisplay:`.saveBtn.email`,savingText:`Requesting email change...`,save:y}};document.addEventListener(`input`,t=>{let n=t.target,r=D[n.id];if(!r)return;let i=document.querySelector(r.charLimitDisplay),a=n.value.length;i&&(i.textContent=`${a}/${r.maxLength}`),a>r.maxLength&&(n.value=n.value.slice(0,r.maxLength),i.textContent=`${r.maxLength}/${r.maxLength}`);let o=document.querySelector(r.saveBtnDisplay);n.value.trim()!==``&&n.value.trim()!==e?.[r.userDataValue]?o.style.display=`block`:o.style.display=`none`});for(let[e,n]of Object.entries(D)){let r=t.querySelector(`#${e}`),i=t.querySelector(n.saveBtnDisplay),a=t.querySelector(n.errorTxtDisplay),o=!1;i.onclick=async()=>{if(!o)try{o=!0,i.classList.add(`working`),a.textContent=``,a.classList.remove(`success`),i.innerHTML=`${u(`solid`,`circle-notch`,`spin`).outerHTML} ${n.savingText}`,await n.save(r.value)&&e===`emailInput`&&(await b(r.value),a.textContent=`Email changed successfully!`,a.classList.add(`success`))}catch(e){a.textContent=e.message}finally{o=!1,i.classList.remove(`working`),i.innerHTML=`Save`,i.style.display=`none`}}}let O=t.querySelector(`.sendPasswordReset`),k=t.querySelector(`.errorTxt.password`),A=!1;O.onclick=async()=>{if(!A){A=!0,k.textContent=``;try{O.innerHTML=`${u(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,d()}catch(e){k.textContent=e.message}finally{O.innerHTML=`Send Password Reset Email`,A=!1}}};let j=t.querySelector(`.dataNPrivacyBtn`),M=t.querySelector(`.errorTxt.dataNPrivacy`),N=!1;j.onclick=async()=>{if(!N){N=!0,M.textContent=``;try{if(await y()){let e=await x();if(e){let t=JSON.stringify(e,null,4),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`auride-data.json`,i.click(),URL.revokeObjectURL(r)}}}catch(e){M.textContent=e.message}}};let P=t.querySelector(`.deleteAccountBtn`);t.querySelector(`.errorTxt.deleteAccount`);let F=!1;P.onclick=async()=>{F||(F=!0,await y()&&(await S(),window.location.replace(`/home`)))};let I=t.querySelector(`.selectTheme`);return I.onclick=async()=>{C()},t}export{w as default};