import{d as e,h as t,n,v as r}from"./main-DTcKo8qw.js";import{t as i}from"./resetPassword-BRw8zI-Q.js";async function a(n,r){if(!n||!r)throw Error(`You're missing the email or password to login.`);try{await t.signInWithEmailAndPassword(n,r),e(`/home`),window.location.reload()}catch(e){let t=e.message.replace(/^Firebase:\s*/,``);throw Error(t)}}async function o(){document.title=`Login | Auride`;let t=document.createElement(`div`);if(t.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${r(`solid`,`right-to-bracket`).outerHTML} Login to Auride</h1>
                <p class="description">Welcome back to Auride! <a href="/auth/register">Don't have an account?</a></p>
            </div>
            <div class="form">
                <input type="email" id="email" placeholder="Enter your email address" />
                <input type="password" id="password" placeholder="Enter your password" />
                <p class="errorTxt caution"></p>
                <button class="authBtn">${r(`solid`,`right-to-bracket`).outerHTML} Login</button>
            </div>
            <div class="additionalOptions">
                <a href="javascript:void(0);" class="showPasswordBtn">${r(`solid`,`eye`).outerHTML} Show Password</a>
                <a href="javascript:void(0);" class="resetPasswordBtn">${r(`solid`,`unlock`).outerHTML} Reset Password</a>
            </div>
        </div>
    `,await n()){e(`/home`);return}let o=!1,s=t.querySelector(`#password`),c=t.querySelector(`.showPasswordBtn`);c.onclick=()=>{o?(o=!1,s.type=`password`,c.innerHTML=`${r(`solid`,`eye`).outerHTML} Show Password`):(o=!0,s.type=`text`,c.innerHTML=`${r(`solid`,`eye-slash`).outerHTML} Hide Password`)};let l=t.querySelector(`#email`);l.addEventListener(`keydown`,e=>{e.key===`Enter`&&s.focus()}),s.addEventListener(`keydown`,e=>{e.key===`Enter`&&m(l.value,s.value)});let u=t.querySelector(`.authBtn`);u.onclick=()=>m(l.value,s.value);function d(e){switch(e){case`working`:u.innerHTML=`${r(`solid`,`circle-notch`,`spin`).outerHTML} Logging in...`;break;case`notWorking`:u.innerHTML=`${r(`solid`,`right-to-bracket`).outerHTML} Login`;break;default:break}}let f=!1,p=t.querySelector(`.errorTxt`);async function m(e,t){if(!f){f=!0,d(`working`);try{await a(e,t)}catch(e){p.textContent=e.message,f=!1,d(`notWorking`)}}}let h=t.querySelector(`.resetPasswordBtn`);return h.onclick=()=>{i()},t}export{o as default};