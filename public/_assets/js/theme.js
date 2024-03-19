/**
 * calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
function getCurrentTheme(localStorageTheme, isSystemPreferenceDark) {
    if (localStorageTheme !== null) {
        console.log("using local storage theme: " + localStorageTheme);
        return localStorageTheme;
    }

    if (isSystemPreferenceDark) {
        console.log("using system preference theme: dark");
        return "dark";
    }

    console.log("using system preference theme: light");
    return "light";
}

/**
 * update the button text and aria-label.
 */
function updateToggleButton(button, themePreference) {
    if (button == null) {
        return;
    }
    // // use an aria-label if you are omitting text on the button
    button.ariaLabel = "current theme is " + themePreference;
    button.innerText = "theme: " + themePreference;
}

/**
 * update the theme setting on the html tag
 */
function updateHtml(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

export function update() {
    const themeToggleButton = document.getElementById("theme-toggle");
    const localStorageTheme = localStorage.getItem("theme");
    const isSystemPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    let currentTheme = getCurrentTheme(
        localStorageTheme,
        isSystemPreferenceDark,
    );

    updateToggleButton(themeToggleButton, currentTheme);
    updateHtml(currentTheme);

    if (themeToggleButton !== null) {
        themeToggleButton.addEventListener("click", (event) => {
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            localStorage.setItem("theme", newTheme);
            updateToggleButton(themeToggleButton, newTheme);
            updateHtml(newTheme);

            currentTheme = newTheme;
        });
    }
}
