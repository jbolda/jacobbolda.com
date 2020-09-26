const fs = require("fs").promises;
const fsReg = require("fs");
const frontmatter = require("gray-matter");
const slugify = require("@sindresorhus/slugify");
const mdx = require("@mdx-js/mdx");
const util = require("util");
const vm = require("vm");
const rehypePrism = require("../rehype-prism-mdx");
const rehypeSlug = require("rehype-slug");
const rehypeLink = require("rehype-autolink-headings");
const parse = require("rehype-parse");
const globby = require("globby");
const chalk = require("chalk");

const {
  transformComponentForBrowser,
  transformComponentForNode,
} = require("toast/src/transforms");

exports.sourceData = async ({ createPage, ...options }) => {
  const files = await globby("./articles", {
    expandDirectories: { extensions: ["mdx"] },
  });

  return Promise.all(
    files.map(async (filename) => {
      console.log("filename", filename);
      const file = await fs.readFile(filename, "utf-8");
      let compiledMDX;

      const { data, content } = frontmatter(file);

      try {
        compiledMDX = await mdx(content, {
          // remarkPlugins: [codeblocks],
          rehypePlugins: [
            rehypePrism,
            rehypeSlug,
            [
              rehypeLink,
              {
                properties: {
                  style: "position: absolute; right: calc(100% + 5px);",
                },
                content: {
                  type: "element",
                  tagName: "corgilink",
                  properties: { className: ["corgi-heading-link"] },
                  children: [],
                  // children: [parsedCorgi]
                },
              },
            ],
          ],
        });
      } catch (e) {
        console.log(e);
        throw e;
      }

      await createPage({
        module: `/** @jsx mdx */
            import {mdx} from '@mdx-js/preact';
            ${compiledMDX}`,
        slug: data.slug,
        data: data,
      });
      // console.log(meta);
      // writeDataFile
      return {
        // id,
        // content,
        ...meta,
      };
    })
  ).catch((error) => console.error("error fetching mdx files", error));
};
