/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  images: {
    domains: ['i.imgur.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
