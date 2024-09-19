"use server";

import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import getProjectRoot from "./getProjectRoot";
import { type } from "arktype";

const ROOT = getProjectRoot();
const CONTENT = path.join(ROOT, "src", "md");
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

md.use(
  await Shiki({
    theme: "monokai",
  }),
);

export function getMarkdownPosts(): Post[] {
  const files = fs.readdirSync(CONTENT);

  return files
    .map((file) => {
      const filePath = path.join(CONTENT, file);
      const markdownFile = matter(fs.readFileSync(filePath, "utf8"));

      const out = frontMatterSchema(markdownFile.data);
      if (out instanceof type.errors) {
        console.error(`${filePath}: ${out.summary}`);
        return undefined;
      } else {
        return {
          ...markdownFile,
          data: frontMatterSchema(markdownFile.data),
          content: DOMPurify.sanitize(md.render(markdownFile.content, { async: false })),
          fileStem: path.basename(file, path.extname(file)),
        };
      }
    })
    .filter((x) => x !== undefined);
}
