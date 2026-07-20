-- ====================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) PERMISSIONS FIX
-- Copy and paste this into your Supabase SQL Editor and click RUN
-- ====================================================================

-- 1. Enable RLS on all tables
alter table if exists profile enable row level security;
alter table if exists education enable row level security;
alter table if exists experience enable row level security;
alter table if exists skills enable row level security;
alter table if exists projects enable row level security;
alter table if exists certificates enable row level security;
alter table if exists blogs enable row level security;
alter table if exists contact_messages enable row level security;
alter table if exists testimonials enable row level security;
alter table if exists website_settings enable row level security;
alter table if exists visitors enable row level security;

-- 2. Drop any old restrictive policies if they exist
drop policy if exists "Public read" on profile;
drop policy if exists "Allow all insert" on profile;
drop policy if exists "Allow all update" on profile;
drop policy if exists "Allow all delete" on profile;

drop policy if exists "Public read" on projects;
drop policy if exists "Allow all insert" on projects;
drop policy if exists "Allow all update" on projects;
drop policy if exists "Allow all delete" on projects;

drop policy if exists "Public read" on skills;
drop policy if exists "Allow all insert" on skills;
drop policy if exists "Allow all update" on skills;
drop policy if exists "Allow all delete" on skills;

drop policy if exists "Public read" on education;
drop policy if exists "Allow all insert" on education;
drop policy if exists "Allow all update" on education;
drop policy if exists "Allow all delete" on education;

drop policy if exists "Public read" on experience;
drop policy if exists "Allow all insert" on experience;
drop policy if exists "Allow all update" on experience;
drop policy if exists "Allow all delete" on experience;

drop policy if exists "Public read" on certificates;
drop policy if exists "Allow all insert" on certificates;
drop policy if exists "Allow all update" on certificates;
drop policy if exists "Allow all delete" on certificates;

drop policy if exists "Public read" on blogs;
drop policy if exists "Allow all insert" on blogs;
drop policy if exists "Allow all update" on blogs;
drop policy if exists "Allow all delete" on blogs;

drop policy if exists "Public read" on testimonials;
drop policy if exists "Allow all insert" on testimonials;
drop policy if exists "Allow all update" on testimonials;
drop policy if exists "Allow all delete" on testimonials;

drop policy if exists "Public read" on website_settings;
drop policy if exists "Allow all insert" on website_settings;
drop policy if exists "Allow all update" on website_settings;

drop policy if exists "Public read" on contact_messages;
drop policy if exists "Allow all insert" on contact_messages;

-- 3. Create full access policies for all portfolio tables
-- Projects
create policy "Allow all select on projects" on projects for select using (true);
create policy "Allow all insert on projects" on projects for insert with check (true);
create policy "Allow all update on projects" on projects for update using (true);
create policy "Allow all delete on projects" on projects for delete using (true);

-- Profile
create policy "Allow all select on profile" on profile for select using (true);
create policy "Allow all insert on profile" on profile for insert with check (true);
create policy "Allow all update on profile" on profile for update using (true);
create policy "Allow all delete on profile" on profile for delete using (true);

-- Skills
create policy "Allow all select on skills" on skills for select using (true);
create policy "Allow all insert on skills" on skills for insert with check (true);
create policy "Allow all update on skills" on skills for update using (true);
create policy "Allow all delete on skills" on skills for delete using (true);

-- Education
create policy "Allow all select on education" on education for select using (true);
create policy "Allow all insert on education" on education for insert with check (true);
create policy "Allow all update on education" on education for update using (true);
create policy "Allow all delete on education" on education for delete using (true);

-- Experience
create policy "Allow all select on experience" on experience for select using (true);
create policy "Allow all insert on experience" on experience for insert with check (true);
create policy "Allow all update on experience" on experience for update using (true);
create policy "Allow all delete on experience" on experience for delete using (true);

-- Certificates
create policy "Allow all select on certificates" on certificates for select using (true);
create policy "Allow all insert on certificates" on certificates for insert with check (true);
create policy "Allow all update on certificates" on certificates for update using (true);
create policy "Allow all delete on certificates" on certificates for delete using (true);

-- Blogs
create policy "Allow all select on blogs" on blogs for select using (true);
create policy "Allow all insert on blogs" on blogs for insert with check (true);
create policy "Allow all update on blogs" on blogs for update using (true);
create policy "Allow all delete on blogs" on blogs for delete using (true);

-- Testimonials
create policy "Allow all select on testimonials" on testimonials for select using (true);
create policy "Allow all insert on testimonials" on testimonials for insert with check (true);
create policy "Allow all update on testimonials" on testimonials for update using (true);
create policy "Allow all delete on testimonials" on testimonials for delete using (true);

-- Website Settings
create policy "Allow all select on website_settings" on website_settings for select using (true);
create policy "Allow all insert on website_settings" on website_settings for insert with check (true);
create policy "Allow all update on website_settings" on website_settings for update using (true);

-- Contact Messages
create policy "Allow all select on contact_messages" on contact_messages for select using (true);
create policy "Allow all insert on contact_messages" on contact_messages for insert with check (true);
create policy "Allow all delete on contact_messages" on contact_messages for delete using (true);

-- Visitors
create policy "Allow all select on visitors" on visitors for select using (true);
create policy "Allow all insert on visitors" on visitors for insert with check (true);
