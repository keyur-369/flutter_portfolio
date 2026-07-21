-- ============================================================
-- SUPABASE STORAGE BUCKET: resume
-- Run this in your Supabase SQL Editor to create the bucket
-- ============================================================

-- Create the 'resume' storage bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resume',
  'resume',
  true,                          -- public access
  10485760,                      -- 10 MB max file size
  ARRAY['application/pdf']       -- only allow PDFs
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf'];

-- Allow public reads (anyone can view the PDF) 
CREATE POLICY "Public read resume" ON storage.objects
  FOR SELECT USING (bucket_id = 'resume');

-- Allow authenticated users (admin) to upload
CREATE POLICY "Authenticated upload resume" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'resume');

-- Allow authenticated users to update/replace
CREATE POLICY "Authenticated update resume" ON storage.objects  
  FOR UPDATE TO authenticated
  USING (bucket_id = 'resume');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated delete resume" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'resume');
