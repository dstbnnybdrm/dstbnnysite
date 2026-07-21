import slugify from "slugify";

export default {
    layout: "layouts/blog-post.njk",
    tags: ["post"],
    eleventyComputed: {
        // with help from:
        //      https://equk.co.uk/2023/06/20/generating-slug-using-date-and-title-in-11ty/
        //      https://www.11ty.dev/docs/data-computed/
        permalink(data) {
            // convert date from 1998-02-10T00:00:00.000Z to 1998-02-10
            const date = data.page.date.toISOString().split("T")[0];
            // turn "-" to "/" to create directories
            const dateDirs = date.split("-").join("/");
            const title = slugify(data.title);
            const extension = data.page.outputFileExtension;

            return `blog/posts/${dateDirs}/${title}.${extension}`;
        },
    },
};
