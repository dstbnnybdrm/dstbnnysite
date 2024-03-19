import {
    PageLayouts,
    currentPage,
    HOME_URL,
    updateViewportWidth,
    currentViewportWidth,
} from "./modules/utility.js";
import * as Theme from "./modules/theme.js";
import * as Navi from "./modules/navi.js";
import * as Frame from "./modules/frame.js";
import * as Layout from "./modules/layout.js";

window.onload = () => {
    // update the theme colours
    Theme.update();

    // set up page depending on which layout it should have
    switch (currentPage()) {
        case PageLayouts.BLOG:
            // set frame to most recent blog post
            const blogPostList = document.querySelectorAll(".blog-navi__link");
            const mostRecentBlogPost = blogPostButton[1].getAttribute("href");
            Frame.setSource(mostRecentBlogPost);
            break;
        case PageLayouts.MAIN:
            // set frame to home page
            Frame.setSource(HOME_URL);
            Layout.randomiseSplashText();
            break;
        default:
            break;
    }

    if (Frame.exists()) {
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
};

// dynamically resize frame size when the viewport width changes
window.addEventListener("resize", function () {
    if (viewportWidth != currentViewportWidth()) {
        Frame.updateSize();
    }
    updateViewportWidth();
});
