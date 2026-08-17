-- Guest appointment bookings (no account required)
-- Run in Supabase Dashboard → SQL Editor

alter table public.bookings alter column user_id drop not null;

create or replace function public.create_guest_service_booking(
  p_booking_type text,
  p_service_category text,
  p_service_id text,
  p_title text,
  p_subtitle text,
  p_appointment_start text,
  p_appointment_end text,
  p_appointment_timezone text,
  p_preferred_time text,
  p_notes text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_booking_type not in ('consultation', 'service') then
    raise exception 'Invalid booking type';
  end if;

  if p_service_id is null or length(trim(p_service_id)) = 0 then
    raise exception 'Appointment time is not available';
  end if;

  if not exists (
    select 1
    from public.schedule_slots
    where service_key = p_service_id
      and start_at = p_appointment_start
      and end_at = p_appointment_end
      and active = true
  ) then
    raise exception 'Appointment time is not available';
  end if;

  insert into public.bookings (
    user_id,
    booking_type,
    service_category,
    title,
    subtitle,
    listing_id,
    listing_kind,
    appointment_start,
    appointment_end,
    appointment_timezone,
    preferred_time,
    notes,
    status
  )
  values (
    null,
    p_booking_type,
    p_service_category,
    p_title,
    p_subtitle,
    p_service_id,
    null,
    p_appointment_start,
    p_appointment_end,
    coalesce(p_appointment_timezone, 'America/New_York'),
    p_preferred_time,
    p_notes,
    'pending'
  );
end;
$$;

grant execute on function public.create_guest_service_booking(
  text, text, text, text, text, text, text, text, text, text
) to anon, authenticated;

create or replace function public.create_guest_property_booking(
  p_listing_id text,
  p_listing_kind text,
  p_title text,
  p_subtitle text,
  p_appointment_start text,
  p_appointment_end text,
  p_appointment_timezone text,
  p_preferred_time text,
  p_notes text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_listing_kind not in ('sale', 'rent') then
    raise exception 'Invalid listing kind';
  end if;

  if p_listing_id is null or length(trim(p_listing_id)) = 0 then
    raise exception 'Appointment time is not available';
  end if;

  if not exists (
    select 1
    from public.schedule_slots
    where service_key = p_listing_id
      and start_at = p_appointment_start
      and end_at = p_appointment_end
      and active = true
  ) then
    raise exception 'Appointment time is not available';
  end if;

  insert into public.bookings (
    user_id,
    booking_type,
    service_category,
    title,
    subtitle,
    listing_id,
    listing_kind,
    appointment_start,
    appointment_end,
    appointment_timezone,
    preferred_time,
    notes,
    status
  )
  values (
    null,
    'property_viewing',
    'Real Estate',
    p_title,
    p_subtitle,
    p_listing_id,
    p_listing_kind,
    p_appointment_start,
    p_appointment_end,
    coalesce(p_appointment_timezone, 'America/New_York'),
    p_preferred_time,
    p_notes,
    'pending'
  );
end;
$$;

grant execute on function public.create_guest_property_booking(
  text, text, text, text, text, text, text, text, text
) to anon, authenticated;
