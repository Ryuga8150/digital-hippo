/** @type {import('next').NextConfig} */
const nextConfig = {
  // we need to authorize our local computer to be the source of images

  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
    ],
  },
};

module.exports = nextConfig;
