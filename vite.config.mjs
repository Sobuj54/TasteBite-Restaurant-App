import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  build: {
    outDir: "build", // Keep this as you're using 'build' instead of 'dist'
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Optimize chunks for your multi-interface app
          "customer-bundle": [
            "./src/pages/menu-browse-search",
            "./src/pages/item-detail-customization",
            "./src/pages/shopping-cart-checkout",
          ],
          "admin-bundle": [
            "./src/pages/restaurant-admin-dashboard",
            "./src/components/ui/AdminNavigation",
          ],
          "kitchen-bundle": [
            "./src/pages/kitchen-display-system",
            "./src/components/ui/KitchenInterface",
          ],
        },
      },
    },
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
  // Vercel-specific optimizations
  base: "/", // Ensure proper base path
  preview: {
    port: 4028,
    strictPort: true,
  },
});
