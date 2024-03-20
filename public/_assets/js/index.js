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

window.addEventListener("DOMContentLoaded", function () {
    // update the theme colours
    Theme.update();

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

    if (Frame.exists()) {
        // update size on load/refresh
        Frame.updateSize();
        // update size on new page source
        Frame.mainframe.addEventListener("load", Frame.updateHistory);
        Frame.mainframe.addEventListener("load", Frame.updateSize);

        // auto-close mobile navigation menu after switching pages
        Frame.mainframe.addEventListener("load", function () {
            if (Navi.isMenuOpen()) Navi.toggleMenu();
        });
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
