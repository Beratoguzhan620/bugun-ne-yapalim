import type { ConfigContext, ExpoConfig } from "expo/config";

// EXPO_BASE_URL serves the web build from a sub-path, e.g. /bugun-ne-yapalim on GitHub Pages.
export default ({ config }: ConfigContext): ExpoConfig => {
  const baseUrl = process.env.EXPO_BASE_URL;
  return {
    ...config,
    name: config.name ?? "Bugün Ne Yapalım?",
    slug: config.slug ?? "bugun-ne-yapalim",
    ...(baseUrl ? { experiments: { ...config.experiments, baseUrl } } : {}),
  };
};
