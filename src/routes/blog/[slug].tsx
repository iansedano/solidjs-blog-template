import { useParams, createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import PostComponent from "~/components/Post";
import getBlogPosts from "~/server/getBlogPosts";

export default function BlogPost() {
  const blogPosts = createAsync(() => getBlogPosts());
  const params = useParams();

  return (
    <div class="mx-4 max-w-prose md:mx-auto">
      <Show when={blogPosts()} fallback={<div>Loading...</div>}>
        {(() => {
          const post = blogPosts()?.find((post: Post) => post.data.slug === params.slug);
          return <PostComponent title={post?.data.title ?? ""} content={post?.content ?? ""} />;
        })()}
      </Show>
    </div>
  );
}
