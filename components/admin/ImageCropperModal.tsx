'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Check, Crop, RotateCcw, Wand2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface ImageCropperModalProps {
  imageSrc: string | null
  onClose: () => void
  onCropComplete: (croppedBase64: string) => void
}

export function ImageCropperModal({ imageSrc: initialImageSrc, onClose, onCropComplete }: ImageCropperModalProps) {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(initialImageSrc)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isBgRemoved, setIsBgRemoved] = useState(false)
  const [isProcessingBg, setIsProcessingBg] = useState(false)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setCurrentImageSrc(initialImageSrc)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setIsBgRemoved(false)
  }, [initialImageSrc])

  if (!currentImageSrc) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetTransform = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  // Canvas-based Background Removal algorithm (Edge color-keying thresholding)
  const handleRemoveBackground = () => {
    const img = imageRef.current
    if (!img) return

    setIsProcessingBg(true)

    setTimeout(() => {
      try {
        const bgCanvas = document.createElement('canvas')
        bgCanvas.width = img.naturalWidth || 600
        bgCanvas.height = img.naturalHeight || 600
        const ctx = bgCanvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, bgCanvas.width, bgCanvas.height)
        const data = imgData.data

        // Sample background color from top corners
        const sampleR = (data[0] + data[(bgCanvas.width - 1) * 4]) / 2
        const sampleG = (data[1] + data[(bgCanvas.width - 1) * 4 + 1]) / 2
        const sampleB = (data[2] + data[(bgCanvas.width - 1) * 4 + 2]) / 2

        const tolerance = 45 // Color difference threshold

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const dist = Math.sqrt(
            Math.pow(r - sampleR, 2) +
            Math.pow(g - sampleG, 2) +
            Math.pow(b - sampleB, 2)
          )

          if (dist < tolerance) {
            data[i + 3] = 0 // Transparent alpha
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const transparentPng = bgCanvas.toDataURL('image/png')
        setCurrentImageSrc(transparentPng)
        setIsBgRemoved(true)
        setIsProcessingBg(false)
        toast.success('Background removed! Transparent portrait created.')
      } catch {
        setIsProcessingBg(false)
        toast.error('Could not process background transparency')
      }
    }, 150)
  }

  const handleSaveCrop = () => {
    const viewport = viewportRef.current
    const img = imageRef.current
    const canvas = canvasRef.current
    if (!viewport || !img || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400
    ctx.clearRect(0, 0, 400, 400)

    const vpRect = viewport.getBoundingClientRect()
    const imgRect = img.getBoundingClientRect()

    const scaleX = img.naturalWidth / imgRect.width
    const scaleY = img.naturalHeight / imgRect.height

    const cropX = (vpRect.left - imgRect.left) * scaleX
    const cropY = (vpRect.top - imgRect.top) * scaleY
    const cropW = vpRect.width * scaleX
    const cropH = vpRect.height * scaleY

    try {
      ctx.drawImage(
        img,
        Math.max(0, cropX),
        Math.max(0, cropY),
        Math.min(img.naturalWidth - Math.max(0, cropX), cropW),
        Math.min(img.naturalHeight - Math.max(0, cropY), cropH),
        0,
        0,
        400,
        400
      )
      const croppedBase64 = canvas.toDataURL(isBgRemoved ? 'image/png' : 'image/jpeg', 0.95)
      onCropComplete(croppedBase64)
    } catch {
      ctx.drawImage(img, 0, 0, 400, 400)
      onCropComplete(canvas.toDataURL(isBgRemoved ? 'image/png' : 'image/jpeg', 0.95))
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="glass-card p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl rounded-3xl relative bg-[#090a18]/95 overflow-hidden flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-strong text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>

          <h3 className="font-display font-bold text-xl text-white mb-1 flex items-center gap-2">
            <Crop size={18} className="text-indigo-400" />
            Crop Profile Avatar
          </h3>
          <p className="text-xs text-slate-400 mb-6 text-center">
            Drag photo up/down/left/right and zoom to frame your face perfectly inside the circle.
          </p>

          {/* Interactive Crop Viewport Frame */}
          <div
            ref={viewportRef}
            className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-indigo-500 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing bg-slate-950 flex items-center justify-center select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={currentImageSrc}
              alt="Crop Source"
              className="max-w-none max-h-none transition-transform duration-75 pointer-events-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'contain',
              }}
            />

            {/* Circular Crop Mask & Crosshair Guide */}
            <div className="absolute inset-0 rounded-full border-2 border-indigo-400/80 pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Zoom Slider & Reset */}
          <div className="w-full mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5"><ZoomIn size={14} className="text-indigo-400" /> Zoom Scale</span>
              <div className="flex items-center gap-3">
                <button onClick={resetTransform} className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <RotateCcw size={10} /> Reset Position
                </button>
                <span>{zoom.toFixed(1)}x</span>
              </div>
            </div>
            <input
              type="range"
              min="0.8"
              max="3.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Background Removal Button */}
          <button
            type="button"
            onClick={handleRemoveBackground}
            disabled={isProcessingBg || isBgRemoved}
            className="w-full mt-4 py-2 px-3 rounded-xl glass border border-purple-500/30 text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-500/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isProcessingBg ? (
              <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
            ) : (
              <>
                <Wand2 size={14} className="text-purple-400" />
                <span>{isBgRemoved ? '✓ Background Removed (Transparent PNG)' : '✨ Remove Background (Transparent)'}</span>
              </>
            )}
          </button>

          {/* Hidden Export Canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Action Buttons */}
          <div className="flex gap-3 w-full mt-5 pt-4 border-t border-white/10">
            <button onClick={onClose} className="btn-ghost flex-1 justify-center text-xs py-2.5">
              Cancel
            </button>
            <button onClick={handleSaveCrop} className="btn-primary flex-1 justify-center text-xs py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 border-none font-bold shadow-lg">
              <Check size={14} /> Crop & Save Avatar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
