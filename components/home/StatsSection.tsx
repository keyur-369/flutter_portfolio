'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Code2, Layers, Award, Cpu } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface StatsSectionProps {
  skillsCount?: number
  projectsCount?: number
  certsCount?: number
  expCount?: number
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView || value === 0) return
    let start = 0
    const duration = 1500
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {value > 0 ? suffix : ''}
    </span>
  )
}

export function StatsSection({
  skillsCount = 0,
  projectsCount = 0,
  certsCount = 0,
  expCount = 0,
}: StatsSectionProps) {
  const stats = [
    {
      icon: Code2,
      value: skillsCount,
      label: 'Technologies Mastered',
      suffix: '+',
      color: 'from-primary to-secondary',
    },
    {
      icon: Layers,
      value: projectsCount,
      label: 'Projects Published',
      suffix: '+',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Award,
      value: certsCount,
      label: 'Certifications Earned',
      suffix: '',
      color: 'from-primary to-secondary',
    },
    {
      icon: Cpu,
      value: expCount,
      label: 'Year of Experience',
      suffix: '+',
      color: 'from-amber-500 to-orange-500',
    },
  ]

  // If all database counts are 0, hide the section cleanly
  const totalItems = skillsCount + projectsCount + certsCount + expCount
  if (totalItems === 0) return null

  return (
    <section className="section py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <FadeIn key={stat.label} delay={i * 0.08} direction="up">
                <div className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 mx-auto shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="font-display font-black text-4xl md:text-5xl gradient-text mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
