-- Run in Supabase Dashboard → SQL Editor (after profiles.sql)

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null default 'Home',
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  zip text not null,
  country text not null default 'US',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  brand text not null,
  last4 text not null,
  exp_month smallint not null,
  exp_year smallint not null,
  is_default boolean not null default false,
  stripe_payment_method_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  order_number text not null unique,
  status text not null default 'processing',
  total_cents integer not null,
  currency text not null default 'USD',
  items jsonb not null default '[]'::jsonb,
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create index if not exists addresses_user_id_idx on public.addresses (user_id);
create index if not exists payment_methods_user_id_idx on public.payment_methods (user_id);
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.addresses enable row level security;
alter table public.payment_methods enable row level security;
alter table public.orders enable row level security;

create policy "Users can view own addresses"
  on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses"
  on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses"
  on public.addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses"
  on public.addresses for delete using (auth.uid() = user_id);

create policy "Users can view own payment methods"
  on public.payment_methods for select using (auth.uid() = user_id);
create policy "Users can insert own payment methods"
  on public.payment_methods for insert with check (auth.uid() = user_id);
create policy "Users can update own payment methods"
  on public.payment_methods for update using (auth.uid() = user_id);
create policy "Users can delete own payment methods"
  on public.payment_methods for delete using (auth.uid() = user_id);

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders"
  on public.orders for insert with check (auth.uid() = user_id);
