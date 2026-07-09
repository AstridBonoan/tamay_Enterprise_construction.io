-- Dynamic appointment availability (staff-managed, public read).
-- Run in Supabase Dashboard → SQL Editor (after profiles.sql).

create table if not exists public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  service_key text not null,
  date_label text not null,
  time_label text not null,
  start_at text not null,
  end_at text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create index if not exists schedule_slots_service_key_idx on public.schedule_slots (service_key);
create index if not exists schedule_slots_start_idx on public.schedule_slots (start_at);
create unique index if not exists schedule_slots_service_start_unique
  on public.schedule_slots (service_key, start_at)
  where active = true;

alter table public.schedule_slots enable row level security;

create policy "Anyone can view active schedule slots"
  on public.schedule_slots for select
  using (active = true);

-- Staff policies are added in staff-role.sql after is_staff exists.

create or replace function public.get_schedule_slots(p_service_key text)
returns table (
  id uuid,
  service_key text,
  date_label text,
  time_label text,
  start_at text,
  end_at text
)
language sql
stable
security definer
set search_path = public
as $$
  select id, service_key, date_label, time_label, start_at, end_at
  from public.schedule_slots
  where service_key = p_service_key
    and active = true
  order by start_at asc;
$$;

grant execute on function public.get_schedule_slots(text) to anon, authenticated;

-- Prevent double-booking consultations/services on the same slot.
create unique index if not exists bookings_consultation_slot_unique
  on public.bookings (listing_id, appointment_start)
  where booking_type in ('consultation', 'service')
    and listing_id is not null
    and status in ('pending', 'confirmed');
