import {
    PageLayouts,
    currentPage,
    HOME_URL,
    viewportWidth,
    updateViewportWidth,
    currentViewportWidth,
} from "./modules/utility.js";
import * as Theme from "./modules/theme.js";
import * as Navi from "./modules/navi.js";
import * as Frame from "./modules/frame.js";
import * as Layout from "./modules/layout.js";

// page set up
window.addEventListener("DOMContentLoaded", function () {
    // load user's preferred theme
    Theme.load();

    // set up page depending on which layout it should have
    switch (currentPage()) {
        case PageLayouts.BLOG:
            // set frame to most recent blog post
            const blogPostList = document.querySelectorAll(".blog-navi__link");
            const mostRecentBlogPost = blogPostList[1].getAttribute("href");
            Navi.button.addEventListener("click", Navi.toggleMenu);
            Frame.setSource(mostRecentBlogPost);
            break;
        case PageLayouts.MAIN:
            // set frame to home page
            Frame.setSource(HOME_URL);
            Navi.button.addEventListener("click", Navi.toggleMenu);
            Layout.randomiseSplashText();
            break;
        default:
            break;
    }

    // load content of major layout sections (footer, marquee, etc.) if
    // applicable
    Layout.load();
});

// dynamically resize frame size when the viewport width changes
window.addEventListener("resize", function () {
    if (viewportWidth != currentViewportWidth()) {
        Frame.updateSize();
    }
    updateViewportWidth();
});

// update frame on source page change
Frame.mainframe?.addEventListener("load", Frame.updateHistory);
Frame.mainframe?.addEventListener("load", Frame.updateSize);
Frame.mainframe?.addEventListener("load", Theme.updateFrame);

// auto-close mobile navigation menu after changing pages
Frame.mainframe.addEventListener("load", function () {
    if (Navi.isMenuOpen()) Navi.toggleMenu();
});
