window.onload = () => {
    fetch("/_assets/template/navi.html")
    .then(response => response.text())
    .then(text => document.getElementById("navi-links").innerHTML = text);

    fetch("/_assets/template/footer.html")
    .then(response => response.text())
    .then(text => document.getElementById("footer").innerHTML = text);
}

