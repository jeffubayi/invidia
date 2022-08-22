/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com','https://aaepbxpivppmvuaemajn.supabase.co','https://assets-global.website-files.com'],
  },
}

module.exports = nextConfig
