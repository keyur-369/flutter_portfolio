'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Upload, ExternalLink, Image as ImageIcon, Award, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { certificateService } from '@/services/certificateService'
import { formatDate } from '@/lib/utils'
import type { Certificate } from '@/types/database'

function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.startsWith('data:image/')) return true
  const lower = url.toLowerCase()
  return (
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif') ||
    lower.endsWith('.svg') ||
    lower.includes('unsplash.com') ||
    lower.includes('supabase.co/storage')
  )
}

function getIssuerBrand(issuer: string | null | undefined, url: string | null | undefined) {
  const text = `${issuer ?? ''} ${url ?? ''}`.toLowerCase()
  if (text.includes('udemy') || text.includes('ude.my')) {
    return { name: 'Udemy', color: 'from-primary to-secondary', logo: 'https://cdn.simpleicons.org/udemy' }
  }
  if (text.includes('coursera')) {
    return { name: 'Coursera', color: 'from-primary to-secondary', logo: 'https://cdn.simpleicons.org/coursera' }
  }
  if (text.includes('google')) {
    return { name: 'Google', color: 'from-amber-500 to-rose-500', logo: 'https://cdn.simpleicons.org/google' }
  }
  return { name: issuer || 'Verified', color: 'from-primary to-secondary', logo: null }
}

