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
update public.profiles
set is_staff = true
where trim(concat(first_name, ' ', last_name)) ilike 'a tamay';
