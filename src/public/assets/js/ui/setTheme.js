import { currentMonth } from "./pageLoader.js";

// the auride defaults
export function setGlobalTheme(theme, showPrideFlag) {
    // clear the style or buttons will have issues, especially when
    // switching from a light theme to a dark one (or vice versa)
    if (document.documentElement.hasAttribute("style")) {
        document.documentElement.removeAttribute("style");
    }

    // then set the theme
    if (theme === "Dark") {
        document.documentElement.style.setProperty('--background', '#1d1d1d');
        document.documentElement.style.setProperty('--main-color', '#ff869a');
        document.documentElement.style.setProperty('--main-color-darker', '#e1788a');
        document.documentElement.style.setProperty('--header-color', '#2d2d2d');
        document.documentElement.style.setProperty('--text', '#fff');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(255, 255, 255, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(255, 255, 255, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#363636');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#3d3d3d');
        document.documentElement.style.setProperty('--button-transparent-hover', '#2d2d2d');
        document.documentElement.style.setProperty('--success-color', '#00dc00');
        document.documentElement.style.setProperty('--warning-text', '#ffff00');
        document.documentElement.style.setProperty('--error-text', '#ff0000');
        document.documentElement.style.setProperty('--sidebar-text', '#fff');
        document.documentElement.style.setProperty('--banner-button-bg', '#000');
        document.documentElement.style.setProperty('--note-seperator', '#2d2d2d');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', '#000');
        document.documentElement.style.setProperty('--like-color', 'red');
        document.documentElement.style.setProperty('--renote-color', '#84dd00');
        document.documentElement.style.setProperty('--content-warning', '1d1d1d');
        document.documentElement.style.setProperty('--skeleton-start', '#404040');
        document.documentElement.style.setProperty('--skeleton-middle', '#303030');
        document.documentElement.style.setProperty('--skeleton-end', '#252525');
        document.documentElement.style.setProperty('--reply-background', '#303030');
        document.documentElement.style.setProperty('--reply-hovered-background', '#3f3f3f');
        document.documentElement.style.setProperty('--note-background', '#282828');
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/All_transparent.png";
        }
    } else if (theme === "Light") {
        document.documentElement.style.setProperty('--background', '#f5f5f5');
        document.documentElement.style.setProperty('--main-color', '#dd6075');
        document.documentElement.style.setProperty('--main-color-darker', '#b44d5d');
        document.documentElement.style.setProperty('--header-color', '#e0e0e0');
        document.documentElement.style.setProperty('--text', '#000');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(0, 0, 0, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(0, 0, 0, 0.7');
        document.documentElement.style.setProperty('--profile-picture-bg', '#fafafa');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#e5e5e5');
        document.documentElement.style.setProperty('--button-transparent-hover', '#f5f5f5');
        document.documentElement.style.setProperty('--success-color', '#28a745');
        document.documentElement.style.setProperty('--warning-text', '#ffc107');
        document.documentElement.style.setProperty('--error-text', '#dc3545');
        document.documentElement.style.setProperty('--sidebar-text', '#333');
        document.documentElement.style.setProperty('--banner-button-bg', '#fff');
        document.documentElement.style.setProperty('--note-seperator', '#e0e0e0');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7');
        document.documentElement.style.setProperty('--like-color', '#dc3545');
        document.documentElement.style.setProperty('--renote-color', '#28a745');
        document.documentElement.style.setProperty('--content-warning', 'rgb(255, 255, 255');
        document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
        document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
        document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
        document.documentElement.style.setProperty('--reply-background', '#fafafa');
        document.documentElement.style.setProperty('--reply-hovered-background', '#e5e5e5');
        document.documentElement.style.setProperty('--note-background', '#fff');
        document.documentElement.style.setProperty('--button-text', '#000');
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/All_transparent.png";
        }
    } else if (theme === "Mint (Light)") {
        document.documentElement.style.setProperty('--background', '#f0f8ff');
        document.documentElement.style.setProperty('--main-color', '#9be7c4');
        document.documentElement.style.setProperty('--main-color-darker', '#62c198');
        document.documentElement.style.setProperty('--header-color', '#e5f1f8');
        document.documentElement.style.setProperty('--text', '#222');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(34, 34, 34, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(34, 34, 34, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#e7f2fa');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#d1e4ef');
        document.documentElement.style.setProperty('--button-transparent-hover', '#e5f1f8');
        document.documentElement.style.setProperty('--success-color', '#28a745');
        document.documentElement.style.setProperty('--warning-text', '#ffc107');
        document.documentElement.style.setProperty('--error-text', '#dc3545');
        document.documentElement.style.setProperty('--sidebar-text', '#333');
        document.documentElement.style.setProperty('--banner-button-bg', '#ffffff');
        document.documentElement.style.setProperty('--note-seperator', '#e5f1f8');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
        document.documentElement.style.setProperty('--like-color', '#dc3545');
        document.documentElement.style.setProperty('--renote-color', '#28a745');
        document.documentElement.style.setProperty('--content-warning', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
        document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
        document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
        document.documentElement.style.setProperty('--reply-background', '#e7f2fa');
        document.documentElement.style.setProperty('--reply-hovered-background', '#d1e4ef');
        document.documentElement.style.setProperty('--note-background', '#fff');
        document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
        document.documentElement.style.setProperty('--button-text', '#000');
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/MintLightThemeLogo.png";
        }
    } else if (theme === "Mint (Dark)") {
        document.documentElement.style.setProperty('--background', '#18282d');
        document.documentElement.style.setProperty('--main-color', '#add8d0');
        document.documentElement.style.setProperty('--main-color-darker', '#8cc0b2');
        document.documentElement.style.setProperty('--header-color', '#203338');
        document.documentElement.style.setProperty('--text', '#e0e0e0');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(224, 224, 224, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(224, 224, 224, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#28383e');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#25353a');
        document.documentElement.style.setProperty('--button-transparent-hover', '#203338');
        document.documentElement.style.setProperty('--success-color', '#28a745');
        document.documentElement.style.setProperty('--warning-text', '#ffc107');
        document.documentElement.style.setProperty('--error-text', '#dc3545');
        document.documentElement.style.setProperty('--sidebar-text', '#f0f0f0');
        document.documentElement.style.setProperty('--banner-button-bg', '#000');
        document.documentElement.style.setProperty('--note-seperator', '#203338');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
        document.documentElement.style.setProperty('--like-color', '#dc3545');
        document.documentElement.style.setProperty('--renote-color', '#28a745');
        document.documentElement.style.setProperty('--content-warning', 'rgb(29, 29, 29)');
        document.documentElement.style.setProperty('--skeleton-start', '#404040');
        document.documentElement.style.setProperty('--skeleton-middle', '#303030');
        document.documentElement.style.setProperty('--skeleton-end', '#252525');
        document.documentElement.style.setProperty('--reply-background', '#28383e');
        document.documentElement.style.setProperty('--reply-hovered-background', '#25353a');
        document.documentElement.style.setProperty('--note-background', 'rgb(40, 40, 40)');
        document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/MintDarkThemeLogo.png";
        }
    } else if (theme === "High Contrast") {
        document.documentElement.style.setProperty('--background', 'black');
        document.documentElement.style.setProperty('--main-color', 'yellow');
        document.documentElement.style.setProperty('--main-color-darker', '#cccc00');
        document.documentElement.style.setProperty('--header-color', '#333333');
        document.documentElement.style.setProperty('--text', 'white');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(255, 255, 255, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(255, 255, 255, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#555555');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#444444');
        document.documentElement.style.setProperty('--button-transparent-hover', '#444444');
        document.documentElement.style.setProperty('--success-color', 'limegreen');
        document.documentElement.style.setProperty('--warning-text', 'yellow');
        document.documentElement.style.setProperty('--error-text', 'red');
        document.documentElement.style.setProperty('--sidebar-text', 'white');
        document.documentElement.style.setProperty('--banner-button-bg', 'white');
        document.documentElement.style.setProperty('--note-seperator', '#444444');
        document.documentElement.style.setProperty('--sidebar-button-border', 'white');
        document.documentElement.style.setProperty('--modal-background', '#222222');
        document.documentElement.style.setProperty('--like-color', 'limegreen');
        document.documentElement.style.setProperty('--renote-color', 'yellow');
        document.documentElement.style.setProperty('--content-warning', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--skeleton-start', '#333333');
        document.documentElement.style.setProperty('--skeleton-middle', '#444444');
        document.documentElement.style.setProperty('--skeleton-end', '#555555');
        document.documentElement.style.setProperty('--reply-background', '#404040');
        document.documentElement.style.setProperty('--reply-hovered-background', '#505050');
        document.documentElement.style.setProperty('--note-background', '#333333');
        document.documentElement.style.setProperty("--sidebar-create-note-button-hover", "#000");
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/HighContrastThemeLogo.png";
        }
    } else if (theme === "TransSocial Classic") {
        document.documentElement.style.setProperty('--background', '#ffb2a8');
        document.documentElement.style.setProperty('--main-color', '#ffb2a8');
        document.documentElement.style.setProperty('--main-color-darker', '#f0cfb6');
        document.documentElement.style.setProperty('--header-color', '#ffd9cb');
        document.documentElement.style.setProperty('--text', '#333');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(51, 51, 51, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(51, 51, 51, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#f0cfb6');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#ffe0d2');
        document.documentElement.style.setProperty('--button-transparent-hover', '#ffd9cb');
        document.documentElement.style.setProperty('--success-color', '#b3e8b3');
        document.documentElement.style.setProperty('--warning-text', '#e8b3b3');
        document.documentElement.style.setProperty('--error-text', '#e86d6d');
        document.documentElement.style.setProperty('--sidebar-text', '#333');
        document.documentElement.style.setProperty('--banner-button-bg', '#333');
        document.documentElement.style.setProperty('--note-seperator', '#ffd9cb');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', '#ffb2a8');
        document.documentElement.style.setProperty('--like-color', '#e86d6d');
        document.documentElement.style.setProperty('--renote-color', '#b3e8b3');
        document.documentElement.style.setProperty('--content-warning', 'rgb(255, 178, 168)');
        document.documentElement.style.setProperty('--skeleton-start', '#ffe0d2');
        document.documentElement.style.setProperty('--skeleton-middle', '#ffd9cb');
        document.documentElement.style.setProperty('--skeleton-end', '#ffb2a8');
        document.documentElement.style.setProperty('--reply-background', '#ffe0d2');
        document.documentElement.style.setProperty('--reply-hovered-background', '#fff0e8');
        document.documentElement.style.setProperty('--note-background', '#ffd9cb');
        document.documentElement.style.setProperty('--button-text', '#000');
        if (document.getElementById("HeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/TransSocialClassicThemeLogo.png";
        }
    } else if (theme === "Midnight Purple") {
        document.documentElement.style.setProperty('--background', '#221e2b');
        document.documentElement.style.setProperty('--main-color', '#957DAD');
        document.documentElement.style.setProperty('--main-color-darker', '#786491');
        document.documentElement.style.setProperty('--header-color', '#2c2738');
        document.documentElement.style.setProperty('--text', '#e2e2e2');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(226, 226, 226, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(226, 226, 226, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#3d384a');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#383246');
        document.documentElement.style.setProperty('--button-transparent-hover', '#2c2738');
        document.documentElement.style.setProperty('--success-color', '#5eb95e');
        document.documentElement.style.setProperty('--warning-text', '#f7e28c');
        document.documentElement.style.setProperty('--error-text', '#f0766a');
        document.documentElement.style.setProperty('--sidebar-text', '#ddd');
        document.documentElement.style.setProperty('--banner-button-bg', '#443f54');
        document.documentElement.style.setProperty('--note-seperator', '#383246');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', '#2a2535');
        document.documentElement.style.setProperty('--like-color', '#d362a4');
        document.documentElement.style.setProperty('--renote-color', '#41d4a5');
        document.documentElement.style.setProperty('--content-warning', 'rgb(34, 30, 43)');
        document.documentElement.style.setProperty('--skeleton-start', '#3d384a');
        document.documentElement.style.setProperty('--skeleton-middle', '#332e3e');
        document.documentElement.style.setProperty('--skeleton-end', '#282333');
        document.documentElement.style.setProperty('--reply-background', '#332e3e');
        document.documentElement.style.setProperty('--reply-hovered-background', '#3d384a');
        document.documentElement.style.setProperty('--note-background', '#2c2738');
        document.documentElement.style.setProperty("--hovered-button-text", "#fff");
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/MidnightPurpleThemeLogo.png";
        }
    } else if (theme === "Darker") {
        document.documentElement.style.setProperty('--background', '#171717');
        document.documentElement.style.setProperty('--main-color', '#ff869a');
        document.documentElement.style.setProperty('--main-color-darker', '#e1788a');
        document.documentElement.style.setProperty('--header-color', '#202020');
        document.documentElement.style.setProperty('--text', '#f0f0f0');
        document.documentElement.style.setProperty('--text-half-transparent', 'rgba(240, 240, 240, 0.5)');
        document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(240, 240, 240, 0.7)');
        document.documentElement.style.setProperty('--profile-picture-bg', '#2d2d2d');
        document.documentElement.style.setProperty('--sidebar-button-hover', '#303030');
        document.documentElement.style.setProperty('--button-transparent-hover', '#202020');
        document.documentElement.style.setProperty('--success-color', '#59f275');
        document.documentElement.style.setProperty('--warning-text', '#f2db59');
        document.documentElement.style.setProperty('--error-text', '#f27a7a');
        document.documentElement.style.setProperty('--sidebar-text', '#ddd');
        document.documentElement.style.setProperty('--banner-button-bg', '#333');
        document.documentElement.style.setProperty('--note-seperator', '#2d2d2d');
        document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
        document.documentElement.style.setProperty('--modal-background', '#1a1a1a');
        document.documentElement.style.setProperty('--like-color', '#ff6378');
        document.documentElement.style.setProperty('--renote-color', '#2ddbff');
        document.documentElement.style.setProperty('--content-warning', 'rgb(23, 23, 23)');
        document.documentElement.style.setProperty('--skeleton-start', '#333333');
        document.documentElement.style.setProperty('--skeleton-middle', '#282828');
        document.documentElement.style.setProperty('--skeleton-end', '#202020');
        document.documentElement.style.setProperty('--reply-background', '#282828');
        document.documentElement.style.setProperty('--reply-hovered-background', '#333333');
        document.documentElement.style.setProperty('--note-background', '#202020');
        if (document.getElementById("aurideHeaderLogo") && currentMonth === 6 && showPrideFlag === "Yes" || currentMonth === 6 && showPrideFlag === undefined) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
        } else if (document.getElementById("aurideHeaderLogo")) {
            document.getElementById("aurideHeaderLogo").src = "/assets/imgs/All_transparent.png";
        }
    }
}

// set a custom theme
export function setGlobalCustomTheme(colors) {
    document.documentElement.style.setProperty('--background', colors.background);
    document.documentElement.style.setProperty('--main-color', colors.mainColor);
    document.documentElement.style.setProperty('--main-color-darker', colors.mainColorDarker);
    document.documentElement.style.setProperty('--header-color', colors.headerColor);
    document.documentElement.style.setProperty('--text', colors.text);
    document.documentElement.style.setProperty('--text-half-transparent', colors.textHalfTransparent);
    document.documentElement.style.setProperty('--text-semi-transparent', colors.textSemiTransparent); // why were these wrong??
    document.documentElement.style.setProperty('--sidebar-button-hover', colors.sidebarButtonHover);
    document.documentElement.style.setProperty('--button-transparent-hover', colors.buttonTransparentHover);
    document.documentElement.style.setProperty('--success-color', colors.success);
    document.documentElement.style.setProperty('--warning-text', colors.warning);
    document.documentElement.style.setProperty('--error-text', colors.error);
    document.documentElement.style.setProperty('--sidebar-text', colors.sidebarText);
    document.documentElement.style.setProperty('--note-seperator', colors.noteSeperator);
    document.documentElement.style.setProperty('--like-color', colors.liked);
    document.documentElement.style.setProperty('--renote-color', colors.renoted);
    document.documentElement.style.setProperty('--reply-background', colors.replyBackground);
    document.documentElement.style.setProperty('--reply-hovered-background', colors.replyHoveredBackground);
    document.documentElement.style.setProperty('--note-background', colors.noteBackground);
    if (colors.buttonText) {
        document.documentElement.style.setProperty('--button-text', colors.buttonText);
    } else {
        document.documentElement.style.setProperty('--button-text', colors.text);
    }
    document.documentElement.style.setProperty('--hovered-button-text', colors.hoveredButtonText);
    document.documentElement.style.setProperty('--sidebar-create-note-button', colors.createNoteButton);
    document.documentElement.style.setProperty('--sidebar-create-note-button-hover', colors.createNoteButtonHover);
}