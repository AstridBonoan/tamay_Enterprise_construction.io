-- Run in Supabase Dashboard → SQL Editor

insert into storage.buckets (id, name, public)
values ('job-application-signatures', 'job-application-signatures', false)
on conflict (id) do nothing;

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  phone text not null,
  email text not null,
  address_line1 text not null,
  address_line2 text,
  zip text not null,
  city text not null,
  state text not null,
  primary_interest text not null,
  position text not null,
  position_other text,
  start_date date not null,
  employment_type text not null,
  availability_details text not null,
  drivers_license text not null,
  driving_issues text not null,
  driving_issues_notes text,
  work_authorized text not null,
  agree_background text not null,
  signature_storage_path text not null,
  signature_date date not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists job_applications_created_idx
  on public.job_applications (created_at desc);

alter table public.job_applications enable row level security;

grant insert on table public.job_applications to anon, authenticated;

drop policy if exists "Anyone can submit a job application" on public.job_applications;
create policy "Anyone can submit a job application"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

-- Storage RLS is already enabled on storage.objects in Supabase.
-- Do not ALTER that table here (requires storage admin ownership).
drop policy if exists "Applicants can upload signatures" on storage.objects;
create policy "Applicants can upload signatures"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'job-application-signatures');
