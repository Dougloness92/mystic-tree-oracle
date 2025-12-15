-- Allow users to delete their own likes (for removing reactions)
CREATE POLICY "Users can delete their own likes"
ON public.likes
FOR DELETE
USING (true);