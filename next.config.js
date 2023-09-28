/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.graphassets.com"],
  },
};

const withNextIntl = require("next-intl/plugin")("./i18n.js");

module.exports = withNextIntl(nextConfig);
