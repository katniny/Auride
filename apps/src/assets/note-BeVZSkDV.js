import{i as e,l as t}from"./router-fU7goLPj.js";import{t as n}from"./checkFileType-BmvIHc4A.js";import{a as r,i,l as a}from"./index-BBeCNjCH.js";import{t as o}from"./timeAgo-C2OJNZNV.js";import{n as s,r as c,t as l}from"./getNotes-CC5MzuZS.js";import{n as u,t as d}from"./getNoteData-DuImo6l_.js";async function f(f){let p=document.createElement(`div`),m=await d(f.id),h=await u(m.whoSentIt,`uid`),g=await e();if(!m||!h){console.error(`:(`);return}console.log(m),console.log(h),l();let _=`@${h.username}`;h.pronouns&&(_+=` • ${h.pronouns}`);let v=m.likes||0,y=m.renotes||0,b=m.replies||0,x=g?`Join the conversation, ${r(g.display,[`html`,`emoji`])}!`:`Join the conversation!`,S=document.createElement(`div`);if(S.className=`mediaContainer`,m.image||m.media?.numOne){let e,t=await n(m.image??m.media?.numOne??null,!0),r=m.image||await a(m.media?.numOne);e=document.createElement(t),t===`video`?(e.controls=!0,g&&(e.autoplay=g?.autoplayVideos),e.muted=!0):t===`audio`?e.controls=!0:e.draggable=!1,e.src=r,S.appendChild(e)}p.innerHTML=`
        <div class="noteView">
            <div class="noteHeader">
                <div class="pfpContainer">
                    <img class="pfp" draggable="false" src="${await a(`images/pfp/${h.uid}/${h.pfp}`)}" />
                </div>
                <div class="displayContainer">
                    <a href="/u/${h.username}" class="displayName">${r(h.display,[`html`,`emoji`])}</a>
                    <a href="/u/${h.username}" class="username">${_}</a>
                </div>
            </div>
            <div class="noteContainer">
                <p>${r(m.text)}</p>
                ${S.outerHTML}
            </div>
            <div class="additionalInfo">
                <p class="timeSent description">${o(m.createdAt,`verbose`)} • Sent from Earth</p>
            </div>

            <div class="divider"></div>

            <div class="noteInteractions">
                <!-- love -->
                <span class="love">
                    <span class="icon">
                        ${t(`solid`,`heart`).outerHTML}
                    </span>
                    <span class="loveCount">
                        ${v}
                    </span>
                </span>
                <!-- renote -->
                <span class="renote">
                    <span class="icon">
                        ${t(`solid`,`retweet`).outerHTML}
                    </span>
                    <span class="renoteCount">
                        ${y}
                    </span>
                </span>
                <!-- replies -->
                <span class="replies">
                    <span class="icon">
                        ${t(`solid`,`comment`).outerHTML}
                    </span>
                    <span class="replyCount">
                        ${b}
                    </span>
                </span>
                <!-- quote renote -->
                <span class="quoteRenote">
                    <span class="icon">
                        ${t(`solid`,`quote-left`).outerHTML}
                    </span>
                </span>
                <!-- favorite -->
                <span class="favorite">
                    <span class="icon">
                        ${t(`solid`,`bookmark`).outerHTML}
                    </span>
                </span>
            </div>

            <div class="divider"></div>
        </div>

        <div class="sendNoteQuick">
            ${x}
        </div>
        <div id="notes" class="reversed"></div>
    `,m.text?document.title=`${h.display} on Auride: "${m.text}"`:document.title=`${h.display} uploaded media on Auride`;let C=p.querySelector(`.loveCount`),w=p.querySelector(`.love`),T=!1;g&&m.whoLiked&&m.whoLiked[g.uid]&&(T=!0,w.classList.add(`active`)),w.onclick=()=>{if(!g)return;function e(){T?(v--,w.classList.remove(`active`),T=!1):(v++,w.classList.add(`active`),T=!0)}e(),C.textContent=v,c(m.id).catch(t=>{e()})};let E=p.querySelector(`.renoteCount`),D=p.querySelector(`.renote`),O=!1;g&&m.whoRenoted&&m.whoRenoted[g.uid]&&(O=!0,D.classList.add(`active`)),D.onclick=()=>{function e(){O?(y--,D.classList.remove(`active`),O=!1):(y++,D.classList.add(`active`),O=!0)}e(),E.textContent=y,s(m.id).catch(t=>{e()})};let k=p.querySelector(`.sendNoteQuick`);return k.onclick=()=>i(m.id),p}export{f as default};