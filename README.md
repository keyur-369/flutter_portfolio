# Keyur Mistry — Premium Portfolio Website

A world-class, production-ready personal portfolio website built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)
![Supabase](https://img.shields.io/badge/Supabase-green)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables

The `.env.local` file is already configured with your Supabase credentials.

```env
NEXT_PUBLIC_SUPABASE_URL=https://bjwwgonfyqodzbbjsgxo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── (main)/                    # Public pages with navbar/footer
│   │   ├── page.tsx               # Home page
│   │   ├── about/page.tsx         # About
│   │   ├── skills/page.tsx        # Skills
│   │   ├── experience/page.tsx    # Experience
│   │   ├── projects/              # Projects list + detail
│   │   ├── certificates/page.tsx  # Certificates
│   │   ├── blogs/                 # Blog list + post
│   │   ├── testimonials/page.tsx  # Testimonials
│   │   ├── contact/page.tsx       # Contact form
│   │   ├── resume/page.tsx        # Resume viewer
│   │   ├── privacy/page.tsx       # Privacy Policy
│   │   └── terms/page.tsx         # Terms
│   ├── admin/                     # Admin panel (protected)
│   │   ├── login/page.tsx         # Admin login
│   │   ├── page.tsx               # Dashboard
│   │   ├── projects/page.tsx      # Projects CRUD
│   │   ├── skills/page.tsx        # Skills CRUD
│   │   ├── experience/page.tsx    # Experience CRUD
│   │   ├── education/page.tsx     # Education CRUD
│   │   ├── certificates/page.tsx  # Certificates CRUD
│   │   ├── blogs/page.tsx         # Blogs CRUD
│   │   ├── testimonials/page.tsx  # Testimonials CRUD
│   │   ├── messages/page.tsx      # Contact messages
│   │   ├── profile/page.tsx       # Profile editor
│   │   └── settings/page.tsx      # Website settings
│   ├── api/
│   │   ├── contact/route.ts       # Contact form API
│   │   └── visitors/route.ts      # Visitor tracking API
│   ├── layout.tsx                 # Root layout
│   ├── not-found.tsx              # 404 page
│   ├── sitemap.ts                 # Dynamic sitemap
│   └── robots.ts                  # Robots.txt
├── components/
│   ├── ui/                        # Reusable UI components
│   │   ├── AnimatedCursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── RevealText.tsx
│   │   ├── FadeIn.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── TiltCard.tsx
│   │   └── TypewriterText.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── TechStack.tsx
│   │   └── CallToAction.tsx
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── certificates/
│   ├── blogs/
│   ├── contact/
│   ├── resume/
│   ├── testimonials/
│   ├── admin/
│   └── providers/
├── services/                      # Supabase service layer
│   ├── profileService.ts
│   ├── projectService.ts
│   ├── skillsService.ts
│   ├── educationService.ts
│   ├── experienceService.ts
│   ├── certificateService.ts
│   ├── blogService.ts
│   ├── testimonialService.ts
│   ├── contactService.ts
│   ├── settingsService.ts
│   ├── socialService.ts
│   └── visitorService.ts
├── types/
│   └── database.ts                # TypeScript DB types
├── lib/
│   ├── supabase.ts                # Supabase client
│   └── utils.ts                   # Utility functions
├── public/
│   └── manifest.json              # PWA manifest
└── middleware.ts                   # Admin route protection
```

---

## 🗄️ Admin Panel

Access the admin panel at `/admin/login`.

**Setup**: Create an admin user in your Supabase dashboard:
1. Go to **Authentication → Users → Add User**
2. Create a user with email + password
3. Use those credentials to log in at `/admin/login`

### Admin Features
- 📊 Dashboard with live statistics
- 📁 Projects CRUD (with image upload)
- ⚡ Skills CRUD (with percentage & icons)
- 💼 Experience CRUD
- 🎓 Education CRUD
- 🏆 Certificates CRUD (with image upload)
- 📝 Blogs CRUD (Markdown editor + publish toggle)
- 💬 Testimonials CRUD
- 📬 Messages viewer (read/delete/reply)
- 👤 Profile editor (with photo + resume upload)
- ⚙️ Website settings (SEO, colors, analytics)

---

## 🗃️ Database Setup

Run this SQL in your Supabase SQL Editor to set up all tables:

```sql
-- Enable UUID
create extension if not exists "uuid-ossp";

-- Profile
create table profile (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  title text, subtitle text, about text,
  email text, phone text, location text,
  linkedin text, github text, website text,
  resume_url text, profile_image text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Education
create table education (
  id uuid primary key default uuid_generate_v4(),
  institute text not null, degree text not null,
  cgpa text, start_year integer, end_year integer,
  description text, created_at timestamp default now()
);

-- Experience
create table experience (
  id uuid primary key default uuid_generate_v4(),
  company text not null, role text not null,
  employment_type text, location text,
  start_date date, end_date date,
  currently_working boolean default false,
  description text, created_at timestamp default now()
);

-- Skills
create table skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null, category text,
  percentage integer, icon text,
  created_at timestamp default now()
);

-- Projects
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null, slug text unique,
  description text, long_description text,
  tech_stack text[], github_url text, live_url text,
  playstore_url text, image text, gallery text[],
  featured boolean default false,
  status text default 'Completed',
  created_at timestamp default now()
);

-- Certificates
create table certificates (
  id uuid primary key default uuid_generate_v4(),
  title text, issuer text, issue_date date,
  certificate_url text, image text,
  created_at timestamp default now()
);

-- Blogs
create table blogs (
  id uuid primary key default uuid_generate_v4(),
  title text, slug text unique, description text,
  content text, cover_image text,
  published boolean default true,
  created_at timestamp default now()
);

-- Contact Messages
create table contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text, email text, subject text, message text,
  is_read boolean default false,
  created_at timestamp default now()
);

-- Testimonials
create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text, designation text, company text,
  review text, image text,
  created_at timestamp default now()
);

-- Social Links
create table social_links (
  id uuid primary key default uuid_generate_v4(),
  platform text, url text, icon text
);

-- Website Settings
create table website_settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text, site_description text,
  logo text, favicon text,
  primary_color text, secondary_color text,
  seo_keywords text, google_analytics text,
  created_at timestamp default now()
);

-- Visitors
create table visitors (
  id uuid primary key default uuid_generate_v4(),
  ip_address text, browser text, country text,
  city text, device text,
  visited_at timestamp default now()
);
```

### Storage Buckets
Create these buckets in Supabase Storage (all public):
- `profile-images`
- `project-images`
- `project-gallery`
- `resume`
- `certificates`
- `blog-images`

### Row Level Security
```sql
-- Allow public read on all tables
create policy "Public read" on profile for select using (true);
create policy "Public read" on education for select using (true);
create policy "Public read" on experience for select using (true);
create policy "Public read" on skills for select using (true);
create policy "Public read" on projects for select using (true);
create policy "Public read" on certificates for select using (true);
create policy "Public read" on blogs for select using (published = true);
create policy "Public read" on testimonials for select using (true);
create policy "Public read" on social_links for select using (true);
create policy "Public read" on website_settings for select using (true);

-- Allow public insert on contact_messages and visitors
create policy "Public insert" on contact_messages for insert with check (true);
create policy "Public insert" on visitors for insert with check (true);

-- Authenticated users full access
create policy "Auth full" on profile for all using (auth.role() = 'authenticated');
-- (repeat for all tables)
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## 🎨 Design System

- **Theme**: Dark glassmorphism with aurora background
- **Colors**: Blue (#3B82F6) → Purple (#8B5CF6) gradient
- **Fonts**: Inter (body), Outfit (display), JetBrains Mono (code)
- **Effects**: Glassmorphism, neon glow, mesh gradients, noise overlay
- **Animations**: Framer Motion, spring physics, scroll-triggered reveals

---

## 📝 License

MIT © Keyur Mistry
#   P o r t f o l i o _ F l u t t e r  
 