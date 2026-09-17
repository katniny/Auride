import{t as e}from"./index-BBeCNjCH.js";async function t(e){try{let t=await(await fetch(`/updates.jsonc`)).json();return t[e]==null?!1:t[e]}catch(e){return e}}function n(e){let t=document.createElement(`h3`);return t.textContent=`There are no any ${e||`...unknown update version...`} versions yet. We're working to get there!`,t.className=`noUpdatesAvailableText`,t}async function r(){document.title=`Updates | Auride`;let r=document.createElement(`div`);r.innerHTML=`
        <h3>Filter Version:</h3>
        <div class="filterVersionButtons">
            <button class="filterVersion indev">Indev</button>
            <button class="filterVersion prealpha">Pre-Alpha</button>
            <button class="filterVersion alpha">Alpha</button>
            <button class="filterVersion beta">Beta</button>
            <button class="filterVersion prerelease">Pre-Release</button>
            <button class="filterVersion release">Release</button>
        </div>

        <!-- dont worry about filling these. they're automatically filled by updates.jsonc -->
        <div class="changes indev"></div>
        <div class="changes prealpha"></div>
        <div class="changes alpha"></div>
        <div class="changes beta"></div>
        <div class="changes prerelease"></div>
        <div class="changes release"></div>
    `;async function i(e){let i=r.querySelector(`.filterVersionButtons button.${e}`);i&&i.classList.add(`active`);let a=r.querySelector(`div.changes.${e}`);a&&a.classList.add(`active`);let o=await t(e);if(!o||!o?.anyUpdatesAvailable){a.appendChild(n(e));return}for(let[t,n]of Object.entries(o)){if(t===`anyUpdatesAvailable`)continue;let i=document.createElement(`div`);i.className=`update`,i.innerHTML=`
                <h2>${t}-${e}</h2>
                <h3 class="releasedDate">Released on ${n.released}</h3>
                <div class="divider"></div>
            `;for(let[e,t]of Object.entries(n)){let n=document.createElement(`div`);if(n.innerHTML=`
                    <li class="${e} change">${t.text}</li>
                `,t.notUserFacingChange){let t=n.querySelector(`.${e}`),r=document.createElement(`span`);r.className=`devEnv`,r.textContent=`(Dev Env) `,t.prepend(r)}t.subtext&&(n.innerHTML+=`
                        <li class="subtext">${t.subtext}</li>
                    `),t.text!==void 0&&i.appendChild(n)}r.appendChild(i)}}i(e);let a=r.querySelectorAll(`.filterVersion`);for(let e of a)e.addEventListener(`click`,()=>{let t=r.querySelectorAll(`.update`);for(let e of t)e.remove();let n=r.querySelectorAll(`.noUpdatesAvailableText`);for(let e of n)e.remove();let a=r.querySelectorAll(`.changes`);for(let e of a)e.classList.remove(`active`);let o=r.querySelectorAll(`.filterVersion`);for(let e of o)e.classList.remove(`active`);i(e.classList[1])});return r}export{r as default};