import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { marked } from "marked";
import getProjectRoot from "./getProjectRoot";

const ROOT = getProjectRoot();
const CONTENT = path.join(ROOT, "src", "md");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const frontMatterSchema = {
  title: "string",
  date: "string",
  description: "string",
  slug: "string",
};

export function getMarkdownPosts() {
  const files = fs.readdirSync(CONTENT);

  return files.map((file) => {
    const filePath = path.join(CONTENT, file);
    const markdownFile = matter(fs.readFileSync(filePath, "utf8"));

    return {
      ...markdownFile,
      content: DOMPurify.sanitize(
        marked.parse(markdownFile.content, { async: false })
      ),
      fileStem: path.basename(file, path.extname(file)),
    };
  });
}
