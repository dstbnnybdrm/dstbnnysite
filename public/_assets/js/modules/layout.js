import { fetchHtmlAsText as fetchHtml, TEMPLATE_URL } from "./utility.js";

const LAYOUT_IDS = ["marquee", "footer"];
const SPLASHES = [
    "enjoy yr stay",
    "<3 <3 <3",
    "proof of my existence",
    "take care of yourself!",
    'a <a href="/closet/butterfly.html">butterfly</a> \
        perches itself atop your fingertip',
    "home to <a>Lorna</a>",
    "picture that. in your dreams.",
    ":3c",
    "be yourself, violently, and unabashedly",
    "the internet is dead!",
    "St. Jack forever and ever",
    "hikkikimori hours",
    "<3 <3 <3 <3 <3 <3",
    "as long the Earth, Sun, and Moon exist",
    "when you come back i'll still be here",
    "see you at home!",
    ">:3c",
    "welcome to my paracosm",
];
const splashText = document.getElementById("splash");

/** loads the templated major layout sections (ex. footer) if applicable */
export async function load() {
    for (const id of LAYOUT_IDS) {
        // check if current ID is on this page, move on if not
        let element = document.getElementById(id);
        if (!element) continue;

        // load into element's HTML
        let elementUrl = TEMPLATE_URL + "layout/" + id + ".html";
        element.innerHTML = await fetchHtml(elementUrl);
    }
}

/** chooses a random string to display on the main page header */
export function randomiseSplashText() {
    let index = Math.floor(Math.random() * SPLASHES.length);
    let random_splash = SPLASHES[index];

    splashText.innerHTML = random_splash;
}
