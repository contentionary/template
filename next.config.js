/** @type {import('next').NextConfig} */
/* 
assetPrefix: "http://techslides.com",
const nextConfig = withPlugins([], {}); 
const withVideos = require("next-videos");
const withPlugins = require("next-compose-plugins");
*/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };

    return config;
  },
  images: {
    domains: [
      "localhost",
      "https://www.sic-info.org",
      "video.bunnycdn.com",
      "cdn.edtify.com",
      "dev-cdn.edtify.com",
      // "dev-cdn.contentionary.com",
    ],
  },
};

module.exports = nextConfig;
