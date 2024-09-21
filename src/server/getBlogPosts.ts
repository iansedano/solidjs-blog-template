import { cache, redirect } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";

let globalCache: Post[] | null = null;

const getBlogPosts = cache(async () => {
  "use server";
  if (globalCache) {
    console.log("Returning cached blog posts");
    return globalCache;
  }
  console.log("getting blog posts");
  try {
    globalCache = await getMarkdownPosts();
    return globalCache;
  } catch (_) {
    return redirect("/404");
  }
}, "blog posts");

export default getBlogPosts;
