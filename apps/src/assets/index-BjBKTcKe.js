import{i as e,l as t,n,o as r,r as i,s as a,t as o,u as s}from"./router-CC3EAHV2.js";import{t as c}from"./checkFileType-BmvIHc4A.js";import{t as l}from"./achievementDefs-_BaCGXfp.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function u(e){if(!e)throw Error(`We need the route that you're wanting to fetch!`);let t=await fetch(`http://localhost:10000/api/auride/dev/getMediaLink`,{method:`GET`,headers:{"Content-Type":`application/json`,path:e}});if(!t.ok)throw Error(`Failed to request path.`);let n=await t.json();return console.log(n),await n?.returnedLink}async function d(e){return`http://localhost:6979/files/${await u(e)}`}async function f(){let n=await e(),r=document.createElement(`header`);r.innerHTML=`
        <div class="left">
            <button class="hamburgerMenu" onclick="openHamburgerMenu()">${t(`solid`,`bars`,``,`xl`).outerHTML}</button>
            <a href="/home">
                <img id="aurideHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false" />
            </a>
        </div>
        <div class="center">
            <input id="searchBar" placeholder="Search Auride..." />
        </div>
        <div class="right">
            <img alt="Your profile picture" draggable="false" id="headerUserPfp" />
        </div>
    `,document.body.appendChild(r);let i=document.getElementById(`headerUserPfp`);n&&n?.pfp?i.src=await d(`images/pfp/${n.uid}/${n.pfp}`):i.src=`/assets/imgs/defaultPfp.png`;let a=!1,o=r.querySelector(`.hamburgerMenu`);o.onclick=()=>{let e=document.getElementById(`sidebar`);!a&&e?(e.classList.add(`open`),a=!0):a&&e&&(e.classList.remove(`open`),a=!1)}}async function p(e,n){await l,i.add(e);let r=document.createElement(`div`);r.className=`unlockAchievement`,r.innerHTML=`
        <h2>${t(`solid`,l?.[e].icon).outerHTML} ${l?.[e].fancyName}</h2>
        <p>${l?.[e].description}</p>
        <p class="hero">Achievement Unlock!</p>
    `,r.classList.add(`show`),document.body.appendChild(r),setTimeout(()=>{r.classList.remove(`show`),r.classList.add(`hide`),setTimeout(()=>{r.remove()},425)},3500)}async function m(){let e=r.currentUser,t=null;if(e)try{t=await e.getIdToken()}catch(e){console.error(`Failed to get Firebase token: ${e}`)}return t}async function h(e,t,n,r,a,o,s,c){if(!e)throw Error(`Attempted to create a note without an ID!`);let l=await m();if(!l)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let u=await fetch(`http://localhost:10000/api/auride/createNote`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${l}`},body:JSON.stringify({noteId:e,text:n,filePath:t,nsfwFlag:r,sensitiveFlag:a,politicalFlag:o,musicId:s,replyingTo:c})});if(!u.ok)throw Error(`Failed to create note with status code ${u.status}.`);let d=await u.json();return d?.achievement?.chatterbox&&!i.has(`chatterbox`)&&p(`chatterbox`,d?.achievement?.chatterbox?.unlockedWhen),d?.achievement?.firstSteps&&!i.has(`firstSteps`)&&p(`firstSteps`,d?.achievement?.firstSteps?.unlockedWhen),await d?.success}var g=`http://localhost:6979`,_=`${g}/files/`,v=e=>`${g}/${e}`;function y(e){let t=()=>{};return{getDownloadUrl:()=>v(e),onUploadProgress:e=>{t=e},put:n=>new Promise((r,i)=>{let a=new tus.Upload(n,{endpoint:_,metadata:{filename:e},onSuccess:r,onError:i,onProgress:(e,n)=>t({bytesTransferred:e,totalBytes:n})});a.findPreviousUploads().then(e=>{e.length&&a.resumeFromPreviousUpload(e[0]),a.start()})}),delete:()=>Promise.resolve()}}async function b(e,t){if(!e)throw Error(`We need the TUS ID to know what to route!`);if(!t)throw Error(`We need the route that you're wanting to pretend the link is!`);let n=await m();if(!n)throw Error(`Failed to get a token. Please ensure the user is signed in.`);let r=await fetch(`http://localhost:10000/api/auride/dev/routeMediaLink`,{method:`POST`,headers:{"Content-Type":`application/json`,authorization:`Bearer ${n}`,tusId:e,fakePath:t}});if(!r.ok)throw Error(`Failed to request fake path to the server. You may manually set one in the filePaths.json file in the server folder.`);return await(await r.json())?.returnedLink}async function x(t){let n=await e();if(!n)throw Error(`Please ensure the user is signed in.`);return a.ref(`users/${n.uid}`).update({banner:t}),!0}async function S(t){let n=await e();if(!n)throw Error(`Please ensure the user is signed in.`);return a.ref(`users/${n.uid}`).update({pfp:t}),!0}async function C(t,n,r,i,a){try{let o=await e();if(!o)throw Error(`You must be signed in to upload any kind of media.`);if(!n)throw Error("You must specify a path to upload! (e.g., `banner` or `pfp`");if(![`pfp`,`banner`,`notes`].includes(n))throw Error(`We're not sure what path you're attempting to use.`);if(!r)throw Error(`You must tell us whether you want to use the current users UID or a note ID.`);if(r===`noteId`&&!i)throw Error(`What's the note ID you're wanting to upload to?`);if(!t)throw Error(`You must specify media to upload!`);let s=t,l=`images/${n}/`;r===`uid`?l+=o.uid:r===`noteId`&&a?l+=`${a}/notesReplying/${i}`:r===`noteId`&&!a&&(l+=i),l+=`/${s.name}`;try{c(s)}catch(e){throw console.error(`Something went uploaded the file: ${e.message}`),Error(e.message)}let u=y(l);u.onUploadProgress(e=>{let t=e.bytesTransferred/e.totalBytes*100;console.log(t)}),u.put(s).then(e=>{console.log(e),console.log(e.lastResponse._xhr.responseURL);{let t=e.lastResponse._xhr.responseURL.split(`/`)[4];b(t,l),console.log(`Uploaded media successfully to
                    http://localhost:6979/files/${t}, and asked server to route
                    ${l} to it.`)}switch(n){case`pfp`:S(s.name);break;case`banner`:x(s.name);break;default:break}return!0})}catch(e){throw console.error(`Media upload failed: ${e}`),e}}function w(e,t=!1){if(t){let t=[];e=e.replace(/<img[^>]*>/gi,e=>(t.push(e),`___IMG_PLACEHOLDER_${t.length-1}___`));let n=document.createElement(`div`);return n.textContent=e,e=n.innerHTML,e=e.replace(/___IMG_PLACEHOLDER_(\d+)___/g,(e,n)=>t[n]),e}else{let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}}function T(e){let t=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,n=/@(\w+)/g;return e.split(/(<img[^>]*>)/i).map(e=>e.startsWith(`<img`)?e:(e=e.replace(t,'<a href="javascript:void(0)" onclick="openLink(`$1`)">$1</a>'),e=e.replace(n,`<a href="/u/$1">@$1</a>`),e)).join(``)}function E(e){return e.replace(/(\r\n|\n\r|\n|\r)/g,`<br>`)}function D(e){return e=e.replace(/^### (.+)$/gm,`<h3>$1</h3>`),e=e.replace(/^## (.+)$/gm,`<h2>$1</h2>`),e=e.replace(/^# (.+)$/gm,`<h1>$1</h1>`),e=e.replace(/(?<!\\)\*(.+?)(?<!\\)\*/g,`<strong>$1</strong>`),e=e.replace(/(?<!\\)_(.+?)(?<!\\)_/g,`<em>$1</em>`),e=e.replace(/(?<!\\)~(.+?)(?<!\\)~/g,`<del>$1</del>`),e=e.replace(/(?<!\\)```([^`]+)```/g,`<pre><code>$1</code></pre>`),e=e.replace(/(?<!\\)`([^`]+)(?<!\\)`/g,`<code>$1</code>`),e=e.replace(/^(?<!\\)- (.+)$/gm,`<li>$1</li>`),e=e.replace(/(<li>.*?<\/li>\n)+/g,e=>`<ul>`+e.replace(/\n/g,``)+`</ul>`),e=e.replace(/^(?<!\\)> (.+)$/gm,`<blockquote-line>$1</blockquote-line>`),e=e.replace(/(<blockquote-line>.*?<\/blockquote-line>\n?)+/g,e=>`<blockquote>`+e.replace(/<\/?blockquote-line>/g,``).replace(/\n/g,`<br>`)+`</blockquote>`),e=e.replace(/(<\/h[1-6]>)\n/g,`$1`),e=e.replace(/(<\/ul>)\n/g,`$1`),e=e.replace(/(<\/blockquote>)\n/g,`$1`),e=e.replace(/\\(.)/g,`$1`),e}function O(e){for(let[t,n]of Object.entries({concerned:`/assets/mascot/concerned.png`,excited:`/assets/mascot/excited.png`,love:`/assets/mascot/love.png`,peace:`/assets/mascot/peace.png`,smug:`/assets/mascot/smug.png`,tired:`/assets/mascot/tired.png`,violence:`/assets/mascot/violence.png`,yelling:`/assets/mascot/yelling.png`})){let r=RegExp(`\\[${t}\\]`,`g`);e=e.replace(r,`<img src="${n}" alt=${t} class="emoji aurora" draggable="false" />`)}return e}function k(e){return e.replace(/(^|\s|>)#([\w-]+)/g,(e,t,n)=>t+`<a href="/search?q=#${n.toLowerCase()}">#${n}</a>`)}function A(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\*(.+?)\*/g,`<span class="mdMarker">*</span><span class="mdBold">$1</span><span class="mdMarker">*</span>`).replace(/_(.+?)_/g,`<span class="mdMarker">_</span><span class="mdItalic">$1</span><span class="mdMarker">_</span>`).replace(/`([^`]+)`/g,'<span class="mdMarker">`</span><span class="mdCode">$1</span><span class="mdMarker">`</span>').replace(/\[([a-z]+)\]/gi,`<span class="mdMarker">[</span><span class="mdEmoji">$1</span><span class="mdMarker">]</span>`).replace(/~(.+?)~/g,`<span class="mdMarker">~</span><span class="mdStrike">$1</span><span class="mdMarker">~</span>`).replace(/^- (.+)$/gm,`<span class="mdMarker">- </span><span class="mdList">$1</span>`).replace(/^### (.+)$/gm,`<span class="mdMarker">### </span><span class="mdH3">$1</span>`).replace(/^## (.+)$/gm,`<span class="mdMarker">## </span><span class="mdH2">$1</span>`).replace(/^# (.+)$/gm,`<span class="mdMarker"># </span><span class="mdH1">$1</span>`).replace(/(^|\s)(#([\w-]+))/g,`$1<span class="mdHashtag">$2</span>`).replace(/\n/g,`<br>`)}function j(e,t=[`html`,`markdown`,`emoji`,`link`,`newline`,`hashtag`],n={}){let r={html:e=>w(e,n.allowImg),markdown:D,emoji:O,link:T,newline:E,hashtag:k};for(let n of t)e=r[n](e);return e}async function M(){return(await(await fetch(`https://accounts.spotify.com/api/token`,{method:`POST`,headers:{Authorization:`Basic ${btoa(`REPLACE`)}`,"Content-Type":`application/x-www-form-urlencoded`},body:new URLSearchParams({grant_type:`client_credentials`})}).catch(e=>{throw Error(`Something went wrong searching Spotify. Please check your content blockers and internet access, or try again later.`)})).json()).access_token}async function N(e){let t=await M();return(await(await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(e)}&type=track&limit=5`,{headers:{Authorization:`Bearer ${t}`}})).json()).tracks.items}var P=null,F={name:null,artist:null,albumCoverLink:null},I=!1;async function L(n){let r=await e(),i=document.createElement(`dialog`);i.innerHTML=`
        <!-- the editor -->
        <div class="tab editorTab active">
            <h3 class="closePopupIcon">
                ${t(`solid`,`circle-xmark`).outerHTML}
            </h3>
            <div class="editor">
                <div id="preview" class="editorPreview" data-placeholder="What's on your mind, ${r.display}?"></div>
                <textarea id="composer" class="editorInput" spellcheck="true"></textarea>
                <p class="description" id="noteCharacterLimit">0/1,250</p>
            </div>

            <img class="uploadedImg" src draggable="false" />
            <video class="uploadedVideo" src draggable="false" controls autoplay="${r?.autoplayVideos}"></video>
            <audio class="uploadedAudio" src controls></audio>
            <p class="mediaNotUploaded description">Your media hasn't been uploaded yet, this is just a preview.</p>
            <div class="interactionsForMedia">
                <button class="removeMedia">${t(`solid`,`trash`).outerHTML} Remove Media</button>
                <button class="addAltToMedia">${t(`solid`,`message`).outerHTML} Add Alt Text</button>
            </div>
        </div>

        <!-- music selection -->
        <div class="tab musicTab">
            <h3 class="backIcon">
                ${t(`solid`,`arrow-left`).outerHTML}
            </h3>

            <h2>Music</h2>
            <p class="description">Show off your favorite music!</p>
            <input class="musicSearch" type="text" placeholder="Golden" />
            <button class="searchMusic">${t(`solid`,`magnifying-glass`).outerHTML} Search</button>
            <div class="selectedSongDetails"></div>
            <div class="musicQueries">
                <p class="encouragement description">Try searching for your favorite song!</p>
            </div>
        </div>

        <!-- flag selection -->
        <div class="tab flagTab">
            <h3 class="backIcon">
                ${t(`solid`,`arrow-left`).outerHTML}
            </h3>

            <h2>Flags</h2>
            <p class="description">Help people on Auride see the content they want to see.</p>
            <!-- nsfw -->
            <h3 class="selection">NSFW</h3>
            <a href="/blog/nsfw-flags">Learn more about NSFW flags.</a>
            <br />
            <select name="nsfwFlags">
                <option value="none">None</option>
                <option value="adultContent">Adult Content</option>
                <option value="sexuallySuggestive">Sexually Suggestive</option>
                <option value="nonSexualNudity">Non-Sexual Nudity</option>
                <option value="fetishContent">Fetish Content</option>
                <option value="erotica">Erotic Writing</option>
            </select>

            <!-- sensitive content -->
            <h3 class="selection">Sensitive</h3>
            <a href="/blog/sensitive-flags">Learn more about Sensitive flags.</a>
            <br />
            <select name="sensitiveFlags">
                <option value="none">None</option>
                <option value="graphicViolence">Graphic Violence</option>
                <option value="horrorImagery">Horror Imagery</option>
                <option value="abuseTraumaMentions">Abuse/Trauma Mentions</option>
                <option value="selfHarmSuicideMentions">Self-Harm/Suicide Mentions</option>
                <option value="drugUse">Drug Use</option>
                <option value="flashSeizureRisk">Flash Seizure Risk</option>
            </select>

            <!-- political content -->
            <h3 class="selection">Political</h3>
            <a href="/blog/political-flags">Learn more about Political flags.</a>
            <br />
            <select name="politicalFlags">
                <option value="none">None</option>
                <option value="politicalDiscussion">Political Discussion</option>
                <option value="warNConflict">War & Conflict</option>
                <option value="identityDebates">Identity Debates</option>
                <option value="conspiracyTheories">Conspiracy Theories</option>
                <option value="newsMedia">News Media</option>
            </select>
        </div>

        <br />

        <p class="errorMsg caution"></p>
        <div class="noteCustomization">
            <button class="createNote">${t(`solid`,`pencil`).outerHTML} Create</button>
            <div class="interactions">
                <input type="file" id="noteFilePicker" style="display: none;" />
                <a class="interaction editor">invisible editor button to prevent errors</a>
                <a class="interaction media moreMargin">${t(`solid`,`image`).outerHTML} Media</a>
                <a class="interaction flag">${t(`solid`,`flag`).outerHTML} Flags</a>
                <a class="interaction music">${t(`solid`,`music`).outerHTML} Music</a>
            </div>
        </div>
    `,i.className=`createNotePopup`,document.getElementById(`app`).appendChild(i);let o=i.querySelector(`.createNote`);o.onclick=()=>V();let s=i.querySelector(`.closePopupIcon`);s.onclick=()=>R();let l=i.querySelector(`.errorMsg`);function u(e){l.textContent=e}i.querySelectorAll(`.backIcon`).forEach(e=>{e.onclick=()=>y(`editor`,`editorTab`)});let d=i.querySelector(`.editorInput`),f=i.querySelector(`.editorPreview`);function p(){f.scrollTop=d.scrollTop}let m=1250;d.addEventListener(`input`,()=>{d.style.height=`auto`,d.style.height=d.scrollHeight+`px`,f.style.height=d.style.height,f.innerHTML=A(d.value),d.value.length>m&&(d.value=d.value.slice(0,m)),f.innerHTML=A(d.value.slice(0,m));let e=i.querySelector(`#noteCharacterLimit`);e.textContent=`${d.value.length}/1,250`}),d.addEventListener(`scroll`,p);let g=i.querySelector(`.interaction.flag`),_=i.querySelector(`.interaction.music`);g.onclick=()=>y(`flag`,`flagTab`),_.onclick=()=>y(`music`,`musicTab`);function v(e,t){let n=i.querySelector(`.interaction.${e}`),r=i.querySelector(`.tab.${t}`);!n||!r||(r.style.animation=`tabOpening 0.3s ease`,r.classList.add(`active`),n.classList.add(`active`))}function y(e,t){let n=i.querySelectorAll(`.tab.active`),r=i.querySelectorAll(`.interaction.active`),a=!0;n[0]&&n[0].classList.contains(t)&&(a=!1,v(`editor`,`editorTab`)),n.forEach(e=>{e.style.animation=`tabClosing 0.3s ease`,e.style.position=`fixed`,setTimeout(()=>{e.classList.remove(`active`),e.style.animation=``,e.style.position=``},250)}),r.forEach(e=>{e.classList.remove(`active`)}),a&&v(e,t)}let b=i.querySelector(`.interaction.media`),x=i.querySelector(`#noteFilePicker`);b.onclick=()=>{I||x.click()};let S=i.querySelector(`.uploadedImg`),w=i.querySelector(`.uploadedVideo`),T=i.querySelector(`.uploadedAudio`),E=i.querySelector(`.mediaNotUploaded`),D=i.querySelector(`.removeMedia`),O=i.querySelector(`.addAltToMedia`),k=i.querySelector(`.interactionsForMedia`);function j(e,t){switch(u(``),E.classList.add(`shown`),k.classList.add(`shown`),e){case`img`:S.classList.add(`current`),w.classList.remove(`current`),T.classList.remove(`current`),D.classList.add(`shown`),O.classList.add(`shown`),S.src=t;break;case`video`:S.classList.remove(`current`),w.classList.add(`current`),T.classList.remove(`current`),D.classList.add(`shown`),O.classList.add(`shown`),w.src=t;break;case`audio`:S.classList.remove(`current`),w.classList.remove(`current`),T.classList.add(`current`),D.classList.add(`shown`),O.classList.remove(`shown`),T.src=t;break;default:S.classList.remove(`current`),w.classList.remove(`current`),T.classList.remove(`current`),D.classList.remove(`shown`),O.classList.remove(`shown`),E.classList.remove(`shown`),k.classList.remove(`shown`),T.src=``,S.src=``,w.src=``;break}}x.addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t){u(`File cannot be empty.`);return}let n=URL.createObjectURL(t),r;try{r=await c(t)}catch(e){console.error(e.message),u(e.message);return}j(r,n)}),D.addEventListener(`click`,()=>{j(null,null)});let M=!1,L=i.querySelector(`.searchMusic`),z=i.querySelector(`.musicSearch`);L.onclick=()=>B(z.value.trim()),z.addEventListener(`keydown`,e=>{e.key===`Enter`&&L.click()});function B(e){if(e.trim()===``){u(`Your search can't be empty!`);return}if(M)return;M=!0,u(``),L.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Searching...`;function n(e,r,a,o){let s=i.querySelector(`.selectedSongDetails`);if(I)return;if(!e||!r||!a||!o){s.innerHTML=``,F.artist=null,F.name=null,P=null,F.albumCoverLink=null;return}F.artist=a,F.name=r,P=e,F.albumCoverLink=o,s.innerHTML=`
                <h3>Currently Selected Song:</h3>
                <div class="details">
                    <div class="albumCover">
                        <img src="${o}" draggable="false" />
                    </div>
                    <div class="songDetails">
                        <h3>${r}</h3>
                        <p class="description">by ${a}</p>
                        <button class="trashSongSelection">${t(`solid`,`trash`).outerHTML} Remove Song Selection</button>
                    </div>
                </div>
                <h3 class="findNewSong">Or, find a new song selection here:</h3>
                <div class="divider"></div>
            `;let c=s.querySelector(`.trashSongSelection`);c.onclick=()=>n(null,null,null,null)}N(e).then(e=>{let r=i.querySelector(`.musicQueries`);r.innerHTML=``;for(let i of e){console.log(i);let e=document.createElement(`div`);e.className=`songSelector`;let a=document.createElement(`iframe`);a.src=`https://open.spotify.com/embed/track/${i.id}`,a.allow=`encrypted-media`,a.allowTransparency=!0;let o=document.createElement(`button`);o.innerHTML=`${t(`solid`,`circle-play`).outerHTML} Add ${i.name} by ${i.artists[0].name}`,o.onclick=()=>{n(i.id,i.name,i.artists[0].name,i.album.images[0].url),y(`editor`,`editorTab`)},e.appendChild(a),e.appendChild(o),r.appendChild(e)}L.innerHTML=`${t(`solid`,`magnifying-glass`).outerHTML} Search`,M=!1}).catch(e=>{u(`Something went wrong fetching songs from Spotify. Please check your internet connection and adblocker, if you have one.`),L.innerHTML=`${t(`solid`,`magnifying-glass`).outerHTML} Search`,M=!1,console.error(e)})}document.addEventListener(`keydown`,e=>{e.ctrlKey&&e.key===`Return`&&V()}),o.onclick=()=>V();async function V(){function e(e){switch(e){case`sending`:o.innerHTML=`${t(`solid`,`circle-notch`,`spin`).outerHTML} Working...`;break;case`notWorking`:o.innerHTML=`${t(`solid`,`pencil`).outerHTML} Create`;break;default:break}}if(I)return;I=!0,e(`sending`),u(``);let s=i.querySelector(`select[name="nsfwFlags"]`).value,c=i.querySelector(`select[name="sensitiveFlags"]`).value,l=i.querySelector(`select[name="politicalFlags"]`).value,f=x.files[0],p=P,g=n;if(!r){u(`We detected that you're signed out, please sign into an Auride account.`),e(`notWorking`),I=!1;return}let _=d.value;if(_.trim()===``&&!f){u(`Your note can't be empty!`),e(`notWorking`),I=!1;return}if(_.length>m){u(`Your note is too long. Only 1,250 characters or less is permitted.`),I=!1,e(`notWorking`);return}let v=a.ref(`notes`).push().key;f&&C(f,`notes`,`noteId`,v,g).catch(t=>{u(t.message),I=!1,e(`notWorking`)});try{let e;e=f&&!g?`images/notes/${v}/${f.name}`:f&&g?`images/notes/${g}/notesReplying/${v}/${f.name}`:``,console.log(e),await h(v,e,_,s,c,l,p,g),I=!1,R()}catch(t){u(t.message),console.error(t.message),I=!1,e(`notWorking`);return}}i.showModal()}function R(){let e=document.getElementById(`app`);if(I)return;let t=e.querySelector(`.createNotePopup`);t&&t.close()}async function z(){return!!await e()}async function B(){let n=await e(),r=document.createElement(`div`);r.id=`sidebar`,r.className=`sidebar`,r.innerHTML=`
        <!-- navigation buttons -->
        <a href="/home">
            <button id="homeButton" class="active">${t(`solid`,`house`).outerHTML} Home</button>
        </a>
        <a href="/notifications" class="removeOnNoAuth">
            <div class="notificationCount">0</div>
            <button id="notificationsButton">${t(`solid`,`bell`).outerHTML} Notifications</button>
        </a>
        <a href="/settings" class="removeOnNoAuth">
            <button id="settingsButton" class="active">${t(`solid`,`gear`).outerHTML} Settings</button>
        </a>
        <a href="/updates">
            <button id="updatesButton" class="active">${t(`solid`,`wrench`).outerHTML} Updates</button>
        </a>
        <a href="/u/${n?.username}" class="removeOnNoAuth">
            <button id="userButton" class="active">${t(`solid`,`user`).outerHTML} Your Profile</button>
        </a>
        <button class="createNoteSidebar removeOnNoAuth">${t(`solid`,`pencil`).outerHTML} Create</button>

        <!-- TODO: put these in the "more" menu -->
        <a href="/achievements" class="removeOnNoAuth">
            <button id="achievementButton" class="active">${t(`solid`,`award`).outerHTML} Achievements</button>
        </a>
    `,document.body.appendChild(r),V();let i=r.querySelector(`.createNoteSidebar`);if(i.onclick=()=>L(),!await z()){let e=document.querySelectorAll(`.removeOnNoAuth`);for(let t of e)t.remove()}console.log(n),a.ref(`/users/${n.uid}/notifications/unread`).on(`value`,e=>{let t=r.querySelector(`.notificationCount`),n=e.val();n>0?(t.style.display=`block`,n>99?t.textContent=`99+`:t.textContent=n):t.style.display=`none`})}async function V(){let t=window.location.pathname,n=document.getElementById(`sidebar`);if(!n)return;let r=n.querySelectorAll(`button`);for(let e of r)e.classList.remove(`active`);switch(t){case`/home`:n.querySelector(`#homeButton`).classList.add(`active`);break;case`/notifications`:n.querySelector(`#notificationsButton`).classList.add(`active`);break;case`/updates`:n.querySelector(`#updatesButton`).classList.add(`active`);break;case`/achievements`:n.querySelector(`#achievementButton`).classList.add(`active`);break;case`/settings`:n.querySelector(`#settingsButton`).classList.add(`active`);break;default:break}let i=await e();i&&t===`/u/${i?.username}`&&n.querySelector(`#userButton`).classList.add(`active`)}document.addEventListener(`navigatedToNewPage`,()=>{V()});var H=`v2026.9.10`,U=`beta`,W=`
    Auride is on version ${H}-${U}.
    Features are still being added. <a href="/roadmap">See our roadmap</a>.
