window.onload = () => {
    fetch("/_assets/template/navi.html")
    .then(response => response.text())
    .then(text => document.getElementById("navi-links").innerHTML = text);
}

