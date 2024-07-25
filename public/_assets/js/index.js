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
        case PageLayouts.CRAZY:
            const dialogues = [
                "i was crazy once.",
                "they locked me in a room.",
                "a rubber room.",
                "a rubber room with rats.",
                "and rats make me crazy.",
                "crazy?",
            ];
            let dialogueIndex = 0;

            const dialogueBox = document.getElementById("dialogue-box");

            const continueButton =
                document.getElementsByClassName("continue-dialogue")[0];

            continueButton.addEventListener("click", function () {
                // create paragraph and append current dialogue
                const text = document.createTextNode(dialogues[dialogueIndex]);
                const para = document.createElement("p");
                para.classList.add("copy");
                para.append(text);

                dialogueBox.append(para);

                // move on to next dialogue
                dialogueIndex++;

                // reset index if at end
                if (dialogueIndex >= dialogues.length) {
                    dialogueIndex = 0;
                }
            });

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
