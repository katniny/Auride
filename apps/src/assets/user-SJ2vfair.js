import{i as e,l as t,n,r}from"./router-fU7goLPj.js";import{a as i,c as a,l as o,s}from"./index-BBeCNjCH.js";import{t as c}from"./getNotes-CC5MzuZS.js";import{n as l}from"./getNoteData-DuImo6l_.js";function u(e){let n=document.createElement(`dialog`);n.innerHTML=`
        <h2>
            ${t(`solid`,`dove`).outerHTML} Remembering ${i(e,[`html`,`emoji`])}
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

        <button class="closePopup">May ${i(e,[`html`,`emoji`])} Rest in Peace</button>
    `,n.className=`deceasedUserPopup`,document.getElementById(`app`).appendChild(n);let r=n.querySelector(`.closePopup`);r.onclick=()=>d(),n.showModal()}function d(){let e=document.getElementById(`app`).querySelector(`.deceasedUserPopup`);e&&e.close()}async function f(e,t){if(!e)throw Error(`Attempted to follow user without an identifier. Please get a UID or username!`);if(!t)throw Error(`Attempted to follow user without an ID type.`);let n=await s();if(!n)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let i=await fetch(`http://localhost:10000/api/auride/followUser`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${n}`,userIdentifier:e,reqType:t}});if(!i.ok)throw Error(`Failed to follow user: ${i.status}`);let o=await i.json();return o?.achievement?.theSocialButterfly&&!r.has(`theSocialButterfly`)&&a(`theSocialButterfly`,o?.achievement?.theSocialButterfly?.unlockedWhen),await o?.returnedStatus}async function p(r){let a=await l(r.id,`username`),s=await e();if(console.log(a),!a){console.error(`:(`);return}let d=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],p=new Date(a.joinedAt),m=d[p.getMonth()],h=p.getFullYear();c();let g;g=a.banner?await o(`images/banner/${a.uid}/${a.banner}`):`/assets/imgs/Transparency.png`;let _;_=a.pronouns?`@${a.username} • ${a.pronouns}`:`@${a.username}`;let v=document.createElement(`div`),y=await o(`images/pfp/${a.uid}/${a.pfp}`);v.innerHTML=`
        <div class="profileContainer">
            <img src="${g}" class="userBanner" draggable="false" />
            <img src="${y}" class="userPfp" draggable="false" />
            <div class="detailsRow">
                <div class="nonImageDetails">
                    <h2 class="displayName">${i(a.display,[`html`,`emoji`])}</h2>
                    <p class="username description">${_}</p>
                    <p class="bio">${i(a.bio)}</p>
                    <!-- TODO: make these clickable so you can see the users following/followers -->
                    <div class="followCounts">
                        <span class="followers description"><b>${a.followers}</b> Followers</span>
                        •
                        <span class="following description"><b>${a.following}</b> Following</span>
                    </div>
                    <p class="joinedDate description">${t(`solid`,`calendar`).outerHTML} Joined ${m} ${h}</p>
                </div>
                <div class="additionalInteractions">
                    <button class="moreInteractions">${t(`solid`,`ellipsis`).outerHTML}</button>
                    <button class="followBtn">Follow</button>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div id="notes"></div>
    `,document.title=`${a.display} (@${a.username}) on Auride`;let b=v.querySelector(`.displayName`);a.isVerified&&(b.innerHTML+=`<span class="badge">${t(`solid`,`circle-check`).outerHTML}</span>`),a.activeContributor&&(b.innerHTML+=`<span class="badge">${t(`solid`,`handshake-angle`).outerHTML}</span>`),a.isSubscribed&&(b.innerHTML+=`<span class="badge">${t(`solid`,`heart`).outerHTML}</span>`);let x=v.querySelector(`.followBtn`),S=null;function C(){console.log(`SIJFUOIASJFAS`),S!==`self`&&(S?x.innerHTML=`${t(`solid`,`user-check`).outerHTML} Following`:x.innerHTML=`${t(`solid`,`user-plus`).outerHTML} Follow`)}s&&s.uid===a.uid?(x.innerHTML=`${t(`solid`,`user-pen`).outerHTML} Edit Profile`,x.onclick=()=>n(`/settings`),S=`self`):s&&s.followingWho&&s.followingWho[a.uid]?(a.memorialAccount.isDeceased?(x.innerHTML=`${t(`solid`,`user-check`).outerHTML} Cannot Unfollow`,x.onclick=()=>null):(x.innerHTML=`${t(`solid`,`user-check`).outerHTML} Following`,x.onclick=()=>{S=!1,f(a.uid,`uid`).catch(e=>{S=!0,C()}),C()}),x.classList.add(`following`)):a.memorialAccount.isDeceased?(x.innerHTML=`${t(`solid`,`user-plus`).outerHTML} Cannot Follow`,x.onclick=()=>null):(x.innerHTML=`${t(`solid`,`user-plus`).outerHTML} Follow`,x.onclick=()=>{S=!0,f(a.uid,`uid`).catch(e=>{S=!1,C()}),C()});let w=v.querySelector(`.nonImageDetails`);if(a.memorialAccount.isDeceased){if(w.innerHTML+=`
            <p class="deceased description">
                ${t(`solid`,`dove`).outerHTML} May ${i(a.display,[`html`,`emoji`])} rest in peace.
            </p>
        `,a.memorialAccount.obituary){let e=v.querySelector(`.deceased`);e.innerHTML+=`
                <span class="description">
                    They have an obituary which you <a href="${a.memorialAccount.obituary}" target="_blank">can view</a>.
                </span>
            `}u(a.display)}return v}export{p as default};