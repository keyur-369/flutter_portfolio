import { NextRequest, NextResponse } from 'next/server'
import { visitorService } from '@/services/visitorService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userAgent = request.headers.get('user-agent') ?? 'Unknown'
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'Unknown'

    // Simple device detection
    const isMobile = /mobile/i.test(userAgent)
    const device = isMobile ? 'Mobile' : 'Desktop'

    // Simple browser detection
    let browser = 'Unknown'
    if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Safari')) browser = 'Safari'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Edge')) browser = 'Edge'

    await visitorService.log({
      ip_address: ip,
      browser,
      device,
      country: body.country ?? null,
      city: body.city ?? null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Visitor tracking error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
