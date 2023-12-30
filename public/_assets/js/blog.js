// some code below taken and modified from lostlove's blog found here:
// https://lostlove.neocities.org/blog

const post_iframe = document.getElementById("js-blog-post");

let post_buttons = document.querySelectorAll(".posts-list__button");

// add click event to every post button
post_buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // change iframe to button's post url
    let post_url = button.getAttribute("data-post-url");
    post_iframe.src = post_url;
  });
});

// show most recent post on load
window.onload = () => {
  let recent_post_url = post_buttons[0].getAttribute("data-post-url");
  post_iframe.src = recent_post_url;
};
