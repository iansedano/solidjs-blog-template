import { Component } from "solid-js";

const Post: Component<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <article>
      <h1 class="my-8 text-center text-4xl font-bold">{title}</h1>

      <div class="prose mx-auto" innerHTML={content}></div>
    </article>
  );
};

export default Post;
