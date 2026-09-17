import{d as e,f as t,i as n,o as r,p as i,s as a,t as o,u as s,v as c}from"./main-DTcKo8qw.js";import{t as l}from"./getNotes-Cp-7O4Ke.js";import{n as u}from"./getNoteData-BcVqvyiu.js";function d(e){let t=document.createElement(`dialog`);t.innerHTML=`
        <h2>
            ${c(`solid`,`dove`).outerHTML} Remembering ${n(e,[`html`,`emoji`])}
        </h2>
        <p class="description">
            This account has been memorialized. <a href="/blog/memorialized-accounts">Memorialized accounts</a>
            are a way to honor and remember someone's life after they've passed away, keeping their memory alive
            within our community.
        </p>

        <br />

        <p class="description">
            If you're struggling, please know you're not alone. You matter and there are people who care about you.
            <a href="/resources/suicide-prevention">Click here for suicide prevention resources</a> and support, or reach out to
            someone you trust.
        </p>

        <br />

        <button class="closePopup">May ${n(e,[`html`,`emoji`])} Rest in Peace</button>
    `,t.className=`deceasedUserPopup`,document.getElementById(`app`).appendChild(t);let r=t.querySelector(`.closePopup`);r.onclick=()=>f(),t.showModal()}function f(){let e=document.getElementById(`app`).querySelector(`.deceasedUserPopup`);e&&e.close()}async function p(e,n){if(!e)throw Error(`Attempted to follow user without an identifier. Please get a UID or username!`);if(!n)throw Error(`Attempted to follow user without an ID type.`);let i=await r();if(!i)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let s=await o(`http://localhost:10000/api/auride/followUser`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${i}`,userIdentifier:e,reqType:n}});if(!s.ok)throw Error(`Failed to follow user: ${s.status}`);let c=await s.json();return c?.achievement?.theSocialButterfly&&!t.has(`theSocialButterfly`)&&a(`theSocialButterfly`,c?.achievement?.theSocialButterfly?.unlockedWhen),await c?.returnedStatus}async function m(t){let r=await u(t.id,`username`),a=await i();if(console.log(r),!r){console.error(`:(`);return}let o=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],f=new Date(r.joinedAt),m=o[f.getMonth()],h=f.getFullYear();l();let g;g=r.banner?await s(`images/banner/${r.uid}/${r.banner}`):`/assets/imgs/Transparency.png`;let _;_=r.pronouns?`@${r.username} • ${r.pronouns}`:`@${r.username}`;let v=document.createElement(`div`),y=await s(`images/pfp/${r.uid}/${r.pfp}`);v.innerHTML=`
        <div class="profileContainer">
            <img src="${g}" class="userBanner" draggable="false" />
            <img src="${y}" class="userPfp" draggable="false" />
            <div class="detailsRow">
                <div class="nonImageDetails">
                    <h2 class="displayName">${n(r.display,[`html`,`emoji`])}</h2>
                    <p class="username description">${_}</p>
                    <p class="bio">${n(r.bio)}</p>
                    <!-- TODO: make these clickable so you can see the users following/followers -->
                    <div class="followCounts">
                        <span class="followers description"><b>${r.followers}</b> Followers</span>
                        •
                        <span class="following description"><b>${r.following}</b> Following</span>
                    </div>
                    <p class="joinedDate description">${c(`solid`,`calendar`).outerHTML} Joined ${m} ${h}</p>
                </div>
                <div class="additionalInteractions">
                    <button class="moreInteractions">${c(`solid`,`ellipsis`).outerHTML}</button>
                    <button class="followBtn">Follow</button>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div id="notes"></div>
    `,document.title=`${r.display} (@${r.username}) on Auride`;let b=v.querySelector(`.displayName`);r.isVerified&&(b.innerHTML+=`<span class="badge">${c(`solid`,`circle-check`).outerHTML}</span>`),r.activeContributor&&(b.innerHTML+=`<span class="badge">${c(`solid`,`handshake-angle`).outerHTML}</span>`),r.isSubscribed&&(b.innerHTML+=`<span class="badge">${c(`solid`,`heart`).outerHTML}</span>`);let x=v.querySelector(`.followBtn`),S=null;function C(){console.log(`SIJFUOIASJFAS`),S!==`self`&&(S?x.innerHTML=`${c(`solid`,`user-check`).outerHTML} Following`:x.innerHTML=`${c(`solid`,`user-plus`).outerHTML} Follow`)}a&&a.uid===r.uid?(x.innerHTML=`${c(`solid`,`user-pen`).outerHTML} Edit Profile`,x.onclick=()=>e(`/settings`),S=`self`):a&&a.followingWho&&a.followingWho[r.uid]?(r.memorialAccount.isDeceased?(x.innerHTML=`${c(`solid`,`user-check`).outerHTML} Cannot Unfollow`,x.onclick=()=>null):(x.innerHTML=`${c(`solid`,`user-check`).outerHTML} Following`,x.onclick=()=>{S=!1,p(r.uid,`uid`).catch(e=>{S=!0,C()}),C()}),x.classList.add(`following`)):r.memorialAccount.isDeceased?(x.innerHTML=`${c(`solid`,`user-plus`).outerHTML} Cannot Follow`,x.onclick=()=>null):(x.innerHTML=`${c(`solid`,`user-plus`).outerHTML} Follow`,x.onclick=()=>{S=!0,p(r.uid,`uid`).catch(e=>{S=!1,C()}),C()});let w=v.querySelector(`.nonImageDetails`);if(r.memorialAccount.isDeceased){if(w.innerHTML+=`
            <p class="deceased description">
                ${c(`solid`,`dove`).outerHTML} May ${n(r.display,[`html`,`emoji`])} rest in peace.
            </p>
        `,r.memorialAccount.obituary){let e=v.querySelector(`.deceased`);e.innerHTML+=`
                <span class="description">
                    They have an obituary which you <a href="${r.memorialAccount.obituary}" target="_blank">can view</a>.
                </span>
            `}d(r.display)}return v}export{m as default};