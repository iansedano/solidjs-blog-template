import { useLocation, A, useIsRouting } from "@solidjs/router";
import Spinner from "~/components/Spinner";

export default function Nav() {
  const isRouting = useIsRouting();
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="h-12 bg-slate-200">
      <ul class="flex items-center justify-center p-3">
        {isRouting() ? (
          <Spinner />
        ) : (
          <>
            <li class={`${active("/")} mx-1.5 border-b-2 sm:mx-6`}>
              <A href="/">Home</A>
            </li>
            <li class={`${active("/blog")} mx-1.5 border-b-2 sm:mx-6`}>
              <A href="/blog">Blog</A>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
