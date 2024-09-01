/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knbqtoddehiqtawhenwl.supabase.co',
      },
    ],
  },
}

export default nextConfig
