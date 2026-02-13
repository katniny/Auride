const ScriptLoader = (() => {
   const loadedScripts = new Set();
   const pendingPromises = {};
   const scriptQueue = [];
   let scriptsAreReady = false;

   // process the script queue once "scriptsLoaded" is dispatched
   document.addEventListener("scriptsLoaded", () => {
      scriptsAreReady = true;
      while (scriptQueue.length) {
         const { resolve, reject, script } = scriptQueue.shift();
         document.head.appendChild(script);
         script.onload = resolve;
         script.onerror = reject;
      }
   });

   function loadScript({ src, async = true }) {
      if (loadedScripts.has(src)) return Promise.resolve();

      if (pendingPromises[src]) return pendingPromises[src];

      const promise = new Promise((resolve, reject) => {
         const script = document.createElement("script");
         script.src = src;
         script.async = async;

         if (scriptsAreReady) {
            // if scripts are ready, append immediately
            document.head.appendChild(script);
            script.onload = () => {
               loadedScripts.add(src);
               resolve();
            };
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
         } else {
            // otherwise, queue the script
            scriptQueue.push({ resolve, reject, script });
         }
      });

      pendingPromises[src] = promise;
      return promise;
   }

   // WHY WERE YOU BREAKING EVERYHTING
   // I HATE YOU
   // I DID HOURS OF DEBUGGING AND IT WAS JUST YOU
   // if ('serviceWorker' in navigator) {
   //    navigator.serviceWorker.register('/sw.js', { scope: '/' });
   // }

   // tell the page loader the page is ready
   document.dispatchEvent(new Event("pageLoaded"));

   return {
      load: (...scripts) => Promise.all(scripts.map(loadScript)),
      isLoaded: (src) => loadedScripts.has(src),
   };
})();