import { initSidebar } from "./modules/mobile-sidebar.js";
import { initHub } from "./modules/hub.js";
import { initInnerFrame } from "./modules/inner-frame.js";

document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initHub();
    initInnerFrame();
});
