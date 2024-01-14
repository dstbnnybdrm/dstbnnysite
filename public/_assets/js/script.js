const template_url = "/_assets/template/";
const id_names = [
  "js-header",
  "js-navi",
  "js-status",
  "js-collection",
  "js-footer",
  "js-comm-status",
  "js-news-feed",
  "js-update-log",
];

window.onload = () => {
  id_names.forEach((name) => {
    let id = document.getElementById(name);

    if (!id) {
      // id wasn't found on this page so move on
      return;
    }

    // get filename from id name
    let template_filename = name.substring(3).concat(".html");
    let template_location = template_url.concat(template_filename);

    // load template into page
    fetch(template_location)
      .then((response) => response.text())
      .then((content) => (id.innerHTML = content));
  });
};
