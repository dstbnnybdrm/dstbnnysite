import { ROOT } from "./utility.js";

const Themes = { DARK: "dark", LIGHT: "light" };
const TOGGLE_BUTTON = document.getElementById("theme-toggle");
const THEME_KEY = "theme";
const cachedTheme = localStorage.getItem(THEME_KEY);

/**
 * get the user's preferred theme.
 *
 * check local storage, fall back to the user's system preference, fall back to
 * light theme.
 *
 * @returns {Themes} the user's preferred theme
 */
function getCurrentTheme() {
    // if user has visited before check their preferred theme
    if (cachedTheme) {
        return cachedTheme;
    }

    // otherwise, use their system's preference
    const isSystemPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    return isSystemPreferenceDark //
        ? Themes.DARK
        : Themes.LIGHT;
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
 * update the TOGGLE_BUTTON's text and aria-label according to the given theme
 *
 * @param {Themes} theme
 */
function updateToggleButton(theme) {
    TOGGLE_BUTTON.ariaLabel = "current theme is " + theme.valueOf();
    TOGGLE_BUTTON.innerText = "theme: " + theme.valueOf();
}

export function update() {
    let currentTheme = getCurrentTheme();

    updateRoot(currentTheme);
    updateToggleButton(currentTheme);

    TOGGLE_BUTTON?.addEventListener("click", () => {
        const newTheme =
            currentTheme === Themes.DARK ? Themes.LIGHT : Themes.DARK;

        localStorage.setItem(THEME_KEY, newTheme.valueOf());
        updateRoot(newTheme);
        updateToggleButton(newTheme);

        currentTheme = newTheme;
    });
}
