function e(){document.title=`Page Not Found | Auride`;let e=document.createElement(`div`),t=window.location.pathname;return e.innerHTML=`
        <div class="pageNotFound">
            <img class="pageFailAurora" src="/assets/mascot/concerned.png" draggable="false" />
            <h2>We were unable to find that page :(</h2>
            <p class="description">
                We were unable to find ${t}.
                The page doesn't exist, got moved, or got lost to time.
            </p>

            <br />

            <a href="/u/${t}">Were you looking for a profile?</a>

            <br />

            <p>Go to the home page? We know that page exists!</p>
            <a href="/home"><button>Go Home</button></a>
        </div>
    `,e}export{e as default};