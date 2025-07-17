/** @type {?HTMLElement} */
export const button = document.getElementById("mobile-navi-button");

/** @type {?HTMLElement} */
const list = document.getElementById("mobile-navi-list");

/**
 * toggle the visibility of the navigation menu (only applicable to mobile!).
 *
 * @returns {undefined}
 */
export function toggleMenu() {
    list?.classList.toggle("mobile-navi__list_visible");
    if (button.ariaExpanded == "false") {
        button.ariaExpanded = "true";
        return;
    }
    button.ariaExpanded = "false";
}

/** @returns {boolean} */
export function isMenuOpen() {
    return list?.classList.contains("menu_visible")
        ? true //
        : false; //
}
