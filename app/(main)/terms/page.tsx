import type { Metadata } from 'next'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Keyur Mistry\'s portfolio website.',
}

export default function TermsPage() {
  return (
    <section className="section py-24">
      <div className="container-custom max-w-3xl">
        <FadeIn>
          <h1 className="font-display font-black text-4xl text-white mb-2">Terms of Service</h1>
          <p className="text-white/40 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <div className="glass-card p-8 space-y-8 text-white/65 leading-relaxed">
            {[
              {
                title: '1. Acceptance of Terms',
                content: 'By accessing and using this portfolio website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.',
              },
              {
                title: '2. Intellectual Property',
                content: 'All content on this website, including text, graphics, code, and design, is the intellectual property of Keyur Mistry unless otherwise noted. You may not reproduce, distribute, or use any content without explicit written permission.',
              },
              {
                title: '3. Contact Form Usage',
                content: 'The contact form is provided for legitimate business inquiries and collaboration requests. Spam, harassment, or abuse of the contact form is strictly prohibited and may result in legal action.',
              },
              {
                title: '4. Disclaimer',
                content: 'This website is provided "as is" without any warranties of any kind. Keyur Mistry makes no guarantees regarding the accuracy, completeness, or availability of the website content.',
              },
              {
                title: '5. Limitation of Liability',
                content: 'Keyur Mistry shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use this website.',
              },
              {
                title: '6. Changes to Terms',
                content: 'These terms may be updated at any time. Continued use of the website after changes constitutes acceptance of the new terms.',
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-display font-bold text-lg text-white mb-3">{title}</h2>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
