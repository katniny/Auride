import{i as e,l as t,n,r}from"./router-CC3EAHV2.js";import{t as i}from"./achievementDefs-_BaCGXfp.js";import{t as a}from"./timeAgo-C2OJNZNV.js";async function o(){document.title=`Achievements | Auride`;let o=document.createElement(`div`);o.innerHTML=`
        <h2>Your Achievements</h2>
        <p class="description">Interact across Auride and unlock achievements!</p>

        <div id="allAchievementsDiv">
            <!-- achievements are dynamically added here -->
        </div>
        <p>and more achievements coming soon!</p>
    `;let s=await e();if(!s){n(`/home`);return}let c=await r,l=await i,u=o.querySelector(`#allAchievementsDiv`),d=document.createDocumentFragment();return Object.entries(l).forEach(async([e,n])=>{let r=document.createElement(`div`);r.className=`achievementDiv`,r.innerHTML=`
            <h3 class="achievementName">${t(`solid`,n.icon).outerHTML} ${n.fancyName}</h3>
            <p class="achievementDesc">Loading...</p>
            <p class="achievementUnlocked description">Loading...</p>
        `;let i=r.querySelector(`.achievementDesc`),o=r.querySelector(`.achievementUnlocked`);if(c.has(e)){let t=s.achievements?.transsocial?.[e];console.log(t),i.textContent=n.description,o.textContent=`Unlocked ${a(t?.unlockedWhen,`verbose`)}`}else i.textContent=`Unlock this achievement to see its description.`,o.textContent=`Not unlocked`,r.classList.add(`notUnlocked`);d.appendChild(r)}),u.appendChild(d),o}export{o as default};