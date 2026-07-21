'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function VisitorTracker() {
  const pathname = usePathname()
  const trackedRef = useRef(false)

  useEffect(() => {
    // Track only once per session
    if (trackedRef.current) return
    // Don't track admin routes
    if (pathname?.startsWith('/admin')) return

    trackedRef.current = true

    const track = async () => {
      try {
        // Try to get country/city via a free IP API
        let country: string | null = null
        let city: string | null = null
        try {
          const geo = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
          if (geo.ok) {
            const data = await geo.json()
            country = data.country_name ?? null
            city = data.city ?? null
          }
        } catch {
          // Geo lookup failed – that's fine, we'll still log the visit
        }

        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country, city }),
        })
      } catch {
        // Silently ignore tracking errors
      }
    }

    track()
  }, [pathname])

  return null
}
