import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json()
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, now: Date.now() })
    }
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/skills')
    revalidatePath('/projects')
    revalidatePath('/certificates')
    revalidatePath('/blogs')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
