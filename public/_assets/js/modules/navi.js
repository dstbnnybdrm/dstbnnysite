/** @type {?HTMLElement} */
export const button = document.getElementById("navi-button");

/** @type {?HTMLElement} */
const menu = document.getElementById("navi-menu");

/**
 * toggle the visibility of the navigation menu (only applicable to mobile!).
 *
 * @returns {undefined}
 */
export function toggleMenu() {
    menu?.classList.toggle("is-visible");
    if (button.ariaExpanded == "false") {
        button.ariaExpanded = "true";
        return;
    }
    button.ariaExpanded = "false";
}

/** @returns {boolean} */
export function isMenuOpen() {
    return menu?.classList.contains("is-visible")
        ? true //
        : false; //
}
