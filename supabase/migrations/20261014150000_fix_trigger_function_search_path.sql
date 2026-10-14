-- Pin trigger function search_path to avoid mutable search_path warnings.
-- These trigger functions only set updated_at and do not require caller-controlled schemas.
ALTER FUNCTION public.update_modified_column() SET search_path = public, pg_temp;
ALTER FUNCTION public.clp_set_updated_at() SET search_path = public, pg_temp;
