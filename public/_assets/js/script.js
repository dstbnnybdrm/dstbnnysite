var url = window.location.pathname;

// IDs for html templates
var navi_list_id = document.getElementById("js-navi-list");
var new_stuff_id = document.getElementById("js-new-stuff");
var footer_id = document.getElementById("js-footer");
var comm_status_id = document.getElementById("js-comm-status");
var update_log_id = document.getElementById("js-update-log");

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

    if (update_log_id) {
        fetch("/_assets/template/update-log.html")
            .then((response) => response.text())
            .then((text) => (update_log_id.innerHTML = text));
    }
};
