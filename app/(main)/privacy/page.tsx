import type { Metadata } from 'next'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Keyur Mistry\'s portfolio website.',
}

export default function PrivacyPage() {
  return (
    <section className="section py-24">
      <div className="container-custom max-w-3xl">
        <FadeIn>
          <h1 className="font-display font-black text-4xl text-white mb-2">Privacy Policy</h1>
          <p className="text-white/40 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <div className="glass-card p-8 space-y-8 text-white/65 leading-relaxed">
            {[
              {
                title: '1. Information We Collect',
                content: 'When you visit this portfolio website, we may collect basic analytics information such as browser type, device type, and approximate location (country/city) to understand our audience. When you submit the contact form, we collect your name, email address, and message content.',
              },
              {
                title: '2. How We Use Information',
                content: 'Contact form submissions are used solely to respond to your inquiry. Analytics data helps us improve the website experience. We do not sell, share, or distribute your personal information to third parties.',
              },
              {
                title: '3. Data Storage',
                content: 'Form submissions are stored securely in our Supabase database. Analytics data is stored in our database and is not shared with third-party analytics services beyond what is necessary for website functionality.',
              },
              {
                title: '4. Cookies',
                content: 'This website uses minimal cookies required for authentication (admin panel) and session management. No advertising or tracking cookies are used.',
              },
              {
                title: '5. Third-Party Services',
                content: 'This website uses Supabase for database and authentication services. Their privacy policy governs the handling of data on their platform.',
              },
              {
                title: '6. Contact',
                content: 'If you have questions about this privacy policy or want to request deletion of your data, please contact us through the contact form on this website.',
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
