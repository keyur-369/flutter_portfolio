'use client'

import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { settingsService } from '@/services/settingsService'
import { hexToHsl } from '@/lib/utils'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const loadColors = async () => {
      try {
        const settings = await settingsService.get()
        if (settings) {
          if (settings.primary_color) {
            const hslPrimary = hexToHsl(settings.primary_color)
            if (hslPrimary) {
              document.documentElement.style.setProperty('--primary', hslPrimary)
              document.documentElement.style.setProperty('--accent', hslPrimary)
              document.documentElement.style.setProperty('--ring', hslPrimary)
            }
          }
          if (settings.secondary_color) {
            const hslSecondary = hexToHsl(settings.secondary_color)
            if (hslSecondary) {
              document.documentElement.style.setProperty('--secondary', hslSecondary)
            }
          }
          if (settings.background_color) {
            document.documentElement.style.setProperty('--bg-color', settings.background_color)
          }
        }
      } catch (error) {
        console.error('Failed to load colors:', error)
      }
    }
    // loadColors() // Temporarily disabled to force fallback to globals.css
  }, [])

  return (
    <>
      {children}
    </>
  )
}
