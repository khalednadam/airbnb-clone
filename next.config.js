/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config){
        config.infrastructureLogging = { debug: /PackFileCache/ }
        return config;
    },
    images:{
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    }
}

module.exports = nextConfig
