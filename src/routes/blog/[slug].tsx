import { useParams, createAsync, cache, redirect } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";
import { For, Show, ErrorBoundary } from "solid-js";
import Post from "~/components/Post";

const getBlogPosts = cache(async () => {
  "use server";
  console.log("getting blog posts for post");
  try {
    return getMarkdownPosts();
  } catch (e) {
    return redirect("/404");
  }
}, "blog posts");

export const route = {
  load: () => getBlogPosts(),
};

export default function BlogPost() {
  const blogPosts = createAsync(() => getBlogPosts());
  const params = useParams();
  const post = blogPosts()?.find((post) => post.data.slug === params.slug);
  if (post === undefined) {
    return <div>Post not found</div>;
  }

  return (
    <div class="container mx-auto">
      <Show when={post != undefined} fallback={<div>Loading...</div>}>
        {<Post title={post.data.title} content={post.content} />}
      </Show>
    </div>
  );
}
