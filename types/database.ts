export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type TableDef<T> = {
  Row: T & Record<string, unknown>
  Insert: Partial<T>
  Update: Partial<T>
  Relationships: []
}

export interface Profile {
  id: string
  full_name: string
  title?: string | null
  subtitle?: string | null
  about?: string | null
  email?: string | null
  phone?: string | null
  location?: string | null
  linkedin?: string | null
  github?: string | null
  website?: string | null
  resume_url?: string | null
  profile_image?: string | null
  created_at?: string
  updated_at?: string
}

export interface Education {
  id: string
  institute: string
  degree: string
  cgpa?: string | null
  start_year?: number | null
  end_year?: number | null
  description?: string | null
  created_at?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  employment_type?: string | null
  location?: string | null
  start_date?: string | null
  end_date?: string | null
  currently_working?: boolean
  description?: string | null
  created_at?: string
}

export interface Skill {
  id: string
  name: string
  category?: string | null
  percentage?: number | null
  icon?: string | null
  created_at?: string
}

export interface Project {
  id: string
  title: string
  slug?: string | null
  description?: string | null
  long_description?: string | null
  tech_stack?: string[] | null
  github_url?: string | null
  live_url?: string | null
  playstore_url?: string | null
  image?: string | null
  gallery?: string[] | null
  featured?: boolean
  status?: string
  created_at?: string
}

export interface Certificate {
  id: string
  title?: string | null
  issuer?: string | null
  issue_date?: string | null
  certificate_url?: string | null
  image?: string | null
  created_at?: string
}

export interface Blog {
  id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  content?: string | null
  cover_image?: string | null
  published?: boolean
  created_at?: string
}

export interface ContactMessage {
  id: string
  name?: string | null
  email?: string | null
  subject?: string | null
  message?: string | null
  is_read?: boolean
  created_at?: string
}

export interface Testimonial {
  id: string
  client_name?: string | null
  designation?: string | null
  company?: string | null
  review?: string | null
  image?: string | null
  created_at?: string
}

export interface SocialLink {
  id: string
  platform?: string | null
  url?: string | null
  icon?: string | null
}

export interface WebsiteSettings {
  id: string
  site_name?: string | null
  site_description?: string | null
  logo?: string | null
  favicon?: string | null
  primary_color?: string | null
  secondary_color?: string | null
  background_color?: string | null
  seo_keywords?: string | null
  google_analytics?: string | null
  created_at?: string
}

export interface Visitor {
  id: string
  ip_address?: string | null
  browser?: string | null
  country?: string | null
  city?: string | null
  device?: string | null
  visited_at?: string
}

export type Database = {
  public: {
    Tables: {
      profile: TableDef<Profile>
      education: TableDef<Education>
      experience: TableDef<Experience>
      skills: TableDef<Skill>
      projects: TableDef<Project>
      certificates: TableDef<Certificate>
      blogs: TableDef<Blog>
      contact_messages: TableDef<ContactMessage>
      testimonials: TableDef<Testimonial>
      social_links: TableDef<SocialLink>
      website_settings: TableDef<WebsiteSettings>
      visitors: TableDef<Visitor>
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
