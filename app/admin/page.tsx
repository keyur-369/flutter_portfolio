'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FolderOpen, Code2, Award, Mail, Eye, MessageSquare,
  TrendingUp, Plus, ArrowRight, BarChart3,
} from 'lucide-react'
import { projectService } from '@/services/projectService'
import { skillsService } from '@/services/skillsService'
import { certificateService } from '@/services/certificateService'
import { contactService } from '@/services/contactService'
import { visitorService } from '@/services/visitorService'
import type { Project, ContactMessage } from '@/types/database'
import { formatDate } from '@/lib/utils'

interface DashboardStats {
  projects: number
  skills: number
  certificates: number
  visitors: number
  totalMessages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ projects: 0, skills: 0, certificates: 0, visitors: 0, totalMessages: 0, unreadMessages: 0 })
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const [projects, skills, certs, msgs, visitors] = await Promise.all([
        projectService.getAll(),
        skillsService.getAll(),
        certificateService.getAll(),
        contactService.getAll(),
        visitorService.getCount(),
      ])
      const unread = msgs.filter((m) => !m.is_read).length
      setStats({
        projects: projects.length,
        skills: skills.length,
        certificates: certs.length,
        visitors,
        totalMessages: msgs.length,
        unreadMessages: unread,
      })
      setRecentProjects(projects.slice(0, 3))
      setRecentMessages(msgs.slice(0, 5))
      setLoading(false)
    }
    loadData()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderOpen, color: 'from-blue-500 to-cyan-500', href: '/admin/projects' },
    { label: 'Skills Listed', value: stats.skills, icon: Code2, color: 'from-violet-500 to-purple-500', href: '/admin/skills' },
    { label: 'Certificates', value: stats.certificates, icon: Award, color: 'from-amber-500 to-orange-500', href: '/admin/certificates' },
    { label: 'Total Visitors', value: stats.visitors, icon: Eye, color: 'from-green-500 to-emerald-500', href: '#' },
    { label: 'Total Messages', value: stats.totalMessages, icon: Mail, color: 'from-pink-500 to-rose-500', href: '/admin/messages' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'from-red-500 to-orange-500', href: '/admin/messages' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-black text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-white/50 text-sm">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={card.href}>
                <div className="glass-card p-5 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="font-display font-black text-3xl gradient-text mb-1">{card.value}</div>
                  <p className="text-xs text-white/50">{card.label}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg text-white">Recent Projects</h2>
            <Link href="/admin/projects" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                <div>
                  <p className="font-medium text-sm text-white">{project.title}</p>
                  <p className="text-xs text-white/40">{project.status}</p>
                </div>
                <span className={`badge text-xs ${project.featured ? 'badge-purple' : 'badge-blue'}`}>
                  {project.featured ? 'Featured' : 'Active'}
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/projects/new" className="btn-primary mt-4 text-sm py-2 w-full justify-center">
            <Plus size={14} /> Add Project
          </Link>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg text-white">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length > 0 ? recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start justify-between py-3 border-b border-white/[0.06] last:border-0 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{msg.name}</p>
                  <p className="text-xs text-white/40 truncate">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.is_read && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  <span className="text-xs text-white/30">{formatDate(msg.created_at)}</span>
                </div>
              </div>
            )) : (
              <p className="text-white/40 text-sm text-center py-4">No messages yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
