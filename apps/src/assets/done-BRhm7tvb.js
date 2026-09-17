import{d as e,p as t,v as n}from"./main-DTcKo8qw.js";async function r(){if(!await t()){e(`/auth/register`);return}document.title=`Thanks for signing up! | Auride`;let r=document.createElement(`div`);return r.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${n(`solid`,`handshake`).outerHTML} Welcome to Auride!</h1>
                <p class="description">Change your settings, discover themes, or you can go straight to the home page to say hi!</p>
            </div>
            <div class="form">
                <a href="/home"><button class="fullWidth">${n(`solid`,`house`).outerHTML} Go to Home</button></a>
                <a href="/settings"><button class="fullWidth">${n(`solid`,`gear`).outerHTML} Change My Settings</button></a>
                <a href="/userstudio"><button class="fullWidth">${n(`solid`,`palette`).outerHTML} Discover User Themes</button></a>
            </div>
        </div>
    `,r}export{r as default};