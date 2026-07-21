(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/assets/js/modules/mobile-sidebar.js
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  function initSidebar() {
    if (!sidebar) {
      return;
    }
    const openButton = document.getElementById("sidebar-open-button");
    const skipLink = document.getElementById("skip-link");
    openButton.addEventListener("click", open);
    skipLink.addEventListener("click", close);
    overlay.addEventListener("click", close);
  }
  function isOpen() {
    return sidebar.dataset.open ? true : false;
  }
  function open() {
    sidebar.dataset.open = "";
    overlay.dataset.visible = "";
  }
  function close() {
    delete sidebar.dataset.open;
    delete overlay.dataset.visible;
  }

  // src/assets/js/modules/utility.js
  function fetchJSON(url) {
    return __async(this, null, function* () {
      const request = new Request(url);
      const response = yield fetch(request);
      const object = yield response.json();
      return object;
    });
  }

  // src/assets/js/modules/hub.js
  var mainFrame = document.getElementsByName("mainframe")[0];
  var urlParameter = "page";
  var isFirstLoad = true;
  function initHub() {
    randomizeSplash();
    if (!mainFrame) {
      return;
    }
    setSource();
    mainFrame.addEventListener("load", function() {
      if (isFirstLoad) {
        isFirstLoad = false;
        return;
      }
      if (isOpen) {
        close();
      }
      mainFrame.focus();
      updateHistory();
    });
  }
  function randomizeSplash() {
    return __async(this, null, function* () {
      const splashElement = document.getElementById("splash-text");
      if (!splashElement) {
        return;
      }
      const splashesURL = "/assets/js/data/splash-text.json";
      const splashes = yield fetchJSON(splashesURL);
      const index = Math.floor(Math.random() * splashes.texts.length);
      const randomSplash = splashes.texts[index];
      splashElement.innerHTML = randomSplash;
    });
  }
  function setSource() {
    const parameters = new URLSearchParams(window.location.search);
    const page = parameters.get(urlParameter);
    if (page) {
      mainFrame.src = page;
    }
  }
  function updateHistory() {
    const pageTitle = mainFrame.contentDocument.title;
    const pathName = mainFrame.contentWindow.location.pathname;
    history.replaceState(null, "", "?" + urlParameter + "=" + pathName);
    document.title = pageTitle;
  }

  // src/assets/js/modules/inner-frame.js
  var innerFrameFooter = document.getElementById("inner-frame-footer");
  function initInnerFrame() {
    if (!innerFrameFooter) {
      return;
    }
    innerFrameFooter.hidden = window.self == window.top ? false : true;
  }

  // src/assets/js/script.js
  document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initHub();
    initInnerFrame();
  });
})();
