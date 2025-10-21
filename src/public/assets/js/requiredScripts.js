// alert dev console users to be careful :p
// if not literally developing though
if (!window.location.origin.startsWith("http://127.0.0.1") && !window.location.origin.startsWith("http://localhost")) {
   console.log("%cStop!", "color: red; font-size: 35px;");
   console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Auride feature or 'hack' someone's account, it is a scam and will give them access to your Auride account.", "color: white; font-size: 15px; font-family: sans-serif;");
   console.log(" ");
}

// if a script is used on every page, we can call it here
// as a "dependency"
function loadScript(src, async) {
   return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
   });
}

async function loadAllScripts() {
   try {
      // required before ts_fas_acih.js
      await loadScript("/assets/js/envVars.js", false);
      await loadScript("/assets/js/pathName.js", false);
      await loadScript("/assets/js/versioning.js", false);
      await loadScript("/assets/js/ui/loadingIndicator.js", false);

      // firebase initialization
      await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js", false);
      await Promise.all([
         loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js", false),
         loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js", false),
         // TUS is the temporary replacement for Firebase storage
         loadScript("https://cdn.jsdelivr.net/npm/tus-js-client@latest/dist/tus.min.js", false),
      ]);
      await loadScript("/assets/js/firebase.js", false);
      await loadScript("/assets/js/utils.js", false);
      await loadScript("/assets/js/ts_fas_acih.js", false);

      // page loader
      await loadScript("/assets/js/ui/setTheme.js", false);
      await loadScript("/assets/js/ui/pageLoader.js", false);

      // our icons
      await loadScript("https://kit.fontawesome.com/be7c331826.js", false);

      // header
      await loadScript("/assets/js/ui/essential/header.js", false);

      // sidebar
      await loadScript("/assets/js/ui/essential/sidebar.js", false);

      // the sidebar opener
      await loadScript("/assets/js/ui/sidebarOpen.js", false);

      // our note creation modal
      await loadScript("/assets/js/ui/createNotePopup.js", false);

      // notifications
      await loadScript("/assets/js/notifications.js", false);

      // app dependencies
      await loadScript("/assets/js/ui/updateAvailablePopup.js", false);
      await loadScript("/assets/js/app/isApp.js", false);

      // temp
      await loadScript("/assets/js/ui/editNoteUI.js", false);
      await loadScript("/assets/js/ui/deleteNotePopup.js", false);
      await loadScript("/assets/js/ui/cwDescriptions.js", false);

      // finished!
      console.log("All-page scripts loaded successfully.");
      document.dispatchEvent(new Event("scriptsLoaded"));
   } catch (error) {
      console.error("Error loading Firebase scripts: ", error);
   }
}

loadAllScripts();
