import { useParams, createAsync, cache, redirect } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";
import { For, Show, ErrorBoundary } from "solid-js";

const getBlogPosts = cache(async () => {
  "use server";
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
        {
          <article>
            <h1 class="text-3xl font-bold mb-8 text-center">
              {post.data.title}
            </h1>

            <div class="prose mx-auto" innerHTML={post.content}></div>
          </article>
        }
      </Show>
    </div>
  );
}
