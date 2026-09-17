import{c as e,d as t,f as n,p as r,v as i}from"./main-DTcKo8qw.js";import{t as a}from"./timeAgo-CboaNw7Q.js";async function o(){document.title=`Achievements | Auride`;let o=document.createElement(`div`);o.innerHTML=`
        <h2>Your Achievements</h2>
        <p class="description">Interact across Auride and unlock achievements!</p>

        <div id="allAchievementsDiv">
            <!-- achievements are dynamically added here -->
        </div>
        <p>and more achievements coming soon!</p>
    `;let s=await r();if(!s){t(`/home`);return}let c=await n,l=await e,u=o.querySelector(`#allAchievementsDiv`),d=document.createDocumentFragment();return Object.entries(l).forEach(async([e,t])=>{let n=document.createElement(`div`);n.className=`achievementDiv`,n.innerHTML=`
            <h3 class="achievementName">${i(`solid`,t.icon).outerHTML} ${t.fancyName}</h3>
            <p class="achievementDesc">Loading...</p>
            <p class="achievementUnlocked description">Loading...</p>
        `;let r=n.querySelector(`.achievementDesc`),o=n.querySelector(`.achievementUnlocked`);if(c.has(e)){let n=s.achievements?.transsocial?.[e];console.log(n),r.textContent=t.description,o.textContent=`Unlocked ${a(n?.unlockedWhen,`verbose`)}`}else r.textContent=`Unlock this achievement to see its description.`,o.textContent=`Not unlocked`,n.classList.add(`notUnlocked`);d.appendChild(n)}),u.appendChild(d),o}export{o as default};