import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const owner = searchParams.get('owner') || 'keyur-369'
  const repo = searchParams.get('repo') || 'repository'
  const stars = searchParams.get('stars') || '0'
  const forks = searchParams.get('forks') || '0'
  const issues = searchParams.get('issues') || '0'

  let avatarHref = `https://github.com/${owner}.png`

  // Fetch avatar image server-side and convert to Base64 Data URI so SVG image is 100% self-contained
  try {
    const avatarRes = await fetch(`https://github.com/${owner}.png`, {
      next: { revalidate: 86400 },
    })
    if (avatarRes.ok) {
      const buffer = await avatarRes.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      const contentType = avatarRes.headers.get('content-type') || 'image/png'
      avatarHref = `data:${contentType};base64,${base64}`
    }
  } catch (e) {
    console.error('Failed to inline avatar base64 in SVG:', e)
  }

  const svg = `
  <svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <clipPath id="avatarClip">
        <circle cx="715" cy="85" r="45" />
      </clipPath>
    </defs>

    <!-- Card Background (Pure White matching LinkedIn card) -->
    <rect width="800" height="400" rx="0" fill="#ffffff"/>

    <!-- Owner / Repo Header -->
    <text x="50" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="#3f3f46">${owner}/</text>
    <text x="50" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="900" fill="#18181b" letter-spacing="-1">${repo}</text>

    <!-- Owner Avatar (Inlined Base64) -->
    <image href="${avatarHref}" x="670" y="40" height="90" width="90" clip-path="url(#avatarClip)" />
    <circle cx="715" cy="85" r="45" fill="none" stroke="#e4e4e7" stroke-width="2"/>

    <!-- Stats Section -->
    <g transform="translate(50, 310)">
      <!-- Contributors -->
      <g transform="translate(0, 0)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="18" fill="#52525b">👥</text>
        <text x="26" y="16" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#18181b">1</text>
        <text x="42" y="16" font-family="-apple-system, sans-serif" font-size="14" fill="#71717a">Contributors</text>
      </g>
      
      <!-- Issues -->
      <g transform="translate(170, 0)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="18" fill="#52525b">⊙</text>
        <text x="24" y="16" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#18181b">${issues}</text>
        <text x="40" y="16" font-family="-apple-system, sans-serif" font-size="14" fill="#71717a">Issues</text>
      </g>
      
      <!-- Stars -->
      <g transform="translate(290, 0)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="18" fill="#52525b">☆</text>
        <text x="24" y="16" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#18181b">${stars}</text>
        <text x="40" y="16" font-family="-apple-system, sans-serif" font-size="14" fill="#71717a">Stars</text>
      </g>
      
      <!-- Forks -->
      <g transform="translate(400, 0)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="18" fill="#52525b">⑂</text>
        <text x="24" y="16" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#18181b">${forks}</text>
        <text x="40" y="16" font-family="-apple-system, sans-serif" font-size="14" fill="#71717a">Forks</text>
      </g>
    </g>

    <!-- GitHub Octocat Icon -->
    <g transform="translate(710, 300)">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 7.08 4.58 13.07 10.94 15.2.8.14 1.1-.35 1.1-.77 0-.38-.01-1.4-.02-2.74-4.45.97-5.39-2.15-5.39-2.15-.73-1.85-1.78-2.34-1.78-2.34-1.45-.99.11-.97.11-.97 1.6.11 2.45 1.65 2.45 1.65 1.42 2.44 3.74 1.73 4.65 1.33.14-1.03.55-1.73 1-2.13-3.55-.4-7.29-1.78-7.29-7.91 0-1.75.62-3.18 1.65-4.3-.17-.4-.71-2.04.16-4.24 0 0 1.34-.43 4.4 1.64 1.28-.36 2.65-.54 4.01-.54 1.36 0 2.73.18 4.01.54 3.05-2.07 4.39-1.64 4.39-1.64.88 2.2.34 3.84.17 4.24 1.03 1.12 1.65 2.55 1.65 4.3 0 6.15-3.75 7.5-7.32 7.9.57.49 1.07 1.46 1.07 2.95 0 2.13-.02 3.84-.02 4.36 0 .43.3.92 1.11.76C27.42 29.06 32 23.07 32 16 32 7.16 24.84 0 16 0z" fill="#27272a" transform="scale(1.1)"/>
    </g>

    <!-- Bottom multi-color accent line (Matching exact GitHub OpenGraph colors) -->
    <rect x="0" y="386" width="360" height="14" fill="#008080" />
    <rect x="360" y="386" width="150" height="14" fill="#ea4c89" />
    <rect x="510" y="386" width="150" height="14" fill="#f44336" />
    <rect x="660" y="386" width="140" height="14" fill="#ffb74d" />
  </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
