// app.config.ts
import { defineConfig } from "@tanstack/react-start/src/config";
import tsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "src"
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ],
    build: {
      rollupOptions: {
        external: ["pg-cloudflare"]
      }
    }
  }
});
export {
  app_config_default as default
};
