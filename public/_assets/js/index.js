/*
 * hi!
 *
 * if you're looking here to see how i did something please just know that i
 * have little to no clue what i am doing! lmao
 *
 * but i try to list sources i use whenever i can, so feel free to check those
 * out if you're interested!
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

const HEAD = document.getElementsByTagName("head")[0];

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
            const blogPostList = document.querySelectorAll(".menu__link");
            const mostRecentBlogPost = blogPostList[0].getAttribute("href");
            frameSource = mostRecentBlogPost;
            break;
        case PageLayouts.HUB:
            // set frame to home page
            frameSource = HOME_URL;
            Layout.randomiseSplashText();
            break;
        default:
            break;
    }

    // update document title
    if (!Frame.mainframe) {
        document.title += " — dstbnnybdrm";
    } else {
        Frame.setSource(frameSource);
    }

    // load content of major layout sections (footer, marquee, etc.) if
    // applicable
    Layout.load();

    // add open graph meta tags
    var comment = document.createComment("open graph tags");
    HEAD.appendChild(comment);

    var openGraphLink = document.createElement("meta");
    openGraphLink.setAttribute("property", "og:url");
    openGraphLink.content = document.location;
    HEAD.appendChild(openGraphLink);

    var openGraphTitle = document.createElement("meta");
    openGraphTitle.setAttribute("property", "og:title");
    openGraphTitle.content = document.title;
    HEAD.appendChild(openGraphTitle);

    var openGraphDescription = document.createElement("meta");
    openGraphDescription.setAttribute("property", "og:description");
    openGraphDescription.content = document
        .querySelector("meta[name='description']")
        .getAttribute("content");
    HEAD.appendChild(openGraphDescription);
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
