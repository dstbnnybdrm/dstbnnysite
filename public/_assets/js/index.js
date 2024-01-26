const LAYOUT_IDS = ["collection", "footer"];
const TAGLINES = ["enjoy yr stay"];
const URL_PARAMETER = "p";
const TEMPLATE_URL = "/_assets/template/";
const HOME_URL = "/home.html";

const mainframeElement = document.getElementById("mainframe");
const taglineElement = document.getElementById("tagline");
const naviLists = document.querySelectorAll(".navi__subnavi");

let isFirstLoad = true;

// load major landmark section templates
function loadLayouts() {
  LAYOUT_IDS.forEach((id) => {
    let element = document.getElementById(id);

    if (!element) {
      console.error("couldn't find " + id);
      return;
    }

    let elementUrl = TEMPLATE_URL + id + ".html";

    fetch(elementUrl)
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html;
      });
  });
}

function updateContentHeight() {
  if (mainframeElement == null) {
    console.error("couldn't find frame");
    return;
  }

  const frameContent = mainframeElement.contentWindow;

  // clear height (otherwise if resulting height is smaller it doesn't change)
  mainframeElement.height = "";
  mainframeElement.height = frameContent.document.body.scrollHeight + "px";
}

function updateHistory() {
  const mainframePageTitle = mainframeElement.contentDocument.title;

  if (isFirstLoad) {
    isFirstLoad = false;
    document.title = mainframePageTitle;
    return;
  }

  history.replaceState(
    null,
    "",
    "?" +
      URL_PARAMETER +
      "=" +
      mainframeElement.contentWindow.location.pathname,
  );

  document.title = mainframePageTitle;
}

// checks to see if a url parameter exists and sets the frame source to that page
function setMainframe() {
  let parameters = new URLSearchParams(window.location.search);
  let page = parameters.get(URL_PARAMETER);

  // sets frame source to page if url parameter is present,
  // otherwise default to home
  mainframeElement.src = page == null ? HOME_URL : page;
}

function randomiseTagline() {
  let index = Math.floor(Math.random() * TAGLINES.length);
  let random_tagline = TAGLINES[index];

  taglineElement.textContent = random_tagline;
}

function toggleNaviMenu() {
  naviLists.forEach((list) => {
    list.classList.toggle("navi__subnavi" + "_toggle_open");
  });
}

window.onload = () => {
  mainframeElement.addEventListener("load", updateHistory, false);
  setMainframe();

  loadLayouts();
  randomiseTagline();
};

mainframeElement.onload = () => {
  updateContentHeight();
};

// window.addEventListener("DOMContentLoaded", () => {});

// window.addEventListener("focusin", () => {
// });

// dynamically resize frame height
window.addEventListener("resize", updateContentHeight);

// set frame on back button presses too
window.addEventListener("popstate", function (e) {
  if (e.state !== null) {
    setMainframe();
  }
});
