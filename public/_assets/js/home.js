const HOME_IDS = ["news-feed", "update-log"];

async function loadHome() {
    for (const id of HOME_IDS) {
        let element = document.getElementById(id);
        let element_url = "_assets/template/" + id + ".html";
        element.innerHTML = await parent.fetchHtmlAsText(element_url);
    }
    parent.updateContentHeight();
}

window.onload = () => {
    loadHome();
};
