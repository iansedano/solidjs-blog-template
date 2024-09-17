const Post = ({ title, content }) => {
  return (
    <article>
      <h1 class="text-3xl font-bold my-8 text-center">{title}</h1>

      <div class="prose mx-auto" innerHTML={content}></div>
    </article>
  );
};

export default Post;
