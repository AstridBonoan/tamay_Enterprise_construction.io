-- Security hardening for existing Tamay databases.
-- Run in Supabase Dashboard → SQL Editor after the other supabase/*.sql files.
-- Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- 1. Prevent clients from granting themselves is_staff
-- ---------------------------------------------------------------------------
create or replace function public.protect_profile_staff_flag()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- JWT-backed client roles only. Dashboard SQL / service role have no auth.role().
  if auth.role() in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      new.is_staff := false;
    elsif new.is_staff is distinct from old.is_staff then
      new.is_staff := old.is_staff;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_staff_flag on public.profiles;
create trigger protect_profile_staff_flag
  before insert or update on public.profiles
  for each row
  execute function public.protect_profile_staff_flag();

-- ---------------------------------------------------------------------------
-- 2. Bookings: clients cannot update rows; inserts must be pending
-- ---------------------------------------------------------------------------
drop policy if exists "Users can update own bookings" on public.bookings;

drop policy if exists "Users can insert own bookings" on public.bookings;
create policy "Users can insert own bookings"
  on public.bookings for insert
  with check (
    auth.uid() = user_id
    and status = 'pending'
  );

-- ---------------------------------------------------------------------------
-- 3. Bookings must match a published schedule slot
-- ---------------------------------------------------------------------------
create or replace function public.enforce_booking_matches_slot()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.listing_id is null or new.appointment_start is null or new.appointment_end is null then
    raise exception 'Appointment time is not available';
  end if;

  new.calendar_synced_at := null;

  if not exists (
    select 1
    from public.schedule_slots
    where service_key = new.listing_id
      and start_at = new.appointment_start
      and end_at = new.appointment_end
      and active = true
  ) then
    raise exception 'Appointment time is not available';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_booking_matches_slot on public.bookings;
create trigger enforce_booking_matches_slot
  before insert on public.bookings
  for each row
  execute function public.enforce_booking_matches_slot();

-- ---------------------------------------------------------------------------
-- 4. Guest booking RPC: same slot check (clear error before insert)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 5. Calendar sync: one claim per recent booking (no free-form event body)
-- ---------------------------------------------------------------------------
alter table public.bookings
  add column if not exists calendar_synced_at timestamptz;

create or replace function public.claim_booking_for_calendar_sync(
  p_listing_id text,
  p_appointment_start text
)
returns table (
  title text,
  subtitle text,
  appointment_start text,
  appointment_end text,
  appointment_timezone text,
  booking_type text,
  service_category text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed public.bookings;
begin
  if p_listing_id is null or length(trim(p_listing_id)) = 0
     or p_appointment_start is null or length(trim(p_appointment_start)) = 0 then
    return;
  end if;

  select *
    into claimed
  from public.bookings
  where listing_id = p_listing_id
    and appointment_start = p_appointment_start
    and status in ('pending', 'confirmed')
    and calendar_synced_at is null
    and created_at > now() - interval '10 minutes'
  order by created_at desc
  limit 1
  for update skip locked;

  if not found then
    return;
  end if;

  update public.bookings
  set calendar_synced_at = now()
  where id = claimed.id;

  return query
  select
    claimed.title,
    claimed.subtitle,
    claimed.appointment_start,
    claimed.appointment_end,
    claimed.appointment_timezone,
    claimed.booking_type,
    claimed.service_category;
end;
$$;

revoke all on function public.claim_booking_for_calendar_sync(text, text) from public;
grant execute on function public.claim_booking_for_calendar_sync(text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 6. Signature uploads: PNG only, known folders, size cap
-- ---------------------------------------------------------------------------
update storage.buckets
set
  file_size_limit = 1048576,
  allowed_mime_types = array['image/png']
where id = 'job-application-signatures';

drop policy if exists "Applicants can upload signatures" on storage.objects;
create policy "Applicants can upload signatures"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'job-application-signatures'
    and (
      name like 'signatures/%.png'
      or name like 'subcontractor-signatures/%.png'
    )
  );
