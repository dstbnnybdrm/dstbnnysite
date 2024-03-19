/*
 * large portions of this module have been taken and modified from:
 *
 *      https://forum.melonland.net/index.php?topic=115
 *
 * thank you very much!
 */

const URL_PARAMETER = "p";
export const mainframe = document.getElementsByName("mainframe")[0];
let isFirstLoad = true;

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
export function setSource(defaultPage) {
    let parameters = new URLSearchParams(window.location.search);
    let page = parameters.get(URL_PARAMETER);

    mainframe.src =
        page == null //
            ? defaultPage //
            : page; //

    updateHistory();
}

// dynamically updates the height of main iframe
export function updateSize() {
    if (exists()) {
        return;
    }

    const frameContent = mainframe.contentWindow;

    // reset first, for when the resulting height is smaller than the initial
    mainframe.height = "0";
    // add 5 extra pixels to prevent unwanted scrolling (which shouldn't happen
    // anyway, but it does lmao)
    mainframe.height = frameContent.document.body.scrollHeight + 5 + "px";
}

export function exists() {
    return mainframe == null //
        ? false
        : true;
}
