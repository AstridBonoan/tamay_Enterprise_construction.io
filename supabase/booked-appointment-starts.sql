-- Public lookup of booked consultation/service starts (bypasses RLS so slots hide for everyone).
-- Run in Supabase Dashboard → SQL Editor after bookings.sql / schedule-slots.sql.

create or replace function public.get_booked_appointment_starts(p_service_id text)
returns table (appointment_start text)
language sql
security definer
stable
set search_path = public
as $$
  select appointment_start
  from public.bookings
  where listing_id = p_service_id
    and booking_type in ('consultation', 'service')
    and status in ('pending', 'confirmed');
$$;

grant execute on function public.get_booked_appointment_starts(text) to anon, authenticated;
