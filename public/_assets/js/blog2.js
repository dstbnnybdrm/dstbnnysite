var post_buttons = document.querySelectorAll(".posts-list__button");

post_buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var post_url = button.getAttribute("data-post-url");
    var post_iframe = document.getElementById("js-blog-post");
    post_iframe.src = post_url;
  });
});
