import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { marked } from "marked";

const ROOT = "./";
const CONTENT = path.join(ROOT, "src", "md");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const files = fs.readdirSync(CONTENT);

const markdownFiles = files.map((file) => {
  const filePath = path.join(CONTENT, file);
  const markdownFile = matter(fs.readFileSync(filePath, "utf8"));

  return {
    ...matter(markdownFile),
    content: DOMPurify.sanitize(marked.parse(markdownFile.content)),
    fileStem: path.basename(file, path.extname(file)),
  };
});

console.log(markdownFiles);
