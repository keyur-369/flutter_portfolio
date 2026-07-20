'use client'

import { useState } from 'react'

const ICON_MAP: Record<string, string> = {
  flutter: 'https://cdn.simpleicons.org/flutter',
  dart: 'https://cdn.simpleicons.org/dart',
  php: 'https://cdn.simpleicons.org/php',
  firebase: 'https://cdn.simpleicons.org/firebase',
  supabase: 'https://cdn.simpleicons.org/supabase',
  react: 'https://cdn.simpleicons.org/react',
  'react native': 'https://cdn.simpleicons.org/react',
  nextjs: 'https://cdn.simpleicons.org/nextdotjs',
  'next.js': 'https://cdn.simpleicons.org/nextdotjs',
  node: 'https://cdn.simpleicons.org/nodedotjs',
  'node.js': 'https://cdn.simpleicons.org/nodedotjs',
  nodejs: 'https://cdn.simpleicons.org/nodedotjs',
  python: 'https://cdn.simpleicons.org/python',
  mysql: 'https://cdn.simpleicons.org/mysql',
  postgresql: 'https://cdn.simpleicons.org/postgresql',
  postgres: 'https://cdn.simpleicons.org/postgresql',
  mongodb: 'https://cdn.simpleicons.org/mongodb',
  javascript: 'https://cdn.simpleicons.org/javascript',
  js: 'https://cdn.simpleicons.org/javascript',
  typescript: 'https://cdn.simpleicons.org/typescript',
  ts: 'https://cdn.simpleicons.org/typescript',
  html: 'https://cdn.simpleicons.org/html5',
  html5: 'https://cdn.simpleicons.org/html5',
  css: 'https://cdn.simpleicons.org/css3',
  css3: 'https://cdn.simpleicons.org/css3',
  tailwind: 'https://cdn.simpleicons.org/tailwindcss',
  tailwindcss: 'https://cdn.simpleicons.org/tailwindcss',
  git: 'https://cdn.simpleicons.org/git',
  github: 'https://cdn.simpleicons.org/github',
  docker: 'https://cdn.simpleicons.org/docker',
  figma: 'https://cdn.simpleicons.org/figma',
  android: 'https://cdn.simpleicons.org/android',
  ios: 'https://cdn.simpleicons.org/apple',
  swift: 'https://cdn.simpleicons.org/swift',
  kotlin: 'https://cdn.simpleicons.org/kotlin',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'c++': 'https://cdn.simpleicons.org/cplusplus',
  cpp: 'https://cdn.simpleicons.org/cplusplus',
  csharp: 'https://cdn.simpleicons.org/csharp',
  'c#': 'https://cdn.simpleicons.org/csharp',
  vue: 'https://cdn.simpleicons.org/vuedotjs',
  angular: 'https://cdn.simpleicons.org/angular',
  laravel: 'https://cdn.simpleicons.org/laravel',
  graphql: 'https://cdn.simpleicons.org/graphql',
  rest: 'https://cdn.simpleicons.org/postman',
  postman: 'https://cdn.simpleicons.org/postman',
  aws: 'https://cdn.simpleicons.org/amazonwebservices',
  vercel: 'https://cdn.simpleicons.org/vercel',
}

export function getOfficialLogoUrl(name: string): string | null {
  if (!name) return null
  const key = name.trim().toLowerCase()
  if (ICON_MAP[key]) return ICON_MAP[key]

  // Try direct simpleicons slug
  const slug = key.replace(/[^a-z0-9]/g, '')
  return `https://cdn.simpleicons.org/${slug}`
}

interface SkillIconProps {
  name: string
  icon?: string | null
  className?: string
  size?: number
}

export function SkillIcon({ name, icon, className = 'w-6 h-6', size = 24 }: SkillIconProps) {
  const [error, setError] = useState(false)

  // 1. Direct image URL or base64 provided
  if (icon && (icon.startsWith('http') || icon.startsWith('data:'))) {
    return (
      <img
        src={icon}
        alt={name}
        className={`object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  // 2. Official logo auto-detection
  const officialLogo = getOfficialLogoUrl(name)

  if (officialLogo && !error) {
    return (
      <img
        src={officialLogo}
        alt={name}
        onError={() => setError(true)}
        className={`object-contain transition-transform duration-200 hover:scale-110 ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  // 3. Icon input string or Emoji fallback
  if (icon && icon.trim()) {
    return <span className="text-xl leading-none">{icon}</span>
  }

  // Default fallback
  return <span className="text-xl leading-none">⚡</span>
}
