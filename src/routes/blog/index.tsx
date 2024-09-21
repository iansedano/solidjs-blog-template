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
    <ul class="container mx-auto my-8 flex max-w-prose flex-col gap-4">
      {params.slug}
      <For each={blogPosts()}>
        {(blogPost) => {
          const date = new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(blogPost.data.date);

          return (
            <li>
              <p class="text-sm text-slate-600">{`${date}`}</p>
              <A href={`/blog/${blogPost.data.slug}`}>
                <h2 class="text-2xl hover:text-sky-900">{blogPost.data.title}</h2>{" "}
              </A>

              <p class="prose">{blogPost.data.description}</p>
            </li>
          );
        }}
      </For>
    </ul>
  );
}
