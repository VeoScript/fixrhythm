/** @type {import('next').NextConfig} */
const headers = require('./security-headers')
module.exports = {
  reactStrictMode: true,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    SERVER_PATH: process.env.SERVER_PATH,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
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
