import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import mpaPlugin, {
  type Options as MPAPluginOptions,
  type PageOption as MPAPluginPageOption,
} from "vite-plugin-mpa-plus";
import * as glob from "glob";

import {dependencies} from "./package.json"

const getPages = (): MPAPluginOptions["pages"] => {
  let entries: Record<string, MPAPluginPageOption> = {};
  const htmlFiles = glob.sync(path.resolve(__dirname, "src", "./pages/**/", "*.html"));

  for (const html of htmlFiles) {
    const file = path.parse(html);
    const folderName = path.dirname(html).split(path.sep).pop() as string;

    entries = {
      ...entries,
      [folderName]: {
        filename: `/${folderName}/index.html`,
        template: `src/pages/${folderName}/index.html`,
      },
    };

    console.log(entries);
  }

  return entries;
};

export default defineConfig({
  build: {
    outDir: "./build",
    rollupOptions: {
      output: {
				format: 'esm',
				strict: false,
				manualChunks: {
					shared: Object.keys(dependencies)
				},
				chunkFileNames: 'assets/js/chunks/[name].js',
				entryFileNames: 'assets/js/bundles/[name].bundle.js',
				assetFileNames: 'assets/[ext]/[name].[ext]',
			},
    }
  },
  plugins: [
    react(),
    mpaPlugin({
      pages: {
        content: {
          entry: "./src/content.ts",
          filename: `/content.js`,
          template: `src/content.js`,
        },
        ...getPages()
      },
    }),
  ],
});
