import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')
  const urlParam = searchParams.get('url')

  let targetOwner = owner
  let targetRepo = repo

  if (urlParam && (!targetOwner || !targetRepo)) {
    const cleanUrl = urlParam.trim().replace(/\.git$/, '').replace(/\/$/, '')
    const match = cleanUrl.match(/(?:github\.com\/|^)([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/i)
    if (match) {
      targetOwner = match[1]
      targetRepo = match[2]
    }
  }

  if (!targetOwner || !targetRepo) {
    return NextResponse.json({ error: 'Owner and repo or valid URL are required' }, { status: 400 })
  }

  const githubOgUrl = `https://opengraph.githubassets.com/1/${targetOwner}/${targetRepo}`

  try {
    const response = await fetch(githubOgUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      next: { revalidate: 86400 },
    })

    if (response.ok) {
      const contentType = response.headers.get('content-type') || 'image/png'
      const imageBuffer = await response.arrayBuffer()

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      })
    }
  } catch (e) {
    console.error('Failed to proxy GitHub OpenGraph image:', e)
  }

  // If OG image fails or is unavailable, return 404 so client cleanly renders native card
  return NextResponse.json({ error: 'GitHub OpenGraph image not available' }, { status: 404 })
}
