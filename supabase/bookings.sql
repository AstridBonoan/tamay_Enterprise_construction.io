-- Run in Supabase Dashboard → SQL Editor (after profiles.sql)

create table if not exists public.property_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  listing_id text not null,
  listing_kind text not null check (listing_kind in ('sale', 'rent')),
  listing_title text not null,
  listing_address text not null,
  appointment_start text not null,
  appointment_end text not null,
  appointment_timezone text not null default 'America/New_York',
  preferred_time text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists property_bookings_user_id_idx on public.property_bookings (user_id);
create index if not exists property_bookings_listing_id_idx on public.property_bookings (listing_id);
create index if not exists property_bookings_start_idx on public.property_bookings (appointment_start);

create unique index if not exists property_bookings_listing_slot_unique
  on public.property_bookings (listing_id, appointment_start)
  where status in ('pending', 'confirmed');

alter table public.property_bookings enable row level security;

create policy "Users can view own property bookings"
  on public.property_bookings for select
  using (auth.uid() = user_id);

create policy "Users can insert own property bookings"
  on public.property_bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own property bookings"
  on public.property_bookings for update
  using (auth.uid() = user_id);

-- Returns start times already booked for a listing (for availability on schedule pages).
create or replace function public.get_booked_showing_starts(p_listing_id text)
returns table (appointment_start text)
language sql
security definer
stable
set search_path = public
as $$
  select appointment_start
  from public.property_bookings
  where listing_id = p_listing_id
    and status in ('pending', 'confirmed');
$$;

grant execute on function public.get_booked_showing_starts(text) to anon, authenticated;
