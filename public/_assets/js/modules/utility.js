/*
 * general functions, var, and objects that could be needed anywhere.
 */

/** @type {string} */
export const HOME_URL = "/home.html";
/** @type {string} */
export const COMPONENTS_URL = "/_components/";
/** @type {string} */
export const DATA_URL = "/_data/";
/** @type {Array<?HTMLElement} */
export const BLOG_POST_LIST = document.querySelectorAll(".blog-navi__link");
/** @type {?HTMLElement} */
export const ROOT = document.documentElement;

/** @type {number} */
let viewportWidth = document.documentElement.clientWidth;

/**
 * unique IDs for each distinct page that has a main iframe. needed because each
 * may have their own unique behaviour.
 *
 * @enum {string}
 */
export const PageLayouts = Object.freeze({
    HUB: "hub",
    BLOG: "blog",
    CRAZY: "crazy",
});

/**
 * determine the current page layout
 *
 * @returns {PageLayouts} the unique ID for the current page
 */
export function currentPage() {
    const pathname = window.location.pathname;

    // this seems extra for now but maybe i'll have more PageLayouts in the
    // future lol
    for (let page in PageLayouts) {
        if (pathname.includes(PageLayouts[page])) {
            return PageLayouts[page];
        }
    }
    return PageLayouts.HUB;
}

/**
 * fetch a text file's contents as text.
 *
 * basically taken directly from this stackoverflow answer:
 *
 *      https://stackoverflow.com/a/52349344
 *
 * thank you very much!
 *
 *  @returns {Promise<string>} the file's contents
 */
export async function fetchAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

/**
 * fetch a JSON file's contents as an Object.
 *
 *  @returns {Promise<Object>} the file's contents
 */
export async function fetchJSON(url) {
    const request = new Request(url);
    const response = await fetch(request);
    const object = await response.json();
    return object;
}

function currentViewportWidth() {
    return document.documentElement.clientWidth;
}

export function viewportWidthChanged() {
    return viewportWidth != currentViewportWidth();
}

/**  @returns {undefined} */
export function updateViewportWidth() {
    viewportWidth = currentViewportWidth();
}
