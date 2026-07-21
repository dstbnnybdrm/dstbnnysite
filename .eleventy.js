import prettier from "prettier";
import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import postcssCustomMedia from "postcss-custom-media";
import postcssDiscardEmpty from "postcss-discard-empty";
import postcssSortMediaQueries from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";
import esbuild from "esbuild";

export default async function (eleventyConfig) {
    // disables noisy console output
    eleventyConfig.setQuietMode(true);

    // globally set data.permalinks
    // to "../resource.html" style from "../resource/(index.html)"
    eleventyConfig.addGlobalData("permalink", () => {
        return (data) =>
            `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    // ---- HTML ----

    // add custom filters
    eleventyConfig.addFilter("ISODate", (date) => {
        return date.toISOString().split("T")[0];
    });

    // format files on output
    // from: https://bnijenhuis.nl/notes/adding-prettier-in-eleventy-using-transforms/
    eleventyConfig.addTransform("prettierHTML", function (content) {
        let isHTML = (this.page.outputPath || "").endsWith(".html");

        if (!isHTML) {
            return content;
        }

        let prettified = prettier.format(content, {
            printWidth: 120,
            parser: "html",
            tabWidth: 2,
        });

        return prettified;
    });

    // ---- CSS ----

    eleventyConfig.addTemplateFormats("css");

    // post-processing
    // from: https://pepelsbey.dev/articles/eleventy-css-js/
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async (content, path) => {
            let isPartial = path.split("/").at(-1).startsWith("_");
            if (isPartial) {
                return;
            }

            return async () => {
                let output = await postcss([
                    postcssDiscardEmpty,
                    autoprefixer,
                    postcssImport,
                    postcssNesting,
                    postcssCustomMedia,
                    postcssSortMediaQueries,
                ]).process(content, {
                    from: path,
                });

                return output.css;
            };
        },
    });

    eleventyConfig.addTransform("prettierCSS", function (content) {
        let isCSS = (this.page.outputPath || "").endsWith(".css");
        let isPartial = this.page.outputPath.split("/").at(-1).startsWith("_");

        if (!isCSS || isPartial) {
            return content;
        }

        let prettified = prettier.format(content, {
            printWidth: 80,
            parser: "css",
            tabWidth: 4,
        });

        return prettified;
    });

    // ---- JavaScript ----

    // from https://www.seancdavis.com/posts/javascript-for-11ty-with-esbuild/
    eleventyConfig.on("eleventy.before", async () => {
        await esbuild.build({
            entryPoints: ["src/assets/js/script.js"],
            bundle: true,
            outfile: "public/assets/js/script.js",
            sourcemap: false,
            target: ["es2016"],
        });
    });

    // ---- Passthrough Copy ----

    [
        "/**/*.txt",
        "/**/*.ico",
        "/assets/fonts/",
        "/**/img/",
        "/*.gif",
        "/assets/js/data/",
    ].forEach((path) =>
        eleventyConfig.addPassthroughCopy(config.dir.input + path),
    );
}

// static options
export const config = {
    dir: {
        input: "src",
        output: "public",
        // Eleventy layouts, include files, extends files, partials, or macros
        includes: "_includes",
        // global data template files, available to all templates
        data: "_data",
    },
    // use Nunjucks as the templating engine
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk", "11ty.js"],
};
