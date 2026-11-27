import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "src/bundle.manifests.ts", // Bundle registers one or more manifests
      formats: ["es"],
      fileName: "umbricians-media-curator",
    },
    outDir: "../wwwroot/App_Plugins/UmbriciansMediaCurator", // your web component will be saved in this location
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      external: [/^@umbraco/],
    },
  },
});
