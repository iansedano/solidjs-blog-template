import { Component } from "solid-js";

const Post: Component<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <article>
      <h1 class="text-4xl font-bold my-8 text-center">{title}</h1>

      <div class="prose mx-auto" innerHTML={content}></div>
    </article>
  );
};

export default Post;
