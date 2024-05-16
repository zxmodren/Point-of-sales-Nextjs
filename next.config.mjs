/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 'openweathermap.org','pbs.twimg.com'
    ]
  },
  env: {
    WEATHER_API: process.env.WEATHER_API,
  }
};

export default nextConfig;