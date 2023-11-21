/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  env: {
    // NEXT_PUBLIC_BACKEND_SERVER_URL: 'http://localhost:8080/api/v1',
    NEXT_PUBLIC_BACKEND_SERVER_URL:
      'http://ec2-54-209-125-121.compute-1.amazonaws.com:8080/api/v1',
  },
};

module.exports = nextConfig;
