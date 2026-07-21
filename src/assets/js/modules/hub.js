import * as Utility from "./utility.js";
import * as Sidebar from "./mobile-sidebar.js";

const mainFrame = document.getElementsByName("mainframe")[0];
const urlParameter = "page";
let isFirstLoad = true;

export function initHub() {
    randomizeSplash();

    if (!mainFrame) {
        return;
    }

    setSource();

    // i.e. when the main frame's source changes
    mainFrame.addEventListener("load", function () {
        if (isFirstLoad) {
            isFirstLoad = false;
            return;
        }

        if (Sidebar.isOpen) {
            Sidebar.close();
        }

        mainFrame.focus();
        updateHistory();
    });
}

/**
 * choose a random splash text from a data file and load it into the
 * corresponding HTML element
 */
async function randomizeSplash() {
    const splashElement = document.getElementById("splash-text");

    if (!splashElement) {
        return;
    }

    const splashesURL = "/assets/js/data/splash-text.json";
    const splashes = await Utility.fetchJSON(splashesURL);
    const index = Math.floor(Math.random() * splashes.texts.length);
    const randomSplash = splashes.texts[index];

    splashElement.innerHTML = randomSplash;
}

function setSource() {
    const parameters = new URLSearchParams(window.location.search);
    const page = parameters.get(urlParameter);

    if (page) {
        mainFrame.src = page;
    }
}

/**
 * add query string to URL and update title to reflect the main frame's current
 * source.
 *
 * taken and modified from: https://forum.melonland.net/index.php?topic=115
 * thank you!
 */
function updateHistory() {
    const pageTitle = mainFrame.contentDocument.title;
    const pathName = mainFrame.contentWindow.location.pathname;
    // const fileName = pathName.replace(/^\/|\/$/g, "");
    // const fileName = pathName.replace(/\//, "");

    // pathname.replace(/\//, "")
    history.replaceState(null, "", "?" + urlParameter + "=" + pathName);
    document.title = pageTitle;
}
