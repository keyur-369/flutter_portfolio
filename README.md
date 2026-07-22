# 🚀 Keyur Mistry — Premium Portfolio Website

A modern, production-ready personal portfolio built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- 🎨 Modern Glassmorphism UI
- 🌙 Dark Theme
- ⚡ Next.js 15 App Router
- 🎬 Framer Motion Animations
- 📱 Fully Responsive Design
- 🔐 Secure Admin Dashboard
- 📝 Blog Management
- 📂 Project Showcase
- 💼 Experience & Education
- 🏆 Certificates
- 📬 Contact Form
- 📊 Visitor Analytics
- 🔍 SEO Optimized
- 📱 Progressive Web App (PWA)

---

# 🚀 Quick Start

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/flutter_portfolio.git

cd flutter_portfolio
```

---

## 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

---

## 3. Configure Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## 4. Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 5. Production Build

```bash
npm run build
npm start
```

---

# 📂 Project Structure

```text
app/
│
├── (main)
├── admin
├── api
├── layout.tsx
├── robots.ts
├── sitemap.ts
│
components/
│
├── ui
├── home
├── layout
├── about
├── skills
├── projects
├── blogs
├── certificates
├── testimonials
├── contact
└── admin

services/

lib/

types/

public/

middleware.ts
```

---

# 🔐 Admin Panel

Login:

```
/admin/login
```

Create an admin account inside Supabase Authentication.

### Features

- Dashboard
- Profile Management
- Skills CRUD
- Projects CRUD
- Experience CRUD
- Education CRUD
- Certificates CRUD
- Blogs CRUD
- Testimonials CRUD
- Messages
- Website Settings

---

# 🗄️ Database Setup

Create the following tables in Supabase:

- Profile
- Education
- Experience
- Skills
- Projects
- Certificates
- Blogs
- Testimonials
- Contact Messages
- Social Links
- Website Settings
- Visitors

> **Recommended:** Keep your SQL schema inside a `database/schema.sql` file instead of placing hundreds of lines of SQL inside the README.

Example:

```
database/
├── schema.sql
├── policies.sql
└── storage.sql
```

---

# 📦 Storage Buckets

Create these public buckets:

- profile-images
- project-images
- project-gallery
- certificates
- resume
- blog-images

---

# 🔒 Row Level Security (RLS)

Enable RLS on every table.

Example:

```sql
create policy "Public Read"
on profile
for select
using (true);
```

Authenticated users should have full CRUD access.

---

# 🚀 Deployment

Deploy easily on **Vercel**.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Run:

```bash
npm run build
```

If successful, deploy to Vercel.

---

# 🎨 Design System

### Theme

- Dark Glassmorphism
- Aurora Background
- Animated Gradients

### Colors

- Blue (#3B82F6)
- Purple (#8B5CF6)

### Fonts

- Inter
- Outfit
- JetBrains Mono

### Animations

- Framer Motion
- Scroll Reveal
- Spring Physics
- Hover Effects

---

# 🛠 Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Vercel

---

# 📄 License

This project is licensed under the **MIT License**.

© 2026 Keyur Mistry