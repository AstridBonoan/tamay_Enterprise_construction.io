-- Run in Supabase Dashboard → SQL Editor (after profiles.sql)
-- Stores all account bookings: property viewings, consultations, and service appointments.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  booking_type text not null check (booking_type in ('property_viewing', 'consultation', 'service')),
  service_category text not null,
  title text not null,
  subtitle text,
  listing_id text,
  listing_kind text check (listing_kind is null or listing_kind in ('sale', 'rent')),
  appointment_start text not null,
  appointment_end text not null,
  appointment_timezone text not null default 'America/New_York',
  preferred_time text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_listing_id_idx on public.bookings (listing_id);
create index if not exists bookings_start_idx on public.bookings (appointment_start);
create index if not exists bookings_type_idx on public.bookings (booking_type);

create unique index if not exists bookings_property_slot_unique
  on public.bookings (listing_id, appointment_start)
  where booking_type = 'property_viewing'
    and listing_id is not null
    and status in ('pending', 'confirmed');

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own bookings"
  on public.bookings for update
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
  from public.bookings
  where listing_id = p_listing_id
    and booking_type = 'property_viewing'
    and status in ('pending', 'confirmed');
$$;

grant execute on function public.get_booked_showing_starts(text) to anon, authenticated;
