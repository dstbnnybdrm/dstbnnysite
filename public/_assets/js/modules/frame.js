import { PageLayouts, currentPage } from "./utility.js";

/*
 * large portions of this module have been taken and modified from:
 *
 *      https://forum.melonland.net/index.php?topic=115
 *
 * thank you very much!
 */

/**
 * the key value to use for viewing pages within the
 * mainframe
 *
 * @type {string}
 */
const URL_PARAMETER = "p";
/** @type {?HTMLElement} the iframe holding the page's main content */
export const mainframe = document.getElementsByName("mainframe")[0];
/** @type {boolean} */
let isFirstLoad = true;

/**
 * update the URL, history, and title to reflect the page currently being viewed
 * within the mainframe
 *
 * @returns {undefined}
 */
export function updateHistory() {
    if (!mainframe) return;

    const mainframePageTitle = mainframe.contentDocument.title;

    if (isFirstLoad) {
        isFirstLoad = false;
        document.title = mainframePageTitle;
        return;
    }

    const location = mainframe.contentWindow.location.pathname;
    history.replaceState(null, "", "?" + URL_PARAMETER + "=" + location);

    // if (currentPage() == PageLayouts.BLOG) {
    //     document.title = mainframePageTitle + " — dstbnnyblog";
    // } else {
    //     document.title = mainframePageTitle + " — dstbnnnybdrm";
    // }
}

/**
 * check to see if a url parameter exists and then set the frame source to that
 * page.
 *
 * @param {string} defaultPage - the default page to set the frame source to
 * @returns {undefined}
 */
export function setSource(defaultPage) {
    if (!mainframe) return;

    const parameters = new URLSearchParams(window.location.search);
    const page = parameters.get(URL_PARAMETER);

    mainframe.src =
        page == null //
            ? defaultPage //
            : page; //

    updateHistory();
}

/**
 * dynamically update the height of main iframe according to its contents.
 *
 * @returns {undefined}
 */
export function updateSize() {
    if (!mainframe) return;

    const frameContent = mainframe?.contentWindow;

    // reset first (for when the resulting height is smaller than the initial)
    mainframe.height = "0";
    // add 5 extra pixels to prevent unwanted scrolling (which shouldn't happen
    // anyway, but it does lmao ¯\_(ツ)_/¯)
    mainframe.height = frameContent.document.body.scrollHeight + 5 + "px";
}
