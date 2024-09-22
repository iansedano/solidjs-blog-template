import { useLocation, A, useIsRouting } from "@solidjs/router";

export default function Nav() {
  const isRouting = useIsRouting();
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-slate-200">
      <ul class="flex items-center justify-center p-3">
        <li class={`${active("/")} mx-1.5 border-b-2 sm:mx-6`}>
          <A href="/">Home</A>
        </li>
        <li class={`${active("/blog")} mx-1.5 border-b-2 sm:mx-6`}>
          <A href="/blog">Blog</A>
        </li>

        {isRouting() ? <div class="animate-bounce">⏳</div> : ""}
      </ul>
    </nav>
  );
}