function CertForm({ item, onClose, onSave }: { item?: Certificate | null; onClose: () => void; onSave: () => void }) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(item?.image ?? null)

  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: item?.title ?? '',
      issuer: item?.issuer ?? '',
      issue_date: item?.issue_date ?? '',
      certificate_url: item?.certificate_url ?? '',
      image: item?.image ?? '',
    },
  })

  const imageUrl = watch('image')
  const certUrl = watch('certificate_url')
  const issuer = watch('issuer')

  useEffect(() => {
    if (imageUrl) setPreviewUrl(imageUrl)
  }, [imageUrl])

  // INSTANT Image Processing (0ms local conversion)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setValue('image', base64Url)
      setPreviewUrl(base64Url)
      setUploading(false)
      toast.success('Certificate image attached!')

      // Background upload to Supabase Storage
      certificateService.uploadImage(file).then((uploadedUrl) => {
        if (uploadedUrl) {
          setValue('image', uploadedUrl)
          setPreviewUrl(uploadedUrl)
        }
      }).catch(() => {})
    }
    reader.onerror = () => {
      setUploading(false)
      toast.error('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: Record<string, unknown>) => {
    // Auto-fix: If user pasted a web URL into image field instead of certificate_url
    let imageVal = String(data.image ?? '').trim()
    let certUrlVal = String(data.certificate_url ?? '').trim()

    if (imageVal && !isImageUrl(imageVal) && imageVal.startsWith('http')) {
      if (!certUrlVal) certUrlVal = imageVal
      imageVal = ''
    }

    const payload = {
      ...data,
      image: imageVal || null,
      certificate_url: certUrlVal || null,
    }

    if (item) {
      const res = await certificateService.update(item.id, payload as Partial<Certificate>)
      if (res.error) toast.error(`Failed to update: ${res.error}`)
      else { toast.success('Certificate updated!'); onSave(); onClose() }
    } else {
      const res = await certificateService.create(payload as Omit<Certificate, 'id' | 'created_at'>)
      if (res.error) toast.error(`Failed to create: ${res.error}`)
      else { toast.success('Certificate saved!'); onSave(); onClose() }
    }
  }

  const brand = getIssuerBrand(issuer, certUrl || previewUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-4 sm:p-8 w-full max-w-lg my-4 border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">{item ? 'Edit Certificate' : 'Add Certificate'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-slate-400 hover:text-white"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Certificate Title *</label>
            <input {...register('title', { required: true })} className="input-glass" placeholder="Flutter & Dart - Complete Guide" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Issuer (Platform)</label>
              <input {...register('issuer')} className="input-glass" placeholder="Udemy, Coursera, Google..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Issue Date</label>
              <input {...register('issue_date')} type="date" className="input-glass" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Verification Link (Official Web URL)</label>
            <input {...register('certificate_url')} className="input-glass" placeholder="https://ude.my/UC-d91a2e3c..." />
            <p className="text-[11px] text-slate-400 mt-1">Paste your Udemy / Coursera verification page link here</p>
          </div>

          {/* Certificate Image Upload & Live Preview Section */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
            <label className="text-xs font-semibold text-slate-200 mb-3 block flex items-center gap-2">
              <ImageIcon size={14} className="text-amber-400" />
              Certificate Image File / Photo
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="w-28 h-20 rounded-xl bg-slate-900 border border-white/15 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                {isImageUrl(previewUrl) ? (
                  <img src={previewUrl!} alt="Certificate Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${brand.color} flex flex-col items-center justify-center p-2 text-center`}>
                    {brand.logo ? (
                      <img src={brand.logo} alt="" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    ) : (
                      <Award size={20} className="text-white" />
                    )}
                    <span className="text-[9px] font-bold text-white uppercase mt-1">{brand.name}</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-3">
                  <label className="btn-primary text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-2">
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Upload size={14} /> Upload Image File</>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={() => { setValue('image', ''); setPreviewUrl(null) }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  {...register('image')}
                  onChange={(e) => { setValue('image', e.target.value); setPreviewUrl(e.target.value) }}
                  className="input-glass text-xs py-2"
                  placeholder="Or paste direct image file URL (.png, .jpg)"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/[0.08]">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={isSubmitting || uploading} className="btn-primary flex-1 justify-center disabled:opacity-60">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save Certificate</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certificate | null>(null)

  const load = async () => { setItems(await certificateService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return
    const ok = await certificateService.delete(id)
    if (ok) { toast.success('Certificate deleted'); load() } else toast.error('Failed to delete')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Certificates</h1>
          <p className="text-slate-400 text-xs sm:text-sm">{items.length} certificate{items.length === 1 ? '' : 's'} managed in Supabase</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary text-xs sm:text-sm">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cert, i) => {
            const hasValidImage = isImageUrl(cert.image)
            const targetUrl = cert.certificate_url || (cert.image && !isImageUrl(cert.image) ? cert.image : null)
            const brand = getIssuerBrand(cert.issuer, targetUrl)

            return (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card p-5 flex flex-col border border-white/10 rounded-2xl">
                <div className="w-full aspect-video rounded-xl bg-slate-900 border border-white/15 overflow-hidden flex items-center justify-center mb-4 relative">
                  {hasValidImage ? (
                    <img src={cert.image!} alt={cert.title || 'Certificate'} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${brand.color} flex flex-col items-center justify-center p-4 text-center`}>
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain mb-1.5 filter brightness-0 invert" />
                      ) : (
                        <Award size={32} className="text-white mb-1" />
                      )}
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full">
                        {brand.name} Certified
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-base text-white mb-1 line-clamp-2">{cert.title || 'Certificate'}</h3>
                {cert.issuer && <p className="text-xs text-primary/70 font-medium mb-1">{cert.issuer}</p>}
                {cert.issue_date && <p className="text-xs text-slate-400 mb-4">{formatDate(cert.issue_date)}</p>}

                <div className="flex gap-2 mt-auto pt-3 border-t border-white/[0.08]">
                  {targetUrl && (
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1" title="Verify link">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => { setEditing(cert); setShowForm(true) }} className="flex-1 p-2 rounded-xl glass text-slate-300 hover:text-white text-xs flex items-center justify-center gap-1">
                    <Edit size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 rounded-xl glass text-red-400/70 hover:text-red-400 text-xs">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}

          {items.length === 0 && (
            <div className="col-span-full text-center py-16 glass-card">
              <p className="text-slate-400 mb-4">No certificates in database yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
                <Plus size={14} /> Add First Certificate
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && <CertForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={load} />}
      </AnimatePresence>
    </div>
  )
}
