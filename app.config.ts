import { defineConfig } from "@solidjs/start/config";
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
  server: {
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    plugins: [
      ViteRestart({
        restart: ["src/md/*.*"],
      }),
    ],
  },
});
