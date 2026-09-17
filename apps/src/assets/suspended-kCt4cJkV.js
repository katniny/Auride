import{i as e,l as t,n}from"./router-CC3EAHV2.js";import{l as r}from"./index-BjBKTcKe.js";async function i(){let i=await e();(!i?.suspended||i?.suspended?.suspended)&&n(`/`);let a=document.createElement(`div`);return a.innerHTML=`
        <img src="${await r(`images/pfp/${i.uid}/${i.pfp}`)}" class="userPfp" draggable="false" />
        <h1 class="suspensionNotice">${t(`solid`,`triangle-exclamation`).outerHTML} We suspended your account, ${i.display}</h1>
        
        <div class="divider"></div>

        <h2>What does this mean?</h2>
        <div class="suspensionWdtm">
            ${t(`solid`,`triangle-exclamation`).outerHTML}
            Your account violated one of our policies.
        </div>
        <div class="suspensionWdtm">
            ${t(`solid`,`ban`).outerHTML}
            Your account has been disabled, and cannot be used.
        </div>
        <div class="suspensionWdtm">
            ${t(`solid`,`lock`).outerHTML}
            Your profile, notes, and themes are not visible on Auride.
        </div>

        <div class="divider"></div>

        <h2>Why?</h2>
        <div class="suspensionWdtm">
            ${t(`solid`,`question`).outerHTML}
            ${i?.suspended?.suspensionNotes?.reason||`No reason provided.`}
        </div>
        
        <div class="divider"></div>

        <h2>When will my account be unsuspended?</h2>
        <div class="suspensionWdtm">
            ${t(`solid`,`calendar`).outerHTML}
            ${i?.suspended?.suspensionNotes?.expiration||`No expiration provided.`}
        </div>
    `,document.title=`Suspended | Auride`,a}export{i as default};