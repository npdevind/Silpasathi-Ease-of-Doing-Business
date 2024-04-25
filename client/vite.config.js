import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import dotenv from "dotenv";

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

export default defineConfig(({ mode }) => {
  let env;
  switch (mode) {
    case "development":
      env = dotenv.config().parsed;
      break;
    case "production":
      env = dotenv.config({ path: "./.env.prod" }).parsed;
      break;
    default:
      env = {};
  }
  env = { ...env, MODE: mode };
  return {
    ...(mode === "production" && {
      esbuild: {
        drop: ["console", "debugger"],
      },
    }),
    resolve: { alias: { "~bootstrap": "bootstrap" } },
    plugins: [react(), eslintPlugin(), dotEnvReplacement(env)],
  };
});
