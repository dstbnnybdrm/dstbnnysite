const LAYOUT_IDS = ["collection", "footer"];
const TAGLINES = ["enjoy yr stay"];
const URL_PARAMETER = "p";
const TEMPLATE_URL = "/_assets/template/";
const HOME_URL = "/home.html";

const mainframe = document.getElementsByName("mainframe")[0];

const tagline = document.getElementById("tagline");
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

        if (!element) continue;

        let elementUrl = TEMPLATE_URL + id + ".html";

        element.innerHTML = await fetchHtmlAsText(elementUrl);
    }
}

function updateContentHeight() {
    if (mainframe == null) {
        console.error("couldn't find frame");
        return;
    }

    const frameContent = mainframe.contentWindow;

    mainframe.height = "0";
    mainframe.height = frameContent.document.body.scrollHeight + "px";

    console.log("content height updated: " + mainframe.height);
}

/* -- TODO -- */
function updateHistory() {
    const mainframePageTitle = mainframe.contentDocument.title;

    if (isFirstLoad) {
        isFirstLoad = false;
        document.title = mainframePageTitle;
        return;
    }

    console.log("I'M HERE");

    let location = "";

    // still slightly broken on hard refresh
    if (window.location.pathname == "/blog/") {
        location = mainframe.contentWindow.location.pathname.split("/blog")[1];
    } else {
        location = mainframe.contentWindow.location.pathname;
    }

    history.replaceState(null, "", "?" + URL_PARAMETER + "=" + location);

    document.title = mainframePageTitle;
}

// checks to see if a url parameter exists and sets the frame source to that page
function setMainframe(defaultPage) {
    let parameters = new URLSearchParams(window.location.search);
    let page = parameters.get(URL_PARAMETER);

    // sets frame source to page if url parameter is present,
    // otherwise default to specified page
    mainframe.src = page == null ? defaultPage : page;
    updateHistory();
}

function randomiseTagline() {
    let index = Math.floor(Math.random() * TAGLINES.length);
    let random_tagline = TAGLINES[index];

    tagline.textContent = random_tagline;
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
    mainframe.addEventListener("load", updateHistory, false);
    mainframe.addEventListener("load", updateContentHeight);
    mainframe.addEventListener("load", function () {
        if (isNaviMenuOpen()) toggleNaviMenu();
    });

    switch (window.location.pathname) {
        case "/blog/":
            let postNavButtons = document.querySelectorAll(".blog-posts__link");
            let recent_post_location = postNavButtons[0].getAttribute("href");
            setMainframe(recent_post_location);
            break;
        case "/":
            setMainframe(HOME_URL);
            randomiseTagline();
            break;
        default:
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
