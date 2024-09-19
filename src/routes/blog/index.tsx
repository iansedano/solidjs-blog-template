import { useParams, createAsync, A } from "@solidjs/router";
import { For } from "solid-js";
import getBlogPosts from "~/server/getBlogPosts";

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
            <A href={`/blog/${blogPost.data.slug}`}>
              {blogPost.data.title} -- {blogPost.data.description}
            </A>
          </li>
        )}
      </For>
    </div>
  );
}
