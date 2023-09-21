var url = window.location.pathname;

var navi_list_id = document.getElementById("js-navi-list");
var new_stuff_id = document.getElementById("js-new-stuff");
var footer_id = document.getElementById("js-footer");
var comm_status_id = document.getElementById("js-comm-status");

window.onload = () => {
    if (navi_list_id) {
        fetch("/_assets/template/navi.html")
            .then((response) => response.text())
            .then((text) => (navi_list_id.innerHTML = text));
    }

    if (new_stuff_id) {
        fetch("/_assets/template/new.html")
            .then((response) => response.text())
            .then((text) => (new_stuff_id.innerHTML = text));
    }

    if (footer_id) {
        fetch("/_assets/template/footer.html")
            .then((response) => response.text())
            .then((text) => (footer_id.innerHTML = text));
    }

    if (comm_status_id) {
        fetch("/_assets/template/comm-status.html")
            .then((response) => response.text())
            .then((text) => (comm_status_id.innerHTML = text));
    }
};
