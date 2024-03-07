/*
 * portions of this code regarding iframes and history have been taken and
 * modified from:
 *
 *      https://forum.melonland.net/index.php?topic=115
 *
 * thank you very much!
 */

const LAYOUT_IDS = ["marquee", "footer"];
const SPLASHES = [
    "enjoy yr stay",
    "<3 <3 <3",
    "proof of my existence",
    "take care of yourself!",
    'a <a href="/closet/butterfly.html">butterfly</a> \
        perches itself atop your fingertip',
    "home to <a>Lorna</a>",
    "picture that. in your dreams.",
    ":3c",
    "be yourself, violently, and unabashedly",
    "the internet is dead!",
    "St. Jack forever and ever",
    "hikkikimori hours",
    "<3 <3 <3 <3 <3 <3",
    "as long the Earth, Sun, and Moon exist",
    "when you come back i'll still be here",
    "see you at home!",
    ">:3c",
];
const URL_PARAMETER = "p";
const TEMPLATE_URL = "/_assets/template/";
const HOME_URL = "/home.html";

const mainframe = document.getElementsByName("mainframe")[0];
let viewportWidth = document.documentElement.clientWidth;

// for toggling small screen navigation menu
const naviButton = document.getElementById("navi-button");
const naviMenu = document.getElementById("navi-menu");

const splash = document.getElementById("splash");

let isFirstLoad = true;

/*
 * basically taken directly from this stackoverflow answer:
 *
 *      https://stackoverflow.com/a/52349344
 *
 * thank you very much! if only i had learned this sooner i would have saved
 * hours of banging my head against the wall :')
 */
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

// loads the templated major layout sections (ex. footer) if applicable
async function loadLayout() {
    for (const id of LAYOUT_IDS) {
        let element = document.getElementById(id);
        if (!element) continue;

        let elementUrl = TEMPLATE_URL + id + ".html";

        element.innerHTML = await fetchHtmlAsText(elementUrl);
    }
}

// dynamically updates the height of main iframe
function updateFrameSize() {
    if (mainframe == null) {
        return;
    }

    const frameContent = mainframe.contentWindow;

    // reset first, for when the resulting height is smaller than the initial
    mainframe.height = "0";
    // add 5 extra pixels to prevent unwanted scrolling (which shouldn't happen
    // anyway, but it does lmao)
    mainframe.height = frameContent.document.body.scrollHeight + 5 + "px";
}

/*
 * updates the URL and history to specify the page currently viewing within the
 * mainframe
 */
function updateHistory() {
    const mainframePageTitle = mainframe.contentDocument.title;

    if (isFirstLoad) {
        isFirstLoad = false;
        document.title = mainframePageTitle;
        return;
    }

    let location = mainframe.contentWindow.location.pathname;
    history.replaceState(null, "", "?" + URL_PARAMETER + "=" + location);

    document.title = mainframePageTitle;
}

// checks to see if a url parameter exists and sets the frame source to that page
function setMainframe(defaultPage) {
    let parameters = new URLSearchParams(window.location.search);
    let page = parameters.get(URL_PARAMETER);

    mainframe.src =
        page == null //
            ? defaultPage //
            : page; //

    updateHistory();
}

// chooses random string to display on page header
function randomiseTagline() {
    let index = Math.floor(Math.random() * SPLASHES.length);
    let random_splash = SPLASHES[index];

    splash.innerHTML = random_splash;
}

function toggleNaviMenu() {
    naviMenu.classList.toggle("is-visible");
    if (naviButton.ariaExpanded == "false") {
        naviButton.ariaExpanded = "true";
        return;
    }
    naviButton.ariaExpanded = "false";
}

function isNaviMenuOpen() {
    return naviMenu.classList.contains("is-visible")
        ? true //
        : false; //
}

/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
function calculateCurrentTheme(localStorageTheme, isSystemPreferenceDark) {
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
 * Utility function to update the button text and aria-label.
 */
function updateThemeToggleButton(button, themePreference) {
    if (button == null) {
        return;
    }
    // // use an aria-label if you are omitting text on the button
    button.ariaLabel = "current theme is " + themePreference;
    button.innerText = "theme: " + themePreference;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

window.onload = () => {
    const themeToggleButton = document.getElementById("theme-toggle");
    const localStorageTheme = localStorage.getItem("theme");
    const isSystemPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    let currentTheme = calculateCurrentTheme(
        localStorageTheme,
        isSystemPreferenceDark,
    );

    updateThemeToggleButton(themeToggleButton, currentTheme);
    updateTheme(currentTheme);

    if (themeToggleButton !== null) {
        themeToggleButton.addEventListener("click", (event) => {
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            localStorage.setItem("theme", newTheme);
            updateThemeToggleButton(themeToggleButton, newTheme);
            updateTheme(newTheme);

            currentTheme = newTheme;
        });
    }

    // page setup depending on if blog/main/etc.
    switch (window.location.pathname) {
        case "/blog/":
            let postNavButtons = document.querySelectorAll(".blog-navi__link");
            let recent_post_location = postNavButtons[1].getAttribute("href");
            setMainframe(recent_post_location);
            break;
        case "/":
            setMainframe(HOME_URL);
            randomiseTagline();
            break;
        default:
            break;
    }

    // update mainframe if on current page
    if (mainframe != null) {
        mainframe.addEventListener("load", updateHistory);
        mainframe.addEventListener("load", updateFrameSize);

        // auto-close mobile navigation menu after switching pages
        mainframe.addEventListener("load", function () {
            if (isNaviMenuOpen()) toggleNaviMenu();
        });
    }

    // load content of major layout sections (footer, collection, etc.)
    loadLayout();
};

// dynamically resize frame size on viewport width changes
window.addEventListener("resize", function () {
    if (viewportWidth != document.documentElement.clientWidth) {
        updateFrameSize();
    }
    viewportWidth = document.documentElement.clientWidth;
});
