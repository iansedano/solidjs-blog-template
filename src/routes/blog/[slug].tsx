import { useParams, createAsync, cache } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";
import { For, Show } from "solid-js";

const getBlogPosts = cache(async () => {
  "use server";
  return getMarkdownPosts();
}, "blog posts");

export const route = {
  load: () => getBlogPosts(),
};

export default function BlogPost() {
  const blogPosts = createAsync(() => getBlogPosts());
  const params = useParams();
  const post = blogPosts()?.find((post) => post.data.slug === params.slug);

  return (
    <div>
      {params.slug}
      <Show when={post} fallback={<div>Loading...</div>}>
        {
          <article>
            <h1>{post.data.title}</h1>
            <p>{post.data.description}</p>
            <div innerHTML={post.content}></div>
          </article>
        }
      </Show>
    </div>
  );
}
