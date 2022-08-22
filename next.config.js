/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com','https://aaepbxpivppmvuaemajn.supabase.co'],
  },
}

module.exports = nextConfig
