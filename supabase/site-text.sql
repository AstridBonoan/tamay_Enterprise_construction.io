-- Site copy CMS. Run in Supabase → SQL Editor after staff-role.sql (needs is_staff()).
-- Idempotent: safe to re-run.

create table if not exists public.site_text_slots (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.site_text_slots enable row level security;

drop policy if exists "Anyone can view site text slots" on public.site_text_slots;
create policy "Anyone can view site text slots"
  on public.site_text_slots
  for select
  using (true);

drop policy if exists "Staff can insert site text slots" on public.site_text_slots;
create policy "Staff can insert site text slots"
  on public.site_text_slots
  for insert
  to authenticated
  with check (public.is_staff());

drop policy if exists "Staff can update site text slots" on public.site_text_slots;
create policy "Staff can update site text slots"
  on public.site_text_slots
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff can delete site text slots" on public.site_text_slots;
create policy "Staff can delete site text slots"
  on public.site_text_slots
  for delete
  to authenticated
  using (public.is_staff());
