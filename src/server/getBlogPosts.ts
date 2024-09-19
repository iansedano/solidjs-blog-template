import { cache, redirect } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";

const getBlogPosts = cache(async () => {
  "use server";
  console.log("getting blog posts");
  try {
    return getMarkdownPosts();
  } catch (_) {
    return redirect("/404");
  }
}, "blog posts");

export default getBlogPosts;
