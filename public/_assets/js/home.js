const ids_list = ["news-feed", "update-log", "collection", "footer"];

window.onload = () => {
  ids_list.forEach((id) => {
    let element = document.getElementById(id);
    if (!element) return;

    let element_url = "_assets/template/" + id + ".html";

    fetch(element_url)
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html;
      });
  });
};
