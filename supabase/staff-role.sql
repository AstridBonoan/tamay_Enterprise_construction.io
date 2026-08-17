-- Staff access for schedule management.
-- Run in Supabase Dashboard → SQL Editor (after schedule-slots.sql).

alter table public.profiles
  add column if not exists is_staff boolean not null default false;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_staff from public.profiles where id = auth.uid()),
    false
  );
$$;

grant execute on function public.is_staff() to authenticated;

drop policy if exists "Staff can insert schedule slots" on public.schedule_slots;
drop policy if exists "Staff can update schedule slots" on public.schedule_slots;
drop policy if exists "Staff can delete schedule slots" on public.schedule_slots;
drop policy if exists "Staff can view all schedule slots" on public.schedule_slots;

create policy "Staff can view all schedule slots"
  on public.schedule_slots for select
  using (public.is_staff());

create policy "Staff can insert schedule slots"
  on public.schedule_slots for insert
  with check (public.is_staff());

create policy "Staff can update schedule slots"
  on public.schedule_slots for update
  using (public.is_staff());

create policy "Staff can delete schedule slots"
  on public.schedule_slots for delete
  using (public.is_staff());

-- Grant staff access to the manager account (A Tamay).
-- Clients cannot change is_staff; this dashboard UPDATE still works (no JWT role).
update public.profiles
set is_staff = true
where trim(concat(first_name, ' ', last_name)) ilike 'a tamay';

create or replace function public.protect_profile_staff_flag()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.is_staff := false;
    elsif new.is_staff is distinct from old.is_staff then
      new.is_staff := old.is_staff;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_staff_flag on public.profiles;
create trigger protect_profile_staff_flag
  before insert or update on public.profiles
  for each row
  execute function public.protect_profile_staff_flag();
