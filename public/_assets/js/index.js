import * as Theme from "./theme.js";
import * as Navi from "./navi.js";
import * as Frame from "./frame.js";
import * as Layout from "./layout.js";

const HOME_URL = "/home.html";
let viewportWidth = document.documentElement.clientWidth;

window.onload = () => {
    Theme.update();

    // page setup depending on if blog/main/etc.
    switch (window.location.pathname) {
        case "/blog.html":
            let postNavButtons = document.querySelectorAll(".blog-navi__link");
            let recent_post_location = postNavButtons[1].getAttribute("href");
            Frame.setSource(recent_post_location);
            break;
        case "/":
            Frame.setSource(HOME_URL);
            Layout.randomiseSplashText();
            break;
        default:
            break;
    }

    // update mainframe if on current page
    if (Frame.mainframe != null) {
        Frame.mainframe.addEventListener("load", Frame.updateHistory);
        Frame.mainframe.addEventListener("load", Frame.updateSize);

        // auto-close mobile navigation menu after switching pages
        Frame.mainframe.addEventListener("load", function () {
            if (Navi.isMenuOpen()) Navi.toggleMenu();
        });
    }

    // load content of major layout sections (footer, collection, etc.)
    Layout.load();
};

// dynamically resize frame size when the viewport width changes
window.addEventListener("resize", function () {
    if (viewportWidth != document.documentElement.clientWidth) {
        Frame.updateSize();
    }
    viewportWidth = document.documentElement.clientWidth;
});
