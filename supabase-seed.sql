-- =============================================================
-- KEYUR MISTRY PORTFOLIO — COMPLETE SUPABASE SEED DATA
-- Copy and paste this into your Supabase SQL Editor and click RUN
-- =============================================================

-- 1. PROFILE TABLE SEED
insert into profile (
  full_name, title, subtitle, about, email, phone, location,
  github, linkedin, website, resume_url
) values (
  'Keyur Mistry',
  'Flutter & Full Stack Developer',
  'Building beautiful, performant cross-platform mobile apps',
  'Flutter Developer with practical experience developing cross-platform applications using Flutter, Firebase and Supabase. Skilled in REST APIs, scalable architecture, backend integration and UI development. Currently pursuing MSc Information Technology at CHARUSAT while gaining hands-on experience as a Flutter Developer Intern at Patrixel.',
  'keyurmistry@email.com',
  '+91 XXXXX XXXXX',
  'Gujarat, India',
  'https://github.com/keyurmistry',
  'https://linkedin.com/in/keyurmistry',
  'https://keyurmistry.dev',
  '/resume.pdf'
) on conflict do nothing;

-- 2. EDUCATION SEED
insert into education (institute, degree, cgpa, start_year, end_year, description) values
('CHARUSAT University', 'MSc Information Technology', '7.00', 2024, 2026, 'Post-graduation in Information Technology focusing on advanced software development, database systems, and mobile architectures.'),
('Veer Narmad South Gujarat University (VNSGU)', 'Bachelor of Computer Applications (BCA)', '7.22', 2021, 2024, 'Three-year undergraduate program covering core computer science, object-oriented programming, databases, and web development.');

-- 3. EXPERIENCE SEED
insert into experience (company, role, employment_type, location, start_date, currently_working, description) values
('Patrixel', 'Flutter Developer Intern', 'Internship', 'Remote / Gujarat, India', '2025-12-01', true, 'Developing cross-platform mobile applications using Flutter and Dart. Working on REST API integration, Firebase backend, Supabase database, responsive UI design, performance optimization, and debugging.');

-- 4. SKILLS SEED
insert into skills (name, category, percentage, icon) values
('Flutter', 'Mobile Development', 92, '🐦'),
('Dart', 'Mobile Development', 90, '🎯'),
('Android Studio', 'Mobile Development', 85, '🤖'),
('Firebase', 'Backend & Database', 88, '🔥'),
('Supabase', 'Backend & Database', 85, '⚡'),
('REST APIs', 'Backend & Database', 88, '🔌'),
('PostgreSQL', 'Backend & Database', 80, '🐘'),
('MySQL', 'Backend & Database', 78, '🗄️'),
('Git', 'Tools & DevOps', 88, '🌿'),
('GitHub', 'Tools & DevOps', 88, '🐙'),
('VS Code', 'Tools & DevOps', 92, '💻'),
('Postman', 'Tools & DevOps', 85, '📮'),
('Figma', 'Tools & DevOps', 75, '🎨'),
('C', 'Programming Languages', 75, '⚙️'),
('C++', 'Programming Languages', 72, '⚙️'),
('Java', 'Programming Languages', 78, '☕'),
('SQL', 'Programming Languages', 82, '📊');

-- 5. PROJECTS SEED
insert into projects (title, slug, description, long_description, tech_stack, playstore_url, featured, status) values
(
  'Split Expenses',
  'split-expenses',
  'A smart expense splitting app published on Google Play Store. Helps groups manage shared costs effortlessly with real-time sync, multiple currencies, and smart calculation.',
  'Split Expenses is a mobile app built with Flutter and Firebase that allows groups of friends, roommates, or travel companions to split bills seamlessly. Features real-time offline-first database, multi-currency support, custom settlement calculations, and clean UI.',
  ARRAY['Flutter', 'Dart', 'Firebase', 'Supabase'],
  'https://play.google.com/store',
  true,
  'Published'
),
(
  'MCQ Pro',
  'mcq-pro',
  'AI-powered examination platform providing intelligent MCQ generation, adaptive testing, and detailed performance analytics for students and educators.',
  'MCQ Pro simplifies exam creation and practice using AI algorithms to generate multiple-choice questions automatically from text, notes, or topics. Includes adaptive difficulty scoring and visual analytics.',
  ARRAY['Flutter', 'Dart', 'Firebase', 'REST APIs', 'AI/ML'],
  null,
  true,
  'Completed'
),
(
  'InvoiceHub',
  'invoicehub',
  'Comprehensive GST Invoice Management System for businesses. Generate, manage, and track GST-compliant invoices with automated tax calculations and PDF export.',
  'InvoiceHub is an enterprise invoice management application for small to medium businesses. Generates compliant GST invoices with automatically calculated CGST/SGST/IGST, client management, payment tracking, and PDF downloads.',
  ARRAY['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
  null,
  true,
  'Completed'
);

-- 6. CERTIFICATES SEED
insert into certificates (title, issuer, issue_date, certificate_url) values
('Flutter & Dart — The Complete Guide', 'Udemy', '2024-06-01', 'https://udemy.com'),
('Prompt Engineering for Developers', 'DeepLearning.AI', '2024-08-01', 'https://deeplearning.ai'),
('Python Basics', 'Coursera', '2023-12-01', 'https://coursera.org'),
('Firebase for Flutter Developers', 'Google', '2024-03-01', 'https://developers.google.com');

-- 7. BLOGS SEED
insert into blogs (title, slug, description, content, published) values
(
  'Getting Started with Flutter: A Complete Beginner Guide',
  'getting-started-flutter',
  'A comprehensive introduction to Flutter development — from setting up your environment to building your first cross-platform app.',
  '# Getting Started with Flutter\n\nFlutter is Google UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.\n\n## Why Choose Flutter?\n\n1. **Single Codebase**: Write once, run on Android & iOS.\n2. **Hot Reload**: Instantly see changes without restarting the app.\n3. **Rich Widgets**: Beautiful Material and Cupertino UI widgets out of the box.\n\nHappy coding!',
  true
),
(
  'Firebase vs Supabase: Which Backend Should You Choose for Flutter?',
  'firebase-vs-supabase',
  'An in-depth comparison of Firebase and Supabase for Flutter developers — covering real-time databases, auth, storage, and pricing.',
  '# Firebase vs Supabase for Flutter\n\nBoth Firebase and Supabase are top-tier backend solutions for Flutter developers.\n\n## Firebase\n- NoSQL Firestore Database\n- Google Ecosystem Integration\n- Turnkey Authentication & Push Notifications\n\n## Supabase\n- PostgreSQL Relational Database\n- Open Source\n- SQL Queries & Row Level Security\n\nChoose Supabase if you need SQL relationships, or Firebase if you prefer NoSQL document trees.',
  true
);

-- 8. WEBSITE SETTINGS SEED
insert into website_settings (site_name, site_description, primary_color, secondary_color, seo_keywords) values
(
  'Keyur Mistry — Portfolio',
  'Flutter Developer building high-performance cross-platform applications.',
  '#3B82F6',
  '#8B5CF6',
  'Flutter Developer, Mobile Developer, Dart, Firebase, Supabase, Keyur Mistry'
) on conflict do nothing;
