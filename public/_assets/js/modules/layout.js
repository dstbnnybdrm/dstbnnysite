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
