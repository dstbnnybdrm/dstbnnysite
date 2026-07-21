/*
 * lots of mainframe functionality taken and modified from:
 * https://forum.melonland.net/index.php?topic=115
 * thank you!
 */

import * as Utility from "./utility.js";
import * as Sidebar from "./mobile-sidebar.js";

let mainFrame;
const urlParameter = "page";
let isFirstLoad = true;

export function initHub() {
    mainFrame = document.getElementsByName("mainframe")[0];
    if (!mainFrame) {
        return;
    }

    mainFrame.addEventListener("load", function () {
        if (Sidebar.isOpen) {
            Sidebar.close();
        }
        mainFrame.focus();
        updateHistory();
    });
    setFrameSource();

    // handle back button presses
    window.addEventListener("popstate", function (event) {
        if (event.state !== null) {
            setFrameSource();
        }
    });

    window.addEventListener("load", randomizeSplash);
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

/**
 * check to see if a page parameter exists and if so set the main frame source
 * to that page
 */
function setFrameSource() {
    const parameters = new URLSearchParams(window.location.search);
    let page = parameters.get(urlParameter);

    if (page) {
        // security to stop URL scripts
        page = page.replace("javascript:", "");
        mainFrame.src = page;
    } else {
        mainFrame.src = "/home.html";
    }
}

/**
 * add query string to URL and update title to reflect the main frame's current
 * source.
 */
async function updateHistory() {
    const pageTitle = mainFrame.contentDocument.title;
    const pathName = mainFrame.contentWindow.location.pathname;

    history.replaceState(null, "", "?" + urlParameter + "=" + pathName);
    document.title = pageTitle;
}
