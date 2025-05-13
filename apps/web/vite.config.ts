import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["commons"],
  },
  build: {
    commonjsOptions: {
      include: [/commons/, /node_modules/],
    },
  },
});
