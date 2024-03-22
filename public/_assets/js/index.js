/*
 * hi!
 *
 * if you're looking here to see how i did something please just know that i
 * have little to no clue what i am doing! lmao
 *
 * but i try to list sources i use whenever i can, so feel free to check those
 * out!
 */

import {
    HOME_URL,
    PageLayouts,
    currentPage,
    updateViewportWidth,
    viewportWidthChanged,
} from "./modules/utility.js";
import * as Theme from "./modules/theme.js";
import * as Navi from "./modules/navi.js";
import * as Frame from "./modules/frame.js";
import * as Layout from "./modules/layout.js";

// load user's preferred theme
window.addEventListener("DOMContentLoaded", Theme.load);

Navi.button?.addEventListener("click", Navi.toggleMenu);

// page set up
window.addEventListener("load", () => {
    // set up page depending on which layout it should have
    let frameSource;
    switch (currentPage()) {
        case PageLayouts.BLOG:
            // set frame to most recent blog post
            const blogPostList = document.querySelectorAll(".blog-navi__link");
            const mostRecentBlogPost = blogPostList[1].getAttribute("href");
            frameSource = mostRecentBlogPost;
            break;
        case PageLayouts.MAIN:
            // set frame to home page
            frameSource = HOME_URL;
            Layout.randomiseSplashText();
            break;
        default:
            break;
    }

    Frame.setSource(frameSource);

    // load content of major layout sections (footer, marquee, etc.) if
    // applicable
    Layout.load();
});

// dynamically resize frame size when the viewport width changes
window.addEventListener("resize", () => {
    if (viewportWidthChanged()) Frame.updateSize();
    updateViewportWidth();
});

// update frame on source page change
Frame.mainframe?.addEventListener("load", Theme.updateFrame);
Frame.mainframe?.addEventListener("load", Frame.updateHistory);
Frame.mainframe?.addEventListener("load", Frame.updateSize);

// auto-close mobile navigation menu after changing pages
Frame.mainframe?.addEventListener("load", function () {
    if (Navi.isMenuOpen()) Navi.toggleMenu();
});
