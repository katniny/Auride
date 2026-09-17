import{l as e,o as t}from"./router-CC3EAHV2.js";function n(){let n=document.createElement(`dialog`);n.innerHTML=`
        <h2>
            ${e(`solid`,`unlock`).outerHTML} Reset Password 
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
    `,n.className=`resetPasswordPopup`,document.getElementById(`app`).appendChild(n);function i(t){console.log(o),t===`working`?(o.innerHTML=`${e(`solid`,`circle-notch`,`spin`).outerHTML} Working...`,console.log(o)):o.innerHTML=`Send Password Reset Email`}let a=!1,o=n.querySelector(`.sendPwdReset`);o.onclick=()=>{if(a)return;a=!0,i(`working`),c(``,`caution`);let e=n.querySelector(`#emailPasswordReset`);if(e.value.trim()===``){c(`We need an email address to send the password reset to.`,`caution`),i(),a=!1;return}t.sendPasswordResetEmail(e.value).then(()=>{c(`Password reset email sent! Check your inbox.`,`success`)}).catch(e=>{c(e.message,`caution`)}).finally(()=>{a=!1,i()})};let s=`caution`;function c(e,t){let r=n.querySelector(`.errorText`);r.textContent=e,r.classList.remove(s),r.classList.add(t),s=t}let l=n.querySelector(`.closePopup`);l.onclick=()=>{a||r()},n.showModal()}function r(){let e=document.getElementById(`app`).querySelector(`.resetPasswordPopup`);e&&e.close()}export{n as t};