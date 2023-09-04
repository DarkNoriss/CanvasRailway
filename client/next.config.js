/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  output: 'export',
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
});
