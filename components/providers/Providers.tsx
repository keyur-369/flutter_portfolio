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
            document.documentElement.style.setProperty('--primary', hexToHsl(settings.primary_color))
            document.documentElement.style.setProperty('--accent', hexToHsl(settings.primary_color))
            document.documentElement.style.setProperty('--ring', hexToHsl(settings.primary_color))
          }
          if (settings.secondary_color) {
            document.documentElement.style.setProperty('--secondary', hexToHsl(settings.secondary_color))
          }
          if (settings.background_color) {
            document.documentElement.style.setProperty('--bg-color', settings.background_color)
          }
        }
      } catch (error) {
        console.error('Failed to load colors:', error)
      }
    }
    loadColors()
  }, [])

  return (
    <>
      {children}
    </>
  )
}
