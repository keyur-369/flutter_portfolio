import { NextRequest, NextResponse } from 'next/server'

// Helper to format repository name to clean title
function formatTitle(name: string): string {
  if (!name) return ''
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

// Helper to format tech stack names nicely
function formatTechName(tech: string): string {
  const map: Record<string, string> = {
    flutter: 'Flutter',
    dart: 'Dart',
    react: 'React',
    reactjs: 'React',
    'react-native': 'React Native',
    nextjs: 'Next.js',
    'next.js': 'Next.js',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    nodejs: 'Node.js',
    node: 'Node.js',
    tailwindcss: 'Tailwind CSS',
    tailwind: 'Tailwind CSS',
    firebase: 'Firebase',
    supabase: 'Supabase',
    android: 'Android',
    ios: 'iOS',
    kotlin: 'Kotlin',
    swift: 'Swift',
    python: 'Python',
    fastapi: 'FastAPI',
    docker: 'Docker',
    mongodb: 'MongoDB',
    postgresql: 'PostgreSQL',
    postgres: 'PostgreSQL',
    graphql: 'GraphQL',
    vue: 'Vue.js',
    vuejs: 'Vue.js',
  }

  const lower = tech.toLowerCase().trim()
  if (map[lower]) return map[lower]

  // Default: Title case words
  return tech
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const urlParam = searchParams.get('url')

  if (!urlParam) {
    return NextResponse.json({ error: 'GitHub repository URL is required' }, { status: 400 })
  }

  let cleanUrl = urlParam.trim()
  // Strip trailing slashes or .git
  cleanUrl = cleanUrl.replace(/\.git$/, '').replace(/\/$/, '')

  // Extract owner and repo
  // Matches: https://github.com/owner/repo or github.com/owner/repo or owner/repo
  const match = cleanUrl.match(/(?:github\.com\/|^)([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/i)

  if (!match || !match[1] || !match[2]) {
    return NextResponse.json({ error: 'Invalid GitHub URL format. Use https://github.com/owner/repo' }, { status: 400 })
  }

  const owner = match[1]
  const repo = match[2]

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Antigravity-Portfolio-App',
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: `Repository "${owner}/${repo}" not found or is private.` }, { status: 404 })
      }
      return NextResponse.json({ error: `GitHub API error: ${res.statusText}` }, { status: res.status })
    }

    const data = await res.json()

    // Formulate tech stack from primary language + repository topics
    const rawTopics: string[] = Array.isArray(data.topics) ? data.topics : []
    const rawLanguage: string = data.language || ''

    const techStackSet = new Set<string>()
    if (rawLanguage) techStackSet.add(formatTechName(rawLanguage))
    rawTopics.forEach((topic) => techStackSet.add(formatTechName(topic)))

    const tech_stack = Array.from(techStackSet)

    // Guaranteed dynamic LinkedIn-style GitHub OpenGraph SVG card (always returns 200 OK image)
    const ogImage = `/api/og-github?owner=${owner}&repo=${repo}&lang=${encodeURIComponent(rawLanguage || 'Code')}&stars=${data.stargazers_count || 0}&forks=${data.forks_count || 0}&issues=${data.open_issues_count || 0}`

    const formattedData = {
      title: formatTitle(data.name),
      raw_name: data.name,
      description: data.description || `Repository ${data.name} by ${owner}`,
      tech_stack,
      github_url: data.html_url || `https://github.com/${owner}/${repo}`,
      live_url: data.homepage || '',
      image: ogImage,
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      issues: data.open_issues_count || 0,
      watchers: data.watchers_count || 0,
      owner: data.owner?.login || owner,
      owner_avatar: data.owner?.avatar_url || '',
      language: rawLanguage,
    }

    return NextResponse.json({ success: true, data: formattedData })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch repository details'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
