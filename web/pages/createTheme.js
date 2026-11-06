import { domToPng } from "modern-screenshot";
import { loadThemesPopup } from "../ui/modals/loadTheme";
import { saveThemePopup } from "../ui/modals/saveTheme";
import { setCustomTheme, setDefaultTheme } from "../ui/setTheme";
import { faIcon } from "../utils/faIcon";
import { publishThemePopup } from "../ui/modals/publishTheme";

export default function issuesPage() {
    document.title = "Create Theme | Auride";
    const el = document.createElement("div");

    // we want to load the custom theme, to make changes apparent
    setDefaultTheme("Custom");

    // sections
    const sections = {
        "changes": {
            "logoMainColor": {
                "cssVal": "logo-base-color",
                "dbVal": "logoBaseColor",
                "defaultValue": "#fff",
                "title": "Logo Main Color",
                "description": "The main color for the Auride logo in the header."
            },
            "logoAccentColor": {
                "cssVal": "logo-accent-color",
                "dbVal": "logoAccentColor",
                "defaultValue": "#ffde59",
                "title": "Logo Accent Color",
                "description": "The secondary color for the Auride logo in the header."
            },
            "background": {
                "cssVal": "background",
                "defaultValue": "#1d1d1d",
                "title": "Page Background",
                "description": "The page background color, used outside of the sticky UI."
            },
            "mainColor": {
                "cssVal": "main-color",
                "defaultValue": "#ef97be",
                "title": "Main Color",
                "description": "The main color for your theme, used everywhere - namely outlines, buttons, and links."
            },
            "mainColorDarker": {
                "cssVal": "main-color-darker",
                "defaultValue": "#e1788a",
                "title": "Main Color Darker",
                "description": "The darker main color, used for things such as hovered links and the sidebar \"Create\" button. This should always be a darker shade of your main color."
            },
            "headerColor": {
                "cssVal": "header-color",
                "defaultValue": "#2d2d2d",
                "title": "Sticky UI Color",
                "description": "The color for sticky UI, such as the sidebar and header. This should be slightly lighter/darker than the page background."
            },
            "text": {
                "cssVal": "text",
                "defaultValue": "#fff",
                "title": "Page Text",
                "description": "The default page text color, used nearly everywhere."
            },
            "profilePictureBackground": {
                "cssVal": "profile-picture-bg",
                "defaultValue": "#363636",
                "title": "Profile Picture & Banner Background",
                "description": "The background for profile pictures and banners, seen when they're loading or below transparency."
            },
            "sidebarButtonHover": {
                "cssVal": "sidebar-button-hover",
                "defaultValue": "#3d3d3d",
                "title": "Sidebar Button Hover",
                "description": "The background color of the buttons on the sidebar when being hovered."
            },
            "buttonTransparentHover": {
                "cssVal": "button-transparent-hover",
                "defaultValue": "#2d2d2d",
                "title": "Transparent Buttons Hover",
                "description": "The hovered background color of buttons with no background color. This should be easy to see against the header color."
            },
            "successColor": {
                "cssVal": "success-color",
                "defaultValue": "#00dc00",
                "title": "Success Text Color",
                "description": "The text color when something is successful, such as the user changing their email."
            },
            "warningColor": {
                "cssVal": "warning-text",
                "defaultValue": "#ffde59",
                "title": "Warning Text Color",
                "description": "The text color when something might be unforeseen, such as a color not being visible."
            },
            "errorColor": {
                "cssVal": "error-text",
                "defaultValue": "#ff0000",
                "title": "Error Text Color",
                "description": "The text color when something goes wrong, such as a failure to upload an image."
            },
            "sidebarText": {
                "cssVal": "sidebar-text",
                "defaultValue": "#fff",
                "title": "Sidebar Text Color",
                "description": "The text color of the sidebar, useful if your sidebar color doesn't work with your main text color."
            },
            "bannerButtonBackground": {
                "cssVal": "banner-button-bg",
                "defaultValue": "#000",
                "title": "Banner Button Background",
                "description": "The background for buttons against a banner, such as the login prompt."
            },
            "noteSeperator": {
                "cssVal": "note-seperator",
                "defaultValue": "#2d2d2d",
                "title": "Note Seperator",
                "description": "The border of notes."
            },
            "sidebarButtonBorder": {
                "cssVal": "sidebar-button-border",
                "defaultValue": "transparent",
                "title": "Sidebar Button Border",
                "description": "The border for buttons on the sidebar when not being hovered. Useful for high contrast themes. Do not change if you want it to be transparent."
            },
            "likeColor": {
                "cssVal": "like-color",
                "defaultValue": "red",
                "title": "Love Color",
                "description": "The color for when a user loves a note."
            },
            "renoteColor": {
                "cssVal": "renote-color",
                "defaultValue": "#84dd00",
                "title": "Renote Color",
                "description": "The color for when a user renotes a note."
            },
            "contentWarning": {
                "cssVal": "content-warning",
                "defaultValue": "#1d1d1d",
                "title": "Content Warning Overlay",
                "description": "The content warning overlay, such as blurring NSFW. This should work well underneath your text color."
            },
            "replyBackground": {
                "cssVal": "reply-background",
                "defaultValue": "#303030",
                "title": "Reply Background",
                "description": "The background color for the reply prompt. Despite the name, it is not the background color for replies."
            },
            "replyHoveredBackground": {
                "cssVal": "reply-hovered-background",
                "defaultValue": "#3f3f3f",
                "title": "Reply Background Hovered",
                "description": "The background color when the reply prompt is being hovered."
            },
            "noteBackground": {
                "cssVal": "note-background",
                "defaultValue": "#282828",
                "title": "Note Background",
                "description": "The background color for notes."
            },
            "buttonText": {
                "cssVal": "button-text",
                "defaultValue": "#fff",
                "title": "Button Text Color",
                "description": "The default text color for buttons."
            },
            "hoveredButtonText": {
                "cssVal": "hovered-button-text",
                "defaultValue": "#000",
                "title": "Hovered Button Text Color",
                "description": "The text color for buttons when they're being hovered."
            },
            "sidebarCreateNoteButton": {
                "cssVal": "sidebar-create-note-button",
                "defaultValue": "#fff",
                "title": "Sidebar Create Note Button Text",
                "description": "The default text color for the sidebar Create Note button."
            },
            "sidebarCreateNoteButtonHover": {
                "cssVal": "sidebar-create-note-button-hover",
                "defaultValue": "#fff",
                "title": "Sidebar Create Note Hovered Button Text",
                "description": "The text color for the sidebar Create Note button when being hovered."
            }
        }
    }

    // TODO now: allow publishing, allow upgrading old theme,
    // when publishing publish a screenshot of the theme,
    // create user studio
    //
    // TODO: add rating system, add way to report
    // and allow navigating pages while editing theme.
    el.innerHTML = `
        <h2>Create your own theme! <small>(BETA)</small></h2>
        <p class="description">
            Create your own Auride theme to use or show off, or both!
            The theme creator is in beta, there will be many improvements to come.
        </p>
        <div class="themeInteractions">
            <button id="saveTheme">Save Your Theme</button>
            <button id="loadTheme">Load a Saved Theme</button>
            <button id="applyTheme">Apply Your Theme Without Publishing</button>
            <button id="publishTheme">Publish Your Theme</button>
        </div>
        <div class="themeNotices">
            <p class="autoSave">Theme auto-saved.</p>
            <p class="themePublishWarning warning" style="display: none;">Theme loaded: <span class="themeTracker success"></span>. Publishing your theme will overwrite your public version automatically. Please save as a new theme to prevent this.</p>
        </div>

        <div class="divider"></div>

        <div class="themeEditor"></div>

        <div class="divider"></div>

        <p class="scrollToTopPrompt">You've reached the bottom! Consider applying your theme for testing (recommended), saving or publishing your theme!</p>
        <button id="scrollToTop">Scroll to Top for Options</button>
    `;

    // create sections
    const themeEditor = el.querySelector(".themeEditor");
    Object.entries(sections).forEach(section => {
        Object.entries(section[1]).forEach(themeChange => {
            const changeInfo = themeChange[1];
            // create html
            const html = `
                <div class="section">
                    <div class="applyFlex">
                        <input type="color" value="${changeInfo.defaultValue}" id="changing-${changeInfo.cssVal}" au-raw-css-val="${changeInfo.cssVal}" />
                        <p class="changingWhat">${changeInfo.title}</p>
                    </div>
                    <p class="description">${changeInfo.description}</p>
                </div>
            `;

            // append
            themeEditor.innerHTML += html;

            // change color when it changes
            const colorInputs = el.querySelectorAll("input[type=color]");
            colorInputs.forEach(input => {
                // get the inputs raw css value
                const rawCssVal = input.getAttribute("au-raw-css-val");

                input.addEventListener("input", function() {
                    console.log(this.value);
                    document.documentElement.style.setProperty(`--${rawCssVal}`, this.value);
                });
            });
        });
    });

    // scroll to bottom
    const scrollToTopBtn = el.querySelector("#scrollToTop");
    scrollToTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // allow getting theme colors
    function getThemeColors() {
        const colors = {};
        el.querySelectorAll("input[type=color]").forEach(input => {
            const cssVal = input.getAttribute("au-raw-css-val");
            colors[cssVal] = input.value;
        });
        return colors;
    }

    // allow saving theme
    const saveThemeBtn = el.querySelector("#saveTheme");
    const themeTracker = el.querySelector(".themeTracker");
    saveThemeBtn.onclick = () => {
        saveThemePopup(getThemeColors(), themeTracker.textContent);
    };

    // allow loading theme
    const loadThemeBtn = el.querySelector("#loadTheme");
    loadThemeBtn.onclick = async () => {
        loadThemeBtn.innerHTML = `${faIcon("solid", "circle-notch", "spin").outerHTML} Working...`;
        loadThemeBtn.style.opacity = "0.5";
        await loadThemesPopup();
        loadThemeBtn.innerHTML = `Load a Saved Theme`;
        loadThemeBtn.style.opacity = "1";
    };

    // apply theme
    const applyThemeBtn = el.querySelector("#applyTheme");
    applyThemeBtn.onclick = async () => {
        await saveThemePopup(getThemeColors(), themeTracker.textContent);
        setCustomTheme(getThemeColors());
    };

    // allow publishing theme
    const publishThemeBtn = el.querySelector("#publishTheme");
    publishThemeBtn.onclick = async () => {
        await publishThemePopup(getThemeColors(), themeTracker.textContent);
    };

    return el;
}