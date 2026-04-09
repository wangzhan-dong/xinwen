/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Maintain production stability for static hosting
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
