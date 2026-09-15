## Auride Apps
> [!CAUTION]
> These releases are highly experimental and may contain major bugs, crashes, instability, and unfinished features.
>
> These are not published on the Google Play Store or App Store as of yet, but it is planned.

This is the source code for the Auride Android and iOS apps. To provide better UX on mobile devices and to avoid making "yet another web app", the Auride app is built on top of Flutter (w/ Dart).

For the web source code, check out the `web` folder!

> [!NOTE]
> While not out of the question, there is *no plans on porting this version to web or desktop as of right now*.

## Building
You can build on Windows, macOS, or Linux. You will need Android Studio and/or Xcode as we don't provide desktop builds of the Auride app. This may change but it's not guaranteed to.

> [!NOTE]
> To build iOS, you need macOS. This is a restriction of Apple, not Auride.
>
> https://developer.apple.com/xcode/

- Get the Flutter SDK for your OS at https://docs.flutter.dev/install/quick#install.
    - If you do not use VSCode or prefer installing manually, please see https://docs.flutter.dev/install/manual instead.

### Android
1. Get Android Studio at https://developer.android.com/studio
2. Install the Standard installation, as it will provide all the tools by default that we need
3. Once Android Studio installs, open it and go to the Virtual Device Manager tab.
    - That can be going to the hamburger menu in the top-left and going to `Tools->Device Manager` inside the IDE, or the 3 dots in the top right and clicking on "Virtual Device Manager".
4. Click on the + icon (Create new device). Create a new Android virtual machine, which Auride will install itself onto to run.
5. Then, in your terminal inside this directory, run `flutter run`. This will build and run the app on your device!

### iOS
TODO: i havent set this up yet