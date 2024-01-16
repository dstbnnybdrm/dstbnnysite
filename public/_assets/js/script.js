const frame_element = document.getElementsByName("mainframe")[0];

function update_content_height() {
  if (frame_element == null) {
    return;
  }

  frame_content = frame_element.contentWindow;
  frame_element.height = frame_content.document.body.scrollHeight + "px";
}

window.onload = () => {
  update_content_height();
};

// dynamically resize frame height
window.addEventListener("resize", update_content_height);
