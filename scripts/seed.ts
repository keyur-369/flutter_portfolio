import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function seed() {
  console.log('🌱 Seeding Supabase database for Keyur Mistry Portfolio...')

  // 1. Profile
  const { error: profileErr } = await supabase.from('profile').upsert([
    {
      full_name: 'Keyur Mistry',
      title: 'Flutter & Full Stack Developer',
      subtitle: 'Building beautiful, performant cross-platform mobile apps',
      about:
        'Flutter Developer with practical experience developing cross-platform applications using Flutter, Firebase and Supabase. Skilled in REST APIs, scalable architecture, backend integration and UI development.',
      email: 'keyurmistry@email.com',
      location: 'Gujarat, India',
      github: 'https://github.com/keyurmistry',
      linkedin: 'https://linkedin.com/in/keyurmistry',
      website: 'https://keyurmistry.dev',
      resume_url: '/resume.pdf',
    },
  ])
  if (profileErr) console.log('Profile seed notice:', profileErr.message)

  // 2. Education
  await supabase.from('education').insert([
    {
      institute: 'CHARUSAT University',
      degree: 'MSc Information Technology',
      cgpa: '7.00',
      start_year: 2024,
      end_year: 2026,
      description: 'Post-graduation in Information Technology focusing on advanced software development and mobile architectures.',
    },
    {
      institute: 'Veer Narmad South Gujarat University (VNSGU)',
      degree: 'Bachelor of Computer Applications (BCA)',
      cgpa: '7.22',
      start_year: 2021,
      end_year: 2024,
      description: 'Three-year undergraduate program covering core computer science and software development.',
    },
  ])

  // 3. Experience
  await supabase.from('experience').insert([
    {
      company: 'Patrixel',
      role: 'Flutter Developer Intern',
      employment_type: 'Internship',
      location: 'Remote / Gujarat, India',
      start_date: '2025-12-01',
      currently_working: true,
      description: 'Developing cross-platform mobile applications using Flutter and Dart. Working on REST API integration, Firebase backend, Supabase database, responsive UI design, performance optimization, and debugging.',
    },
  ])

  // 4. Skills
  await supabase.from('skills').insert([
    { name: 'Flutter', category: 'Mobile Development', percentage: 92, icon: '🐦' },
    { name: 'Dart', category: 'Mobile Development', percentage: 90, icon: '🎯' },
    { name: 'Android Studio', category: 'Mobile Development', percentage: 85, icon: '🤖' },
    { name: 'Firebase', category: 'Backend & Database', percentage: 88, icon: '🔥' },
    { name: 'Supabase', category: 'Backend & Database', percentage: 85, icon: '⚡' },
    { name: 'REST APIs', category: 'Backend & Database', percentage: 88, icon: '🔌' },
    { name: 'Git', category: 'Tools & DevOps', percentage: 88, icon: '🌿' },
    { name: 'GitHub', category: 'Tools & DevOps', percentage: 88, icon: '🐙' },
  ])

  // 5. Projects
  await supabase.from('projects').insert([
    {
      title: 'Split Expenses',
      slug: 'split-expenses',
      description: 'A smart expense splitting app published on Google Play Store. Helps groups manage shared costs effortlessly with real-time sync, multiple currencies, and smart calculation.',
      tech_stack: ['Flutter', 'Dart', 'Firebase', 'Supabase'],
      playstore_url: 'https://play.google.com/store',
      featured: true,
      status: 'Published',
    },
    {
      title: 'MCQ Pro',
      slug: 'mcq-pro',
      description: 'AI-powered examination platform providing intelligent MCQ generation, adaptive testing, and detailed performance analytics for students and educators.',
      tech_stack: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'AI/ML'],
      featured: true,
      status: 'Completed',
    },
    {
      title: 'InvoiceHub',
      slug: 'invoicehub',
      description: 'Comprehensive GST Invoice Management System for businesses. Generate, manage, and track GST-compliant invoices with automated tax calculations and PDF export.',
      tech_stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
      featured: true,
      status: 'Completed',
    },
  ])

  console.log('✅ Supabase database successfully seeded with live data!')
}

seed().catch(console.error)
