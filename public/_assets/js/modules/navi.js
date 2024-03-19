// for toggling small screen navigation menu
const naviButton = document.getElementById("navi-button");
const naviMenu = document.getElementById("navi-menu");

export function toggleMenu() {
    naviMenu.classList.toggle("is-visible");
    if (naviButton.ariaExpanded == "false") {
        naviButton.ariaExpanded = "true";
        return;
    }
    naviButton.ariaExpanded = "false";
}

export function isMenuOpen() {
    return naviMenu.classList.contains("is-visible")
        ? true //
        : false; //
}
