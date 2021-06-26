import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import parse from "remark-parse";
import mdx from "remark-mdx";
import stringify from "remark-stringify";
import util from "util";

async function convert() {
  const [invoked, filter, conversion, folder] = process.argv;
  let fileHandle;
  try {
    const files = await fs.readdir(folder, { encoding: "utf-8" });
    for (const file of files) {
      try {
        if (file.endsWith("md")) {
          const filepath = path.join(folder, file);
          fileHandle = await fs.open(filepath, "r+");
          const content = (await fileHandle.readFile()).toString();
          let frontmattered;
          if (conversion === "from-meta") {
            frontmattered = await convertFromMetaToYaml({
              fileHandle,
              content,
            });
          } else if (conversion === "from-yaml") {
            frontmattered = await convertFromYamlToMeta({
              fileHandle,
              content,
            });
          }
          await fileHandle.truncate();
          await fileHandle.write(frontmattered, 0);
          await fileHandle.close();
        }
      } catch (err) {
        console.error(`Error in ${file}:`);
        console.error(err);
        await fileHandle.close();
      }
    }
  } catch (err) {
    console.error(err);
    await fileHandle.close();
  }
}

if (process.argv[1].endsWith("frontmatter-to-meta.js")) {
  console.log("converting...");
  convert();
}

export const convertFromMetaToYaml = async ({ content }) => {
  const processor = await unified().use(parse).use(stringify).use(mdx);
  const contents = processor.parse(content);
  if (contents?.children?.[0].type === "mdxjsEsm") {
    const [metaRaw, ...rest] = contents.children;
    const modifiedAST = { ...contents, children: rest };
    const meta = processor.stringify(metaRaw);
    const metaJson = meta.slice("export const meta = ".length, meta.length - 2);

    return matter.stringify(
      "---\n" + metaJson + "\n---\n\n" + processor.stringify(modifiedAST)
    );
  }
};

export const convertFromYamlToMeta = async ({ content }) => {
  const frontmatter = matter(content);
  return matter.stringify(
    "export const meta = " +
      util.format(frontmatter.data).replace(/\'/g, '"') +
      ";\n" +
      frontmatter.content
  );
};
