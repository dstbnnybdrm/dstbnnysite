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
const TEMPLATE_URL = "/_assets/template/layout/";

const splash = document.getElementById("splash");

/*
 * fetches an HTML file's contents.
 *
 * basically taken directly from this stackoverflow answer:
 *
 *      https://stackoverflow.com/a/52349344
 *
 * thank you very much! if only i had learned to do this asynchronously sooner i
 * would have saved hours of banging my head against the wall :')
 */
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

// loads the templated major layout sections (ex. footer) if applicable
export async function load() {
    for (const id of LAYOUT_IDS) {
        let element = document.getElementById(id);
        if (!element) continue;

        let elementUrl = TEMPLATE_URL + id + ".html";

        element.innerHTML = await fetchHtmlAsText(elementUrl);
    }
}

// chooses a random string to display on the main page header
export function randomiseSplashText() {
    let index = Math.floor(Math.random() * SPLASHES.length);
    let random_splash = SPLASHES[index];

    splash.innerHTML = random_splash;
}
