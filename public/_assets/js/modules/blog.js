import { ROOT } from "./utility.js";
import { mainframe } from "./frame.js";

const blogList = document.getElementById("blog-list");

export async function populateMenu() {
    const requestURL = "_data/blog-posts.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const blogPosts = await response.json();

    // create dropdown for each year
    for (var i = 0; i < blogPosts.year.length; i++) {
        appendYearList(blogPosts.year[i]);
    }
}

function appendYearList(yearObject) {
    let year = Object.keys(yearObject);
    let listSection = document.createElement("li");
    listSection.classList.add("menu__dropdown");

    let details = document.createElement("details");
    details.classList.add("dropdown");

    let summary = document.createElement("summary");
    summary.classList.add("dropdown__label");
    summary.textContent = year;

    let detailsBody = document.createElement("div");
    detailsBody.classList.add("dropdown__body");

    let menuList = document.createElement("ul");
    menuList.classList.add("menu__list");

    let posts = yearObject[year];
    console.log(posts);

    populateList(posts, menuList);

    detailsBody.appendChild(menuList);

    details.appendChild(summary);
    details.appendChild(detailsBody);
    listSection.appendChild(details);

    blogList.appendChild(listSection);
}

function populateList(posts, menuList) {
    for (const post of posts) {
        const menuItem = document.createElement("li");
        menuItem.classList.add("menu__item");
        let link = document.createElement("a");
        link.setAttribute("href", `posts/${post.date}.html`);
        link.setAttribute("target", "mainframe");
        link.textContent = `${post.title}`;
        menuItem.appendChild(link);
        menuList.appendChild(menuItem);
    }
}
