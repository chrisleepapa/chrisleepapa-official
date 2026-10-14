-- Fix explicit ID allocation for public.bible, whose id column has a sequence but no default.
create or replace function public.clp_save_bible_record(
  p_initials text, p_pin_hash text, p_verse_key text,
  p_is_read boolean default false, p_is_highlighted boolean default false,
  p_is_bookmarked boolean default false, p_memo_text text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_initials text := upper(trim(coalesce(p_initials, '')));
  v_key text := trim(coalesce(p_verse_key, ''));
  v_existing_id bigint;
begin
  if v_initials !~ '^[A-Z]{3}$' or p_pin_hash is null or length(p_pin_hash) <> 64 then
    return jsonb_build_object('ok', false, 'error', '인증에 실패했습니다.');
  end if;
  if v_key = '' or length(v_key) > 80 or v_key = 'PROFILE' then
    return jsonb_build_object('ok', false, 'error', '잘못된 성경 기록입니다.');
  end if;
  if p_memo_text is not null and length(p_memo_text) > 4000 then
    return jsonb_build_object('ok', false, 'error', '메모가 너무 깁니다.');
  end if;
  if not exists (select 1 from public.clp_accounts where initials = v_initials and pin_hash = p_pin_hash) then
    return jsonb_build_object('ok', false, 'error', '인증에 실패했습니다.');
  end if;
  select id into v_existing_id from public.bible
   where user_id = v_initials and verse_key = v_key order by id limit 1;
  if v_existing_id is null then
    insert into public.bible(id, user_id, verse_key, is_read, is_highlighted, is_bookmarked, memo_text)
    values (nextval('public.bible_id_seq'), v_initials, v_key, coalesce(p_is_read, false),
            coalesce(p_is_highlighted, false), coalesce(p_is_bookmarked, false), p_memo_text);
  else
    update public.bible set is_read = coalesce(p_is_read, false),
      is_highlighted = coalesce(p_is_highlighted, false),
      is_bookmarked = coalesce(p_is_bookmarked, false), memo_text = p_memo_text
    where id = v_existing_id;
  end if;
  return jsonb_build_object('ok', true);
end;
$function$;
revoke all on function public.clp_save_bible_record(text, text, text, boolean, boolean, boolean, text) from public;
grant execute on function public.clp_save_bible_record(text, text, text, boolean, boolean, boolean, text) to anon;