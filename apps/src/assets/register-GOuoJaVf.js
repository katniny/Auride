import{i as e,l as t,n}from"./router-fU7goLPj.js";import{t as r}from"./register-Cgjryg5g.js";async function i(){document.title=`Register | Auride`;let i=document.createElement(`div`);i.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${t(`solid`,`right-to-bracket`).outerHTML} Register</h1>
                <p class="description">Welcome to Auride! <a href="/auth/login">Already have an account?</a></p>
            </div>
            <div class="form">
                <input type="email" id="email" placeholder="Enter your email address" />
                <input type="password" id="password" placeholder="Enter your password" />
                <p class="errorTxt caution"></p>
                <button class="authBtn">${t(`solid`,`right-to-bracket`).outerHTML} Register</button>
            </div>
            <div class="additionalOptions">
                <a href="javascript:void(0);" class="showPasswordBtn">${t(`solid`,`eye`).outerHTML} Show Password</a>
            </div>
        </div>
    `;let a=await e();if(a&&a?.display!==`Deleted user`||a&&a?.username!==`ghost`){n(`/auth/names`);return}if(a&&!a?.pfp){n(`/auth/pfp`);return}if(a&&a.pfp&&a.display&&a.username){n(`/home`);return}let o=!1,s=i.querySelector(`#password`),c=i.querySelector(`.showPasswordBtn`);c.onclick=()=>{o?(o=!1,s.type=`password`,c.innerHTML=`${t(`solid`,`eye`).outerHTML} Show Password`):(o=!0,s.type=`text`,c.innerHTML=`${t(`solid`,`eye-slash`).outerHTML} Hide Password`)};let l=i.querySelector(`#email`);l.addEventListener(`keydown`,e=>{e.key===`Enter`&&s.focus()}),s.addEventListener(`keydown`,e=>{e.key===`Enter`&&m(l.value,s.value)});let u=i.querySelector(`.authBtn`);u.onclick=()=>m(l.value,s.value);function d(e){switch(e){case`working`:u.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Registering...`;break;case`notWorking`:u.innerHTML=`${t(`solid`,`right-to-bracket`).outerHTML} Register`;break;default:break}}let f=!1,p=i.querySelector(`.errorTxt`);async function m(e,t){if(!f){f=!0,d(`working`);try{await r(e,t)}catch(e){p.textContent=e.message,f=!1,d(`notWorking`)}}}return i}export{i as default};