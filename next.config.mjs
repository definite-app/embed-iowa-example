/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEFINITE_API_KEY: process.env.DEFINITE_API_KEY,
  },
};

export default nextConfig;
