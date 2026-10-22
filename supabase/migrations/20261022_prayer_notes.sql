-- Dedicated per-account prayer notes and daily prayer selection.
create table if not exists public.clp_prayer_notes (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.clp_accounts(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 100),
  content text not null check (char_length(trim(content)) between 1 and 3000),
  category text not null default 'personal' check (category in ('family','health','gratitude','work','church','personal')),
  status text not null default 'praying' check (status in ('praying','answered','ongoing')),
  created_at date not null default (timezone('Asia/Seoul', now()))::date,
  updated_at timestamptz not null default now()
);
create index if not exists clp_prayer_notes_account_created_idx on public.clp_prayer_notes(account_id, created_at desc, updated_at desc);
alter table public.clp_prayer_notes enable row level security;
revoke all on public.clp_prayer_notes from anon, authenticated;

create table if not exists public.clp_prayer_daily (
  account_id uuid not null references public.clp_accounts(id) on delete cascade,
  selection_date date not null,
  note_id uuid references public.clp_prayer_notes(id) on delete set null,
  primary key(account_id, selection_date)
);
alter table public.clp_prayer_daily enable row level security;
revoke all on public.clp_prayer_daily from anon, authenticated;

create or replace function public.clp_prayer_notes_load(p_initials text,p_pin_hash text)
returns jsonb language plpgsql security definer set search_path to 'public','pg_temp' as $fn$
declare v_account public.clp_accounts%rowtype; v_today date := (timezone('Asia/Seoul',now()))::date;
begin
  select * into v_account from public.clp_accounts where initials=upper(trim(coalesce(p_initials,''))) and pin_hash=lower(coalesce(p_pin_hash,'')) limit 1;
  if not found then return jsonb_build_object('ok',false,'error','인증에 실패했습니다.'); end if;
  return jsonb_build_object(
    'ok',true,
    'notes',coalesce((select jsonb_agg(jsonb_build_object('id',n.id,'title',n.title,'content',n.content,'category',n.category,'status',n.status,'createdAt',n.created_at,'updatedAt',n.updated_at) order by n.created_at desc,n.updated_at desc) from public.clp_prayer_notes n where n.account_id=v_account.id),'[]'::jsonb),
    'dailySelection',(select jsonb_build_object('date',d.selection_date,'id',d.note_id) from public.clp_prayer_daily d where d.account_id=v_account.id and d.selection_date=v_today)
  );
end; $fn$;

create or replace function public.clp_prayer_notes_save(p_initials text,p_pin_hash text,p_id uuid,p_title text,p_content text,p_category text,p_status text,p_created_at date default null)
returns jsonb language plpgsql security definer set search_path to 'public','pg_temp' as $fn$
declare v_account public.clp_accounts%rowtype; v_note public.clp_prayer_notes%rowtype;
begin
  select * into v_account from public.clp_accounts where initials=upper(trim(coalesce(p_initials,''))) and pin_hash=lower(coalesce(p_pin_hash,'')) limit 1;
  if not found then return jsonb_build_object('ok',false,'error','인증에 실패했습니다.'); end if;
  if length(trim(coalesce(p_title,''))) not between 1 and 100 or length(trim(coalesce(p_content,''))) not between 1 and 3000 or coalesce(p_category,'') not in ('family','health','gratitude','work','church','personal') or coalesce(p_status,'') not in ('praying','answered','ongoing') then
    return jsonb_build_object('ok',false,'error','기도 제목, 내용 또는 분류가 올바르지 않습니다.');
  end if;
  if p_id is null then
    insert into public.clp_prayer_notes(account_id,title,content,category,status,created_at)
    values(v_account.id,trim(p_title),trim(p_content),p_category,p_status,coalesce(p_created_at,(timezone('Asia/Seoul',now()))::date)) returning * into v_note;
  else
    update public.clp_prayer_notes set title=trim(p_title),content=trim(p_content),category=p_category,status=p_status,updated_at=now()
    where id=p_id and account_id=v_account.id returning * into v_note;
    if not found then return jsonb_build_object('ok',false,'error','기도 기록을 찾을 수 없습니다.'); end if;
  end if;
  return jsonb_build_object('ok',true,'note',jsonb_build_object('id',v_note.id,'title',v_note.title,'content',v_note.content,'category',v_note.category,'status',v_note.status,'createdAt',v_note.created_at,'updatedAt',v_note.updated_at));
end; $fn$;

create or replace function public.clp_prayer_notes_delete(p_initials text,p_pin_hash text,p_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public','pg_temp' as $fn$
declare v_account public.clp_accounts%rowtype; v_count integer;
begin
  select * into v_account from public.clp_accounts where initials=upper(trim(coalesce(p_initials,''))) and pin_hash=lower(coalesce(p_pin_hash,'')) limit 1;
  if not found then return jsonb_build_object('ok',false,'error','인증에 실패했습니다.'); end if;
  delete from public.clp_prayer_notes where id=p_id and account_id=v_account.id;
  get diagnostics v_count=row_count;
  delete from public.clp_prayer_daily where account_id=v_account.id and note_id=p_id;
  return jsonb_build_object('ok',true,'deleted',v_count);
end; $fn$;

create or replace function public.clp_prayer_daily_set(p_initials text,p_pin_hash text,p_note_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public','pg_temp' as $fn$
declare v_account public.clp_accounts%rowtype; v_today date := (timezone('Asia/Seoul',now()))::date;
begin
  select * into v_account from public.clp_accounts where initials=upper(trim(coalesce(p_initials,''))) and pin_hash=lower(coalesce(p_pin_hash,'')) limit 1;
  if not found then return jsonb_build_object('ok',false,'error','인증에 실패했습니다.'); end if;
  if p_note_id is not null and not exists(select 1 from public.clp_prayer_notes where id=p_note_id and account_id=v_account.id) then
    return jsonb_build_object('ok',false,'error','기도 기록을 찾을 수 없습니다.');
  end if;
  insert into public.clp_prayer_daily(account_id,selection_date,note_id) values(v_account.id,v_today,p_note_id)
  on conflict(account_id,selection_date) do update set note_id=excluded.note_id;
  return jsonb_build_object('ok',true,'date',v_today,'id',p_note_id);
end; $fn$;

revoke all on function public.clp_prayer_notes_load(text,text) from public;
revoke all on function public.clp_prayer_notes_save(text,text,uuid,text,text,text,text,date) from public;
revoke all on function public.clp_prayer_notes_delete(text,text,uuid) from public;
revoke all on function public.clp_prayer_daily_set(text,text,uuid) from public;
grant execute on function public.clp_prayer_notes_load(text,text) to anon,authenticated;
grant execute on function public.clp_prayer_notes_save(text,text,uuid,text,text,text,text,date) to anon,authenticated;
grant execute on function public.clp_prayer_notes_delete(text,text,uuid) to anon,authenticated;
grant execute on function public.clp_prayer_daily_set(text,text,uuid) to anon,authenticated;