`,G={Dark:{background:`1d1d1d`,"main-color":`ff869a`,"main-color-darker":`e1788a`,"header-color":`2d2d2d`,text:`fff`,"text-half-transparent":`rgba(255, 255, 255, 0.5)`,"text-semi-transparent":`rgba(255, 255, 255, 0.7)`,"profile-picture-bg":`363636`,"sidebar-button-hover":`3d3d3d`,"button-transparent-hover":`2d2d2d`,"success-color":`00dc00`,"warning-text":`ffff00`,"error-text":`ff0000`,"sidebar-text":`fff`,"banner-button-bg":`000`,"note-seperator":`2d2d2d`,"sidebar-button-border":`transparent`,"modal-background":`000`,"like-color":`red`,"renote-color":`84dd00`,"content-warning":`1d1d1d`,"skeleton-start":`404040`,"skeleton-middle":`303030`,"skeleton-end":`252525`,"reply-background":`303030`,"reply-hovered-background":`3f3f3f`,"note-background":`282828`,"logo-to-use":`All_transparent.png`},Light:{background:`f5f5f5`,"main-color":`dd6075`,"main-color-darker":`b44d5d`,"header-color":`e0e0e0`,text:`000`,"text-half-transparent":`rgba(0, 0, 0, 0.5)`,"text-semi-transparent":`rgba(0, 0, 0, 0.7)`,"profile-picture-bg":`fafafa`,"sidebar-button-hover":`e5e5e5`,"button-transparent-hover":`f5f5f5`,"success-color":`28a745`,"warning-text":`ffc107`,"error-text":`dc3545`,"sidebar-text":`333`,"banner-button-bg":`fff`,"note-seperator":`e0e0e0`,"sidebar-button-border":`transparent`,"modal-background":`rgba(0, 0, 0, 0.7)`,"like-color":`dc3545`,"renote-color":`28a745`,"content-warning":`rgb(255, 255, 255)`,"skeleton-start":`e0e0e0`,"skeleton-middle":`d5d5d5`,"skeleton-end":`cccccc`,"reply-background":`fafafa`,"reply-hovered-background":`e5e5e5`,"note-background":`fff`,"button-text":`000`,"logo-to-use":`All_transparent.png`},"Mint (Light)":{background:`f0f8ff`,"main-color":`9be7c4`,"main-color-darker":`62c198`,"header-color":`e5f1f8`,text:`222`,"text-half-transparent":`rgba(34, 34, 34, 0.5)`,"text-semi-transparent":`rgba(34, 34, 34, 0.7)`,"profile-picture-bg":`e7f2fa`,"sidebar-button-hover":`d1e4ef`,"button-transparent-hover":`e5f1f8`,"success-color":`28a745`,"warning-text":`ffc107`,"error-text":`dc3545`,"sidebar-text":`333`,"banner-button-bg":`ffffff`,"note-seperator":`e5f1f8`,"sidebar-button-border":`transparent`,"modal-background":`rgba(0, 0, 0, 0.7)`,"like-color":`dc3545`,"renote-color":`28a745`,"content-warning":`rgb(255, 255, 255)`,"skeleton-start":`e0e0e0`,"skeleton-middle":`d5d5d5`,"skeleton-end":`cccccc`,"reply-background":`e7f2fa`,"reply-hovered-background":`d1e4ef`,"note-background":`fff`,"button-text":`000`,"sidebar-create-note-button-hover":`000`,"logo-to-use":`MintLightThemeLogo.png`},"Mint (Dark)":{background:`18282d`,"main-color":`add8d0`,"main-color-darker":`8cc0b2`,"header-color":`203338`,text:`e0e0e0`,"text-half-transparent":`rgba(224, 224, 224, 0.5)`,"text-semi-transparent":`rgba(224, 224, 224, 0.7)`,"profile-picture-bg":`28383e`,"sidebar-button-hover":`25353a`,"button-transparent-hover":`203338`,"success-color":`28a745`,"warning-text":`ffc107`,"error-text":`dc3545`,"sidebar-text":`f0f0f0`,"banner-button-bg":`000`,"note-seperator":`203338`,"sidebar-button-border":`transparent`,"modal-background":`rgba(0, 0, 0, 0.7)`,"like-color":`dc3545`,"renote-color":`28a745`,"content-warning":`rgb(29, 29, 29)`,"skeleton-start":`404040`,"skeleton-middle":`303030`,"skeleton-end":`252525`,"reply-background":`28383e`,"reply-hovered-background":`25353a`,"note-background":`rgb(40, 40, 40)`,"sidebar-create-note-button-hover":`000`,"logo-to-use":`MintDarkThemeLogo.png`},"High Contrast":{background:`black`,"main-color":`yellow`,"main-color-darker":`cccc00`,"header-color":`333333`,text:`white`,"text-half-transparent":`rgba(255, 255, 255, 0.5)`,"text-semi-transparent":`rgba(255, 255, 255, 0.7)`,"profile-picture-bg":`555555`,"sidebar-button-hover":`444444`,"button-transparent-hover":`444444`,"success-color":`limegreen`,"warning-text":`yellow`,"error-text":`red`,"sidebar-text":`white`,"banner-button-bg":`white`,"note-seperator":`444444`,"sidebar-button-border":`white`,"modal-background":`222222`,"like-color":`limegreen`,"renote-color":`yellow`,"content-warning":`rgb(0, 0, 0)`,"skeleton-start":`333333`,"skeleton-middle":`444444`,"skeleton-end":`555555`,"reply-background":`404040`,"reply-hovered-background":`505050`,"note-background":`333333`,"sidebar-create-note-button-hover":`000`,"logo-to-use":`HighContrastThemeLogo.png`},"TransSocial Classic":{background:`ffb2a8`,"main-color":`ffb2a8`,"main-color-darker":`f0cfb6`,"header-color":`ffd9cb`,text:`333`,"text-half-transparent":`rgba(51, 51, 51, 0.5)`,"text-semi-transparent":`rgba(51, 51, 51, 0.7)`,"profile-picture-bg":`f0cfb6`,"sidebar-button-hover":`ffe0d2`,"button-transparent-hover":`ffd9cb`,"success-color":`b3e8b3`,"warning-text":`e8b3b3`,"error-text":`e86d6d`,"sidebar-text":`333`,"banner-button-bg":`333`,"note-seperator":`ffd9cb`,"sidebar-button-border":`transparent`,"modal-background":`ffb2a8`,"like-color":`e86d6d`,"renote-color":`b3e8b3`,"content-warning":`rgb(255, 178, 168)`,"skeleton-start":`ffe0d2`,"skeleton-middle":`ffd9cb`,"skeleton-end":`ffb2a8`,"reply-background":`ffe0d2`,"reply-hovered-background":`fff0e8`,"note-background":`ffd9cb`,"button-text":`000`,"logo-to-use":`TransSocialClassicThemeLogo.png`},"Midnight Purple":{background:`221e2b`,"main-color":`957DAD`,"main-color-darker":`786491`,"header-color":`2c2738`,text:`e2e2e2`,"text-half-transparent":`rgba(226, 226, 226, 0.5)`,"text-semi-transparent":`rgba(226, 226, 226, 0.7)`,"profile-picture-bg":`3d384a`,"sidebar-button-hover":`383246`,"button-transparent-hover":`2c2738`,"success-color":`5eb95e`,"warning-text":`f7e28c`,"error-text":`f0766a`,"sidebar-text":`ddd`,"banner-button-bg":`443f54`,"note-seperator":`383246`,"sidebar-button-border":`transparent`,"modal-background":`2a2535`,"like-color":`d362a4`,"renote-color":`41d4a5`,"content-warning":`rgb(34, 30, 43)`,"skeleton-start":`3d384a`,"skeleton-middle":`332e3e`,"skeleton-end":`282333`,"reply-background":`332e3e`,"reply-hovered-background":`3d384a`,"note-background":`2c2738`,"hovered-button-text":`fff`,"logo-to-use":`MidnightPurpleThemeLogo.png`},Darker:{background:`171717`,"main-color":`ff869a`,"main-color-darker":`e1788a`,"header-color":`202020`,text:`f0f0f0`,"text-half-transparent":`rgba(240, 240, 240, 0.5)`,"text-semi-transparent":`rgba(240, 240, 240, 0.7)`,"profile-picture-bg":`2d2d2d`,"sidebar-button-hover":`303030`,"button-transparent-hover":`202020`,"success-color":`59f275`,"warning-text":`f2db59`,"error-text":`f27a7a`,"sidebar-text":`ddd`,"banner-button-bg":`333`,"note-seperator":`2d2d2d`,"sidebar-button-border":`transparent`,"modal-background":`1a1a1a`,"like-color":`ff6378`,"renote-color":`2ddbff`,"content-warning":`rgb(23, 23, 23)`,"skeleton-start":`333333`,"skeleton-middle":`282828`,"skeleton-end":`202020`,"reply-background":`282828`,"reply-hovered-background":`333333`,"note-background":`202020`,"logo-to-use":`All_transparent.png`}};async function K(e){let t=G[e];if(!t)throw Error(`No theme found! Using default theme..`);for(let[e,n]of Object.entries(t))document.documentElement.style.setProperty(`--${e}`,`#${n}`);localStorage.setItem(`currentTheme`,e)}async function q(e){if(localStorage.setItem(`useODFont`,e),e===!0){let e=document.createElement(`style`);e.id=`odFontStyle`,e.innerHTML=`
            @font-face {
                font-family: "OpenDyslexic";
                src: url("/assets/fonts/OpenDyslexic.otf") format("opentype");
            }

            * {
                font-family: "OpenDyslexic", sans-serif;
            }
        `,document.head.appendChild(e)}}async function J(){let t=document.createElement(`div`);t.innerHTML=`
        <div class="topLeft">
            <p class="description">© Katniny Studios 2026</p>
            <p class="description">Powered by Katniny Online Services</p>
            <p class="description">Auride ${H}-${U}</p>
        </div>
        <div class="center">
            <img src="/assets/imgs/favicon.png" class="pageLoaderLogo" draggable="false" />
            <p id="quote">[quote]</p>
            <p id="whatLoading">Starting...</p>
        </div>
    `,t.className=`pageLoader`,document.body.appendChild(t);let n=t.querySelector(`#whatLoading`);n.textContent=`Getting a random quote...`;let r=`don't question the penguin.(asking chatgpt for a quote, be right back!(please wait, im thinking very hard(shaking the internet until it works(doing something very important(please remain calm..i know im small(counting to 37...wait, why 37?(adding ketchup and mustard to auride(asking the servers nicely(untangling the spaghetti...(making it look like i know what im doing(one moment, i dropped the internet(loading at maximum silliness(deploying the brain cells(the frogs are working on it(waiting for the moon to align with the server(probably not a bug!(the computer has requested a snack(dividing by zero very carefully...(teaching the servers about friendship(pretending this is intentional(reassuring the database(putting all the ducks in a row(negotiating with the loading screen to let you through, please hold(pressing the big red button(making the thing do the thing(asking the internet where it went(removing the forbidden cheese(updating the frogs(calculating the exact number of bananas required(feeding the server its veggies(making several questionable decisions(checking if anyone noticed(checking if anyone ASKED! hah! im sorry...(loading with no adult supervision`.split(`(`),i=t.querySelector(`#quote`);i.textContent=r[Math.floor(Math.random()*r.length)],n.textContent=`Checking for cached themes...`;let a=localStorage.getItem(`currentTheme`),o=localStorage.getItem(`useODFont`),s=localStorage.getItem(`showPrideFlag`);a&&(n.textContent=`Applying cached theme...`,K(a)),o&&(n.textContent=`Applying cached dyslexia font preference...`,q(o)),s&&(n.textContent=`Applying pride flag preference...`),n.textContent=`Checking for user...`;let c=await e();c?(n.textContent=`User found! Checking theme...`,c.theme&&(n.textContent=`Applying theme...`,K(c.theme)),n.textContent=`Checking dyslexia font preference...`,c.useODFont?(n.textContent=`Applying dyslexia font...`,q(c.useODFont)):localStorage.setItem(`useODFont`,!1),n.textContent=`Done!`,t.classList.add(`fadeAway`),setTimeout(()=>{t.classList.remove(`fadeAway`),t.classList.add(`done`)},450)):(n.textContent=`No user found. Done!`,t.classList.add(`fadeAway`),setTimeout(()=>{t.classList.remove(`fadeAway`),t.classList.add(`done`)},450))}function Y(){return!!(globalThis||window).isTauri}J(),o(),s(),f(),B();var X=Y();console.log(`Is Auride App: ${X}`),window.$nav=n;export{j as a,p as c,L as i,d as l,W as n,C as o,z as r,m as s,U as t};