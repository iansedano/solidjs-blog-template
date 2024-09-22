import { useParams, createAsync, A } from "@solidjs/router";
import { For } from "solid-js";
import getBlogPosts from "~/server/getBlogPosts";

export default function BlogPost() {
  const blogPosts = createAsync(() => getBlogPosts());
  const params = useParams();
  return (
    <ul class="mx-4 my-8 flex max-w-prose flex-col gap-4 md:mx-auto">
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
              <A href={`/blog/${blogPost.data.slug}`} class="md:flex md:items-start md:gap-4">
                <p class="mt-1 w-44 flex-shrink-0 text-sm text-slate-600 md:text-xl">{`${date}`}</p>
                <div>
                  <div
                    class="text-xl hover:text-sky-900 md:text-3xl"
                    innerHTML={blogPost.data.title}
                  ></div>{" "}
                  <div
                    class="prose text-sm md:text-base"
                    innerHTML={blogPost.data.description}
                  ></div>
                </div>
              </A>
            </li>
          );
        }}
      </For>
    </ul>
  );
}
