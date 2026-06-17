-- Run in Supabase Dashboard → SQL Editor

create table if not exists public.site_reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  email text,
  rating smallint not null check (rating >= 1 and rating <= 5),
  text text not null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists site_reviews_status_created_idx
  on public.site_reviews (status, created_at desc);

alter table public.site_reviews enable row level security;

create policy "Anyone can submit a review"
  on public.site_reviews
  for insert
  with check (true);

create policy "Public can read published reviews"
  on public.site_reviews
  for select
  using (status = 'published');
