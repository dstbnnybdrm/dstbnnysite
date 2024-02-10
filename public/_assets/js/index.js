/*
 * portions of this code have been taken and modified from:
 *
 * https://forum.melonland.net/index.php?topic=115
 *
 * thank you very much!
 */

const LAYOUT_IDS = ["collection", "footer"];
const TAGLINES = ["enjoy yr stay", "<3 <3 <3", "proof of my existence"];
const URL_PARAMETER = "p";
const TEMPLATE_URL = "/_assets/template/";
const HOME_URL = "/home.html";

const mainframe = document.getElementsByName("mainframe")[0];

const tagline = document.getElementById("tagline");
const naviMenu = document.querySelectorAll(".navi__menu");

let isFirstLoad = true;

/*
 * basically taken directly from this stackoverflow answer:
 *
 * https://stackoverflow.com/a/52349344
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
function updateContentHeight() {
    if (mainframe == null) {
        // console.error("couldn't find frame");
        return;
    }

    const frameContent = mainframe.contentWindow;

    // reset first, for when the resulting height is smaller than the initial
    mainframe.height = "0";
    mainframe.height = frameContent.document.body.scrollHeight + "px";
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

    // sets frame source to page if url parameter is present,
    // otherwise default to specified page
    mainframe.src =
        page == null //
            ? defaultPage //
            : page; //

    updateHistory();
}

// chooses random string to display on main layout
function randomiseTagline() {
    let index = Math.floor(Math.random() * TAGLINES.length);
    let random_tagline = TAGLINES[index];

    tagline.textContent = random_tagline;
}

function toggleNaviMenu() {
    naviMenu[0].classList.toggle("is-visible");
}

function isNaviMenuOpen() {
    return naviMenu[0].classList.contains("is-visible")
        ? true //
        : false; //
}

window.onload = () => {
    // page setup depending on if blog/main/etc.
    switch (window.location.pathname) {
        case "/blog/":
            let postNavButtons = document.querySelectorAll(".navi__link");
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

    if (mainframe != null) {
        mainframe.addEventListener("load", updateHistory);
        mainframe.addEventListener("load", updateContentHeight);

        // auto-close mobile navigation menu after switching pages
        mainframe.addEventListener("load", function () {
            if (isNaviMenuOpen()) toggleNaviMenu();
        });
    }

    loadLayout();
};

// dynamically resize frame height
window.addEventListener("resize", updateContentHeight);

// set frame on back button presses too
window.addEventListener("popstate", function (e) {
    if (e.state !== null) {
        setMainframe();
    }
});
