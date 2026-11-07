import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Hardened production configuration:
// - Disables sourcemaps to prevent source code leaks
// - Drops console.log and debugger statements
// - Minifies & mangles identifier names via Terser
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // CRITICAL: Never ship source maps to production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Strips console.log, info, debug
        drop_debugger: true,
        pure_funcs: ["console.info", "console.debug", "console.warn"],
      },
      format: {
        comments: false, // Strips all code comments and metadata
      },
      mangle: {
        toplevel: true, // Obfuscates top-level variable and function names
      },
    },
    rollupOptions: {
      output: {
        // Obfuscate chunk file names with random hashes
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
      },
    },
  },
});
