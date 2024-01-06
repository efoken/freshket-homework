import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [react(), vike()],
});

export default config;
