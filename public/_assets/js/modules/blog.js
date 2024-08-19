import * as Frame from "./frame.js";

/**
 * the list of blog posts on the page.
 *
 * @type {?HTMLElement}
 */
const blogList = document.getElementById("blog-list");

/**
 * fetch the list of blog posts from a JSON file.
 *
 *
 * @returns {Promise<Object>}
 */
async function getJSON() {
    const requestURL = "_data/blog-posts.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const blogPosts = await response.json();
    return blogPosts;
}

/**
 * populate the blog posts menu with links to blog posts.
 *
 */
export async function populateMenu() {
    const blogPosts = await getJSON();

    // create dropdown for each year
    for (var i = 0; i < blogPosts.year.length; i++) {
        appendYearList(blogPosts.year[i]);
    }
}

/**
 * set frame source to the most recent blog post.
 *
 */
export async function setSource() {
    const blogPosts = await getJSON();
    let yearObject = blogPosts.year[0];
    let year = Object.keys(blogPosts.year[0]);
    let recentPost = yearObject[year][0];
    Frame.setSource(`posts/${recentPost.date}.html`);
    Frame.updateSize();
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
