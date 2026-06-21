import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base "./" makes the build work on Netlify, Vercel, Cloudflare Pages, and sub-folders.
// Firebase is OPTIONAL (only used for global visitor counters). It is loaded lazily and
// may not be installed, so we mark it external — this stops the build from failing when
// firebase isn't present. If you later run `npm install firebase`, it still works.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      external: [/^firebase(\/.*)?$/],
    },
  },
});
