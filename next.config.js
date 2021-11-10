/** @type {import('next').NextConfig} */
const headers = require('./security-headers')
module.exports = {
  reactStrictMode: true,
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
