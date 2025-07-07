
-- Add streak columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_streak integer DEFAULT 1;

-- Update existing profiles to have default streak values
UPDATE public.profiles 
SET current_streak = 1, max_streak = 1 
WHERE current_streak IS NULL OR max_streak IS NULL;
