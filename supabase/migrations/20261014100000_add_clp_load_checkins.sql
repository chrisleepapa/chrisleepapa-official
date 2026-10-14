-- Add an account-verified RPC for loading check-in dates.
-- This replaces unsafe direct table queries that attempted to compare account_id
-- (UUID) with the user's initials.
begin;

create or replace function public.clp_load_checkins(
  p_initials text,
  p_pin_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_account public.clp_accounts%rowtype;
  v_dates jsonb;
begin
  select *
    into v_account
    from public.clp_accounts
   where initials = upper(trim(coalesce(p_initials, '')))
     and pin_hash = p_pin_hash
   limit 1;

  if not found then
    return jsonb_build_object('ok', false, 'error', '인증에 실패했습니다.');
  end if;

  select coalesce(
           jsonb_agg(to_char(record_date, 'YYYY-MM-DD') order by record_date),
           '[]'::jsonb
         )
    into v_dates
    from public.clp_today
   where account_id = v_account.id
     and data->>'checkin' = 'true';

  return jsonb_build_object('ok', true, 'dates', v_dates);
end;
$function$;

revoke all on function public.clp_load_checkins(text, text) from public;
grant execute on function public.clp_load_checkins(text, text) to anon, authenticated;

commit;
