import { useParams, createAsync, cache } from "@solidjs/router";
import { getMarkdownPosts } from "~/server/generateMd";
import { For } from "solid-js";

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
  return (
    <div>
      {params.slug}
      <For each={blogPosts()}>
        {(blogPost) => (
          <li>
            {blogPost.data.title} -- {blogPost.data.description}
          </li>
        )}
      </For>
    </div>
  );
}
