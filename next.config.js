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

    return config;
  },
};

module.exports = nextConfig;
