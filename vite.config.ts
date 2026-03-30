import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Switch dev server to polling to avoid EMFILE errors in environments
  // with low watcher limits (common in sandboxes/containers).
  server: {
    watch: {
      usePolling: true,
      interval: 500,
      ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
    },
  },
});
