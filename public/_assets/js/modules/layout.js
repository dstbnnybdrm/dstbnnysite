import { fetchAsText, COMPONENTS_URL, DATA_URL, fetchJSON } from "./utility.js";

/**
 * the IDs of all the templated layout sections.
 *
 * @type {Array<string>}
 * @constant
 */
const LAYOUT_IDS = ["marquee", "footer", "site-log"];
/** @type {?HTMLElement} */
const splashElement = document.getElementById("splash");
const splashTextURL = "_data/splash.json";
const featuredElement = document.getElementById("featured");
const featuredURL = "_data/featured.json";

/**
 * load the templated major layout sections (ex. footer) into their respective
 * HTML elements (if applicable).
 *
 * @returns {undefined}
 */
export async function load() {
    for (const id of LAYOUT_IDS) {
        // check if current ID is on this page, move on if not
        let element = document.getElementById(id);
        if (element == null) continue;

        // load into element's HTML
        const elementUrl = COMPONENTS_URL + id + ".html";
        element.innerHTML = await fetchAsText(elementUrl);
    }
}

/**
 * choose a random splash text and load it into the splash's HTML element
 *
 * @returns {undefined}
 */
export async function randomiseSplashText() {
    if (splashElement == null) return;
    const splash = await fetchJSON(splashTextURL);
    const index = Math.floor(Math.random() * splash.texts.length);
    const random_splash = splash.texts[index];

    splashElement.innerHTML = random_splash;
}

/**
 * choose a random featured media and load it's title, description, and image
 * into the featured section on the HUB page
 *
 * @returns {undefined}
 */
export async function randomiseFeaturedMedia() {
    if (featuredElement == null) return;

    // fetch list of featured media
    const featured = await fetchJSON(featuredURL);

    // pick random media from list
    const index = Math.floor(Math.random() * featured.length);
    const media = featured[index];

    const link = document.createElement("a");
    link.setAttribute("rel", "external");
    link.setAttribute("href", featured[index].link);
    link.setAttribute("target", "_blank");

    const thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", "_assets/img/" + media.thumb + ".gif");

    const name = document.createElement("p");
    name.classList.add("copy");
    name.classList.add("copy_center");
    name.append(media.name);

    link.appendChild(thumbnail);
    link.appendChild(name);

    const description = document.createElement("p");
    description.classList.add("copy");
    description.append(media.description);

    featuredElement.appendChild(link);
    featuredElement.appendChild(description);
}
