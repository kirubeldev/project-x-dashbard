// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your other configurations can go here
  };
  
  export default {
    ...nextConfig, // Spread the nextConfig object
    middleware: ['src/middleware.js'], // Add your middleware
  };
  