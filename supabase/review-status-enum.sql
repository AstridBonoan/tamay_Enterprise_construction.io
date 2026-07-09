-- Review status enum (dropdown in Supabase Table Editor) + staff moderation policies.
-- Run in Supabase Dashboard → SQL Editor (after reviews.sql and staff-role.sql).

do $$ begin
  create type public.review_status as enum ('pending', 'published', 'rejected');
exception
  when duplicate_object then null;
end $$;

alter table public.site_reviews
  alter column status drop default;

alter table public.site_reviews
  alter column status type public.review_status
  using status::public.review_status;

alter table public.site_reviews
  alter column status set default 'pending'::public.review_status;

drop policy if exists "Staff can view all site reviews" on public.site_reviews;
drop policy if exists "Staff can update site reviews" on public.site_reviews;

create policy "Staff can view all site reviews"
  on public.site_reviews for select
  using (public.is_staff());

create policy "Staff can update site reviews"
  on public.site_reviews for update
  using (public.is_staff())
  with check (public.is_staff());
