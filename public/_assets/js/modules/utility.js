/*
 * general functions, var, and objects that could be needed anywhere.
 */

/** @type {string} */
export const HOME_URL = "/home.html";
/** @type {string} */
export const TEMPLATE_URL = "/_assets/template/";
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
    MAIN: "main",
    BLOG: "blog",
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
        if (pathname.includes(PageLayouts[page])) return PageLayouts[page];
    }
    return PageLayouts.MAIN;
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
