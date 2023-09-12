import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    tsconfigPaths(),
  ],

  build: {
    rollupOptions: {
      output: {
        entryFileNames: "chatbot.js",
        assetFileNames: "chatbot.css",
        chunkFileNames: "chatbot-chunk.js",
      },
    },
  },
});
