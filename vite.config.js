import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          framer: ["framer-motion"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
      external: [],
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/three/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
    exclude: [],
    force: true,
    esbuildOptions: {
      target: "esnext",
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    // Enable compression
    compress: true,
  },
  // Enable CSS preprocessing optimizations
  css: {
    devSourcemap: false,
  },
  // Optimize preview server
  preview: {
    port: 4173,
    open: true,
  },
});
