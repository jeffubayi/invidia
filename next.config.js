/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com','https://aaepbxpivppmvuaemajn.supabase.co','https://assets-global.website-files.com',"https://i.imgur.com"],
  },
}

module.exports = nextConfig
