import { fetchAsText, TEMPLATE_URL } from "./utility.js";

const LAYOUT_IDS = ["marquee", "footer"];
const splashElement = document.getElementById("splash");

/** loads the templated major layout sections (ex. footer) if applicable */
export async function load() {
    for (const id of LAYOUT_IDS) {
        // check if current ID is on this page, move on if not
        let element = document.getElementById(id);
        if (!element) continue;

        // load into element's HTML
        const elementUrl = TEMPLATE_URL + "layout/" + id + ".html";
        element.innerHTML = await fetchAsText(elementUrl);
    }
}

/** returns an array of all the splash texts */
async function getSplashes() {
    let splashes = await fetchAsText(TEMPLATE_URL + "layout/splash.txt");
    let splashList = splashes.split("\n");
    splashList.pop(); // remove the final empty string
    return splashList;
}

/** chooses a random splash text to display on the main page header */
export async function randomiseSplashText() {
    const splashList = await getSplashes();
    const index = Math.floor(Math.random() * splashList.length);
    const random_splash = splashList[index];

    splashElement.innerHTML = random_splash;
}
