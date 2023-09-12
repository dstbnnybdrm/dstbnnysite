window.onload = () => {
    fetch("/_assets/template/navi.html")
        .then((response) => response.text())
        .then(
            (text) =>
                (document.getElementById("js-navi-list").innerHTML = text),
        );

    fetch("/_assets/template/footer.html")
        .then((response) => response.text())
        .then(
            (text) => (document.getElementById("js-footer").innerHTML = text),
        );
};
