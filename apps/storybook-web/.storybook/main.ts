import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const packages = path.resolve(__dirname, "../../../packages");

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
    "../../../packages/ui-elements-web/src/**/*.stories.@(ts|tsx)",
    "../../../packages/components-web/src/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());

    // Prefer .web.* extensions so @groxigo/icons resolves the web
    // version of create-icon (SVG) instead of the React Native version.
    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ".web.jsx",
      ".mjs",
      ".js",
      ".mts",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
    ];

    // Resolve @groxigo/* from source for live HMR (tokens uses dist/ for CSS)
    config.resolve.alias = {
      ...config.resolve.alias,
      "@groxigo/components-web": path.join(packages, "components-web/src"),
      "@groxigo/ui-elements-web": path.join(packages, "ui-elements-web/src"),
      "@groxigo/ui-core": path.join(packages, "ui-core/src"),
      "@groxigo/contracts": path.join(packages, "contracts/src"),
      "@groxigo/icons": path.join(packages, "icons/src"),
    };

    return config;
  },
};

export default config;
