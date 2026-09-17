import{t as e}from"./main-DTcKo8qw.js";import{t}from"./versioning-CME6rGrq.js";async function n(t){try{let n=await(await e(`/updates.jsonc`)).json();return n[t]==null?!1:n[t]}catch(e){return e}}function r(e){let t=document.createElement(`h3`);return t.textContent=`There are no any ${e||`...unknown update version...`} versions yet. We're working to get there!`,t.className=`noUpdatesAvailableText`,t}async function i(){document.title=`Updates | Auride`;let e=document.createElement(`div`);e.innerHTML=`
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
    `;async function i(t){let i=e.querySelector(`.filterVersionButtons button.${t}`);i&&i.classList.add(`active`);let a=e.querySelector(`div.changes.${t}`);a&&a.classList.add(`active`);let o=await n(t);if(!o||!o?.anyUpdatesAvailable){a.appendChild(r(t));return}for(let[n,r]of Object.entries(o)){if(n===`anyUpdatesAvailable`)continue;let i=document.createElement(`div`);i.className=`update`,i.innerHTML=`
                <h2>${n}-${t}</h2>
                <h3 class="releasedDate">Released on ${r.released}</h3>
                <div class="divider"></div>
            `;for(let[e,t]of Object.entries(r)){let n=document.createElement(`div`);if(n.innerHTML=`
                    <li class="${e} change">${t.text}</li>
                `,t.notUserFacingChange){let t=n.querySelector(`.${e}`),r=document.createElement(`span`);r.className=`devEnv`,r.textContent=`(Dev Env) `,t.prepend(r)}t.subtext&&(n.innerHTML+=`
                        <li class="subtext">${t.subtext}</li>
                    `),t.text!==void 0&&i.appendChild(n)}e.appendChild(i)}}i(t);let a=e.querySelectorAll(`.filterVersion`);for(let t of a)t.addEventListener(`click`,()=>{let n=e.querySelectorAll(`.update`);for(let e of n)e.remove();let r=e.querySelectorAll(`.noUpdatesAvailableText`);for(let e of r)e.remove();let a=e.querySelectorAll(`.changes`);for(let e of a)e.classList.remove(`active`);let o=e.querySelectorAll(`.filterVersion`);for(let e of o)e.classList.remove(`active`);i(t.classList[1])});return e}export{i as default};