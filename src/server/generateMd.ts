"use server";

import matter from "gray-matter";
import fs from "fs";
import path from "path";
import getProjectRoot from "./getProjectRoot";
import { type, ArkErrors } from "arktype";
import getMarkdownParser from "./markdownParser";

const CONTENT_DIR = "./src/md";

const frontMatterSchema = type({
  title: "string",
  date: "Date",
  description: "string",
  slug: "string",
  "metaTitle?": "string",
  "metaDescription?": "string",
  "keywords?": "string[]",
});

export async function getMarkdownPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join(getProjectRoot(), CONTENT_DIR));
  const mdParser = await getMarkdownParser();
  const pages: Post[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(CONTENT_DIR, file);
      const post = contentToPost(
        fs.readFileSync(filePath, "utf8"),
        path.basename(file, path.extname(file)),
        mdParser,
      );

      pages.push(post);
    } catch (e) {
      console.error(`Error with ${file}, ${e}`);
      continue;
    }
  }

  return pages;
}

const contentToPost = (
  content: string,
  fileStem: string,
  renderMd: (content: string) => string,
): Post => {
  const markdownFile = matter(content);

  const frontMatter: typeof frontMatterSchema.infer | ArkErrors = frontMatterSchema(
    markdownFile.data,
  );

  if (frontMatter instanceof type.errors) throw new Error(frontMatter.summary);

  return {
    ...markdownFile,
    data: {
      ...frontMatter,
      description: renderMd(markdownFile.data.description),
      title: renderMd(markdownFile.data.title).replace(/<p>|<\/p>/g, ""), // remove outer <p> tags
    },
    content: renderMd(markdownFile.content),
    fileStem: fileStem,
  };
};
