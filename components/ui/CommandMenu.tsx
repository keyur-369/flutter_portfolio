'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Search, Home, User, Briefcase, FileText, Mail, Github, Linkedin, Moon, Sun, Monitor, MessageSquare } from 'lucide-react'
import { useTheme } from 'next-themes'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] mx-auto mt-[10vh] max-h-[80vh] w-full max-w-[640px] overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#0f0f15]/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
    >
      <div className="flex items-center border-b border-[rgba(255,255,255,0.1)] px-4">
        <Search className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
        <Command.Input 
          placeholder="Type a command or search..." 
          className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 text-white"
        />
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-sm text-gray-200">
        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
        
        <Command.Group heading={<div className="px-2 py-1.5 text-xs font-medium text-gray-400">Navigation</div>}>
          <Command.Item onSelect={() => runCommand(() => router.push('/'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Home className="mr-2 h-4 w-4 text-emerald-400" />
            Home
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push('/about'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <User className="mr-2 h-4 w-4 text-blue-400" />
            About
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push('/projects'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Briefcase className="mr-2 h-4 w-4 text-purple-400" />
            Projects
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push('/guestbook'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <MessageSquare className="mr-2 h-4 w-4 text-pink-400" />
            Guestbook
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push('/contact'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Mail className="mr-2 h-4 w-4 text-orange-400" />
            Contact
          </Command.Item>
        </Command.Group>

        <Command.Separator className="my-1 h-px bg-[rgba(255,255,255,0.05)]" />

        <Command.Group heading={<div className="px-2 py-1.5 text-xs font-medium text-gray-400">Social</div>}>
          <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/keyurmistry', '_blank'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => window.open('https://linkedin.com/in/keyurmistry', '_blank'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Linkedin className="mr-2 h-4 w-4 text-blue-500" />
            LinkedIn
          </Command.Item>
        </Command.Group>
        
        <Command.Separator className="my-1 h-px bg-[rgba(255,255,255,0.05)]" />

        <Command.Group heading={<div className="px-2 py-1.5 text-xs font-medium text-gray-400">Theme</div>}>
          <Command.Item onSelect={() => runCommand(() => setTheme('light'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Sun className="mr-2 h-4 w-4 text-yellow-400" />
            Light Mode
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => setTheme('dark'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Moon className="mr-2 h-4 w-4 text-blue-400" />
            Dark Mode
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => setTheme('system'))} className="flex cursor-pointer select-none items-center rounded-md px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] aria-selected:bg-[rgba(255,255,255,0.05)] aria-selected:text-white">
            <Monitor className="mr-2 h-4 w-4 text-gray-400" />
            System
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
