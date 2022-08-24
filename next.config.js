/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  devIndicators: {
    buildActivity: false
  }
}

module.exports = nextConfig
