import { Component } from "solid-js";

const Post: Component<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <article>
      {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
      <h1 class="my-8 text-center text-2xl font-semibold md:text-4xl" innerHTML={title}></h1>
      <div class="prose prose-sm mx-auto md:prose-base" innerHTML={content}></div>
    </article>
  );
};

export default Post;
