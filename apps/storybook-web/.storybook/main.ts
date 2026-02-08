import type { StorybookConfig } from "@storybook/react-vite";

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

    return config;
  },
};

export default config;
