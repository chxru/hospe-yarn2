/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["@hospe/common-fe"]);

module.exports = withTM(nextConfig);
