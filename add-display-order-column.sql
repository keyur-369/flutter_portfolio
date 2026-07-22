-- =============================================================
-- OPTIONAL: Add display_order column to Supabase projects table
-- Run this in your Supabase SQL Editor:
-- =============================================================

ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 999;
