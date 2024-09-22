import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const SHIKI_THEME = "monokai";

let md: MarkdownIt | undefined = undefined;
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const getMarkdownParser = async () => {
  if (!md) {
    md = MarkdownIt();
    md.use(await Shiki({ theme: SHIKI_THEME }));
  }
  return (content: string) => {
    return DOMPurify.sanitize(md!.render(content, { async: false }));
  };
};

export default getMarkdownParser;
