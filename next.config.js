const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['res.cloudinary.com','cdn.pixabay.com'],
  },
  devIndicators: {
    buildActivity: false
  }
}

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  }
})

module.exports = nextConfig;
