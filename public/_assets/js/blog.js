const postFrame = document.getElementByName("post-frame")[0];
const postNavButtons = document.querySelectorAll(".posts-list__button");

function updateContentHeight() {
    if (postFrame == null) {
        console.error("couldn't find frame");
        return;
    }

    const frameContent = postFrame.contentWindow;

    postFrame.height = "0";
    postFrame.height = frameContent.document.body.scrollHeight + "px";

    console.log("content height updated: " + postFrame.height);
}

// (modified from lostlove's blog which can be found here:
// https://lostlove.neocities.org/blog)
function linkNavButtons() {
    postNavButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // change iframe to button's post url
            let post_location = button.getAttribute("data-post-url");
            blog_post.src = post_location;
        });
    });
}

// add click event to every post button
window.addEventListener("load", linkNavButtons);

// show most recent post on page load
window.addEventListener("load", function () {
    let recent_post_location = postNavButtons[0].getAttribute("data-post-url");
    blog_post.src = recent_post_location;
});
