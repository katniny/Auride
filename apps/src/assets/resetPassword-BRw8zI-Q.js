import{h as e,v as t}from"./main-DTcKo8qw.js";function n(){let n=document.createElement(`dialog`);n.innerHTML=`
        <h2>
            ${t(`solid`,`unlock`).outerHTML} Reset Password 
        </h2>
        <p class="description">
            Forgot your password? Enter your email, and we'll send you a password reset email.
        </p>

        <br />

        <input type="email" id="emailPasswordReset" placeholder="Enter your email address" />
        <p class="errorText caution"></p>

        <br />

        <button class="sendPwdReset">Send Password Reset Email</button>
        <button class="closePopup">Nevermind</button>
    `,n.className=`resetPasswordPopup`,document.getElementById(`app`).appendChild(n);function i(e){console.log(o),e===`working`?(o.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(o)):o.innerHTML=`Send Password Reset Email`}let a=!1,o=n.querySelector(`.sendPwdReset`);o.onclick=()=>{if(a)return;a=!0,i(`working`),c(``,`caution`);let t=n.querySelector(`#emailPasswordReset`);if(t.value.trim()===``){c(`We need an email address to send the password reset to.`,`caution`),i(),a=!1;return}e.sendPasswordResetEmail(t.value).then(()=>{c(`Password reset email sent! Check your inbox.`,`success`)}).catch(e=>{c(e.message,`caution`)}).finally(()=>{a=!1,i()})};let s=`caution`;function c(e,t){let r=n.querySelector(`.errorText`);r.textContent=e,r.classList.remove(s),r.classList.add(t),s=t}let l=n.querySelector(`.closePopup`);l.onclick=()=>{a||r()},n.showModal()}function r(){let e=document.getElementById(`app`).querySelector(`.resetPasswordPopup`);e&&e.close()}export{n as t};