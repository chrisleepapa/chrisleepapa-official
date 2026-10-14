-- The website uses the Supabase anon key with its own PIN-authenticated account flow.
-- Do not expose these new personal-record RPCs to Supabase-authenticated sessions unnecessarily.
begin;
revoke execute on function public.clp_load_bible_records(text, text) from authenticated;
revoke execute on function public.clp_save_bible_record(text, text, text, boolean, boolean, boolean, text) from authenticated;
revoke execute on function public.clp_load_bible_leaderboard() from authenticated;
grant execute on function public.clp_load_bible_records(text, text) to anon;
grant execute on function public.clp_save_bible_record(text, text, text, boolean, boolean, boolean, text) to anon;
grant execute on function public.clp_load_bible_leaderboard() to anon;
commit;