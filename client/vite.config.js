import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import eslintPlugin from "vite-plugin-eslint";
import dotenv from "dotenv";
import { VitePWA } from "vite-plugin-pwa";

// Function to replace dotenv variables in Vite config
const dotEnvReplacement = (env) => {
  const replacement = Object.entries(env).reduce((obj, [key, val]) => {
    obj[`process.env.${key}`] = `"${val}"`;
    return obj;
  }, {});
  return {
    name: "eodb-dotenv",
    config(obj) {
      obj.define = obj.define || {};
      Object.assign(obj.define, replacement);
    },
  };
};

// Export the Vite configuration
export default defineConfig(({ mode }) => {
  let env;
  switch (mode) {
    case "development":
      // Load .env file for development mode
      env = dotenv.config().parsed;
      break;
    case "production":
      // Load .env.prod file for production mode
      env = dotenv.config({ path: "./.env.prod" }).parsed;
      break;
    default:
      env = {};
  }
  env = { ...env, MODE: mode };

  return {
    // Remove console and debugger statements in production
    ...(mode === "production" && {
      esbuild: {
        drop: ["console", "debugger"],
      },
    }),
    // Resolve alias for bootstrap
    resolve: { alias: { "~bootstrap": "bootstrap" } },
    plugins: [
      // React plugin for Vite
      react(),
      // ESLint plugin for Vite
      // eslintPlugin(),
      // Custom dotenv replacement plugin
      dotEnvReplacement(env),
      // PWA plugin configuration
      VitePWA({
        registerType: "autoUpdate", // Automatically update the service worker
        devOptions: {
          enabled: true, // Enable PWA in development
        },
        manifest: {
          name: "Silpasathi",
          short_name: "Silpasathi",
          description: "Silpasathi description",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          screenshots: [
            {
              src: "screenshot1.png",
              sizes: "540x720",
              type: "image/png",
              form_factor: "wide",
            },
            {
              src: "screenshot2.png",
              sizes: "540x720",
              type: "image/png",
              form_factor: "wide",
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Increase cache limit to 5 MB
        },
      }),
    ],
    server: {
      host: true, // Listen on all network interfaces
      port: 5173,
    },
  };
});
