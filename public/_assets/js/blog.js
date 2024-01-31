const postFrame = document.getElementsByName("post-frame")[0];
const postNavButtons = document.querySelectorAll(".blog-posts__link");

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

// show most recent post on page load
window.onload = () => {
    let recent_post_location = postNavButtons[0].getAttribute("href");
    postFrame.src = recent_post_location;
};
