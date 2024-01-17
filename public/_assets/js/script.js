const frame_element = document.getElementsByName("mainframe")[0];
const tagline_element = document.getElementById("tagline");
const taglines_list = ["enjoy yr stay"];

function update_content_height() {
  if (frame_element == null) {
    return;
  }

  frame_content = frame_element.contentWindow;
  frame_element.height = frame_content.document.body.scrollHeight + "px";
}

function randomise_tagline() {
  let index = Math.floor(Math.random() * taglines_list.length);
  let random_tagline = taglines_list[index];

  tagline.textContent = random_tagline;
}

window.onload = () => {
  update_content_height();
  randomise_tagline();
};

// dynamically resize frame height
window.addEventListener("resize", update_content_height);
