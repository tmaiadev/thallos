/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
  plugins: [
    react(),
    ...(!isTest ? [babel({
      presets: [reactCompilerPreset()],
      plugins: [[
        "@babel/plugin-proposal-optional-chaining-assign",
        { version: "2023-07" },
      ]],
    })] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
