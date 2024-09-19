import { useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import PostComponent from "~/components/Post";
import getBlogPosts from "~/server/getBlogPosts";

export const route = {
  load: () => getBlogPosts(),
};

export default function BlogPost({ data }: { data: Promise<Post[]> }) {
  const [blogPosts] = createResource(() => data);
  const params = useParams();

  return (
    <div class="container mx-auto">
      <Show when={blogPosts.loading}>
        <p>Loading...</p>
      </Show>
      <Show when={blogPosts()} fallback={<div>Loading...</div>}>
        {(() => {
          const post = blogPosts()?.find((post: Post) => post.data.slug === params.slug);
          return <PostComponent title={post?.data.title} content={post?.content ?? ""} />;
        })()}
      </Show>
    </div>
  );
}
