## Auride Apps
This is the Auride source code for the mobile and desktop apps. For simplicity, they are built on top of Tauri with changes in Auride's client to make it more friendly to their respective platforms.

## Building
Building works on Windows, macOS, and Linux.
- Get the dependencies
    - Windows: [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), [WebView2 (on older Windows 10 versions)](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section), VBScript, [Rust](https://www.rust-lang.org/tools/install) and [NodeJS](https://nodejs.org/).
    - macOS: Xcode from the [Mac App Store](https://apps.apple.com/gb/app/xcode/id497799835?mt=12) or the [Apple Developer Website](https://developer.apple.com/xcode/resources/)
    - Linux (Debian/Ubuntu): `apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`
- Get our JavaScript dependencies with `npm install`
- Set up the frontend in `web`. See [CONTRIBUTING.MD](../CONTRIBUTING.md) to see how to do that.
- Then back here, run `npx startAuride.js`

Please do not run the normal Tauri app startup, we build and set up Auride automagically. But when building, you can still use `npm run tauri build` after running `npx startAuride.js` for first-time setup.

If you're building on mobile, please follow https://tauri.app/start/prerequisites/#configure-for-mobile-targets to see how to configure your system to build.
    - To build iOS, you will need access to macOS.