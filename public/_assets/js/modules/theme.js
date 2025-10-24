/*
 * lots of the code here is inspired by and borrowed from these two sources:
 *
 *      https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f
 *
 *      https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/
 *
 * thanks a bunch!
 */

import { ROOT } from "./utility.js";
import { mainframe } from "./frame.js";

/** @enum {string} */
const Themes = Object.freeze({ DARK: "dark", LIGHT: "light" });
/** @type {HTMLElement} */
const TOGGLE_BUTTON = document.getElementById("theme-toggle");
/** @type {string} */
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
        return cachedTheme;
    }

    // otherwise, use their system's preference
    const isSystemPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    return isSystemPreferenceDark == true //
        ? Themes.DARK
        : Themes.LIGHT;
}

/**
 * set the theme data attribute on the mainframe's root to the given theme
 *
 * @param {Themes}
 * @returns {undefined}
 */
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
 * @param {Themes}
 * @returns {undefined}
 */
function updateRoot(theme) {
    ROOT.dataset[THEME_KEY] = theme.valueOf();
    updateFrame();
}

/**
 * update the TOGGLE_BUTTON's text and aria-label according to the given theme.
 *
 * @param {Themes} theme
 * @returns {undefined}
 */
function updateButton(theme) {
    if (!TOGGLE_BUTTON) return;

    TOGGLE_BUTTON.ariaLabel = "current theme is " + theme.valueOf();
    // TOGGLE_BUTTON.innerText = "theme: " + theme.valueOf();
}

/**
 * change the current theme to the other alternative and cache it in local
 * storage as the user's preference.
 *
 * @returns {undefined}
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
 * load the user's preferred theme and update TOGGLE_BUTTON accordingly.
 * should only have to run this once per page load.
 *
 * @returns {undefined}
 */
export function load() {
    let currentTheme = getCurrentTheme();

    updateRoot(currentTheme);
    updateButton(currentTheme);

    TOGGLE_BUTTON?.addEventListener("click", toggle);
}
