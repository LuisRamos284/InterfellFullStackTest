import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["commons"],
  },
  build: {
    commonjsOptions: {
      include: [/commons/, /node_modules/],
    },
  },
});
