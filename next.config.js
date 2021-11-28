/** @type {import('next').NextConfig} */
const headers = require('./security-headers')
module.exports = {
  reactStrictMode: true,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    SERVER_PATH: process.env.SERVER_PATH
  },
  // append this at the bottom of your next.config.js file
  async headers() {
    return [
      {
        source: '/(.*)',
        headers,
      }
    ]
  },
}
