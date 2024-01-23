// elements
const frame_element = document.getElementsByName("mainframe")[0];
const main_element = document.getElementById("main");
const tagline_element = document.getElementById("tagline");

const layout_ids_list = ["collection", "footer"];

const taglines_list = ["enjoy yr stay"];

function load_layouts() {
  layout_ids_list.forEach((id) => {
    let element = document.getElementById(id);

    if (!element) {
      console.log("couldn't find " + id);
      return;
    }

    let element_url = "_assets/template/" + id + ".html";

    fetch(element_url)
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html;
      });
  });
}

function update_content_height() {
  if (frame_element == null) {
    console.log("no frame on this page");
    return;
  }

  frame_content = frame_element.contentWindow;

  // clear height (otherwise if resulting height is smaller it doesn't change)
  frame_element.height = "";
  frame_element.height = frame_content.document.body.clientHeight + "px ";
}

function randomise_tagline() {
  let index = Math.floor(Math.random() * taglines_list.length);
  let random_tagline = taglines_list[index];

  tagline.textContent = random_tagline;
}

window.onload = () => {
  randomise_tagline();
  load_layouts();
  update_content_height();
};

window.addEventListener("resize", update_content_height);

frame_element.onload = () => {
  // dynamically resize frame height

  console.log(frame_element.contentWindow.location.pathname);
};

// update frame height when source page changes
frame_element.addEventListener("load", update_content_height);
