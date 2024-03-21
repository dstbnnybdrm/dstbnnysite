export const HOME_URL = "/home.html";
export const TEMPLATE_URL = "/_assets/template/";
export const BLOG_POST_LIST = document.querySelectorAll(".blog-navi__link");
export const ROOT = document.documentElement;

export let viewportWidth = document.documentElement.clientWidth;

/**
 * unique IDs for each distinct major page
 *
 * needed because each has their own unique layout and behaviour
 */
export const PageLayouts = Object.freeze({
    MAIN: Symbol("main"),
    BLOG: Symbol("blog"),
    GUESTBOOK: Symbol("guestbook"),
    CLOSET: Symbol("closet"),
});

/**
 * determine the current page layout
 *
 * @returns the unique ID for the current page
 */
export function currentPage() {
    const pathname = window.location.pathname;

    if (pathname.includes("blog")) return PageLayouts.BLOG;
    else if (pathname.includes("guestbook")) return PageLayouts.GUESTBOOK;
    else if (pathname.includes("closet")) return PageLayouts.CLOSET;
    else return PageLayouts.MAIN;
}

/**
 * fetches a text file's contents.
 *
 * basically taken directly from this stackoverflow answer:
 *
 *      https://stackoverflow.com/a/52349344
 *
 * (thank you very much! if only i had learned to do this asynchronously sooner i
 * would have saved hours of banging my head against the wall *sob*)
 */
export async function fetchAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

export function currentViewportWidth() {
    return document.documentElement.clientWidth;
}

export function updateViewportWidth() {
    viewportWidth = currentViewportWidth();
}
