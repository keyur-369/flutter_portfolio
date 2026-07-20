'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { Code2, Layers, Award, Cpu, Clock } from 'lucide-react'
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
    const step = value / 60
    const timer = setInterval(() => {
      current += step
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{count}{value > 0 ? suffix : ''}</span>
}

export function AboutStats({
  eduCount = 0,
  expCount = 0,
  skillsCount = 0,
  projectsCount = 0,
  certsCount = 0,
}: AboutStatsProps) {
  const stats = [
    { icon: Clock, value: expCount, suffix: '+', label: 'Years of Experience', color: 'from-blue-500 to-cyan-500' },
    { icon: Layers, value: projectsCount, suffix: '+', label: 'Projects Completed', color: 'from-violet-500 to-purple-500' },
    { icon: Code2, value: skillsCount, suffix: '+', label: 'Technologies', color: 'from-pink-500 to-rose-500' },
    { icon: Award, value: certsCount, suffix: '', label: 'Certificates', color: 'from-amber-500 to-orange-500' },
    { icon: Cpu, value: eduCount, suffix: '', label: 'Degrees Pursued', color: 'from-indigo-500 to-blue-500' },
  ]

  const total = eduCount + expCount + skillsCount + projectsCount + certsCount
  if (total === 0) return null

  return (
    <section className="section py-16 bg-white/[0.01]">
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="glass-card p-5 text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="font-display font-black text-3xl gradient-text mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-tight">{stat.label}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
