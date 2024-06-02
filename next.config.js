/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
    
        // css: {
        //     modules: {
        //         localIdentName: '[name]__[local]__[hash:base64:5]',
        //         // Customize the CSS Modules localIdentName
        //     }
        // }
        // turbo: {    
            
        // },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/**',
            }
        ]
    }
}
   
module.exports = nextConfig