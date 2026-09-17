import{a as e,c as t,i as n,l as r,n as i,o as a}from"./router-fU7goLPj.js";import{t as o}from"./checkFileType-BmvIHc4A.js";import{l as s,o as c,s as l}from"./index-BBeCNjCH.js";import{t as u}from"./resetPassword-CTO0pnEd.js";import{n as d,t as f}from"./setUsername-NAa7-yAt.js";import{t as p}from"./uploadPfp-75QKQFqv.js";async function m(t){let n=await l();if(!n)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let r=await fetch(`http://localhost:10000/api/auride/setPronouns`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${n}`},body:JSON.stringify({pronouns:t})});if(!r.ok){let e=await r.json();throw Error(e.error||`Failed to set pronouns with status code ${r.status}.`)}return e.pronouns=t,await(await r.json())?.success}async function h(t){let n=await l();if(!n)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let r=await fetch(`http://localhost:10000/api/auride/setBio`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${n}`},body:JSON.stringify({bio:t})});if(!r.ok){let e=await r.json();throw Error(e.error||`Failed to set bio with status code ${r.status}.`)}return e.bio=t,await(await r.json())?.success}async function g(t){if(!t)throw Error(`No banner given.`);let n=await o(t);if(!n||n!==`img`)throw Error(`Auride only accepts images as banners!`);let i=document.createElement(`dialog`);i.innerHTML=`
        <!-- TODO: add image cropping -->
        <h2>
            ${r(`solid`,`images`).outerHTML} Upload Banner 
        </h2>
        <p class="description">
            Does this look okay to you? If so, we'll upload it and make it your banner.
        </p>
        <p class="description">Note: You can't crop images yet, but it is a planned feature for the very near future.</p>

        <br />

        <img src="${URL.createObjectURL(t)}" class="accurateAurideBanner" draggable="false" />
        <p class="errorText caution"></p>

        <br />

        <button class="setAsBanner">Set as Banner</button>
        <button class="closePopup">Nevermind</button>
    `,i.className=`changeBannerPopup`,document.getElementById(`app`).appendChild(i);function a(e){console.log(d),e===`working`?(d.innerHTML=`${r(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(d)):d.innerHTML=`Set as Banner`}let s=`caution`;function l(e,t){let n=i.querySelector(`.errorText`);n.textContent=e,n.classList.remove(s),n.classList.add(t),s=t}i.showModal();let u=!1,d=i.querySelector(`.setAsBanner`);return new Promise((n,r)=>{d.onclick=async()=>{if(!u){u=!0,a(`working`),l(``,`caution`);try{let r=await o(t);if(!r||r!==`img`)throw Error(`Auride only accepts images as banners!`);c(t,`banner`,`uid`),_(),e.banner=t.name,n(!0)}catch(e){l(e.message,`caution`),u=!1,a(`notWorking`)}}};let s=i.querySelector(`.closePopup`);s.onclick=()=>{u||(_(),n(!1))}})}function _(){let e=document.getElementById(`app`).querySelector(`.changeBannerPopup`);e&&e.close()}function v(){return new Promise((e,n)=>{let i=document.createElement(`dialog`);i.innerHTML=`
            <h2>
                ${r(`solid`,`unlock`).outerHTML} Reauthenticate 
            </h2>
            <p class="description">
                You're performing a sensitive action, please confirm your identity.
            </p>

            <br />

            <input type="email" id="emailReauth" placeholder="Enter your email address" />
            <input type="password" id="passwordReauth" placeholder="Enter your password">
            <p class="errorText caution"></p>
            <button class="showHidePassword">${r(`solid`,`eye`).outerHTML} Show Password</button>

            <br />

            <button class="reauthUser">Reauthenticate</button>
            <button class="closePopup">Nevermind</button>
        `,i.className=`reauthPopup`,document.getElementById(`app`).appendChild(i);let o=`hidden`,s=i.querySelector(`.showHidePassword`),c=i.querySelector(`#passwordReauth`);s.onclick=()=>{o===`hidden`?(c.type=`text`,o=`shown`,s.innerHTML=`${r(`solid`,`eye-slash`).outerHTML} Hide Password`):(c.type=`password`,o=`hidden`,s.innerHTML=`${r(`solid`,`eye`).outerHTML} Show Password`)};function l(e){console.log(d),e===`working`?(d.innerHTML=`${r(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(d)):d.innerHTML=`Reauthenticate`}let u=!1,d=i.querySelector(`.reauthUser`);d.onclick=async()=>{if(!u){u=!0,l(`working`),p(``,`caution`);try{let n=a.currentUser,r=i.querySelector(`#emailReauth`),o=i.querySelector(`#passwordReauth`),s=t.auth.EmailAuthProvider.credential(r.value,o.value);await n.reauthenticateWithCredential(s),h(),e(!0)}catch(e){u=!1,l(`notWorking`),p(e.message,`caution`)}}};let f=`caution`;function p(e,t){let n=i.querySelector(`.errorText`);n.textContent=e,n.classList.remove(f),n.classList.add(t),f=t}let m=i.querySelector(`.closePopup`);m.onclick=()=>{u||(h(),e(!1))};function h(){let e=document.getElementById(`app`).querySelector(`.reauthPopup`);e&&e.close()}i.showModal()})}async function y(e){let t=await l();if(!t)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let n=await fetch(`http://localhost:10000/api/auride/changeEmail`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${t}`},body:JSON.stringify({email:e})});if(!n.ok){let e=await n.json();throw Error(e.error||`Failed to set email with status code ${n.status}.`)}return await(await n.json())?.success}async function b(){let e=await l(),t=await fetch(`http://localhost:10000/api/auride/downloadUserData`,{method:`GET`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${e}`}});if(!t.ok)throw Error(`Failed to download user data: ${t.status}`);return await(await t.json())?.success}async function x(){let e=await l(),t=await fetch(`http://localhost:10000/api/auride/deleteAccount`,{method:`DELETE`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${e}`}});if(!t.ok)throw Error(`Failed to download user data: ${t.status}`);return await(await t.json())?.success}function S(){return new Promise((e,t)=>{let n=document.createElement(`dialog`);n.innerHTML=`
            <h2>
                ${r(`solid`,`palette`).outerHTML} Change Theme 
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
        `,n.className=`changeThemePopup`,document.getElementById(`app`).appendChild(n);let i=n.querySelector(`.closePopup`);i.onclick=()=>{a(),e(!1)};function a(){let e=document.getElementById(`app`).querySelector(`.changeThemePopup`);e&&e.close()}n.showModal()})}async function C(){let e=await n();if(!e){i(`/home`);return}let t=document.createElement(`div`),a=await s(`images/pfp/${e.uid}/${e.pfp}`),o;o=e.banner?await s(`images/banner/${e.uid}/${e.banner}`):`/assets/imgs/Transparency.png`,t.innerHTML=`
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
                        <img src="${o}" class="userBanner" draggable="false" />
                        <img src="${a}" class="userPfp" draggable="false" />
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
    `,document.title=`Settings | Auride`;let c=t.querySelectorAll(`.tabs > a`),l=t.querySelectorAll(`.settingsContainer > .tab`);c.forEach(e=>{e.onclick=()=>{c.forEach(e=>{e.classList.remove(`active`)}),l.forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`);let n=[...e.classList].find(e=>e!==`active`);t.querySelector(`.settingsContainer .tab.${n}`)?.classList.add(`active`)}});let _=t.querySelector(`.changePfp`),C=t.querySelector(`#pfpFileInput`),w=t.querySelector(`.errorTxt.pfpBanner`);_.onclick=async()=>{C.click()},C.addEventListener(`change`,async()=>{if(C.files.length>0){w.style.display=`none`;try{if(await p(C.files[0])){let e=t.querySelector(`.userPfp`),n=document.querySelector(`#headerUserPfp`),r=URL.createObjectURL(C.files[0]);e.src=r,n.src=r}}catch(e){w.style.display=`block`,w.textContent=e.message}}});let T=t.querySelector(`.changeBanner`),E=t.querySelector(`#bannerFileInput`);T.onclick=async()=>{E.click()},E.addEventListener(`change`,async()=>{if(E.files.length>0){E.style.display=`none`;try{if(await g(E.files[0])){let e=t.querySelector(`.userBanner`);e.src=URL.createObjectURL(E.files[0])}}catch(e){w.style.display=`block`,w.textContent=e.message}}});let D={displayNameInput:{maxLength:25,charLimitDisplay:`#displayNameCharLimit`,errorTxtDisplay:`.errorTxt.displayName`,saveBtnDisplay:`.saveBtn.display`,userDataValue:`display`,savingText:`Setting display name...`,save:d},usernameInput:{maxLength:20,charLimitDisplay:`#usernameCharLimit`,errorTxtDisplay:`.errorTxt.username`,saveBtnDisplay:`.saveBtn.username`,userDataValue:`username`,savingText:`Setting username...`,save:f},pronounsInput:{maxLength:15,charLimitDisplay:`#pronounsCharLimit`,errorTxtDisplay:`.errorTxt.pronouns`,saveBtnDisplay:`.saveBtn.pronouns`,userDataValue:`pronouns`,savingText:`Setting pronouns...`,save:m},bioInput:{maxLength:500,charLimitDisplay:`#bioCharLimit`,errorTxtDisplay:`.errorTxt.bio`,saveBtnDisplay:`.saveBtn.bio`,userDataValue:`bio`,savingText:`Setting bio...`,save:h},emailInput:{maxLength:9999,charLimitDisplay:null,errorTxtDisplay:`.errorTxt.email`,saveBtnDisplay:`.saveBtn.email`,savingText:`Requesting email change...`,save:v}};document.addEventListener(`input`,t=>{let n=t.target,r=D[n.id];if(!r)return;let i=document.querySelector(r.charLimitDisplay),a=n.value.length;i&&(i.textContent=`${a}/${r.maxLength}`),a>r.maxLength&&(n.value=n.value.slice(0,r.maxLength),i.textContent=`${r.maxLength}/${r.maxLength}`);let o=document.querySelector(r.saveBtnDisplay);n.value.trim()!==``&&n.value.trim()!==e?.[r.userDataValue]?o.style.display=`block`:o.style.display=`none`});for(let[e,n]of Object.entries(D)){let i=t.querySelector(`#${e}`),a=t.querySelector(n.saveBtnDisplay),o=t.querySelector(n.errorTxtDisplay),s=!1;a.onclick=async()=>{if(!s)try{s=!0,a.classList.add(`working`),o.textContent=``,o.classList.remove(`success`),a.innerHTML=`${r(`solid`,`circle-notch`,`spin`).outerHTML} ${n.savingText}`,await n.save(i.value)&&e===`emailInput`&&(await y(i.value),o.textContent=`Email changed successfully!`,o.classList.add(`success`))}catch(e){o.textContent=e.message}finally{s=!1,a.classList.remove(`working`),a.innerHTML=`Save`,a.style.display=`none`}}}let O=t.querySelector(`.sendPasswordReset`),k=t.querySelector(`.errorTxt.password`),A=!1;O.onclick=async()=>{if(!A){A=!0,k.textContent=``;try{O.innerHTML=`${r(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,u()}catch(e){k.textContent=e.message}finally{O.innerHTML=`Send Password Reset Email`,A=!1}}};let j=t.querySelector(`.dataNPrivacyBtn`),M=t.querySelector(`.errorTxt.dataNPrivacy`),N=!1;j.onclick=async()=>{if(!N){N=!0,M.textContent=``;try{if(await v()){let e=await b();if(e){let t=JSON.stringify(e,null,4),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`auride-data.json`,i.click(),URL.revokeObjectURL(r)}}}catch(e){M.textContent=e.message}}};let P=t.querySelector(`.deleteAccountBtn`);t.querySelector(`.errorTxt.deleteAccount`);let F=!1;P.onclick=async()=>{F||(F=!0,await v()&&(await x(),window.location.replace(`/home`)))};let I=t.querySelector(`.selectTheme`);return I.onclick=async()=>{S()},t}export{C as default};