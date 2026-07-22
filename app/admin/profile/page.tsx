'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Save, Upload, User, FileText, Link as LinkIcon, Crop } from 'lucide-react'
import { profileService } from '@/services/profileService'
import { ImageCropperModal } from '@/components/admin/ImageCropperModal'
import type { Profile } from '@/types/database'

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [imageUrlInput, setImageUrlInput] = useState('')

  // Crop Modal state
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null)

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Partial<Profile>>()

  useEffect(() => {
    profileService.get().then((p) => {
      setProfile(p)
      if (p) {
        reset(p)
        setImageUrlInput(p.profile_image || '')
      }
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data: Partial<Profile>) => {
    const payload = {
      ...data,
      profile_image: imageUrlInput || data.profile_image || null,
    }

    if (!profile) {
      const created = await profileService.create(payload as Omit<Profile, 'id' | 'created_at' | 'updated_at'>)
      if (created) {
        setProfile(created)
        toast.success('Profile created!')
      } else {
        toast.error('Failed to create profile')
      }
      return
    }

    const updated = await profileService.update(profile.id, payload)
    if (updated) {
      setProfile(updated)
      toast.success('Profile updated successfully!')
    } else {
      toast.error('Failed to update profile')
    }
  }

  // Trigger Image Cropper when selecting an image file
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setCropImageSrc(base64Url)
    }
    reader.readAsDataURL(file)
    e.target.value = '' // Reset input value so re-selecting same image triggers change
  }

  // Save Cropped Avatar
  const handleCropComplete = async (croppedBase64: string) => {
    setCropImageSrc(null)
    setUploading(true)
    setImageUrlInput(croppedBase64)
    setValue('profile_image', croppedBase64)

    if (profile?.id) {
      await profileService.update(profile.id, { profile_image: croppedBase64 })
      setProfile((p) => (p ? { ...p, profile_image: croppedBase64 } : p))
    }

    setUploading(false)
    toast.success('Cropped avatar photo updated!')
  }

  // Upload PDF to Supabase Storage → save public URL in profile
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error('Please select a valid PDF file')
      return
    }

    setUploading(true)
    try {
      const publicUrl = await profileService.uploadResume(file)
      if (!publicUrl) throw new Error('Upload failed')

      setValue('resume_url', publicUrl)
      if (profile?.id) {
        await profileService.update(profile.id, { resume_url: publicUrl })
        setProfile((p) => (p ? { ...p, resume_url: publicUrl } : p))
      }
      toast.success('Resume PDF uploaded successfully!')
    } catch {
      toast.error('Failed to upload resume. Check Supabase Storage bucket "resume" exists.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Profile</h1>
        <p className="text-slate-400 text-xs sm:text-sm">Update your public portfolio profile & avatar photo</p>
      </div>

      {/* Avatar Photo Header Card */}
      <div className="glass-card p-4 sm:p-6 mb-6 border border-white/10 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-primary/40 shadow-xl relative group">
            {imageUrlInput ? (
              <img src={imageUrlInput} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={38} className="text-white" />
            )}
            {imageUrlInput && (
              <button
                type="button"
                onClick={() => setCropImageSrc(imageUrlInput)}
                className="absolute inset-0 bg-black/60 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold transition-opacity"
              >
                <Crop size={16} className="mb-1 text-primary" />
                Recrop
              </button>
            )}
          </div>

          <div className="space-y-3 flex-1 w-full">
            <div>
              <p className="font-bold text-lg text-white">{profile?.full_name ?? 'Keyur Mistry'}</p>
              <p className="text-xs text-primary/70 font-medium">{profile?.title ?? 'Flutter & Full Stack Developer'}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="btn-primary text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-2">
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Upload size={14} /> Upload & Crop Photo</>
                )}
                <input type="file" accept="image/*" onChange={handleImageFileSelect} className="hidden" disabled={uploading} />
              </label>

              {imageUrlInput && (
                <button
                  type="button"
                  onClick={() => {
                    setImageUrlInput('')
                    setValue('profile_image', '')
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <LinkIcon size={12} className="text-slate-400" />
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => {
                  setImageUrlInput(e.target.value)
                  setValue('profile_image', e.target.value)
                }}
                placeholder="Or paste direct image URL (https://...)"
                className="input-glass text-xs py-1.5 px-3 flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-4 sm:p-8 space-y-5 border border-white/10 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Full Name *</label>
            <input {...register('full_name', { required: true })} className="input-glass" placeholder="Keyur Mistry" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Title</label>
            <input {...register('title')} className="input-glass" placeholder="Flutter Developer" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Subtitle</label>
          <input {...register('subtitle')} className="input-glass" placeholder="Building beautiful cross-platform apps" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">About Bio</label>
          <textarea {...register('about')} rows={4} className="input-glass resize-none" placeholder="Your professional bio..." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Email</label>
            <input {...register('email')} type="email" className="input-glass" placeholder="you@email.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Phone</label>
            <input {...register('phone')} className="input-glass" placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Location</label>
            <input {...register('location')} className="input-glass" placeholder="Gujarat, India" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Website</label>
            <input {...register('website')} className="input-glass" placeholder="https://keyurmistry.dev" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">GitHub URL</label>
            <input {...register('github')} className="input-glass" placeholder="https://github.com/..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">LinkedIn URL</label>
            <input {...register('linkedin')} className="input-glass" placeholder="https://linkedin.com/in/..." />
          </div>
        </div>

        {/* Resume upload */}
        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <label className="text-xs font-semibold text-slate-200 block flex items-center gap-2 flex-wrap">
            <FileText size={14} className="text-primary/70" />
            Resume PDF File
            <span className="text-white/30 font-normal">(shown on /resume page)</span>
          </label>

          {profile?.resume_url && !profile.resume_url.startsWith('data:') ? (
            /* Uploaded PDF card */
            <div className="glass rounded-xl p-4 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-0.5">Resume PDF Uploaded ✓</p>
                <p className="text-xs text-white/40 truncate">{profile.resume_url}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary/70 hover:text-primary font-medium px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  View →
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    if (!profile?.id) return
                    await profileService.update(profile.id, { resume_url: null })
                    setProfile((p) => (p ? { ...p, resume_url: null } : p))
                    setValue('resume_url', '')
                    toast.success('Resume removed')
                  }}
                  className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-white/30">No resume PDF uploaded yet.</p>
          )}

          <label className="btn-primary text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-2">
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Upload size={14} /> {profile?.resume_url ? 'Replace PDF' : 'Upload Resume PDF'}</>
            )}
            <input type="file" accept=".pdf,application/pdf" onChange={handleResumeUpload} className="hidden" disabled={uploading} />
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 text-sm py-3 mt-4">
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Save size={16} /> Save Profile Changes</>
          )}
        </button>
      </form>

      {/* Interactive Image Cropper Modal */}
      {cropImageSrc && (
        <ImageCropperModal
          imageSrc={cropImageSrc}
          onClose={() => setCropImageSrc(null)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  )
}
