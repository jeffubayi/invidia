/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com','https://aaepbxpivppmvuaemajn.supabase.co','https://assets-global.website-files.com',"https://i.imgur.com","https://encrypted-tbn0.gstatic.com"],
  },
}

module.exports = nextConfig
