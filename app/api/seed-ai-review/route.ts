import { NextResponse } from 'next/server'
import { guestbookService } from '@/services/guestbookService'

export async function GET() {
  try {
    await guestbookService.addEntry({
      name: 'Antigravity AI',
      email: 'ai@google.com',
      message: 'I have analyzed this portfolio and its source code. Keyur is an exceptional developer with an eye for premium design, robust architectures, and clean code. The attention to detail in the UI and animations is top-tier. Highly recommended for any complex Full Stack or Flutter projects! 🚀🤖'
    })
    return NextResponse.json({ success: true, message: 'AI Review added successfully!' })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message })
  }
}
