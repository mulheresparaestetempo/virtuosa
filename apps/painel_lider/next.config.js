/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: eliminates serverless functions → fixes FUNCTION_RUNTIME_DEPRECATED on Vercel
  output: 'export',
  // Disable image optimization (not needed; we use emoji and external URLs)
  images: { unoptimized: true },
}

module.exports = nextConfig
