import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bjwwgonfyqodzbbjsgxo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  serverExternalPackages: ['sharp'],
  outputFileTracingExcludes: {
    '*': [
      'node_modules/three/build/**',
      'node_modules/three/examples/**',
      'node_modules/@swc/core-linux-x64-gnu/**',
      'node_modules/@swc/core-linux-x64-musl/**',
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
