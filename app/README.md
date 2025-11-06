# Auride App
Hi, this is the source code for the Auride app!

There isn't too much to know about this -- below will be build instructions, and among additional instructions.

Our app supports Windows 10 and newer, macOS Catalina (10.15) and later, Linux, and Android (12+ recommended).

## Build
To build the Tauri app, go inside `app` and run `npm install` to install dependencies. Make sure you have your [System Dependencies](https://tauri.app/start/prerequisites/#system-dependencies) to build Tauri properly.

Then, once you've done all that, inside the `app` directory, run `npm run tauri dev` to launch Auride!

> [!NOTE]
> For Linux users running proprietary NVIDIA drivers on Wayland, you may get the following error, "Failed to create GDM buffer of size 800x600: Invalid argument". If this happens, please run `env WEBKIT_DISABLE_DMABUF_RENDERER=1 GDK_BACKEND=x11 npm run tauri dev`. This has a performance cost, but will allow the app to run.


## Additional Instructions
### Domain
If you're running the app locally and plan to add functionality, please go to `/app/src-tauri/tauri.conf.js` and change the line under `windows` to `"url": "http://localhost:5173"` rather than Auride's main domain.

If you are not planning to add functionality and are only doing things on the app level, you can use the main Auride domain.