/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/shared/components/displayChart/DisplayChart.jsx",
      },
      shared: ["react", "react-dom", "react-apexcharts"], // Shared dependencies
    }),
  ],
  build: {
    target: "ES2022",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: path.resolve(__dirname, "./src/assets"),
      shared: path.resolve(__dirname, "./src/shared"),
      pages: path.resolve(__dirname, "./src/pages"),
      layout: path.resolve(__dirname, "./src/layout"),
      components: path.resolve(__dirname, "./src/components"),
    },
  },
});
