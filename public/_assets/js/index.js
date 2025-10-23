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
    // fetchJSON,
    updateViewportWidth,
    viewportWidthChanged,
} from "./modules/utility.js";
import * as Theme from "./modules/theme.js";
import * as Navi from "./modules/navi.js";
import * as Frame from "./modules/frame.js";
import * as Blog from "./modules/blog.js";
import * as Layout from "./modules/layout.js";

// const HEAD = document.getElementsByTagName("head")[0];

// load user's preferred theme
window.addEventListener("DOMContentLoaded", Theme.load);

Navi.openButton?.addEventListener("click", Navi.open);
Navi.closeButton?.addEventListener("click", Navi.close);
Navi.overlay?.addEventListener("click", Navi.close);

// page set up
window.addEventListener("load", () => {
    // set up page depending on which layout it should have
    // let frameSource;
    switch (currentPage()) {
        case PageLayouts.BLOG:
            Blog.populateMenu();
            Blog.setSource();
            break;
        case PageLayouts.HUB:
            Layout.randomiseSplashText();
            // set frame to home page
            Frame.setSource(HOME_URL);
            Layout.randomiseFeaturedMedia();
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
            let hasRepeated = false;

            const navi = document.getElementById("navi");
            const dialogueBox = document.getElementById("dialogue-box");
            const dialogueContinue =
                document.getElementById("continue-dialogue");

            dialogueContinue.addEventListener("click", function () {
                if (hasRepeated) {
                    navi.classList.remove("navi__hidden");
                }

                // create paragraph and append current dialogue
                const text = document.createTextNode(dialogues[dialogueIndex]);
                const para = document.createElement("p");
                para.classList.add("copy");
                para.classList.add("dialogue-box__dialogue");
                para.append(text);
                dialogueBox.append(para);

                // change continue button text
                switch (dialogueIndex) {
                    // "i was crazy once"
                    case 0:
                        dialogueContinue.innerHTML = "why?";
                        break;
                    // "they locked me in a room."
                    case 1:
                        dialogueContinue.innerHTML = "what kind of room?";
                        break;
                    // "a rubber room with rats."
                    case 3:
                        dialogueContinue.innerHTML = "with rats?";
                        break;
                    // else
                    default:
                        dialogueContinue.innerHTML = "...";
                        break;
                }

                // move on to next dialogue
                dialogueIndex++;

                // reset index if at end
                if (dialogueIndex >= dialogues.length) {
                    dialogueIndex = 0;
                    hasRepeated = true;
                }
            });
            break;
        default:
            break;
    }

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

// // auto-close mobile navigation menu after changing pages
// Frame.mainframe?.addEventListener("load", function () {
//     if (Navi.isMenuOpen()) Navi.toggleMenu();
// });
