/**
 * fetch a JSON file's contents as an Object.
 *
 *  @returns {Promise<Object>} the file's contents
 */
export async function fetchJSON(url) {
    const request = new Request(url);
    const response = await fetch(request);
    const object = await response.json();
    return object;
}
