import{i as e,l as t,n}from"./router-CC3EAHV2.js";import"./register-BTdN5GSF.js";import{n as r,t as i}from"./setUsername-BxowIbFe.js";async function a(){document.title=`Choose your names | Auride`;let a=document.createElement(`div`);a.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${t(`solid`,`signature`).outerHTML} Names</h1>
                <p class="description">Choose how you'll be referred to on Auride.</p>
            </div>
            <div class="form">
                <input type="text" id="displayName" placeholder="Enter your display name" />
                <p class="description" id="displayNameCharLimit">0/25</p>

                <input type="text" id="newUsername" placeholder="Enter a username" />
                <p class="description" id="usernameCharLimit">0/20</p>

                <p class="errorTxt caution"></p>
                <button class="authBtn">${t(`solid`,`signature`).outerHTML} Choose Names</button>
            </div>
        </div>
    `,await e()||n(`/auth/register`),document.getElementById(`sidebar`)&&document.getElementById(`sidebar`).remove();let o=document.getElementById(`aurideHeaderLogo`).closest(`a`);o.href=`#`;let s=a.querySelector(`#displayName`),c=a.querySelector(`#newUsername`);s.addEventListener(`input`,e=>{s.value.length>25&&(s.value=s.value.slice(0,25));let t=a.querySelector(`#displayNameCharLimit`);t.textContent=`${s.value.length}/25`,e.key===`Enter`&&c.focus()}),c.addEventListener(`input`,e=>{c.value.length>20&&(c.value=c.value.slice(0,20));let t=a.querySelector(`#usernameCharLimit`);t.textContent=`${c.value.length}/20`,c.value=c.value.replace(/[^a-z 0-9 . _]/g,``),c.value=c.value.replace(/[ ]/g,``),e.key===`Enter`&&h(s.value,c.value)});let l=a.querySelector(`.authBtn`);l.onclick=()=>h(s.value,c.value);function u(e){switch(e){case`working`:l.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Checking...`;break;case`notWorking`:l.innerHTML=`${t(`solid`,`right-to-bracket`).outerHTML} Choose Names`;break;default:break}}let d=!1,f=!1,p=!1,m=a.querySelector(`.errorTxt`);async function h(){if(!d){m.style.display=`none`,d=!0,u(`working`);try{f=await r(s.value),p=await i(c.value)}catch(e){m.style.display=`block`,m.textContent=e.message}finally{d=!1,u(`notWorking`),console.log(f),console.log(p),f&&p&&n(`/auth/pfp`)}}}return a}export{a as default};