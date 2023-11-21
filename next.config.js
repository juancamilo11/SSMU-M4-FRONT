/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  env: {
    // NEXT_PUBLIC_BACKEND_SERVER_URL: 'http://localhost:8080/api/v1',
    NEXT_PUBLIC_BACKEND_SERVER_URL:
      'http://ec2-54-210-220-33.compute-1.amazonaws.com:8080/api/v1',
  },
};

module.exports = nextConfig;
