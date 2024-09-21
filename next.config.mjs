// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["images.clerk.dev", "randomuser.me", "picsum.photos"],
//   },
// };

// // module.exports = {
// //   experimental: {
// //     serverActions: true,
// //   },
// // };

// export default nextConfig;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.clerk.dev",
        pathname: "/**", // Matches all images on this domain
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**", // Matches all images on this domain
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**", // Matches all images on this domain
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // Matches all images on example.com
      },
    ],
  },
};

export default nextConfig;
