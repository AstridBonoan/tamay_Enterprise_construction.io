-- Run in Supabase Dashboard → SQL Editor

create table if not exists public.subcontractor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  contact_name text not null,
  company_name text,
  phone text not null,
  email text not null,
  address_line1 text not null,
  address_line2 text,
  zip text not null,
  city text not null,
  state text not null,
  business_structure text not null,
  trade_specialty text not null,
  trade_other text,
  years_in_business text not null,
  service_area text not null,
  crew_size text not null,
  engagement_type text not null,
  available_start_date date not null,
  availability_details text not null,
  general_liability_insurance text not null,
  workers_comp_insurance text not null,
  licensed_trade text not null,
  license_number text,
  work_authorized text not null,
  agree_background text not null,
  signature_storage_path text not null,
  signature_date date not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists subcontractor_applications_created_idx
  on public.subcontractor_applications (created_at desc);

alter table public.subcontractor_applications enable row level security;

grant insert on table public.subcontractor_applications to anon, authenticated;

drop policy if exists "Anyone can submit a subcontractor application" on public.subcontractor_applications;
create policy "Anyone can submit a subcontractor application"
  on public.subcontractor_applications
  for insert
  to anon, authenticated
  with check (true);
