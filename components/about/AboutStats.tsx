'use client'

import { motion } from 'framer-motion'
import { Briefcase, FolderGit2, Cpu, Award, GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AboutStatsProps {
  eduCount?: number
  expCount?: number
  skillsCount?: number
  projectsCount?: number
  certsCount?: number
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView || value === 0) return
    let current = 0
    const step = Math.max(1, value / 30)
    const timer = setInterval(() => {
      current += step
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {value > 0 ? suffix : ''}
    </span>
  )
}

export function AboutStats({
  eduCount = 0,
  expCount = 0,
  skillsCount = 0,
  projectsCount = 0,
  certsCount = 0,
}: AboutStatsProps) {
  const stats = [
    {
      icon: Briefcase,
      value: expCount > 0 ? expCount : 1,
      suffix: '+',
      label: 'Years Experience',
      color: 'text-orange-400',
      borderGlow: 'hover:border-orange-500/40',
    },
    {
      icon: FolderGit2,
      value: projectsCount > 0 ? projectsCount : 10,
      suffix: '+',
      label: 'Projects Completed',
      color: 'text-amber-400',
      borderGlow: 'hover:border-amber-500/40',
    },
    {
      icon: Cpu,
      value: skillsCount > 0 ? skillsCount : 5,
      suffix: '+',
      label: 'Technologies',
      color: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500/40',
    },
    {
      icon: Award,
      value: certsCount,
      suffix: '',
      label: 'Certificates',
      color: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-500/40',
    },
    {
      icon: GraduationCap,
      value: eduCount > 0 ? eduCount : 1,
      suffix: '',
      label: 'Academic Degrees',
      color: 'text-purple-400',
      borderGlow: 'hover:border-purple-500/40',
    },
  ]

  return (
    <section className="py-12 relative z-10">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, color, borderGlow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group flex flex-col items-center justify-center p-5 rounded-2xl glass border border-white/10 ${borderGlow} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] text-center`}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/60 border border-white/10 mb-3 group-hover:scale-110 transition-transform">
                <Icon size={20} className={color} />
              </div>
              <div className="font-syne font-extrabold text-3xl text-white group-hover:text-orange-400 transition-colors mb-1">
                <Counter value={value} suffix={suffix} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
