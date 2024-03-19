export const HOME_URL = "/home.html";
export const TEMPLATE_URL = "/_assets/template/";

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
    switch (window.location.pathname.includes) {
        case "blog":
            console.log("currently viewing blog");
            return PageLayouts.BLOG;
        case "guestbook":
            console.log("currently viewing guestbook");
            return PageLayouts.GUESTBOOK;
        case "closet":
            console.log("currently viewing closet");
            return PageLayouts.CLOSET;
        default:
            console.log("currently viewing main layout (hopefully)");
            return PageLayouts.MAIN;
    }
}

/**
 * fetches an HTML file's contents.
 *
 * basically taken directly from this stackoverflow answer:
 *
 *      https://stackoverflow.com/a/52349344
 *
 * (thank you very much! if only i had learned to do this asynchronously sooner i
 * would have saved hours of banging my head against the wall *sob*)
 */
export async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

export function currentViewportWidth() {
    return document.documentElement.clientWidth;
}

export function updateViewportWidth() {
    viewportWidth = currentViewportWidth();
}
