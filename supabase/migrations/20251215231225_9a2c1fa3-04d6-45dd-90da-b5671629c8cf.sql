-- Add reaction_type column to likes table
ALTER TABLE public.likes 
ADD COLUMN reaction_type text NOT NULL DEFAULT 'heart';

-- Add constraint for valid reaction types
ALTER TABLE public.likes 
ADD CONSTRAINT likes_reaction_type_check 
CHECK (reaction_type IN ('heart', 'light', 'leaf'));

-- Create index for better performance on post queries
CREATE INDEX IF NOT EXISTS idx_likes_post_reaction ON public.likes(post_id, reaction_type);