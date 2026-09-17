import{l as e,n as t,o as n}from"./router-fU7goLPj.js";import{r}from"./index-BBeCNjCH.js";import{t as i}from"./resetPassword-CTO0pnEd.js";async function a(e,r){if(!e||!r)throw Error(`You're missing the email or password to login.`);try{await n.signInWithEmailAndPassword(e,r),t(`/home`),window.location.reload()}catch(e){let t=e.message.replace(/^Firebase:\s*/,``);throw Error(t)}}async function o(){document.title=`Login | Auride`;let n=document.createElement(`div`);if(n.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${e(`solid`,`right-to-bracket`).outerHTML} Login to Auride</h1>
                <p class="description">Welcome back to Auride! <a href="/auth/register">Don't have an account?</a></p>
            </div>
            <div class="form">
                <input type="email" id="email" placeholder="Enter your email address" />
                <input type="password" id="password" placeholder="Enter your password" />
                <p class="errorTxt caution"></p>
                <button class="authBtn">${e(`solid`,`right-to-bracket`).outerHTML} Login</button>
            </div>
            <div class="additionalOptions">
                <a href="javascript:void(0);" class="showPasswordBtn">${e(`solid`,`eye`).outerHTML} Show Password</a>
                <a href="javascript:void(0);" class="resetPasswordBtn">${e(`solid`,`unlock`).outerHTML} Reset Password</a>
            </div>
        </div>
    `,await r()){t(`/home`);return}let o=!1,s=n.querySelector(`#password`),c=n.querySelector(`.showPasswordBtn`);c.onclick=()=>{o?(o=!1,s.type=`password`,c.innerHTML=`${e(`solid`,`eye`).outerHTML} Show Password`):(o=!0,s.type=`text`,c.innerHTML=`${e(`solid`,`eye-slash`).outerHTML} Hide Password`)};let l=n.querySelector(`#email`);l.addEventListener(`keydown`,e=>{e.key===`Enter`&&s.focus()}),s.addEventListener(`keydown`,e=>{e.key===`Enter`&&m(l.value,s.value)});let u=n.querySelector(`.authBtn`);u.onclick=()=>m(l.value,s.value);function d(t){switch(t){case`working`:u.innerHTML=`${e(`solid`,`circle-notch`,`spin`).outerHTML} Logging in...`;break;case`notWorking`:u.innerHTML=`${e(`solid`,`right-to-bracket`).outerHTML} Login`;break;default:break}}let f=!1,p=n.querySelector(`.errorTxt`);async function m(e,t){if(!f){f=!0,d(`working`);try{await a(e,t)}catch(e){p.textContent=e.message,f=!1,d(`notWorking`)}}}let h=n.querySelector(`.resetPasswordBtn`);return h.onclick=()=>{i()},n}export{o as default};