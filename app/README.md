# Auride App
This is the source code for the Auride app. Currently, only the desktop app is supported, supporting Windows and Linux. Support for other platforms (e.g., macOS, Android, iOS & FreeBSD) are planned eventually.

All app releases are in the Canary phase, meaning they are in beta and not finished as of yet.

## Building
For convience, Auride uses the platforms native webview to display content & not have to maintain 2 codebases doing the same thing. On desktop, this is [webview/webview](https://github.com/webview/webview).

For building the desktop app, please get the following dependencies:
- Linux:
    - Debian/Ubuntu: `apt install libgtk-3-dev libwebkit2gtk-4.1-dev libgtk-3-0 libwebkit2gtk-4.1-0 cmake ninja`
    - Fedora: `dnf install gtk4-devel webkitgtk6.0-devel gtk4 webkitgtk6.0 cmake ninja`
    - We have first-class support for the Debian, Ubuntu and Fedora Linux distros - for your distro, please find the appropriate names for dependencies if you do not use these.
- Windows:
    - CMake: https://cmake.org/download/
    - Microsoft WebView2 (pre-installed on Windows 11 and the latest Windows 10 versions): https://developer.microsoft.com/en-us/microsoft-edge/webview2/
    - Ninja: https://github.com/ninja-build/ninja/releases (You will need to add this to your PATH)
- Instructions for other operating systems may be available at [webview/webview](https://github.com/webview/webview), but please note these are not officially supported OSes at this time.

Then, run `cmake -G Ninja -B build -S . -D CMAKE_BUILD_TYPE=Release` and `cmake --build build`. This should only take a few seconds, our app isn't big!