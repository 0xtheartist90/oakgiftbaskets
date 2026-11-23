import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
// No `output: 'standalone'`: that is for the Docker image; Vercel builds Next.js itself.
const nextConfig: NextConfig = {};

export default withBundleAnalyzer(nextConfig);
