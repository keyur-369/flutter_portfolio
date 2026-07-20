import type { Metadata } from 'next'
import { certificateService } from '@/services/certificateService'
import { CertificatesGrid } from '@/components/certificates/CertificatesGrid'

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Flutter & Dart, Prompt Engineering, Python Basics — view Keyur Mistry\'s professional certifications.',
}

export const revalidate = 3600

export default async function CertificatesPage() {
  const certificates = await certificateService.getAll()
  return <CertificatesGrid certificates={certificates} />
}
