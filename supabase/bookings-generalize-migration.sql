-- Run ONLY if you already created the older property_bookings table from a previous bookings.sql.
-- Skips safely when property_bookings does not exist.

do $$
begin
  if to_regclass('public.property_bookings') is null then
    raise notice 'property_bookings not found — run bookings.sql instead.';
    return;
  end if;

  alter table public.property_bookings rename to bookings;

  alter table public.bookings
    add column if not exists booking_type text not null default 'property_viewing',
    add column if not exists service_category text not null default 'Real Estate';

  alter table public.bookings rename column listing_title to title;
  alter table public.bookings rename column listing_address to subtitle;

  alter table public.bookings alter column listing_id drop not null;
  alter table public.bookings alter column listing_kind drop not null;

  alter table public.bookings drop constraint if exists property_bookings_listing_kind_check;
  alter table public.bookings
    add constraint bookings_listing_kind_check
    check (listing_kind is null or listing_kind in ('sale', 'rent'));

  alter table public.bookings drop constraint if exists bookings_booking_type_check;
  alter table public.bookings
    add constraint bookings_booking_type_check
    check (booking_type in ('property_viewing', 'consultation', 'service'));

  drop index if exists public.property_bookings_listing_slot_unique;
  create unique index if not exists bookings_property_slot_unique
    on public.bookings (listing_id, appointment_start)
    where booking_type = 'property_viewing'
      and listing_id is not null
      and status in ('pending', 'confirmed');

  drop policy if exists "Users can view own property bookings" on public.bookings;
  drop policy if exists "Users can insert own property bookings" on public.bookings;
  drop policy if exists "Users can update own property bookings" on public.bookings;

  create policy "Users can view own bookings"
    on public.bookings for select
    using (auth.uid() = user_id);

  create policy "Users can insert own bookings"
    on public.bookings for insert
    with check (auth.uid() = user_id);

  create policy "Users can update own bookings"
    on public.bookings for update
    using (auth.uid() = user_id);

  create or replace function public.get_booked_showing_starts(p_listing_id text)
  returns table (appointment_start text)
  language sql
  security definer
  stable
  set search_path = public
  as $fn$
    select appointment_start
    from public.bookings
    where listing_id = p_listing_id
      and booking_type = 'property_viewing'
      and status in ('pending', 'confirmed');
  $fn$;

  grant execute on function public.get_booked_showing_starts(text) to anon, authenticated;
end $$;
