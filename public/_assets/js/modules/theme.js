import { ROOT } from "./utility.js";
import { mainframe } from "./frame.js";

const Themes = { DARK: "dark", LIGHT: "light" };
const TOGGLE_BUTTON = document.getElementById("theme-toggle");
const THEME_KEY = "theme";

/**
 * get the user's preferred theme.
 *
 * checks local storage, falls back to the user's system preference, falls back
 * to light theme.
 *
 * @returns {Themes} the user's preferred theme
 */
function getCurrentTheme() {
    // if user has visited just return their cached theme
    const cachedTheme = localStorage.getItem(THEME_KEY);
    if (cachedTheme) {
        console.log("using local storage");
        return cachedTheme;
    }

    // otherwise, use their system's preference
    console.log("using system preference");
    const isSystemPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    console.log("system preference is dark? " + isSystemPreferenceDark);

    return isSystemPreferenceDark == true //
        ? Themes.DARK
        : Themes.LIGHT;
}

export function updateFrame() {
    if (!mainframe) return;

    const frameDocument =
        mainframe.contentWindow.document || mainframe.contentDocument;
    const frameRoot = frameDocument.documentElement;

    frameRoot.dataset[THEME_KEY] = getCurrentTheme().valueOf();
}

/**
 * set the theme data attribute on the document root to the given theme
 *
 * @param {Themes} theme
 */
function updateRoot(theme) {
    ROOT.dataset[THEME_KEY] = theme.valueOf();
}

/**
 * update the TOGGLE_BUTTON's text and aria-label (if it exists) according to
 * the given theme
 *
 * @param {Themes} theme
 */
function updateButton(theme) {
    if (!TOGGLE_BUTTON) return;

    TOGGLE_BUTTON.ariaLabel = "current theme is " + theme.valueOf();
    TOGGLE_BUTTON.innerText = "theme: " + theme.valueOf();
}

/**
 *
 */
function toggle() {
    const currentTheme = getCurrentTheme();
    const newTheme =
        currentTheme === Themes.DARK //
            ? Themes.LIGHT
            : Themes.DARK;

    localStorage.setItem(THEME_KEY, newTheme);
    updateRoot(newTheme);
    updateButton(newTheme);
}

/**
 * load the user's preferred theme and update TOGGLE_BUTTON accordingly. and add
 * click event to TOGGLE_BUTTON.
 */
export function load() {
    let currentTheme = getCurrentTheme();

    updateRoot(currentTheme);
    updateButton(currentTheme);

    TOGGLE_BUTTON?.addEventListener("click", toggle);
}
