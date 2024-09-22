"use server";

import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import getProjectRoot from "./getProjectRoot";
import { type, ArkErrors } from "arktype";

const SHIKI_THEME = "monokai";
const CONTENT = path.join(getProjectRoot(), "src", "md");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const frontMatterSchema = type({
  title: "string",
  date: "Date",
  description: "string",
  slug: "string",
  "metaTitle?": "string",
  "metaDescription?": "string",
  "keywords?": "string[]",
});

const md = MarkdownIt();
const mdConfigPromise = (async () => md.use(await Shiki({ theme: SHIKI_THEME })))();

export async function getMarkdownPosts(): Promise<Post[]> {
  const files = fs.readdirSync(CONTENT);

  await mdConfigPromise;

  const renderMd = (content: string) => DOMPurify.sanitize(md.render(content, { async: false }));
  const pages = [];

  for (const file of files) {
    try {
      const filePath = path.join(CONTENT, file);
      const post = contentToPost(
        fs.readFileSync(filePath, "utf8"),
        path.basename(file, path.extname(file)),
        renderMd,
      );

      pages.push(post);
    } catch (e) {
      console.error(`Error reading ${file}, ${e}`);
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
