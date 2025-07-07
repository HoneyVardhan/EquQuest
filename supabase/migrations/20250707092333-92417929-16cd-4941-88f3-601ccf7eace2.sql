
-- Update the quiz_progress table to match the new requirements
ALTER TABLE public.quiz_progress 
DROP COLUMN IF EXISTS current_index,
DROP COLUMN IF EXISTS last_activity_date,
DROP COLUMN IF EXISTS streak,
DROP COLUMN IF EXISTS last_attempted_at;

-- Add the required columns if they don't exist
ALTER TABLE public.quiz_progress 
ADD COLUMN IF NOT EXISTS current_question integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS answers jsonb DEFAULT '[]'::jsonb;

-- Create a unique constraint on user_id + topic_id combination
ALTER TABLE public.quiz_progress 
DROP CONSTRAINT IF EXISTS quiz_progress_user_topic_unique;

ALTER TABLE public.quiz_progress 
ADD CONSTRAINT quiz_progress_user_topic_unique UNIQUE (user_id, topic_id);

-- Update RLS policies to ensure proper access
DROP POLICY IF EXISTS "Users can INSERT their own progress" ON public.quiz_progress;
DROP POLICY IF EXISTS "Users can SELECT their own progress" ON public.quiz_progress;
DROP POLICY IF EXISTS "Users can UPDATE their own progress" ON public.quiz_progress;

CREATE POLICY "Users can manage their own progress" ON public.quiz_progress
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
