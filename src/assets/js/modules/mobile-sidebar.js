const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

export function initSidebar() {
    if (!sidebar) {
        return;
    }

    const openButton = document.getElementById("sidebar-open-button");
    const skipLink = document.getElementById("skip-link");

    openButton.addEventListener("click", open);
    skipLink.addEventListener("click", close);
    overlay.addEventListener("click", close);
}

export function isOpen() {
    return sidebar.dataset.open ? true : false;
}

/** make the mobile sidebar and its overlay visible */
function open() {
    sidebar.dataset.open = "";
    overlay.dataset.visible = "";
}

/** hide the mobile sidebar and its overlay */
export function close() {
    delete sidebar.dataset.open;
    delete overlay.dataset.visible;
}
