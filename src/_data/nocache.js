/*
 * from:
 * https://petrapixel.neocities.org/coding/eleventy-tutorial#cachebusting
 * */
export default () => "?nocache=" + Date.now();
