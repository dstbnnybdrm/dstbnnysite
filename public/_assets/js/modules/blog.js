import * as Frame from "./frame.js";
import { fetchJSON } from "./utility.js";

/**
 * the list of blog posts on the page.
 *
 * @type {?HTMLElement}
 */
const blogList = document.getElementById("blog-list");
const blogListURL = "_data/blog-posts.json";

/**
 * populate the blog posts menu with links to blog posts.
 *
 */
export async function populateMenu() {
    const blogPosts = await fetchJSON(blogListURL);

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
    const blogPosts = await fetchJSON(blogListURL);
    let yearObject = blogPosts.year[0];
    let year = Object.keys(blogPosts.year[0]);
    let recentPost = yearObject[year][0];
    Frame.setSource(`posts/${recentPost.date}.html`);
    Frame.updateSize();
}

function appendYearList(yearObject) {
    let year = Object.keys(yearObject);
    let yearItem = document.createElement("li");
    yearItem.classList.add("navi__item");
    yearItem.textContent = year;

    let postsList = document.createElement("ul");
    postsList.classList.add("navi__list");

    let posts = yearObject[year];
    populateList(posts, postsList);

    yearItem.appendChild(postsList);
    blogList.classList.add("navi__item");

    blogList.appendChild(yearItem);
    blogList.classList.add("navi__list");
}

function populateList(posts, menuList) {
    for (const post of posts) {
        const menuItem = document.createElement("li");
        menuItem.classList.add("navi__item");

        let link = document.createElement("a");
        link.setAttribute("href", `posts/${post.date}.html`);
        link.setAttribute("target", "mainframe");
        link.textContent = `${post.title}`;

        menuItem.appendChild(link);
        menuList.appendChild(menuItem);
    }
}
