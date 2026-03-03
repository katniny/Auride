#include <webview/webview.h>
#include <iostream>

#ifdef _WIN32
int WINAPI WinMain(HINSTANCE /*hInst*/, HINSTANCE /*hPrevInst*/,
                   LPSTR /*lpCmdLine*/, int /*nCmdShow*/) {
#else
int main() {
#endif
    try {
        webview::webview w(false, nullptr);
        w.set_title("auride");
        w.set_size(1280, 720, WEBVIEW_HINT_NONE);
        w.navigate("https://auride.xyz");
        w.run();
    } catch (const webview::exception &e) {
        std::cerr << e.what() << '\n';
        return 1;
    }

    return 0;
}