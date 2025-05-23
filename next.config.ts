import path from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig = withBundleAnalyzer({
  enabled: isAnalyze,
})({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
    additionalData: `@use "@/Assets/css/style.scss" as *;`,
  },
  images: {
    domains: [
      "daleel.blob.core.windows.net",
      "images.pexels.com",
      "encrypted-tbn0.gstatic.com", 
    ],
  
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
});

export default nextConfig;
