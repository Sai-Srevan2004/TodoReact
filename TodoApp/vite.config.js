import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist"
  },
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  // ✅ This handles SPA routing on deployment
  preview: {
    port: 4173,
    host: true,
  },
});
