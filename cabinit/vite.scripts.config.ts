import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "./build",
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      input: {
        "content": "./src/content.ts",
        "manipulation": "./src/manipulation.ts",
        "background": "./src/background.ts"
      },
      output: {
        chunkFileNames: '[name].js',
				entryFileNames: '[name].js',
				assetFileNames: '[name].[ext]',
      }
    }
  },
});
