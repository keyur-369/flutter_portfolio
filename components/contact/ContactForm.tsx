'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Send, Mail, Phone, MapPin, Github, Linkedin, MessageSquare, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { contactService } from '@/services/contactService'
import type { Profile } from '@/types/database'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof formSchema>

interface ContactFormProps {
  profile: Profile | null
}

export function ContactForm({ profile }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    const success = await contactService.submit(data)
    if (success) {
      setSubmitted(true)
      reset()
      toast.success('Message sent! I\'ll get back to you soon.')
    } else {
      toast.error('Failed to send message. Please try again.')
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: profile?.email ?? 'keyurmistry@email.com', href: `mailto:${profile?.email ?? 'keyurmistry@email.com'}` },
    { icon: Phone, label: 'Phone', value: profile?.phone ?? '+91 XXXXX XXXXX', href: `tel:${profile?.phone ?? ''}` },
    { icon: MapPin, label: 'Location', value: profile?.location ?? 'Gujarat, India', href: null },
    { icon: Github, label: 'GitHub', value: 'github.com/keyurmistry', href: profile?.github ?? 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/keyurmistry', href: profile?.linkedin ?? 'https://linkedin.com' },
  ]

  return (
    <section className="section py-24">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/30 text-xs font-semibold text-green-300 uppercase tracking-widest mb-4">
            <MessageSquare size={10} />
            Contact
          </div>
          <h1 className="section-title text-white mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Have a project in mind? I'm available for freelance work and full-time opportunities. Let's build something amazing.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-white mb-6">Get in touch</h2>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-indigo-300 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="glass-card p-6 mt-6">
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  ⚡ I typically respond within <strong className="text-white">24 hours</strong>.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  🟢 Currently available for freelance & full-time opportunities in Flutter / Mobile / Full-Stack development.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">Message Sent!</h3>
                <p className="text-white/60 mb-6">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      {...register('name')}
                      placeholder="Keyur Mistry"
                      className={`input-glass ${errors.name ? 'border-red-500/50' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="you@example.com"
                      className={`input-glass ${errors.email ? 'border-red-500/50' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="subject"
                    {...register('subject')}
                    placeholder="Flutter app development project"
                    className={`input-glass ${errors.subject ? 'border-red-500/50' : ''}`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={6}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`input-glass resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
