// some code below modified from lostlove's blog which can be found here:
// https://lostlove.neocities.org/blog

const blog_post = document.getElementById("js-blog-post");
let post_buttons = document.querySelectorAll(".posts-list__button");

// add click event to every post button
post_buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // change iframe to button's post url
    let post_location = button.getAttribute("data-post-url");
    blog_post.src = post_location;
  });
});

// show most recent post on page load
window.onload = () => {
  let recent_post_location = post_buttons[0].getAttribute("data-post-url");
  blog_post.src = recent_post_location;
};

// set height of frame to height of the post's contents
blog_post.onload = () => {
  let blog_post_content = blog_post.contentWindow;
  blog_post.height = ""; // reset height first
  blog_post.height = blog_post_content.document.body.scrollHeight + "px";
};
