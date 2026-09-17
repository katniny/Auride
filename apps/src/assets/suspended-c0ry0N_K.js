import{d as e,p as t,u as n,v as r}from"./main-DTcKo8qw.js";async function i(){let i=await t();(!i?.suspended||i?.suspended?.suspended)&&e(`/`);let a=document.createElement(`div`);return a.innerHTML=`
        <img src="${await n(`images/pfp/${i.uid}/${i.pfp}`)}" class="userPfp" draggable="false" />
        <h1 class="suspensionNotice">${r(`solid`,`triangle-exclamation`).outerHTML} We suspended your account, ${i.display}</h1>
        
        <div class="divider"></div>

        <h2>What does this mean?</h2>
        <div class="suspensionWdtm">
            ${r(`solid`,`triangle-exclamation`).outerHTML}
            Your account violated one of our policies.
        </div>
        <div class="suspensionWdtm">
            ${r(`solid`,`ban`).outerHTML}
            Your account has been disabled, and cannot be used.
        </div>
        <div class="suspensionWdtm">
            ${r(`solid`,`lock`).outerHTML}
            Your profile, notes, and themes are not visible on Auride.
        </div>

        <div class="divider"></div>

        <h2>Why?</h2>
        <div class="suspensionWdtm">
            ${r(`solid`,`question`).outerHTML}
            ${i?.suspended?.suspensionNotes?.reason||`No reason provided.`}
        </div>
        
        <div class="divider"></div>

        <h2>When will my account be unsuspended?</h2>
        <div class="suspensionWdtm">
            ${r(`solid`,`calendar`).outerHTML}
            ${i?.suspended?.suspensionNotes?.expiration||`No expiration provided.`}
        </div>
    `,document.title=`Suspended | Auride`,a}export{i as default};