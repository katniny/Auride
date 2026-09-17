import{a as e,l as t}from"./router-CC3EAHV2.js";import{t as n}from"./checkFileType-BmvIHc4A.js";import{o as r}from"./index-BjBKTcKe.js";async function i(i){if(!i)throw Error(`No profile picture given.`);let o=await n(i);if(!o||o!==`img`)throw Error(`Auride only accepts images as profile pictures!`);let s=document.createElement(`dialog`);s.innerHTML=`
        <!-- TODO: add image cropping -->
        <h2>
            ${t(`solid`,`images`).outerHTML} Upload Profile Picture 
        </h2>
        <p class="description">
            Does this look okay to you? If so, we'll upload it and make it your profile picture
            across Auride.
        </p>
        <p class="description">Note: You can't crop images yet, but it is a planned feature for the very near future.</p>

        <br />

        <img src="${URL.createObjectURL(i)}" class="accurateAuridePfp" draggable="false" />
        <p class="errorText caution"></p>

        <br />

        <button class="setAsPfp">Set as Profile Picture</button>
        <button class="closePopup">Nevermind</button>
    `,s.className=`changePfpPopup`,document.getElementById(`app`).appendChild(s);function c(e){console.log(f),e===`working`?(f.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(f)):f.innerHTML=`Set as Profile Picture`}let l=`caution`;function u(e,t){let n=s.querySelector(`.errorText`);n.textContent=e,n.classList.remove(l),n.classList.add(t),l=t}s.showModal();let d=!1,f=s.querySelector(`.setAsPfp`);return new Promise((t,o)=>{f.onclick=async()=>{if(!d){d=!0,c(`working`),u(``,`caution`);try{let o=await n(i);if(!o||o!==`img`)throw Error(`Auride only accepts images as profile pictures!`);r(i,`pfp`,`uid`),a(),e.pfp=i.name,t(!0)}catch(e){u(e.message,`caution`),d=!1,c(`notWorking`)}}};let l=s.querySelector(`.closePopup`);l.onclick=()=>{d||(a(),t(!1))}})}function a(){let e=document.getElementById(`app`).querySelector(`.changePfpPopup`);e&&e.close()}export{i as t};