/** @type {?HTMLElement} */
export const openButton = document.getElementById("navi-open-button");

/** @type {?HTMLElement} */
export const closeButton = document.getElementById("navi-close-button");

export const overlay = document.getElementById("navi-overlay");

/** @type {?HTMLElement} */
const navi = document.getElementById("navi");

/**
 * toggle the visibility of the navigation menu (only applicable to mobile!).
 *
 * @returns {undefined}
 */
export function close() {
    // toggle visibility
    navi.classList.remove("navi_open");
    overlay.classList.remove("navi-overlay_open");
    // button.ariaExpanded = "false";
    console.log("close navi");
}

export function open() {
    // toggle visibility
    navi.classList.add("navi_open");
    overlay.classList.add("navi-overlay_open");
    // button.ariaExpanded = "true";
    console.log("open navi");
}

/** @returns {boolean} */
export function isMenuOpen() {
    return list?.classList.contains("menu_visible")
        ? true //
        : false; //
}
