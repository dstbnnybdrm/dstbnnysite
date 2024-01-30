const LAYOUT_IDS = ["collection", "footer"];
const TAGLINES = ["enjoy yr stay"];
const URL_PARAMETER = "p";
const TEMPLATE_URL = "/_assets/template/";
const HOME_URL = "/home.html";

const mainframeElement = document.getElementById("mainframe");
const taglineElement = document.getElementById("tagline");
const naviLists = document.querySelectorAll(".navi__subnavi");

let isFirstLoad = true;

/*
 * basically taken directly from this stackoverflow answer:
 *
 * https://stackoverflow.com/a/52349344
 *
 * thank you friend, and if only i had learned this sooner i would have saved
 * hours of banging my head against the wall :')
 */
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

async function loadLayout() {
    for (const id of LAYOUT_IDS) {
        let element = document.getElementById(id);

        if (!element) {
            console.error("couldn't find " + id);
            continue;
        }

        let elementUrl = TEMPLATE_URL + id + ".html";

        element.innerHTML = await fetchHtmlAsText(elementUrl);
    }
}

function updateContentHeight() {
    if (mainframeElement == null) {
        console.error("couldn't find frame");
        return;
    }

    const frameContent = mainframeElement.contentWindow;

    mainframeElement.height = "0";
    mainframeElement.height = frameContent.document.body.scrollHeight + "px";

    console.log("content height updated: " + mainframeElement.height);
}

function updateHistory() {
    const mainframePageTitle = mainframeElement.contentDocument.title;

    if (isFirstLoad) {
        isFirstLoad = false;
        document.title = mainframePageTitle;
        return;
    }

    history.replaceState(
        null,
        "",
        "?" +
            URL_PARAMETER +
            "=" +
            mainframeElement.contentWindow.location.pathname,
    );

    document.title = mainframePageTitle;
}

// checks to see if a url parameter exists and sets the frame source to that page
function setMainframe() {
    let parameters = new URLSearchParams(window.location.search);
    let page = parameters.get(URL_PARAMETER);

    // sets frame source to page if url parameter is present,
    // otherwise default to home
    mainframeElement.src = page == null ? HOME_URL : page;
}

function randomiseTagline() {
    let index = Math.floor(Math.random() * TAGLINES.length);
    let random_tagline = TAGLINES[index];

    taglineElement.textContent = random_tagline;
}

function toggleNaviMenu() {
    naviLists.forEach((list) => {
        list.classList.toggle("navi__subnavi" + "_toggle_open");
    });
}

function isNaviMenuOpen() {
    if (naviLists[0].classList.contains("navi__subnavi" + "_toggle_open"))
        return true;

    return false;
}

window.onload = () => {
    mainframeElement.addEventListener("load", updateHistory, false);
    mainframeElement.addEventListener("load", updateContentHeight);
    mainframeElement.addEventListener("load", function (e) {
        if (isNaviMenuOpen()) toggleNaviMenu();
    });

    setMainframe();

    loadLayout();
    randomiseTagline();
};

// dynamically resize frame height
window.addEventListener("resize", updateContentHeight);

// set frame on back button presses too
window.addEventListener("popstate", function (e) {
    if (e.state !== null) {
        setMainframe();
    }
});
