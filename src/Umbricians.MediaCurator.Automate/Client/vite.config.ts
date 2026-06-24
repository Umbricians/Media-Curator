import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/bundle.manifests.ts",
      formats: ["es"],
      fileName: "media-curator-automate",
    },
    outDir: "../wwwroot/App_Plugins/MediaCuratorAutomate",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
