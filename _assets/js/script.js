window.onload = () => {

    console.log("test!!!");

    fetch("/_assets/template/header.html")
    .then(response => response.text())
    .then(text=> document.getElementById("header").innerHTML = text);
}
