-- Site photo CMS. Run in Supabase → SQL Editor after staff-role.sql (needs is_staff()).
-- Idempotent: safe to re-run.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.site_image_slots (
  key text primary key,
  public_url text not null,
  storage_path text not null,
  original_file_name text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.site_image_slots enable row level security;

drop policy if exists "Anyone can view site image slots" on public.site_image_slots;
create policy "Anyone can view site image slots"
  on public.site_image_slots
  for select
  using (true);

drop policy if exists "Staff can insert site image slots" on public.site_image_slots;
create policy "Staff can insert site image slots"
  on public.site_image_slots
  for insert
  to authenticated
  with check (public.is_staff());

drop policy if exists "Staff can update site image slots" on public.site_image_slots;
create policy "Staff can update site image slots"
  on public.site_image_slots
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff can delete site image slots" on public.site_image_slots;
create policy "Staff can delete site image slots"
  on public.site_image_slots
  for delete
  to authenticated
  using (public.is_staff());

drop policy if exists "Public can read site media" on storage.objects;
create policy "Public can read site media"
  on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "Staff can upload site media" on storage.objects;
create policy "Staff can upload site media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-media' and public.is_staff());

drop policy if exists "Staff can update site media" on storage.objects;
create policy "Staff can update site media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-media' and public.is_staff());

drop policy if exists "Staff can delete site media" on storage.objects;
create policy "Staff can delete site media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-media' and public.is_staff());
