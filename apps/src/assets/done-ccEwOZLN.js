import{i as e,l as t,n}from"./router-CC3EAHV2.js";async function r(){if(!await e()){n(`/auth/register`);return}document.title=`Thanks for signing up! | Auride`;let r=document.createElement(`div`);return r.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${t(`solid`,`handshake`).outerHTML} Welcome to Auride!</h1>
                <p class="description">Change your settings, discover themes, or you can go straight to the home page to say hi!</p>
            </div>
            <div class="form">
                <a href="/home"><button class="fullWidth">${t(`solid`,`house`).outerHTML} Go to Home</button></a>
                <a href="/settings"><button class="fullWidth">${t(`solid`,`gear`).outerHTML} Change My Settings</button></a>
                <a href="/userstudio"><button class="fullWidth">${t(`solid`,`palette`).outerHTML} Discover User Themes</button></a>
            </div>
        </div>
    `,r}export{r as default};