import{i as e,l as t,n}from"./router-CC3EAHV2.js";import"./setUsername-BxowIbFe.js";import{t as r}from"./uploadPfp-BdaLY0I4.js";async function i(){document.title=`Set Profile Picture | Auride`;let i=document.createElement(`div`);i.innerHTML=`
        <div class="authForm">
            <div class="info">
                <h1>${t(`solid`,`images`).outerHTML} Profile Picture</h1>
                <p class="description">Choose your appearance on Auride.</p>
            </div>
            <div class="form">
                <div class="pfpUpload">
                    <h1>${t(`solid`,`plus`).outerHTML}</h1>
                </div>
                <input type="file" accept="image/png, image/jpeg" id="pfpUploader" style="display: none;" />

                <p class="errorTxt caution"></p>
            </div>
        </div>
    `,await e()||n(`/auth/register`),document.getElementById(`sidebar`)&&document.getElementById(`sidebar`).remove();let a=document.getElementById(`aurideHeaderLogo`).closest(`a`);a.href=`#`;let o=i.querySelector(`.pfpUpload`),s=i.querySelector(`#pfpUploader`),c=i.querySelector(`.errorTxt`);return o.onclick=()=>{s.click()},s.addEventListener(`change`,async()=>{if(s.files.length>0){c.style.display=`none`;try{let e=await r(s.files[0]);console.log(e),e&&setTimeout(()=>{n(`/auth/done`)},500)}catch(e){c.textContent=e.message,c.style.display=`block`}}}),i}export{i as default};