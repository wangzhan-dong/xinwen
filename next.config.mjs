/** @type {import('next').NextImage} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure that dynamic parts are handled correctly in static export
  trailingSlash: true,
};

export default nextConfig;
