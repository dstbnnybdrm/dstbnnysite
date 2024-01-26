const idsList = ["news-feed", "update-log"];

idsList.forEach((id) => {
  window.addEventListener("DOMContentLoaded", () => {
    let element = document.getElementById(id);

    let element_url = "_assets/template/" + id + ".html";

    fetch(element_url)
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html;
      });
  });
});
