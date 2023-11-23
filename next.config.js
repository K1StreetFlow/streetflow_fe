/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
	images: {
		domains: ["localhost"],
	},
=======
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
    domains: ["localhost"]
  },
>>>>>>> 7895ca8446f646cc2ee398d4ef40008a9f27221d
};

module.exports = nextConfig;
