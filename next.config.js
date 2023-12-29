/** @type {import('next').NextConfig} */
const nextConfig = {
  // we need to authorize our local computer to be the source of images

  images: {
    // remotePatterns: [
    //   {
    //     hostname: "localhost",
    //     pathname: "**",
    //     port: "3000",
    //     protocol: "http",
    //   },
    // ],
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "digital-hippo-ryuga.onrender.com",
        protocol: "https",
      },
    ],
    // domains: ["localhost", "digital-hippo-ryuga.onrender.com"],
  },
};

module.exports = nextConfig;
