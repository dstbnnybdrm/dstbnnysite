/**
 * render-blocking function to load a cached theme, if it exists, ASAP on page
 * load.
 *
 * mostly borrowed from:
 *   https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/
 *
 */
(() => {
    const ROOT = document.documentElement;
    const THEME_KEY = "theme";
    const cachedTheme = localStorage.getItem(THEME_KEY);
    if (cachedTheme) {
        ROOT.dataset[THEME_KEY] = cachedTheme;
    }
})();
