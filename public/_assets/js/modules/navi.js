// for toggling small screen navigation menu
const button = document.getElementById("navi-button");
const menu = document.getElementById("navi-menu");

export function toggleMenu() {
    menu.classList.toggle("is-visible");
    if (button.ariaExpanded == "false") {
        button.ariaExpanded = "true";
        return;
    }
    button.ariaExpanded = "false";
}

export function isMenuOpen() {
    return menu.classList.contains("is-visible")
        ? true //
        : false; //
}
