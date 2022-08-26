const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['res.cloudinary.com','cdn.pixabay.com'],
  },
  devIndicators: {
    buildActivity: false
  },
})

module.exports = nextConfig;