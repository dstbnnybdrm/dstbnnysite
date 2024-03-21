(() => {
    const ROOT = document.documentElement;
    const THEME_KEY = "theme";
    const cachedTheme = localStorage.getItem(THEME_KEY);
    if (cachedTheme) {
        console.log("using cached theme: " + cachedTheme);
        ROOT.dataset[THEME_KEY] = cachedTheme;
    } else console.log("using system theme");
})();
