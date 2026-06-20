import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base "./" makes the build work on Netlify, Vercel, Cloudflare Pages, and sub-folders.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
