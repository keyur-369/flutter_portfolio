import { ImageResponse } from 'next/og'
import { settingsService } from '@/services/settingsService'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Query params: title, subtitle, type
    const title    = searchParams.get('title')
    const subtitle = searchParams.get('subtitle')
    const type     = searchParams.get('type') || 'site' // 'site' | 'blog'

    // Fetch site settings
    let siteName = 'Portfolio'
    let siteDesc = 'Full Stack Developer'

    try {
      const settings = await settingsService.get()
      if (settings?.site_name)        siteName = settings.site_name
      if (settings?.site_description) siteDesc = settings.site_description
    } catch {
      // fallback silently on edge
    }

    const displayTitle    = title    || siteName
    const displaySubtitle = subtitle || (title ? siteName : siteDesc)
    const isBlog          = type === 'blog'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#050505',
          }}
        >
          {/* ── Background gradient blobs ── */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              left: '-80px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254,127,45,0.18) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-120px',
              right: '-60px',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(35,61,77,0.45) 0%, transparent 70%)',
            }}
          />

          {/* ── Dot grid pattern ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(254,127,45,0.08) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* ── Main card ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              padding: '60px 72px',
              position: 'relative',
            }}
          >
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Logo / Site name badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(254,127,45,0.1)',
                  border: '1px solid rgba(254,127,45,0.3)',
                  borderRadius: '9999px',
                  padding: '8px 20px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FE7F2D',
                    boxShadow: '0 0 12px rgba(254,127,45,0.8)',
                  }}
                />
                <span style={{ color: '#FE7F2D', fontSize: '16px', fontWeight: 600 }}>
                  {siteName}
                </span>
              </div>

              {/* Type badge */}
              {isBlog && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '9999px',
                    padding: '8px 20px',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Blog Post
                </div>
              )}
            </div>

            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
              {/* Title */}
              <h1
                style={{
                  fontSize: isBlog ? 62 : 76,
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                {displayTitle}
              </h1>

              {/* Orange underline accent */}
              <div
                style={{
                  width: '80px',
                  height: '4px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #FE7F2D, rgba(254,127,45,0.2))',
                }}
              />

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: 'rgba(234,236,240,0.6)',
                  margin: 0,
                  lineHeight: 1.4,
                  maxWidth: '700px',
                }}
              >
                {displaySubtitle}
              </p>
            </div>

            {/* Bottom row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Avatar circle placeholder */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FE7F2D, #233D4D)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'white',
                    border: '2px solid rgba(254,127,45,0.3)',
                  }}
                >
                  {siteName.charAt(0)}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
                  keyurmistry.dev
                </span>
              </div>

              {/* Right — decorative dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {['#FE7F2D', 'rgba(254,127,45,0.5)', 'rgba(254,127,45,0.2)'].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: c,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right-side glowing orb ── */}
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254,127,45,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(`Failed to generate image: ${msg}`, { status: 500 })
  }
}
