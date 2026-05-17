-- Track who closed a poll (for Poll Results and audit).
ALTER TABLE public.polls
  ADD COLUMN IF NOT EXISTS closed_by uuid REFERENCES public.app_user_profiles (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_polls_closed_by ON public.polls (closed_by);
