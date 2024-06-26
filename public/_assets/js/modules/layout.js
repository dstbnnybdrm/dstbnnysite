import { fetchAsText, COMPONENTS_URL, DATA_URL } from "./utility.js";

/**
 * the IDs of all the templated layout sections.
 *
 * @type {Array<string>}
 * @constant
 */
const LAYOUT_IDS = ["marquee", "footer", "site-log"];
/** @type {?HTMLElement} */
const splashElement = document.getElementById("splash");

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
 * get all of the splash texts from their text file.
 *
 * @async
 * @returns {Array<string>} an array of all the splash texts
 */
async function getSplashes() {
    let splashes = await fetchAsText(DATA_URL + "splash.txt");
    let splashList = splashes.split("\n");

    splashList.pop(); // remove the final empty string

    return splashList;
}

/**
 * choose a random splash text and load it into the splash's HTML element
 *
 * @returns {undefined}
 */
export async function randomiseSplashText() {
    if (splashElement == null) return;
    const splashList = await getSplashes();
    const index = Math.floor(Math.random() * splashList.length);
    const random_splash = splashList[index];

    splashElement.innerHTML = random_splash;
}
