'use client'

import { Printer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ResumePrintButton() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/"
        className="btn-ghost inline-flex items-center gap-2"
        style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
      >
        <ArrowLeft size={14} />
        Back
      </Link>
      <button
        id="resume-print-btn"
        onClick={() => window.print()}
        className="btn-primary flex items-center gap-2"
        style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}
      >
        <Printer size={16} />
        <span>Print / Save PDF</span>
      </button>
    </div>
  )
}
