import type { Metadata } from 'next'
import { profileService } from '@/services/profileService'
import { experienceService } from '@/services/experienceService'
import { educationService } from '@/services/educationService'
import { skillsService } from '@/services/skillsService'
import { notFound } from 'next/navigation'
import { ResumePrintButton } from './ResumePrintButton'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View and download my resume.',
}

export const revalidate = 3600

export default async function ResumePage() {
  const profile     = await profileService.get()
  const experiences = await experienceService.getAll()
  const educations  = await educationService.getAll()
  const skills      = await skillsService.getAll()

  if (!profile) notFound()

  // ── If admin uploaded a real PDF, show it as an embedded viewer ───────────
  const hasUploadedPdf =
    profile.resume_url &&
    !profile.resume_url.startsWith('data:') &&
    profile.resume_url.startsWith('http')

  if (hasUploadedPdf) {
    return <PdfResumeView resumeUrl={profile.resume_url!} name={profile.full_name} />
  }

  // ── Otherwise fall back to the generated resume ───────────────────────────
  const skillGroups = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return <GeneratedResume profile={profile} experiences={experiences} educations={educations} skills={skills} skillGroups={skillGroups} />
}

// ── PDF Viewer Page ──────────────────────────────────────────────────────────
function PdfResumeView({ resumeUrl, name }: { resumeUrl: string; name: string }) {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col print:bg-white">
      {/* Top toolbar — hidden on print */}
      <div className="print:hidden sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3">
        <div className="container-custom max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="font-black text-white text-lg">{name}&apos;s Resume</h1>
            <p className="text-white/40 text-xs">Viewing uploaded PDF</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              download
              className="btn-ghost inline-flex items-center gap-2"
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.8rem' }}
            >
              ⬇ Download PDF
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.8rem' }}
            >
              ↗ Open in New Tab
            </a>
          </div>
        </div>
      </div>

      {/* PDF Embed — fills the remaining viewport */}
      <div className="flex-1 flex flex-col pt-4 pb-8 print:pt-0 print:pb-0">
        <div className="container-custom max-w-5xl flex-1 flex flex-col">
          {/* Chrome/Edge native PDF viewer via iframe */}
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title={`${name} Resume`}
            className="w-full rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] print:border-none print:rounded-none print:shadow-none"
            style={{ minHeight: 'calc(100vh - 120px)', flex: 1 }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Generated Resume (fallback when no PDF is uploaded) ──────────────────────
import type { Profile, Experience, Education, Skill } from '@/types/database'

interface GeneratedProps {
  profile: Profile
  experiences: Experience[]
  educations:  Education[]
  skills:      Skill[]
  skillGroups: Record<string, Skill[]>
}

function GeneratedResume({ profile, experiences, educations, skills, skillGroups }: GeneratedProps) {
  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .print-hide { display: none !important; }
          .print-page {
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            min-height: auto !important;
          }
        }
      `}</style>

      <div className="pt-24 pb-20 min-h-screen bg-[#050505] print:bg-white print:pt-0 print:pb-0">
        <div className="container-custom max-w-5xl">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 print-hide">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Resume</h1>
              <p className="text-white/40 text-sm">
                Auto-generated from your profile data · Go to{' '}
                <a href="/admin/profile" className="text-primary/70 hover:text-primary">
                  Admin → Profile
                </a>{' '}
                to upload your own PDF
              </p>
            </div>
            <ResumePrintButton />
          </div>

          {/* A4 Document */}
          <div
            className="print-page bg-white text-gray-900 shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden mx-auto"
            style={{ maxWidth: '794px', minHeight: '1123px' }}
          >
            {/* Orange top bar */}
            <div
              className="h-2 w-full print:h-1"
              style={{ background: 'linear-gradient(90deg, #FE7F2D 0%, #233D4D 100%)' }}
            />

            <div className="p-10 md:p-14 print:p-10">
              {/* Header */}
              <header className="mb-8 pb-8 border-b-2 border-gray-100">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">
                      {profile.full_name}
                    </h1>
                    <p className="text-lg font-semibold mb-4" style={{ color: '#FE7F2D' }}>
                      {profile.title}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                      {profile.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail size={13} style={{ color: '#FE7F2D' }} />
                          {profile.email}
                        </span>
                      )}
                      {profile.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={13} style={{ color: '#FE7F2D' }} />
                          {profile.phone}
                        </span>
                      )}
                      {profile.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} style={{ color: '#FE7F2D' }} />
                          {profile.location}
                        </span>
                      )}
                      {profile.website && (
                        <a href={profile.website} className="flex items-center gap-1.5 hover:underline" style={{ color: '#FE7F2D' }}>
                          <Globe size={13} />
                          {profile.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div
                    className="print-hide flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #FE7F2D, #233D4D)' }}
                  >
                    {profile.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                </div>
              </header>

              {/* Summary */}
              {profile.about && (
                <section className="mb-8">
                  <SectionHeader icon={<Briefcase size={15} />} title="Professional Summary" />
                  <p className="text-gray-600 leading-relaxed text-sm pl-1">{profile.about}</p>
                </section>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <section className="mb-8">
                  <SectionHeader icon={<Briefcase size={15} />} title="Work Experience" />
                  <div className="space-y-6">
                    {experiences.map((exp, i) => (
                      <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: i === 0 ? '#FE7F2D' : '#e5e7eb' }}>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                            <div className="flex items-center gap-2 text-sm mt-0.5">
                              <span className="font-semibold" style={{ color: '#FE7F2D' }}>{exp.company}</span>
                              {exp.location && <span className="text-gray-400">· {exp.location}</span>}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap mt-0.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            {exp.start_date ? formatDate(exp.start_date) : ''} — {exp.currently_working ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mt-2 whitespace-pre-wrap">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <section className="mb-8">
                  <SectionHeader icon={<GraduationCap size={15} />} title="Education" />
                  <div className="space-y-4">
                    {educations.map(edu => (
                      <div key={edu.id} className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{edu.degree}</h3>
                          <div className="text-sm font-semibold mt-0.5" style={{ color: '#FE7F2D' }}>{edu.institute}</div>
                          {edu.cgpa && <div className="text-sm text-gray-400 mt-0.5">CGPA: {edu.cgpa}</div>}
                        </div>
                        <span className="text-xs font-medium text-gray-400 whitespace-nowrap mt-0.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          {edu.start_year} — {edu.end_year || 'Present'}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <SectionHeader icon={<Cpu size={15} />} title="Technical Skills" />
                  {Object.keys(skillGroups).length > 1 ? (
                    <div className="space-y-3">
                      {Object.entries(skillGroups).map(([category, catSkills]) => (
                        <div key={category} className="flex items-start gap-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">
                            {category}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {catSkills.map(skill => (
                              <span key={skill.id} className="text-xs px-2.5 py-1 rounded-md font-medium border"
                                style={{ background: 'rgba(254,127,45,0.06)', borderColor: 'rgba(254,127,45,0.2)', color: '#374151' }}>
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill.id} className="text-sm px-3 py-1.5 rounded-md font-medium border"
                          style={{ background: 'rgba(254,127,45,0.06)', borderColor: 'rgba(254,127,45,0.2)', color: '#374151' }}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Section Header Component ──────────────────────────────────────────────────
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 rounded-md" style={{ background: 'rgba(254,127,45,0.1)', color: '#FE7F2D' }}>
        {icon}
      </div>
      <h2 className="text-base font-black text-gray-900 uppercase tracking-widest">{title}</h2>
      <div className="flex-1 h-px ml-2" style={{ background: 'linear-gradient(90deg, rgba(254,127,45,0.3), transparent)' }} />
    </div>
  )
}
