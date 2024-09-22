import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

const SHIKI_THEME = "monokai";

let md: MarkdownIt | null = null;

export const getMarkdownItInstance = async () => {
  if (!md) {
    md = MarkdownIt();
    md.use(await Shiki({ theme: SHIKI_THEME }));
  }
  return md;
};
