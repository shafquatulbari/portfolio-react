import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          framer: ["framer-motion"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          utils: ["maath"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize for modern browsers
    cssCodeSplit: true,
    // Enable asset inlining for small files
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "three"],
    force: true,
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
