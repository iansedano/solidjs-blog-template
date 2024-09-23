# [SolidStart](https://docs.solidjs.com/solid-start) Blog Template

This is a personal blog template for SolidStart. It's a work in progress.

The tentative requirements for this template are:

- A simple, clean and adaptable design for a basic blog.
- Tailwind CSS, TypeScript, Prettier, and ESLint.
- A markdown file for each blog post -- plain markdown files with YAML front matter (so it's easy to migrate to and from).
- Front matter schema validation.
- Syntax highlighting for code blocks.
- No manual pre-render step required for development or build.

## Outstanding Issues / To-Dos

- Performance
  - Currently the blog posts are loaded all together into a big ole JSON which isn't ideal for performance (see [`src/server`](src/server/) or [`src/routes/blog`](src/routes/blog)).
  - Better caching strategy for blog post parsing and rendering.
  - The blog post list could be paginated.
- SEO features such as meta tags and sitemap are missing, which should be tied into the front matter. That is, grabbing SEO info from the front matter.
