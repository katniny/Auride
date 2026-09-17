import{i as e}from"./router-fU7goLPj.js";import{a as t,i as n,n as r}from"./index-BBeCNjCH.js";import{t as i}from"./getNotes-CC5MzuZS.js";async function a(){let a=await e(),o,s=new Date().getHours(),c=e=>e>=5&&e<8?`Good early morning`:e>=8&&e<12?`Good morning`:e>=12&&e<17?`Good afternoon`:e>=17&&e<20?`Good evening`:e>=21&&e<24?`Good late night`:`Have a good night`;o=a?`${c(s)}, ${t(a.display,[`html`,`emoji`])}!`:`${c(s)}!`;let l=a?`What's on your mind, ${t(a.display,[`html`,`emoji`])}?`:`What's on your mind?`;document.title=`Auride`;let u=document.createElement(`div`);u.innerHTML=`
        <div class="greeting">
            <h2 class="time">${o}</h2>
            <p class="versionString description">${r}</p>
            <div class="sendNoteQuick">
                ${l}
            </div>
        </div>
        <div id="notes"></div>
    `;let d=u.querySelector(`.sendNoteQuick`);return d.onclick=()=>n(),i(),u}export{a as default};