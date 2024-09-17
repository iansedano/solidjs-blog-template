import { cache, redirect } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";

const getBlogPosts = cache(async () => {
  "use server";
  console.log("getting blog posts for post");
  try {
    return getMarkdownPosts();
  } catch (e) {
    return redirect("/404");
  }
}, "blog posts");

export default getBlogPosts;
